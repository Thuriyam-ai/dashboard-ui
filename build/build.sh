#!/bin/bash
set -euo pipefail

# Get build number from parameter or use timestamp
BUILD_NUMBER=${1:-$(date +%Y%m%d-%H%M%S)}
IMAGE_TAG="build-${BUILD_NUMBER}"

echo "Building image with tag: ${IMAGE_TAG}"

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 472738512112.dkr.ecr.us-east-1.amazonaws.com

docker build -t dashboard-ui:${IMAGE_TAG} -f ./Dockerfile ..
docker tag dashboard-ui:${IMAGE_TAG} 472738512112.dkr.ecr.us-east-1.amazonaws.com/thuriyam/dashboard-ui:${IMAGE_TAG}
docker push 472738512112.dkr.ecr.us-east-1.amazonaws.com/thuriyam/dashboard-ui:${IMAGE_TAG}

# Also tag as latest for easy reference
docker tag dashboard-ui:${IMAGE_TAG} 472738512112.dkr.ecr.us-east-1.amazonaws.com/thuriyam/dashboard-ui:latest
docker push 472738512112.dkr.ecr.us-east-1.amazonaws.com/thuriyam/dashboard-ui:latest

echo "Image pushed with tags: ${IMAGE_TAG} and latest"