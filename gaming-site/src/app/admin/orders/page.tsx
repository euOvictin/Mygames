'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Truck, CheckCircle, XCircle, Search, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerCPF: string;
  customerPhone: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  createdAt: string;
}

export default function OrdersManagementPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (authLoading) return; // Wait for auth check to complete
    
    if (!user || user.role !== 'ADMIN') {
      router.push('/auth/login');
      return;
    }
    fetchOrders();
  }, [user, authLoading, router]);

  // Auto-refresh orders every 30 seconds to show new orders
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') return;
    
    const interval = setInterval(() => {
      fetchOrders();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      const result = await response.json();
      
      if (response.ok) {
        setOrders(result.orders);
        setLastUpdated(new Date());
      } else {
        throw new Error(result.error || 'Erro ao carregar pedidos');
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      toast.error('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      // Atualizar diretamente no banco usando uma API simples
      const response = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const result = await response.json();

      if (response.ok) {
        // Atualizar o estado local imediatamente
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: newStatus }
              : order
          )
        );
        
        toast.success(`Pedido atualizado para ${getStatusLabel(newStatus)}`);
      } else {
        throw new Error(result.error || 'Erro ao atualizar pedido');
      }
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      toast.error('Erro ao atualizar pedido');
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Pendente',
      PROCESSING: 'Processando',
      SHIPPED: 'Enviado',
      DELIVERED: 'Entregue',
      CANCELLED: 'Cancelado',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      PROCESSING: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      SHIPPED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    processing: orders.filter(o => o.status === 'PROCESSING').length,
    shipped: orders.filter(o => o.status === 'SHIPPED').length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950">
      {/* Header */}
      <div className="bg-white dark:bg-dark-900 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500">
              <span>← Voltar ao Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gerenciar Pedidos
            </h1>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
                </span>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchOrders}
                disabled={loading}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Atualizando...' : 'Atualizar'}
              </motion.button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize e gerencie todos os pedidos e atualize o estoque
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-dark-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-gray-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-dark-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Package className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-dark-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Processando</p>
                <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-dark-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enviados</p>
                <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
              </div>
              <Truck className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-dark-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Entregues</p>
                <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por cliente, email ou ID do pedido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="ALL">Todos os Status</option>
            <option value="PENDING">Pendente</option>
            <option value="PROCESSING">Processando</option>
            <option value="SHIPPED">Enviado</option>
            <option value="DELIVERED">Entregue</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    ID Pedido
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    CPF
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Pagamento
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Data
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-600">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900 dark:text-white">
                        #{order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.customerName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {order.customerEmail}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {order.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white font-mono">
                        {order.customerCPF}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-primary-500">
                        R$ {order.total.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {order.paymentMethod === 'PIX' && '💳 PIX'}
                          {order.paymentMethod === 'CREDIT_CARD' && '💳 Crédito'}
                          {order.paymentMethod === 'DEBIT_CARD' && '💳 Débito'}
                          {order.paymentMethod === 'BOLETO' && '📄 Boleto'}
                        </span>
                        <div className={`text-xs ${
                          order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {order.paymentStatus === 'PAID' ? '✓ Pago' : '⏳ Pendente'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                          title="Ver detalhes"
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                        
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="text-sm px-2 py-1 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="PENDING">Pendente</option>
                          <option value="PROCESSING">Processando</option>
                          <option value="SHIPPED">Enviado</option>
                          <option value="DELIVERED">Entregue</option>
                          <option value="CANCELLED">Cancelado</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Detalhes do Pedido #{selectedOrder.id}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customer Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Dados do Cliente
                    </h3>
                    <div className="space-y-3 bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Nome Completo</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedOrder.customerName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedOrder.customerEmail}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">CPF</p>
                        <p className="font-medium text-gray-900 dark:text-white font-mono">
                          {selectedOrder.customerCPF}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedOrder.customerPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Endereço de Entrega
                    </h3>
                    <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                      <p className="text-gray-900 dark:text-white">
                        {selectedOrder.address.street}, {selectedOrder.address.number}
                        {selectedOrder.address.complement && `, ${selectedOrder.address.complement}`}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedOrder.address.neighborhood}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedOrder.address.city} - {selectedOrder.address.state}
                      </p>
                      <p className="text-gray-900 dark:text-white font-mono">
                        CEP: {selectedOrder.address.zipCode}
                      </p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Informações de Pagamento
                    </h3>
                    <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Método:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedOrder.paymentMethod === 'PIX' && 'PIX'}
                          {selectedOrder.paymentMethod === 'CREDIT_CARD' && 'Cartão de Crédito'}
                          {selectedOrder.paymentMethod === 'DEBIT_CARD' && 'Cartão de Débito'}
                          {selectedOrder.paymentMethod === 'BOLETO' && 'Boleto Bancário'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <span className={`font-medium ${
                          selectedOrder.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {selectedOrder.paymentStatus === 'PAID' ? 'Pago' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items & Summary */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Itens do Pedido
                    </h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{item.productName}</p>
                            <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                            <p className="text-sm text-gray-500">Preço unitário: R$ {item.price.toFixed(2)}</p>
                          </div>
                          <p className="font-bold text-primary-500">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Resumo do Pedido
                    </h3>
                    <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                        <span className="text-gray-900 dark:text-white">R$ {selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Frete:</span>
                        <span className="text-green-600 font-medium">
                          {selectedOrder.shipping === 0 ? 'Grátis' : `R$ ${selectedOrder.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Impostos:</span>
                        <span className="text-gray-900 dark:text-white">R$ {selectedOrder.tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-dark-600 pt-2">
                        <div className="flex justify-between">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                          <span className="text-2xl font-bold text-primary-500">R$ {selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Status do Pedido
                    </h3>
                    <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Status atual:</span>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                          {getStatusLabel(selectedOrder.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Pedido realizado em {new Date(selectedOrder.createdAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-dark-600">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOrder(null)}
                  className="btn-gaming px-6 py-3"
                >
                  Fechar
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}