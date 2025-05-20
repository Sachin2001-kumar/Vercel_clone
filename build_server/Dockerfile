
# base package
FROM ubuntu:jammy

# to update my all ubuntu packages
RUN apt-get update 

# kisi bhi tarah ki api ko call karne k liye hume curl jo cli tool hota h usse ki jaroorat padti h
RUN apt-get install -y curl

# to install nodejs 
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs 

# git install
RUN apt-get install git -y

# setup workdir
WORKDIR /home/app

# copy
COPY main.sh main.sh

# Entry Point or the executable file 
ENTRYPOINT [ "/home/app/main.sh" ]