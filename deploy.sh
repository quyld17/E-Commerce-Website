docker-compose -f /home/ubuntu/docker-compose.yml down

docker system prune -f

docker-compose -f /home/ubuntu/docker-compose.yml pull

docker-compose -f /home/ubuntu/docker-compose.yml up -d