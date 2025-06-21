pipeline{
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages{
        stage('Checkout'){
            steps{
                git branch:"master", url:"https://github.com/kipyegonrotich/gallery.git"
            }
        }
        stage("Install Dependencies"){
            steps {
                sh 'npm install'
            }
        }
        stage("Test"){
            steps{
                script {
                    try {
                        sh 'npm test'
                    } catch (err) {
                        mail to: 'kipyegonrotich@gmail.com',
                        subject: "TEST FAILURE"
                        body: "Tests failed"
                       error "Tests failed" 
                    }
                }
            }
        }
        stage("Deploy to Render"){
            steps {
                echo "Deploying to Render"
            }
        }
    }
}
