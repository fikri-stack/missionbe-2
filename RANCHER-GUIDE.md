# 🐮 Rancher Desktop - Panduan Lengkap

## 📋 Menu Utama Rancher Desktop

### 1. **Containers** (Yang Lagi Lu Buka)
Lihat semua container yang running.

**Fitur:**
- ✅ **Start/Stop** - Klik container → tombol titik 3 → Start/Stop
- ✅ **Logs** - Klik container → tab "Logs" untuk lihat output real-time
- ✅ **Shell** - Klik container → tab "Terminal" untuk masuk ke dalam container
- ✅ **Inspect** - Lihat detail config container (env vars, volumes, networks)
- ✅ **Delete** - Hapus container

**Coba Sekarang:**
```bash
# Klik container "missionbe10-app-1"
# → Tab "Logs" untuk lihat output server
# → Tab "Terminal" untuk masuk ke container
```

---

### 2. **Volumes**
Tempat penyimpanan data persistent (data ga hilang saat restart).

**Yang Ada di Project Lu:**
- `missionbe10_mysql_data` - Data MySQL (users, courses, dll)
- `missionbe10_app_uploads` - File upload gambar

**Coba:**
- Klik "Volumes" di sidebar
- Lihat size dan kapan terakhir dipakai
- Bisa backup/export volume

---

### 3. **Images**
Semua Docker images yang udah di-download/build.

**Yang Ada:**
- `mysql:8.0` - MySQL database image
- `missionbe10-app` - App lu yang udah di-build
- `node:18-alpine` - Base image untuk build

**Fitur:**
- ✅ **Pull Image** - Download image baru dari Docker Hub
- ✅ **Build Image** - Build dari Dockerfile
- ✅ **Delete** - Hapus image yang ga kepake
- ✅ **Scan** - Security scan untuk vulnerabilities

**Coba:**
```bash
# Klik "Images"
# Klik "missionbe10-app" → lihat size dan layers
# Klik "Scan" untuk security check
```

---

### 4. **Port Forwarding**
Mapping port dari container ke localhost.

**Yang Aktif:**
- `3306:3306` - MySQL
- `3000:3000` - API App

**Gunanya:**
- Akses service dari browser/Postman
- Bisa ganti port kalau bentrok

---

### 5. **Troubleshooting**
Tools untuk debug masalah.

**Fitur:**
- Reset Kubernetes
- Factory Reset
- Collect Logs
- Check Resources

---

### 6. **Diagnostics**
Lihat resource usage dan health check.

**Yang Bisa Diliat:**
- CPU usage
- Memory usage
- Disk usage
- Network traffic

---

## 🔧 Environment Variables Management

### Cara 1: Via File `.env.rancher`
```env
MYSQL_ROOT_PASSWORD=SecureRootPass123!
MYSQL_DATABASE=edutech
JWT_SECRET=your-secret-key
EMAIL_HOST=smtp.gmail.com
```

**Edit Environment:**
```bash
# 1. Edit file .env.rancher
# 2. Restart containers
docker-compose down
docker-compose --env-file .env.rancher up -d
```

---

### Cara 2: Via docker-compose.yml
```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://user:pass@mysql:3306/edutech
      - JWT_SECRET=${JWT_SECRET}
```

---

### Cara 3: Via Rancher UI (Inspect Container)
1. Klik container → titik 3 → "Inspect"
2. Scroll ke "Env" section
3. Lihat semua environment variables yang aktif

---

## 🎯 Hands-On Exercises

### Exercise 1: Lihat Logs Real-Time
```bash
# Di Rancher: Klik "missionbe10-app-1" → Tab "Logs"
# Atau via terminal:
docker-compose logs -f app
```

### Exercise 2: Masuk ke Container
```bash
# Di Rancher: Klik container → Tab "Terminal"
# Atau via terminal:
docker-compose exec app sh

# Di dalam container, coba:
ls -la
cat .env
npx prisma db pull
exit
```

### Exercise 3: Cek Database
```bash
# Masuk ke MySQL container
docker-compose exec mysql mysql -u edutech_user -p

# Password: SecureDbPass123!
# Di MySQL:
SHOW DATABASES;
USE edutech;
SHOW TABLES;
SELECT * FROM User;
exit;
```

### Exercise 4: Monitor Resource Usage
```bash
# Via terminal:
docker stats

# Atau di Rancher: Tab "Diagnostics"
```

### Exercise 5: Backup Volume
```bash
# Backup MySQL data
docker run --rm -v missionbe10_mysql_data:/data -v ${PWD}:/backup alpine tar czf /backup/mysql-backup.tar.gz /data

# Restore
docker run --rm -v missionbe10_mysql_data:/data -v ${PWD}:/backup alpine tar xzf /backup/mysql-backup.tar.gz -C /
```

---

## 🔄 Multi-Environment Setup

### Development Environment
```bash
# File: .env.dev
NODE_ENV=development
DATABASE_URL=mysql://root:dev@localhost:3306/edutech_dev
JWT_SECRET=dev-secret
```

### Staging Environment
```bash
# File: .env.staging
NODE_ENV=staging
DATABASE_URL=mysql://user:pass@staging-db:3306/edutech_staging
JWT_SECRET=staging-secret
```

### Production Environment
```bash
# File: .env.prod
NODE_ENV=production
DATABASE_URL=mysql://user:pass@prod-db:3306/edutech_prod
JWT_SECRET=super-secure-prod-secret
```

**Switch Environment:**
```bash
# Development
docker-compose --env-file .env.dev up -d

# Staging
docker-compose --env-file .env.staging up -d

# Production
docker-compose --env-file .env.prod up -d
```

---

## 🛠️ Advanced Features

### 1. Scale Containers
```bash
# Jalankan 3 instance app (load balancing)
docker-compose up -d --scale app=3
```

### 2. Health Checks
```yaml
# Di docker-compose.yml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### 3. Resource Limits
```yaml
# Di docker-compose.yml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### 4. Networks
```bash
# Lihat networks
docker network ls

# Inspect network
docker network inspect missionbe10_edutech_network
```

---

## 📊 Monitoring & Debugging

### Check Container Health
```bash
docker-compose ps
docker inspect missionbe10-app-1 | grep -A 10 Health
```

### View All Environment Variables
```bash
docker-compose exec app env
```

### Check Disk Usage
```bash
docker system df
```

### Clean Up Unused Resources
```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything
docker system prune -a
```

---

## 🎓 Tips & Best Practices

1. **Selalu pakai `.env` file** - Jangan hardcode credentials
2. **Backup volumes regularly** - Data penting jangan sampe hilang
3. **Monitor resource usage** - Cegah container makan RAM/CPU terlalu banyak
4. **Use health checks** - Auto restart kalau container error
5. **Tag images properly** - Biar gampang rollback kalau ada bug
6. **Keep logs clean** - Rotate logs biar ga penuh disk

---

## 🚀 Next Steps

1. **Explore Kubernetes** - Rancher Desktop support K8s
2. **Setup CI/CD** - Auto deploy dari GitHub
3. **Add Monitoring** - Prometheus + Grafana
4. **Load Balancing** - Nginx reverse proxy
5. **SSL/TLS** - HTTPS dengan Let's Encrypt

---

**Happy Exploring!** 🐮🚀
