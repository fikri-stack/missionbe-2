# Complete Authentication System with Course Management

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/your-collection-id)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748.svg)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1.svg)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000.svg)](https://jwt.io/)

REST API untuk sistem autentikasi lengkap dan manajemen kursus menggunakan Node.js, Express.js, TypeScript, dan Prisma ORM.

> **Note**: Semua testing dilakukan menggunakan Postman. Tidak ada automated testing files dalam project ini.

## 🚀 Features

- ✅ **Authentication System** - Complete register, login, email verification
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Security** - bcrypt hashing with salt
- ✅ **Email Service** - NodeMailer integration
- ✅ **Course Management** - Full CRUD operations
- ✅ **File Upload** - Image upload with validation
- ✅ **Input Validation** - express-validator middleware
- ✅ **Error Handling** - Comprehensive error responses with codes
- ✅ **TypeScript** - Full type safety
- ✅ **Database ORM** - Prisma with MySQL

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Email Service**: NodeMailer
- **File Upload**: Multer
- **Validation**: express-validator

## 🚀 Quick Start (Recommended - Using Docker)

### Prerequisites
- Docker Desktop atau Rancher Desktop
- Git

### Installation (3 Steps Only!)

1. **Clone repository**
```bash
git clone <repository-url>
cd missionbe10
```

2. **Copy environment file**
```bash
# Windows
copy .env.rancher .env

# Mac/Linux
cp .env.rancher .env
```

3. **Run with Docker**
```bash
# Start containers (MySQL + App)
docker-compose up -d

# Wait 30 seconds, then setup database
docker-compose exec app npx prisma db push

# Test API
curl http://localhost:3000/health
```

**Done!** API running at `http://localhost:3000` 🎉

> 📖 **Detailed Guide**: See [QUICK-START.md](QUICK-START.md) for complete instructions

---

## 🛠️ Manual Installation (Without Docker)

<details>
<summary>Click to expand manual installation steps</summary>

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Steps

1. Clone repository
```bash
git clone <repository-url>
cd missionbe10
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```
Edit `.env` file dengan konfigurasi Anda.

4. Setup database
```bash
# Create database first (MySQL)
# Then run the SQL files in init.sql/ folder

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

5. Run application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

</details>

## API Endpoints

### Base URL: `http://localhost:3000/api`

#### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/verify-email` | Email verification | No |

#### Course Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | Get all courses | Yes |

#### Data Routes (CRUD Operations)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/data` | Get all courses | Yes |
| GET | `/api/data/:id` | Get course by ID | Yes |
| POST | `/api/data` | Create new course | Yes |
| PUT | `/api/data/:id` | Update course | Yes |
| DELETE | `/api/data/:id` | Delete course | Yes |

#### Upload Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/upload` | Upload image file | Yes |

#### Health Check
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Server health check | No |

## Request/Response Examples

### POST /auth/register
**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phone": "08123456789",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email for verification.",
  "data": {
    "id": 1,
    "fullname": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "isVerified": false
  }
}
```

### POST /auth/login
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "fullname": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### GET /api/courses
**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "JavaScript Fundamentals",
      "description": "Learn JavaScript from basics",
      "price": 299000.00,
      "duration": 120,
      "categoryId": 1,
      "tutorId": 1
    }
  ]
}
```

### POST /api/data (Create Course)
**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "category_id": 1,
  "tutor_id": 1,
  "title": "JavaScript Advanced",
  "description": "Advanced JavaScript concepts",
  "price": 399000,
  "duration": 180
}
```

**Response:**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "module_id": 2,
    "title": "JavaScript Advanced",
    "description": "Advanced JavaScript concepts",
    "price": 399000,
    "duration": 180
  }
}
```

### POST /api/upload
**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `image`: Image file (jpg, jpeg, png, gif)
- Max file size: 5MB

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "filename": "uuid-filename.jpg",
    "path": "/uploads/uuid-filename.jpg",
    "size": 1024000
  }
}
```

## Project Structure

```
src/
├── config/
│   └── db.ts                    # Database configuration
├── controllers/
│   ├── authController.ts        # Authentication controllers
│   ├── courseController.ts      # Course controllers
│   ├── dataController.ts        # Data controllers
│   └── uploadController.ts      # Upload controllers
├── middlewares/
│   ├── authMiddleware.ts        # JWT authentication middleware
│   ├── errorHandler.ts          # Error handling middleware
│   ├── multerMiddleware.ts      # File upload middleware
│   └── validation.ts            # Input validation middleware
├── routes/
│   ├── authRoutes.ts           # Authentication routes
│   ├── courseRoutes.ts         # Course routes
│   ├── dataRoutes.ts           # Data routes
│   ├── uploadRoutes.ts         # Upload routes
│   └── index.ts                # Route aggregator
├── services/
│   ├── dataService.ts          # Data service layer
│   ├── emailService.ts         # Email service
│   └── userService.ts          # User service layer
├── utils/
│   ├── generateUuidToken.ts    # UUID token generator
│   ├── jwtUtils.ts             # JWT utilities
│   ├── passwordHash.ts         # Password hashing utilities
│   └── types.ts                # TypeScript type definitions
└── app.ts                      # Main application file
```

## Environment Variables

```env
# Database Configuration
DATABASE_URL="mysql://root:your_password@localhost:3306/edutech"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"

# Server Configuration
PORT=3000
NODE_ENV=development

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Upload Configuration
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880
```

## Database Schema

### User Model
- `id`: Auto-increment primary key
- `fullname`: User's full name
- `email`: Unique email address
- `phone`: Phone number (optional)
- `password`: Hashed password
- `role`: User role (admin/student)
- `isVerified`: Email verification status
- `verificationToken`: Email verification token
- `createdAt`: Creation timestamp

### Course Model
- `id`: Auto-increment primary key
- `categoryId`: Course category ID
- `tutorId`: Tutor ID
- `title`: Course title
- `description`: Course description
- `price`: Course price
- `duration`: Course duration in minutes
- `image`: Course image path
- `createdAt`: Creation timestamp

## Error Handling

API menggunakan error codes yang spesifik untuk memudahkan debugging:

### Authentication Errors (401)
- **4011**: No token provided
- **4012**: Invalid token format
- **4013**: Empty token
- **4014**: Token expired
- **4015**: Invalid token

### Client Errors (400)
- **4001**: Validation error
- **4002**: File too large
- **4003**: Invalid file type

### Not Found (404)
- **4040**: Route not found
- **4041**: Record not found

### Server Error (500)
- **5001**: Internal server error

## Testing with Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/your-collection-id)

### Quick Setup:
1. Click the "Run in Postman" button above to import the collection
2. Set environment variable `baseUrl` to `http://localhost:3000`
3. Start the server: `npm run dev`
4. Run the requests in order

### Manual Setup:
1. Import collection atau buat request manual
2. Set base URL: `http://localhost:3000`
3. For protected routes, add Authorization header: `Bearer <your-jwt-token>`
4. Test authentication flow: Register → Login → Access Protected Routes
5. Test CRUD operations: Create → Read → Update → Delete
6. Test file upload with image files

### Testing Flow:
1. **POST** `/api/auth/register` - Register new user
2. **POST** `/api/auth/login` - Login and get JWT token
3. **GET** `/api/courses` - Get all courses (with token)
4. **POST** `/api/data` - Create new course (with token)
5. **GET** `/api/data/:id` - Get specific course (with token)
6. **PUT** `/api/data/:id` - Update course (with token)
7. **DELETE** `/api/data/:id` - Delete course (with token)
8. **POST** `/api/upload` - Upload image file (with token)