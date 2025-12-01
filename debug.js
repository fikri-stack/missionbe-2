// Debug script untuk test setup
console.log('🔍 Debugging setup...');

// Test 1: Node.js version
console.log('Node.js version:', process.version);

// Test 2: Environment variables
require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'OK' : 'MISSING');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'OK' : 'MISSING');

// Test 3: Dependencies
try {
  require('express');
  console.log('Express: OK');
} catch (e) {
  console.log('Express: MISSING');
}

try {
  require('@prisma/client');
  console.log('Prisma Client: OK');
} catch (e) {
  console.log('Prisma Client: MISSING - Run: npx prisma generate');
}

try {
  require('ts-node');
  console.log('ts-node: OK');
} catch (e) {
  console.log('ts-node: MISSING');
}

console.log('✅ Debug complete');