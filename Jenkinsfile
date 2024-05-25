pipeline {
    agent any 
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Ouassim012/Projet-Machine-Learning']])
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'oumaima778-dockerhub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        def loginCmd = "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                        bat(loginCmd)
                    }
                }
            }
        }
        stage('Build Docker image for Fast API') {
            steps {
                script {
                    bat 'docker build -t oumaima778/fastapi-app -f Fast-API/dockerfile .'
                }
            }
        }
        stage('Build Docker image for Flask API') {
            steps {
                script {
                    bat 'docker build -t oumaima778/flaskapi-app -f flask/dockerfile .'
                }
            }
        } 
        stage('Push Fast API image to Hub') {
            steps {
                script {
                    bat 'docker push oumaima778/fastapi-app'
                }
            }
        }
       stage('Push Flask API image to Hub') {
            steps {
                script {
                    bat 'docker push oumaima778/flaskapi-app'
                }
            }
        }
    }
}
