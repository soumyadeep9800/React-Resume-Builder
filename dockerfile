FROM jenkins/jenkins:lts

USER root

# Install dependencies and Docker CLI
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg lsb-release && \
    apt-get install -y docker.io && \
    rm -rf /var/lib/apt/lists/*

# Install kubectl
RUN curl -fsSLo /usr/local/bin/kubectl https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl && \
    chmod +x /usr/local/bin/kubectl

USER jenkins