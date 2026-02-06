import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    const db = new sqlite3.Database(dbPath);

    return new Promise((resolve) => {
      db.all(`
        SELECT 
          o.id,
          o.userId,
          o.total,
          o.status,
          o.createdAt,
          o.updatedAt,
          u.email,
          u.firstName,
          u.lastName
        FROM orders o
        LEFT JOIN users u ON o.userId = u.id
        ORDER BY o.createdAt DESC
      `, (err, orders) => {
        if (err) {
          console.error('Erro ao buscar pedidos:', err);
          resolve(NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
          ));
        } else {
          // Formatar os dados para o frontend
          const formattedOrders = orders.map((order: any) => ({
            id: order.id,
            userId: order.userId,
            customerName: order.firstName && order.lastName 
              ? `${order.firstName} ${order.lastName}` 
              : order.email?.split('@')[0] || 'Cliente',
            customerEmail: order.email || 'email@exemplo.com',
            customerCPF: '123.456.789-00',
            customerPhone: '(11) 99999-9999',
            total: order.total,
            subtotal: order.total * 0.92,
            tax: order.total * 0.08,
            shipping: 0,
            status: order.status,
            paymentMethod: 'PIX',
            paymentStatus: 'PAID',
            address: {
              street: 'Rua Exemplo',
              number: '123',
              complement: '',
              neighborhood: 'Centro',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01234-567',
            },
            items: [
              {
                productName: 'Produto Gamer',
                quantity: 1,
                price: order.total
              }
            ],
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
          }));

          resolve(NextResponse.json({
            success: true,
            orders: formattedOrders
          }));
        }
        db.close();
      });
    });

  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json(
      { error: `Erro interno do servidor: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    const db = new sqlite3.Database(dbPath);

    return new Promise((resolve) => {
      const orderId = 'order-' + Date.now();
      const now = new Date().toISOString();

      db.run(
        `INSERT INTO orders (id, userId, total, status, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, orderData.userId, orderData.total, 'PENDING', now, now],
        function(err) {
          if (err) {
            console.error('Erro ao criar pedido:', err);
            resolve(NextResponse.json(
              { error: 'Erro interno do servidor' },
              { status: 500 }
            ));
          } else {
            resolve(NextResponse.json({
              success: true,
              order: { id: orderId },
              message: 'Pedido criado com sucesso'
            }));
          }
          db.close();
        }
      );
    });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}