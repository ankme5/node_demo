pipeline{
    agent any
    stages{
        stage("cloning){
              steps{
                    git url : "https://github.com/ankme5/node_demo", branch : "docker"
              }
        }
        stage("building"){
            steps{
                sh "docker build -t docker-node-app"
            }
        }
        stage("pushing"){
            steps{
                withCredentials([usernamePassword(credentialsId: "", passwordVariable: "", usernameVariable: "")]){
                    sh "docker login -u ${env.dockerUser} -p ${env.dockerPass}"
                    sh "docker tag docker-node-app:latest ${env.dockerUser}/docker-node-app:latest"
                    sh "docker push ${env.dockerUser}/docker-node-app:latest"
                }
            }
        }
        stage("deploying"){
            steps{
                sh "docker-compose down && docker compose up -d"
            }
        }
              
              
    }
}
