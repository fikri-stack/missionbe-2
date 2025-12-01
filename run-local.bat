@echo off
echo ========================================
echo   Running App WITHOUT Docker
echo   (MySQL must be running on localhost)
echo ========================================
echo.

echo Installing dependencies...
npm install

echo Generating Prisma client...
npx prisma generate

echo Starting development server...
npm run dev

pause