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
            echo 'Pipeline completed successfully!'
            slackSend(
                channel: '#nicholas_ip1',
                color: 'good',
                message: "Deployment Successful! Build #${env.BUILD_NUMBER} deployed to Render: https://gallery-ut78.onrender.com/",
                teamDomain: 'nix-zca8056',
                tokenCredentialId: 'slack-token',
                botUser: true
            )
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
