echo 'stopping docker-compose...'
docker-compose down
echo 'docker-compose stopped'

echo 'prunning images...'
docker image prune -a -f

echo 'prunning volumes...'
docker volume prune -f
