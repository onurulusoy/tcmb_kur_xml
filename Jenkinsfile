node {
   stage('Checkout') { // for display purposes
      checkout scm
   }
   stage('Build') {
         sh 'npm install'
         sh 'npm install -g jasmine-node'
   }
   stage('Test') {
         sh 'jasmine-node spec/api/ --junitreport'
   }
   stage('Results') {
      junit 'reports/*.xml'
   }
}