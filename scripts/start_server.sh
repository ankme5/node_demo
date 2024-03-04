#!/bin/bash

# Navigate to the directory where your Node.js application is located
cd /var/www/my-nodejs-app
docker run -d -p 8000:8000 jenkins-node-app
