pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'soumya118'
        IMAGE_CLIENT = "${DOCKER_HUB_USER}/resume-builder-client"
        IMAGE_SERVER = "${DOCKER_HUB_USER}/resume-builder-server"
        K8S_PATH = "./K8s"
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set commit tag') {
            steps {
                script {
                    COMMIT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.IMAGE_CLIENT_TAG = "${IMAGE_CLIENT}:${COMMIT}"
                    env.IMAGE_SERVER_TAG = "${IMAGE_SERVER}:${COMMIT}"
                    echo "🧾 Using tags: ${env.IMAGE_CLIENT_TAG} , ${env.IMAGE_SERVER_TAG}"
                }
            }
        }

        stage('Build Docker Images (fast cache)') {
            steps {
                script {
                    echo "🐳 Building Docker images using BuildKit caching..."
                    sh '''
                        export DOCKER_BUILDKIT=1
                        docker pull ${IMAGE_CLIENT}:latest || true
                        docker pull ${IMAGE_SERVER}:latest || true

                        docker build --cache-from=${IMAGE_CLIENT}:latest -t ${IMAGE_CLIENT_TAG} ./clients
                        docker build --cache-from=${IMAGE_SERVER}:latest -t ${IMAGE_SERVER_TAG} ./server

                        docker tag ${IMAGE_CLIENT_TAG} ${IMAGE_CLIENT}:latest
                        docker tag ${IMAGE_SERVER_TAG} ${IMAGE_SERVER}:latest
                    '''
                }
            }
        }

        stage('Push Images') {
            parallel {
                stage('Push Client Image') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                            sh '''
                                echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                                echo "🔍 Checking if ${IMAGE_CLIENT_TAG} exists..."
                                if ! docker manifest inspect ${IMAGE_CLIENT_TAG} > /dev/null 2>&1; then
                                  echo "📤 Pushing ${IMAGE_CLIENT_TAG}"
                                  docker push ${IMAGE_CLIENT_TAG}
                                else
                                  echo "✅ ${IMAGE_CLIENT_TAG} already exists, skipping push."
                                fi
                                docker push ${IMAGE_CLIENT}:latest || true
                            '''
                        }
                    }
                }
                stage('Push Server Image') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                            sh '''
                                echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                                echo "🔍 Checking if ${IMAGE_SERVER_TAG} exists..."
                                if ! docker manifest inspect ${IMAGE_SERVER_TAG} > /dev/null 2>&1; then
                                  echo "📤 Pushing ${IMAGE_SERVER_TAG}"
                                  docker push ${IMAGE_SERVER_TAG}
                                else
                                  echo "✅ ${IMAGE_SERVER_TAG} already exists, skipping push."
                                fi
                                docker push ${IMAGE_SERVER}:latest || true
                            '''
                        }
                    }
                }
            }
        }


        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh '''
                        mkdir -p k8s_tmp
                        cp -r ${K8S_PATH}/* k8s_tmp/
                        sed -i "s#IMAGE_CLIENT_PLACEHOLDER#${IMAGE_CLIENT_TAG}#g" k8s_tmp/*.yaml || true
                        sed -i "s#IMAGE_SERVER_PLACEHOLDER#${IMAGE_SERVER_TAG}#g" k8s_tmp/*.yaml || true
                        kubectl apply -f k8s_tmp/
                    '''
                }
            }
        }

        stage('Wait for rollout') {
            steps {
                script {
                    sh 'kubectl rollout status deployment/client-deployment --timeout=120s'
                    sh 'kubectl rollout status deployment/server-deployment --timeout=120s'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! Deployed images: ${env.IMAGE_CLIENT_TAG}, ${env.IMAGE_SERVER_TAG}"
        }
        failure {
            echo "❌ Deployment failed — attempting rollback."
            script {
                sh 'kubectl rollout undo deployment/client-deployment || true'
                sh 'kubectl rollout undo deployment/server-deployment || true'
            }
        }
    }
}