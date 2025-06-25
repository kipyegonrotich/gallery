pipeline {
    agent any

    
    tools {
        nodejs 'nodejs'
    }

    stages {
        stage("Clone Branch master"){
            steps{
                git branch:"master", url:"https://github.com/kipyegonrotich/gallery.git"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage (Test){
            steps {
                echo "Testing"
                sh 'npm test'
            }
        }
    }
    stage("Deploying to Render"){
            steps{
                script{
                    sh "curl -X POST ${renderhook}"
                    echo "Deployed to render"
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
                sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{"text": "${msg.replaceAll('"', '\\"')}"}' \\
                "${SLACK_WEBHOOK}"
                """

                // Email notification 
                try {
                    mail to: 'kipyegonrotich@gmail.com',
                         subject: "BUILD SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                         body: "Build succeeded!\nURL: ${env.BUILD_URL}\n\nSite: ${env.RENDER_URL}"
                } catch (mailErr) {
                    echo "Failed to send success email: ${mailErr.message}"
                }
            }
        }

        failure {
            script {
                def msg = """*BUILD FAILED!*
*Build ID:* #${env.BUILD_ID}"""

                // Slack notification
                sh """
                curl -X POST -H 'Content-type: application/json' \\
                --data '{"text": "${msg.replaceAll('"', '\\"')}"}' \\
                "${SLACK_WEBHOOK}"
                """

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
