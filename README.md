# Gaming Pro Store - Professional Gaming E-commerce Site

A complete, production-ready e-commerce website for professional gaming equipment built with modern 2026 web stack featuring Microsoft-inspired clean tech aesthetics and PlayStation dynamic visuals.

## 🚀 Features

### Frontend
- **Next.js 15** with App Router and TypeScript
- **Responsive Design** - Mobile-first approach with WCAG AA compliance
- **Dark/Light Mode** - System preference detection with manual toggle
- **Framer Motion** - Smooth animations and transitions
- **TailwindCSS** - Modern utility-first styling
- **PWA Ready** - Installable progressive web app

### User Features
- **Hero Section** - Fullscreen gaming visuals with interactive carousel
- **Product Grid** - Advanced filtering and sorting
- **Shopping Cart** - Persistent cart with quantity management
- **Authentication** - JWT-based login/register system
- **Chatbot** - Interactive customer support
- **Contact Form** - Integrated contact system

### Admin Dashboard
- **Role-Based Access** - User vs Admin permissions
- **Product Management** - CRUD operations for gaming products
- **User Management** - View and manage customers
- **Order Management** - Track and update order status
- **Content Management** - Edit site content and media
- **Analytics Dashboard** - Sales and user metrics
- **Todo System** - Task management with drag-drop

### Backend
- **Node.js/Express** - RESTful API server
- **Prisma ORM** - Type-safe database operations
- **PostgreSQL** - Production-ready database
- **JWT Authentication** - Secure token-based auth
- **File Upload** - Multer integration for media
- **Rate Limiting** - API protection
- **Security** - Helmet, CORS, input validation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL (XAMPP compatible)
- **Authentication**: JWT, bcryptjs
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod validation
- **State**: Zustand, React Context
- **Styling**: TailwindCSS with custom gaming theme

## 📁 Project Structure

```
gaming-site/
├── /api                    # REST endpoints, controllers
├── /assets                 # Images, videos, favicon
├── /backup                 # Auto-backups
├── /config                 # Database, environment config
├── /controllers            # API controllers
├── /database              # Migrations, seeds
├── /docs                  # Auto-generated documentation
├── /logs                  # Application logs
├── /models                # Prisma schemas
├── /public                # Static assets
├── /src
│   ├── /app              # Next.js pages (App Router)
│   ├── /components       # Reusable UI components
│   ├── /contexts         # React contexts
│   ├── /backend          # Express server
│   └── /utils            # Utility functions
├── /prisma               # Database schema and seeds
├── index.html            # Redirects to Next.js app
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL (via XAMPP or standalone)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gaming-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

Edit `.env` with your database and configuration:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/gaming_site"
JWT_SECRET="your-super-secret-jwt-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

5. **Start Development Servers**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run backend
```

6. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Admin Dashboard: http://localhost:3000/admin

### Demo Credentials
- **Admin**: admin@gaming-site.com / admin123
- **User**: user@gaming-site.com / user123

## 🎨 Design System

### Colors
- **Primary**: #0078D4 (Microsoft Blue)
- **Gaming Accent**: #00d4ff (Cyan Blue)
- **Dark Theme**: #0F1419 (Deep Dark)
- **Gaming Purple**: #8b5cf6
- **Gaming Pink**: #ec4899

### Typography
- **Primary**: Inter (System font)
- **Gaming**: Orbitron (Headers and accents)

### Components
- **Gaming Buttons**: Gradient backgrounds with glow effects
- **Cards**: Hover animations with border glow
- **Forms**: Glassmorphism styling
- **Navigation**: Backdrop blur with smooth transitions

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
  - Large: 1280px+

## 🔒 Security Features

- **JWT Authentication** with secure token storage
- **Password Hashing** using bcryptjs
- **Rate Limiting** on API endpoints
- **Input Validation** with Zod schemas
- **CORS Protection** for cross-origin requests
- **Helmet** for security headers
- **File Upload Validation** for media files

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables (Production)
```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components and images
- **Caching**: Static assets and API responses

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📈 Analytics & Monitoring

- **Built-in Analytics**: User behavior tracking
- **Error Monitoring**: Automatic error reporting
- **Performance Monitoring**: Core Web Vitals tracking
- **Database Monitoring**: Query performance tracking

## 🔧 Customization

### Adding New Products
1. Use Admin Dashboard → Products → Add New
2. Upload product images via Media Manager
3. Set categories, pricing, and inventory

### Customizing Theme
1. Edit `tailwind.config.js` for colors and styles
2. Modify `globals.css` for custom animations
3. Update components in `/src/components`

### Adding New Pages
1. Create page in `/src/app/[page-name]/page.tsx`
2. Add navigation links in Navbar component
3. Update sitemap and metadata

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check `/docs` folder
- **Issues**: GitHub Issues
- **Email**: support@gaming-pro-store.com
- **Discord**: Join our community server

## 🎯 Roadmap

- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Social media integration
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Advanced search with filters
- [ ] Mobile app (React Native)
- [ ] AI-powered product recommendations

---

**Built with ❤️ for the gaming community**

*Gaming Pro Store - Level up your gaming experience!*#   M y g a m e s  
 