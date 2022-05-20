pipeline {
  agent any
  stages{
    stage("Build image") {
       steps {
          sh '''
              docker rm -f $(docker ps -aq)
              API_CONTAINER_ID=$(docker run -d --name backend     -e DATABASE_HOST_IP=$BD_IP  -p 9090:8080 sebmoreno/gildedrose-backend)
              API_IP=$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $API_CONTAINER_ID)
              docker run -d --name frontend    -e API_HOST_URL=$API_IP -e API_HOST_PORT=8080 -p 80:80     sebmoreno/gildedrose-frontend
          '''
       }
    }
  }
}
