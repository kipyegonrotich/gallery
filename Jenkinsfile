pipeline {
    agent any

    environment {
        MONGODB_URI = credentials('MONGODB_URI') 
        RENDER_URL = "https://gallery-ut78.onrender.com/"
        SLACK_WEBHOOK = credentials('slackWebhook') 
    }

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage("Clone Branch master") {
            steps {
                git branch: "master", url: "https://github.com/kipyegonrotich/gallery.git"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage("Perform Test..."){
            steps{
                script{
                    echo "Perfoming npm test..."
                    sh "npm test"
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "Deploying to Render..."
                script {
                    withCredentials([string(credentialsId: 'renderDeployHook', variable: 'RENDER_HOOK_URL')]) {
                echo "Triggering deployment via Render webhook..."
                sh 'curl -X POST "$RENDER_HOOK_URL"'
                }
                } 
            }
        }
    }

    post {
        success {
            script {
                def msg = """*BUILD SUCCESSFUL!*
*Build ID:* #${env.BUILD_ID}
*Site:* ${env.RENDER_URL}"""

                // Slack notification
            withCredentials([string(credentialsId: 'slackWebhook', variable: 'SLACK_WEBHOOK')]) {
            sh """
                curl -X POST -H "Content-type: application/json" \\
                --data '{\"text\": \"${msg.replaceAll('"', '\\\\"')}\"}' \\
                "${SLACK_WEBHOOK}"
            """
                }
                
            }
        }

        failure {
            script {
                def msg = """*BUILD FAILED!*
*Build ID:* #${env.BUILD_ID}"""

                
                // Email notification 
                try {
                    mail to: 'kipyegonrotich@gmail.com',
                         subject: "BUILD FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                         body: "Build failed!\nURL: ${env.BUILD_URL}"
                } catch (mailErr) {
                    echo "Failed to send failure email: ${mailErr.message}"
                }
            }
        }
    }
}
