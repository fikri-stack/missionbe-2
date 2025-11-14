# Complete Authentication System with Course Management

REST API untuk sistem autentikasi lengkap dan manajemen kursus menggunakan Node.js, Express.js, TypeScript, dan Prisma ORM.

## Features

- ✅ Complete Authentication System (Register, Login, Email Verification)
- ✅ JWT Token Authentication
- ✅ Password Hashing with bcrypt
- ✅ Email Verification System
- ✅ Course Management
- ✅ File Upload System
- ✅ Input Validation
- ✅ Error Handling
- ✅ Consistent JSON Response Format
- ✅ Environment Configuration
- ✅ TypeScript Support

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

## Installation

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
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

5. Run application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Base URL: `http://localhost:3000`

#### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | User registration | No |
| POST | `/auth/login` | User login | No |
| GET | `/auth/verify-email` | Email verification | No |

#### Course Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/courses` | Get all courses | Yes |

#### Upload Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload` | Upload file | Yes |

## Request/Response Examples

### POST /auth/register
**Request Body:**
```json
{
  "fullName": "John Doe",
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
    "fullName": "John Doe",
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
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### GET /courses
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
- `fullName`: User's full name
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

## Testing with Postman

1. Import collection atau buat request manual
2. Set base URL: `http://localhost:3000`
3. For protected routes, add Authorization header: `Bearer <your-jwt-token>`
4. Test authentication flow: Register → Verify Email → Login → Access Protected Routes