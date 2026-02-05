# 🚀 Quick Start Guide - Gaming Pro Store

## Option 1: SQLite (Easiest - No Database Setup Required)

1. **Update database to SQLite** (easier for development):
```bash
# Edit prisma/schema.prisma - change datasource to:
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. **Generate and setup database**:
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

3. **Start the application**:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run backend
```

## Option 2: PostgreSQL (Production-like)

1. **Start PostgreSQL in XAMPP**:
   - Open XAMPP Control Panel
   - Start PostgreSQL service
   - Create database named `gaming_site`

2. **Update .env file** with your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/gaming_site"
```

3. **Setup database**:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

4. **Start the application**:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend  
npm run backend
```

## 🎮 Access the Application

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Backend API**: http://localhost:3001

## 🔑 Demo Credentials

- **Admin**: admin@gaming-site.com / admin123
- **User**: user@gaming-site.com / user123

## 🛠️ Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running in XAMPP
- Check if database `gaming_site` exists
- Verify credentials in .env file

### Port Already in Use
- Frontend (3000): Change in package.json dev script
- Backend (3001): Change BACKEND_PORT in .env

### Missing Dependencies
```bash
npm install --force
```

## 📱 Features to Test

1. **Homepage** - Hero carousel, product grid, dark/light mode
2. **Shopping Cart** - Add products, modify quantities
3. **Authentication** - Login/register with demo credentials
4. **Admin Dashboard** - Product management, user management
5. **Chatbot** - Click floating chat button
6. **Responsive Design** - Test on mobile/tablet
7. **Contact Form** - Send test messages

Enjoy your Gaming Pro Store! 🎮