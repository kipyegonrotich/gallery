pipeline {
    agent any

    environment {
        RENDER_URL = "https://gallery-ut78.onrender.com/"
        SLACK_WEBHOOK = credentials('slackWebhook') // Stored in Jenkins credentials as Secret Text
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
                        sh 'npm test'
                    } catch (err) {
                        // Optional: Enable this if your mail server is configured
                        // mail to: 'kipyegonrotich@gmail.com',
                        //      subject: "TEST FAILURE",
                        //      body: "Tests failed"

                        error "Tests failed"
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "Deploying to Render..."
                // Add deployment command if manual
            }
        }
    }

    post {
        success {
            script {
                def msg = """ *BUILD SUCCESSFUL!*
*Build ID:* #${env.BUILD_ID}
*Site:* ${env.RENDER_URL}"""

                sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{"text": "${msg.replaceAll('"', '\\"')}"}' \\
                "${SLACK_WEBHOOK}"
                """
            }
        }

        failure {
            script {
                def msg = """❌ *BUILD FAILED!*
*Build ID:* #${env.BUILD_ID}"""

                sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{"text": "${msg.replaceAll('"', '\\"')}"}' \\
                "${SLACK_WEBHOOK}"
                """
            }
        }
    }
}
