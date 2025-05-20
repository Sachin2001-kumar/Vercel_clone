// In this file i build the code and push the code into AWS s3

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

  p.on("close", function () {
    console.log("build Complete");
  });
}
