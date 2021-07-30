cp Dockerfile.example Dockerfile
docker build -t minecraft-info-bot .
docker run -d -it --name=minecraft-info-bot --mount type=bind,source="$(pwd)"/data,target=/app/data --restart unless-stopped minecraft-info-bot