pipeline {
    agent any

    environment {
        RENDER_URL = "https://gallery-ut78.onrender.com/"
        SLACK_WEBHOOK = credentials('slackWebhook') // Stored in Jenkins credentials as a Secret Text

    }

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "master", url: "https://github.com/kipyegonrotich/gallery.git"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (err) {
                        mail to: 'kipyegonrotich@gmail.com',
                             subject: "TEST FAILURE",
                             body: "Tests failed"
                        error "Tests failed"
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "Deploying to Render"
                
            }
        }
    }

    post {
        success {
            script {
                def msg = "BUILD SUCCESSFUL!\\nBuild ID: #${env.BUILD_ID}\\nSite: ${env.RENDER_URL}"

                echo "Sending Slack message..."
                echo msg

                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{\"text\": \"${msg}\"}' \
                ${env.SLACK_WEBHOOK}
                """
            }
        }

        failure {
            script {
                def msg = "❌ BUILD FAILED!\\nBuild ID: #${env.BUILD_ID}"

                echo "Sending Slack failure message..."
                echo msg

                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{\"text\": \"${msg}\"}' \
                ${env.SLACK_WEBHOOK}
                """
            }
        }
    }
}
