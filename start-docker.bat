@echo off
echo Starting Docker with Rancher...

echo Building and starting containers...
docker-compose --env-file .env.rancher up -d

echo Waiting for MySQL to be ready...
timeout /t 30

echo Setting up database...
docker-compose exec app npx prisma db push

echo Done! API running at http://localhost:3000
echo.
echo Commands:
echo - View logs: docker-compose logs -f
echo - Stop: docker-compose down
pause
