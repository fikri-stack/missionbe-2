# Deploy ke Rancher - Step by Step

## 1. Persiapan File
✅ Dockerfile.alpine - sudah siap untuk production
✅ docker-compose.yml - sudah ada Rancher labels
✅ .env.rancher - environment variables

## 2. Test Local (sudah berhasil)
```bash
# Build image
docker build -f Dockerfile.alpine -t edutech-api .

# Run dengan compose
docker-compose --env-file .env.rancher up -d

# Cek status
docker-compose ps
```

## 3. Deploy ke Rancher

### Via Rancher UI:
1. Login ke Rancher dashboard
2. Pilih cluster/project kamu
3. Go to **Workloads** → **Deploy**
4. Pilih **Docker Compose**
5. Upload file `docker-compose.yml`
6. Set environment variables dari `.env.rancher`:
   ```
   MYSQL_ROOT_PASSWORD=SecureRootPass123!
   MYSQL_DATABASE=edutech
   MYSQL_USER=edutech_user
   MYSQL_PASSWORD=SecureDbPass123!
   JWT_SECRET=your-super-secure-jwt-secret-key-production-2024
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   ```
7. Click **Deploy**

### Via Rancher CLI:
```bash
rancher login https://your-rancher-url --token your-token
rancher up -d -f docker-compose.yml --env-file .env.rancher
```

## 4. Monitoring di Rancher
- Container health status
- Real-time logs
- Resource usage
- Scaling options

## 5. Test API
```bash
# Health check
curl http://your-rancher-host:3000/health

# Test registration
curl -X POST http://your-rancher-host:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":"Test User","email":"test@example.com","password":"password123","role":"student"}'
```

## File yang Dibutuhkan untuk Rancher:
- ✅ Dockerfile.alpine
- ✅ docker-compose.yml  
- ✅ .env.rancher
- ✅ prisma/schema.prisma
- ✅ init.sql/ (database setup)
- ✅ src/ (source code)

Semua sudah siap untuk deploy ke Rancher! 🚀