@echo off
echo Setting up database...

echo Waiting for MySQL to be ready...
timeout /t 10

echo Running Prisma migrations...
docker-compose exec app npx prisma db push

echo Database setup complete!
pause
