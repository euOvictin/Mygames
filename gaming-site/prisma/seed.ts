import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@gaming-site.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@gaming-site.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  console.log('👤 Admin user created:', admin.email);

  // Create demo user
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@gaming-site.com' },
    update: {},
    create: {
      email: 'user@gaming-site.com',
      password: userPassword,
      firstName: 'Demo',
      lastName: 'User',
      role: 'USER',
    },
  });

  console.log('👤 Demo user created:', user.email);

  // Create sample products
  const products = [
    {
      name: 'Teclado Mecânico Gamer RGB',
      description: 'Teclado mecânico profissional com iluminação RGB e teclas personalizáveis. Perfeito para jogos competitivos com switches táteis e tecnologia anti-ghosting.',
      price: 149.99,
      stock: 25,
      category: 'Keyboards',
      featured: true,
      image: '/assets/products/keyboard-1.jpeg',
    },
    {
      name: 'Teclado Gamer Mecânico Pro',
      description: 'Teclado mecânico premium com switches Cherry MX e iluminação RGB personalizável.',
      price: 199.99,
      stock: 18,
      category: 'Keyboards',
      featured: false,
      image: '/assets/products/keyboard-2.jpg',
    },
    {
      name: 'Mouse Gamer Wireless Pro',
      description: 'Mouse gamer sem fio de alta precisão com sensor de 16000 DPI, botões programáveis e bateria de 70 horas.',
      price: 89.99,
      stock: 30,
      category: 'Mice',
      featured: true,
      image: '/assets/products/mouse-1.webp',
    },
    {
      name: 'Mouse Gamer RGB Wireless',
      description: 'Mouse gamer sem fio com iluminação RGB, sensor óptico de alta precisão e design ergonômico.',
      price: 79.99,
      stock: 22,
      category: 'Mice',
      featured: false,
      image: '/assets/products/mouse-2.webp',
    },
    {
      name: 'Headset Gamer 7.1 Surround',
      description: 'Headset gamer premium com som surround 7.1, microfone com cancelamento de ruído e design confortável over-ear.',
      price: 199.99,
      stock: 15,
      category: 'Audio',
      featured: true,
      image: '/assets/products/headset-1.jpg',
    },
    {
      name: 'Kit Gamer Completo',
      description: 'Kit gamer completo com teclado, mouse, headset e mousepad. Tudo que você precisa para começar a jogar profissionalmente.',
      price: 299.99,
      stock: 12,
      category: 'Kits',
      featured: true,
      image: '/assets/products/kit-gamer-1.jpg',
    },
    {
      name: 'Setup Gamer Completo',
      description: 'Setup gamer profissional completo com monitor, teclado, mouse e acessórios premium para a melhor experiência gaming.',
      price: 899.99,
      stock: 5,
      category: 'Setups',
      featured: true,
      image: '/assets/products/game-setup-1.webp',
    },
  ];

  for (const productData of products) {
    // Check if product already exists
    const existingProduct = await prisma.product.findFirst({
      where: { name: productData.name }
    });

    if (!existingProduct) {
      const product = await prisma.product.create({
        data: productData,
      });
      console.log('🎮 Product created:', product.name);
    } else {
      console.log('🎮 Product already exists:', productData.name);
    }
  }

  // Create sample site content
  const siteContent = [
    {
      key: 'hero_title',
      value: JSON.stringify({ text: 'Professional Gaming Gear' }),
    },
    {
      key: 'hero_subtitle',
      value: JSON.stringify({ text: 'Elevate Your Gaming Experience' }),
    },
    {
      key: 'hero_description',
      value: JSON.stringify({ text: 'Discover the latest in professional gaming equipment and accessories.' }),
    },
    {
      key: 'company_info',
      value: JSON.stringify({
        name: 'Gaming Pro Store',
        cnpj: '12.345.678/0001-90',
        address: '123 Gaming Street, Tech City, TC 12345',
        phone: '+1 (555) 123-4567',
        email: 'contact@gamingpro.com',
      }),
    },
  ];

  for (const content of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: { value: content.value },
      create: content,
    });
    console.log('📄 Site content created:', content.key);
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });