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
                echo "Hakuna majaribio wakati huu"
            }
        }
        stage("Deploy to Render"){
            steps {
                echo "Deploying to Render"
            }
        }
    }
}
