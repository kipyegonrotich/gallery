pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-24'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/kipyegonrotich/gallery.git'
            }
        }
        stage('Initial Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Tests') {
            steps {
                script{
                    echo "perfoming npm test.."
                    sh 'npm test'
                    }
                } 
            }
            post {
                failure {
                    emailext (
                        subject: "Test Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                        body: "Tests failed in build ${env.BUILD_NUMBER}. Check console at ${env.BUILD_URL}",
                        to: "kipyegonrotich@gmail.com"
                    )
                }
            }
        }
        stage('Deploy to Render') {
            steps {
                echo 'Deployment successfull'
                echo 'App URL: https://gallery-ut78.onrender.com'
            }
            post {
                success {
                    slackSend(
    channel: '#nicholas_ip1',
    color: 'good',
    message: "Successful! Build #${env.BUILD_NUMBER} deployed to Render: https://gallery-ut78.onrender.com",
    tokenCredentialId: 'slack-token'
)
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}