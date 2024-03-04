#!/bin/bash

# Navigate to the directory where your Node.js application is located
cd /var/www/my-nodejs-app
docker build . -t "jenkins-node-app"
docker run -d -t "test1" -p 8000:8000 jenkins-node-app
