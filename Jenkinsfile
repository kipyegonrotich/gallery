pipeline {
    agent any

    tools {
        nodejs 'nodejs'
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
                script {
                    echo "Performing npm test..."
                    sh 'npm test'
                }
            }
            post {
                failure {
                    emailext(
                        subject: "Test Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                        body: "Tests failed in build ${env.BUILD_NUMBER}. Check console at ${env.BUILD_URL}",
                        to: "kipyegonrotich@gmail.com"
                    )
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Deployment successful'
                echo 'App URL: https://gallery-ut78.onrender.com'
            }
            post {
                success {
                    slackSend(
                        channel: '#nicholas_ip1',
                        color: 'good',
                        message: "*Build #${env.BUILD_NUMBER}* deployed to Render: https://gallery-ut78.onrender.com",
                        teamDomain: 'nix-zca8056',
                        tokenCredentialId: 'slack-token',
                        botUser: true
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
