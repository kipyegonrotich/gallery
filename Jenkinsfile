pipeline {
    agent any

    environment {
        MONGODB_URI = credentials('MONGODB_URI')  // Injected securely
        RENDER_URL = "https://gallery-ut78.onrender.com/"
        SLACK_WEBHOOK = credentials('slackWebhook') // Slack Webhook securely injected
    }

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                        withEnv(["MONGODB_URI=${env.MONGODB_URI}"]) {
                            sh 'npm test'
                        }
                    } catch (err) {
                        // Send failure email safely
                        try {
                            mail to: 'kipyegonrotich@gmail.com',
                                 subject: "❌ TEST FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                                 body: "Tests failed in Jenkins job '${env.JOB_NAME}' (Build #${env.BUILD_NUMBER}).\nCheck details: ${env.BUILD_URL}"
                        } catch (mailErr) {
                            echo "📧 Failed to send test failure email: ${mailErr.message}"
                        }
                        error "Tests failed"
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "Deploying to Render..."
                // Optional: Add deployment logic here
            }
        }
    }

    post {
        success {
            script {
                def msg = """✅ *BUILD SUCCESSFUL!*
*Build ID:* #${env.BUILD_ID}
*Site:* ${env.RENDER_URL}"""

                // Slack notification
                sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{"text": "${msg.replaceAll('"', '\\"')}"}' \\
                "${SLACK_WEBHOOK}"
                """

                // Email notification safely
                try {
                    mail to: 'kipyegonrotich@gmail.com',
                         subject: "✅ BUILD SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                         body: "Build succeeded!\nURL: ${env.BUILD_URL}\n\nSite: ${env.RENDER_URL}"
                } catch (mailErr) {
                    echo "📧 Failed to send success email: ${mailErr.message}"
                }
            }
        }

        failure {
            script {
                def msg = """❌ *BUILD FAILED!*
*Build ID:* #${env.BUILD_ID}"""

                // Slack notification
                sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{"text": "${msg.replaceAll('"', '\\"')}"}' \\
                "${SLACK_WEBHOOK}"
                """

                // Email notification safely
                try {
                    mail to: 'kipyegonrotich@gmail.com',
                         subject: "❌ BUILD FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                         body: "Build failed!\nURL: ${env.BUILD_URL}"
                } catch (mailErr) {
                    echo "📧 Failed to send failure email: ${mailErr.message}"
                }
            }
        }
    }
}
