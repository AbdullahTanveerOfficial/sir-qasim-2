pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Fetching code from GitHub...'
                checkout scm
            }
        }

        stage('Stop Existing Containers') {
            steps {
                echo 'Stopping any previously running containers...'
                sh 'docker-compose down || true'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application with Docker Compose...'
                sh 'docker-compose build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Starting containerized application...'
                sh 'docker-compose up -d'
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying containers are running...'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the logs above.'
            sh 'docker-compose logs || true'
        }
    }
}
