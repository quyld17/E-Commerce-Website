cd /home/ubuntu

docker-compose down

docker system prune -f

docker-compose pull

docker-compose up -d