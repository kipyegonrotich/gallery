pipeline {
    agent any

    environment {
        RENDER_URL = "https://gallery-ut78.onrender.com/"
        SLACK_WEBHOOK = credentials('slackWebhook') // secure secret from Jenkins credentials
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
                // Your deployment step can go here (manual or GitHub integration)
            }
        }
    }

    post {
        success {
            script {
                def msg = """🎉 *BUILD SUCCESSFUL!*
*Build ID:* #${env.BUILD_ID}
*Site:* ${env.RENDER_URL}"""

                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{"text": "${msg}"}' \
                ${env.SLACK_WEBHOOK}
                """
            }
        }

        failure {
            script {
                def msg = """❌ *BUILD FAILED!*
*Build ID:* #${env.BUILD_ID}"""

                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{"text": "${msg}"}' \
                ${env.SLACK_WEBHOOK}
                """
            }
        }
    }
}
