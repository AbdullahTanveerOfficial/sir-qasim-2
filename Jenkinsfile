pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Pulling latest code from GitHub...'
                checkout scm
            }
        }

        stage('Stop Old Containers') {
            steps {
                echo 'Stopping any running containers from previous build...'
                sh '''
                    docker-compose -f $COMPOSE_FILE down --remove-orphans || true
                '''
            }
        }

        stage('Build & Start Containers') {
            steps {
                echo 'Starting containers with docker-compose...'
                sh '''
                    docker-compose -f $COMPOSE_FILE up -d --build
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying all containers are running...'
                sh '''
                    docker-compose -f $COMPOSE_FILE ps
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline SUCCESS! App is now running.'
        }

        failure {
            echo 'Pipeline FAILED. Check logs above.'
            sh '''
                docker-compose -f $COMPOSE_FILE logs --tail=50 || true
            '''
        }
    }
}
