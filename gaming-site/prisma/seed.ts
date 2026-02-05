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
      name: 'Gaming Mechanical Keyboard RGB',
      description: 'Professional mechanical keyboard with RGB backlighting and customizable keys. Perfect for competitive gaming with tactile switches and anti-ghosting technology.',
      price: 149.99,
      stock: 25,
      category: 'Keyboards',
      featured: true,
      image: '/assets/products/keyboard-1.jpg',
    },
    {
      name: 'Wireless Gaming Mouse Pro',
      description: 'High-precision wireless gaming mouse with 16000 DPI sensor, programmable buttons, and 70-hour battery life.',
      price: 89.99,
      stock: 30,
      category: 'Mice',
      featured: true,
      image: '/assets/products/mouse-1.jpg',
    },
    {
      name: 'Gaming Headset 7.1 Surround',
      description: 'Premium gaming headset with 7.1 surround sound, noise-canceling microphone, and comfortable over-ear design.',
      price: 199.99,
      stock: 15,
      category: 'Audio',
      featured: true,
      image: '/assets/products/headset-1.jpg',
    },
    {
      name: 'Elite Gaming Controller',
      description: 'Professional gaming controller with customizable buttons, adjustable triggers, and premium build quality.',
      price: 179.99,
      stock: 20,
      category: 'Controllers',
      featured: false,
      image: '/assets/products/controller-1.jpg',
    },
    {
      name: '27" Gaming Monitor 144Hz',
      description: '27-inch QHD gaming monitor with 144Hz refresh rate, 1ms response time, and HDR support.',
      price: 399.99,
      stock: 12,
      category: 'Monitors',
      featured: true,
      image: '/assets/products/monitor-1.jpg',
    },
    {
      name: 'Gaming Chair Pro Ergonomic',
      description: 'Ergonomic gaming chair with lumbar support, adjustable armrests, and premium leather upholstery.',
      price: 299.99,
      stock: 8,
      category: 'Furniture',
      featured: false,
      image: '/assets/products/chair-1.jpg',
    },
    {
      name: 'Gaming Mousepad XXL',
      description: 'Extra-large gaming mousepad with smooth surface, anti-slip base, and RGB lighting around the edges.',
      price: 49.99,
      stock: 50,
      category: 'Accessories',
      featured: false,
      image: '/assets/products/mousepad-1.jpg',
    },
    {
      name: 'Gaming Webcam 4K',
      description: '4K gaming webcam with auto-focus, built-in microphone, and streaming software compatibility.',
      price: 129.99,
      stock: 18,
      category: 'Streaming',
      featured: false,
      image: '/assets/products/webcam-1.jpg',
    },
    {
      name: 'Mechanical Gaming Keypad',
      description: 'One-handed mechanical gaming keypad with programmable keys and RGB backlighting.',
      price: 79.99,
      stock: 22,
      category: 'Keyboards',
      featured: false,
      image: '/assets/products/keypad-1.jpg',
    },
    {
      name: 'Gaming Speakers 2.1',
      description: '2.1 gaming speaker system with subwoofer, RGB lighting, and powerful bass response.',
      price: 159.99,
      stock: 14,
      category: 'Audio',
      featured: false,
      image: '/assets/products/speakers-1.jpg',
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