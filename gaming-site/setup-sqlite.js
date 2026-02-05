#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎮 Gaming Pro Store - SQLite Setup');
console.log('==================================\n');

// Copy SQLite schema to main schema file
const sqliteSchemaPath = path.join(__dirname, 'prisma', 'schema-sqlite.prisma');
const mainSchemaPath = path.join(__dirname, 'prisma', 'schema.prisma');

if (fs.existsSync(sqliteSchemaPath)) {
  const sqliteSchema = fs.readFileSync(sqliteSchemaPath, 'utf8');
  fs.writeFileSync(mainSchemaPath, sqliteSchema);
  console.log('✅ Updated schema.prisma to use SQLite');
} else {
  console.log('❌ SQLite schema file not found');
  process.exit(1);
}

// Update .env for SQLite
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  envContent = envContent.replace(
    /DATABASE_URL="postgresql:\/\/.*"/,
    'DATABASE_URL="file:./prisma/dev.db"'
  );
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Updated .env to use SQLite');
}

console.log('\n🚀 Next steps:');
console.log('1. npx prisma generate');
console.log('2. npx prisma db push');
console.log('3. npx tsx prisma/seed.ts');
console.log('4. npm run dev (in one terminal)');
console.log('5. npm run backend (in another terminal)');
console.log('\n✅ Setup completed! Your database will be created as prisma/dev.db');