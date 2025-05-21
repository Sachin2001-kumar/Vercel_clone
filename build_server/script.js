// In this file i build the code and push the code into AWS s3

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { S3Client, PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const S3Client = new S3Client({
  region: "ap-south-1",
  Credentials: {
    accesskeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const PROJECT_ID = "";
var mime = require("mime-types");

async function init() {
  console.log("Execution script.js");
  const outDirPath = path.join(__dirname, "output");

  const p = exec(`cd ${outDirPath} && npm install && npm run build`);

  p.stdout.on("data", function (data) {
    console.log(data.toString());
  });
  p.stdout.on("Error", function (data) {
    console.log("Error", data.toString());
  });

  p.on("close", async function () {
    console.log("build Complete");
    const distfolderpath = path.join(__dirname, "output", "dist");
    const distfolderContents = fs.readFileSync(distfolderpath, {
      recursive: true,
    });

    for (const filepath of distfolderContents) {
      if (fs.lstatSync(filepath).isDirectory()) continue;

      const command = new PutObjectCommand({
        Bucket: "",
        Key: `__outputs/${PROJECT_ID}/${filepath}`,
        Body: fs.createReadStream(filepath),
        ContentType: mime.lookup(filepath),
      });

      await S3Client.send(command);
    }
  });
}

init();
