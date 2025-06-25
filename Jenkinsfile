pipeline {
    agent any

    environment {
        renderhook = credentials('RENDER_DEPLOY_HOOK')     
        SLACK_WEBHOOK = credentials('SLACK_WEBHOOK_URL')   
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

        stage("Install Dependencies") {
            steps {
                sh 'npm install'
            }
        }

        stage("Test") {
            steps {
                echo "Running tests"
                sh 'npm test'
            }
        }

        stage("Deploy to Render") {
            steps {
                script {
                    sh "curl -X POST ${renderhook}"
                    echo "Deployed to Render"
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

                // Slack Notification
                sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{"text": "${msg.replaceAll('"', '\\"')}"}' \\
                "${SLACK_WEBHOOK}"
                """

                // Email Notification
                mail to: 'kipyegonrotich@gmail.com',
                     subject: "BUILD SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: "The build succeeded!\nURL: ${env.BUILD_URL}\nSite: ${env.RENDER_URL}"
            }
        }

        failure {
            script {
                def msg = """*BUILD FAILED!*
*Build ID:* #${env.BUILD_ID}"""

                // Slack Notification
                sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{"text": "${msg.replaceAll('"', '\\"')}"}' \\
                "${SLACK_WEBHOOK}"
                """

                // Email Notification
                mail to: 'kipyegonrotich@gmail.com',
                     subject: "BUILD FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                     body: "The build failed.\nURL: ${env.BUILD_URL}"
            }
        }
    }
}
