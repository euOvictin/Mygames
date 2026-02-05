#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎮 Gaming Pro Store - Setup Script');
console.log('==================================\n');

// Create necessary directories
const directories = [
  'assets/hero',
  'assets/products', 
  'assets/icons',
  'public/assets/hero',
  'public/assets/products',
  'uploads',
  'logs',
  'backup',
  'docs'
];

console.log('📁 Creating directories...');
directories.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  }
});

// Create placeholder images
console.log('\n🖼️  Creating placeholder assets...');
const placeholders = [
  'public/favicon.ico',
  'public/apple-touch-icon.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/assets/hero-1.jpg',
  'public/assets/hero-2.jpg',
  'public/assets/hero-3.jpg',
  'public/assets/hero-4.jpg'
];

placeholders.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    // Create empty placeholder files
    fs.writeFileSync(fullPath, '');
    console.log(`✅ Created placeholder: ${file}`);
  }
});

console.log('\n✅ Setup completed successfully!');
console.log('\n🚀 Next steps:');
console.log('1. Copy .env.example to .env and configure');
console.log('2. Set up PostgreSQL database');
console.log('3. Run: npm install');
console.log('4. Run: npm run db:generate');
console.log('5. Run: npm run db:push');
console.log('6. Run: npm run db:seed');
console.log('7. Start development: npm run dev & npm run backend');