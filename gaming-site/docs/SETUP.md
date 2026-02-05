# Gaming Pro Store - Setup Guide

## Prerequisites

- Node.js 18+ 
- PostgreSQL (via XAMPP or standalone)
- Git

## Quick Setup

1. **Run setup script**
```bash
node setup.js
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/gaming_site"
JWT_SECRET="your-super-secret-jwt-key-here"
```

4. **Setup database**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. **Start development**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend  
npm run backend
```

6. **Access application**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Admin: http://localhost:3000/admin

## Demo Credentials
- Admin: admin@gaming-site.com / admin123
- User: user@gaming-site.com / user123

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists

### Port Conflicts
- Frontend runs on port 3000
- Backend runs on port 3001
- Change ports in package.json if needed

### Missing Dependencies
```bash
npm install --force
```

### Prisma Issues
```bash
npx prisma generate
npx prisma db push
```