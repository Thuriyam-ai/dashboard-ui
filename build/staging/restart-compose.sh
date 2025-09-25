#!/bin/bash
set -euo pipefail

# Config
INSTANCE_ID="i-0b9f7648623395126"
REGION="us-east-1"
COMPOSE_FILE="/home/ubuntu/deployment/dashboard-ui/docker-compose.yml"

# Send the docker compose restart command directly to EC2 via SSM
echo "[INFO] Restarting Dashboard UI service"

aws ssm send-command \
  --region "$REGION" \
  --instance-ids "$INSTANCE_ID" \
  --document-name "AWS-RunShellScript" \
  --comment "Restart docker-compose via Jenkins" \
  --parameters "commands=aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 472738512112.dkr.ecr.us-east-1.amazonaws.com && docker compose -f $COMPOSE_FILE up -d --force-recreate --remove-orphans"
