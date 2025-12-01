# 🚀 Quick Start Guide - Untuk User yang Clone Project

## Keuntungan Pakai Docker:
✅ **Ga perlu install MySQL** - Semua jalan di container  
✅ **Ga perlu setup database** - Auto setup  
✅ **Ga perlu install dependencies** - Semua ada di image  
✅ **Konsisten di semua OS** - Windows, Mac, Linux sama aja  
✅ **1 command langsung jalan** - Super simple!  

---

## 📋 Prerequisites (Yang Harus Diinstall Dulu)

1. **Docker Desktop** atau **Rancher Desktop**
   - Download: https://www.docker.com/products/docker-desktop/
   - Atau Rancher: https://rancherdesktop.io/

2. **Git** (untuk clone)
   - Download: https://git-scm.com/

---

## 🎯 Cara Running Project (Super Simple!)

### Step 1: Clone Project
```bash
git clone <repository-url>
cd missionbe10
```

### Step 2: Copy Environment File
```bash
# Windows
copy .env.rancher .env

# Mac/Linux
cp .env.rancher .env
```

### Step 3: Edit Email Credentials (Optional)
Buka file `.env` dan ganti:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### Step 4: Run Docker
```bash
docker-compose up -d
```

### Step 5: Wait & Setup Database (30 detik)
```bash
# Tunggu MySQL ready, terus:
docker-compose exec app npx prisma db push
```

### Step 6: Test API
```bash
curl http://localhost:3000/health
```

**DONE!** API running di `http://localhost:3000` 🎉

---

## 🆚 Perbandingan: Dengan vs Tanpa Docker

### ❌ TANPA Docker (Ribet!)
```bash
# 1. Install Node.js
# 2. Install MySQL
# 3. Setup MySQL user & database
# 4. Import SQL files
# 5. Install dependencies
npm install

# 6. Setup .env
# 7. Generate Prisma
npx prisma generate

# 8. Run migrations
npx prisma db push

# 9. Run app
npm run dev
```
**Total: 9 langkah, banyak yang bisa error!**

---

### ✅ DENGAN Docker (Gampang!)
```bash
# 1. Copy .env
cp .env.rancher .env

# 2. Run Docker
docker-compose up -d

# 3. Setup database
docker-compose exec app npx prisma db push
```
**Total: 3 langkah, dijamin jalan!**

---

## 📝 Commands yang Sering Dipakai

### Start Project
```bash
docker-compose up -d
```

### Stop Project
```bash
docker-compose down
```

### Lihat Logs
```bash
docker-compose logs -f
```

### Restart
```bash
docker-compose restart
```

### Rebuild (kalau ada perubahan code)
```bash
docker-compose up -d --build
```

### Stop & Hapus Semua (termasuk data)
```bash
docker-compose down -v
```

---

## 🧪 Test Endpoints

### Health Check
```bash
curl http://localhost:3000/health
```

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Courses (butuh token)
```bash
curl http://localhost:3000/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🐛 Troubleshooting

### Port sudah dipakai?
```bash
# Stop containers yang lama
docker-compose down

# Atau ganti port di docker-compose.yml
ports:
  - "3001:3000"  # Ganti 3000 jadi 3001
```

### Container error?
```bash
# Lihat logs
docker-compose logs app
docker-compose logs mysql

# Restart
docker-compose restart
```

### Database error?
```bash
# Reset database
docker-compose down -v
docker-compose up -d
docker-compose exec app npx prisma db push
```

### Mau mulai dari awal?
```bash
# Hapus semua
docker-compose down -v
docker system prune -a

# Start lagi
docker-compose up -d
```

---

## 📂 File Structure

```
missionbe10/
├── Dockerfile.alpine          # Recipe untuk build app image
├── docker-compose.yml         # Orchestration (MySQL + App)
├── .env.rancher              # Environment variables template
├── .env                      # Your local environment (git ignored)
├── src/                      # Source code
├── prisma/                   # Database schema
└── init.sql/                 # Initial database setup
```

---

## 🎓 Untuk Developer

### Development Mode (dengan hot reload)
```bash
# Edit docker-compose.yml, uncomment volumes:
volumes:
  - ./src:/app/src

# Restart
docker-compose restart app
```

### Akses Database
```bash
# Via terminal
docker-compose exec mysql mysql -u edutech_user -p
# Password: SecureDbPass123!

# Atau pakai MySQL Workbench:
Host: localhost
Port: 3306
User: edutech_user
Password: SecureDbPass123!
Database: edutech
```

### Masuk ke Container
```bash
# App container
docker-compose exec app sh

# MySQL container
docker-compose exec mysql bash
```

---

## 🚀 Deploy ke Production

Lihat file `DEPLOY-RANCHER.md` untuk panduan deploy ke Rancher production.

---

## ❓ FAQ

**Q: Apakah data hilang saat restart?**  
A: Tidak! Data MySQL disimpan di volume yang persistent.

**Q: Bisa development tanpa Docker?**  
A: Bisa, tapi harus install MySQL manual. Pakai `run-local.bat`

**Q: Gimana cara update code?**  
A: Edit code → `docker-compose up -d --build`

**Q: Bisa pakai database external?**  
A: Bisa! Edit `DATABASE_URL` di `.env`

**Q: Gimana cara backup database?**  
A: `docker-compose exec mysql mysqldump -u root -p edutech > backup.sql`

---

**Selamat Coding!** 🎉
