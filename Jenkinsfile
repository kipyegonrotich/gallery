pipeline {
    agent any

    environment {
        MONGODB_URI = credentials('MONGODB_URI') 
        RENDER_URL = "https://gallery-ut78.onrender.com/"
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

        stage("Perform Test...") {
            steps {
                script {
                    echo "Performing npm test..."
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
                slackSend(
                    channel: '#nicholas_ip1',
                    color: 'good',
                    message: """*BUILD SUCCESSFUL!*
*Build ID:* #${env.BUILD_ID}
*Site:* ${env.RENDER_URL}""",
                    tokenCredentialId: 'slack-token', 
                    teamDomain: 'nix-zca8056',
                    botUser: true
                )
            }
        }

        failure {
            script {
                
                // Email fallback
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
