import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    // Validar status
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    // Usar SQLite diretamente para atualizar
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    const db = new sqlite3.Database(dbPath);

    return new Promise((resolve) => {
      db.run(
        'UPDATE orders SET status = ?, updatedAt = ? WHERE id = ?',
        [status, new Date().toISOString(), orderId],
        function(err) {
          if (err) {
            console.error('Erro ao atualizar status:', err);
            resolve(NextResponse.json(
              { error: 'Erro interno do servidor' },
              { status: 500 }
            ));
          } else {
            resolve(NextResponse.json({
              success: true,
              message: `Pedido atualizado para ${getStatusLabel(status)}`
            }));
          }
          db.close();
        }
      );
    });

  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'Pendente',
    PROCESSING: 'Processando',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregue',
    CANCELLED: 'Cancelado',
  };
  return labels[status] || status;
}