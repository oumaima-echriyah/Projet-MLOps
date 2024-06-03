pipeline {
    agent any 
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/oumaima-echriyah/Projet-MLOps']])
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
                    bat 'docker build -t oumaima778/fastapi-app Fast-API'
                }
            }
        }
        stage('Build Docker image for Flask API') {
            steps {
                script {
                    bat 'docker build -t oumaima778/flaskapi-app flask'
                }
            }
        }
        stage('Build Docker image for Angular') {
            steps {
                script {
                    bat 'docker build -t oumaima778/frontend-app frontend'
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
        stage('Push Angular image to Hub') {
            steps {
                script {
                    bat 'docker push oumaima778/frontend-app'
                }
            }
        }
        stage('Deploy Flask API to Kubernetes') {
            steps {
                script {
                    kubernetesDeploy(configs: 'flask/deployment-flaskapi.yaml', kubeconfigId: 'k8sconfig')
                }
            }
        }
        stage('Deploy Fast API to Kubernetes') {
            steps {
                script {
                    kubernetesDeploy(configs: 'Fast-API/deployment-fastapi.yaml', kubeconfigId: 'k8sconfig')
                }
            }
        }
        stage('Deploy Angular to Kubernetes') {
            steps {
                script {
                    kubernetesDeploy(configs: 'frontend/deployment-frontend.yaml', kubeconfigId: 'k8sconfig')
                }
            }
        }
    }
}
