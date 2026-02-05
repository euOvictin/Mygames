'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Calendar,
  Plus,
  TrendingUp,
  DollarSign,
  Eye,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: any[];
  topProducts: any[];
}

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: [],
  });
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Review new product submissions', completed: false, createdAt: new Date() },
    { id: '2', text: 'Update inventory levels', completed: true, createdAt: new Date() },
    { id: '3', text: 'Respond to customer inquiries', completed: false, createdAt: new Date() },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (authLoading) return; // Wait for auth check to complete
    
    if (!user || user.role !== 'ADMIN') {
      console.log('❌ Acesso negado ao admin dashboard');
      router.push('/auth/login');
      return;
    }

    console.log('✅ Admin autenticado:', user.email);
    
    // Fetch dashboard stats (mock data for demo)
    setStats({
      totalUsers: 1247,
      totalProducts: 156,
      totalOrders: 892,
      totalRevenue: 45678.90,
      recentOrders: [
        { id: '1', customer: 'John Doe', total: 299.99, status: 'Processing' },
        { id: '2', customer: 'Jane Smith', total: 149.99, status: 'Shipped' },
        { id: '3', customer: 'Mike Johnson', total: 89.99, status: 'Delivered' },
      ],
      topProducts: [
        { name: 'Gaming Keyboard RGB', sales: 45 },
        { name: 'Wireless Gaming Mouse', sales: 38 },
        { name: 'Gaming Headset Pro', sales: 32 },
      ],
    });
  }, [user, authLoading, router]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-gaming-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-gaming font-bold text-2xl">GP</span>
          </div>
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      title: 'Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-purple-500',
      change: '+18%',
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+23%',
    },
  ];

  const menuItems = [
    { href: '/admin/users', label: 'Usuários', icon: Users, description: 'Gerenciar usuários e permissões' },
    { href: '/admin/products', label: 'Produtos', icon: Package, description: 'Adicionar/editar produtos gaming' },
    { href: '/admin/orders', label: 'Pedidos', icon: ShoppingCart, description: 'Visualizar e gerenciar pedidos' },
    { href: '/admin/chat', label: 'Chat', icon: MessageSquare, description: 'Conversas do chatbot (Em breve)' },
    { href: '/admin/content', label: 'Conteúdo', icon: Settings, description: 'Editar conteúdo do site (Em breve)' },
    { href: '/admin/media', label: 'Mídia', icon: Eye, description: 'Gerenciar imagens/vídeos (Em breve)' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950 dark-transition">
      {/* Header */}
      <div className="bg-white dark:bg-dark-900 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-gaming-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-gaming font-bold">GP</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-400">Welcome, {user.firstName}</span>
              <Link
                href="/"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                View Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your gaming store and monitor performance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-dark-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                  <p className="text-sm text-green-500 font-medium">{card.change} from last month</p>
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar & Todo */}
          <div className="lg:col-span-1 space-y-6">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-dark-600"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-primary-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Calendar</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">
                  {currentDate.getDate()}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </motion.div>

            {/* Todo List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-dark-600"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Todo List</h3>
              
              {/* Add Todo */}
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="Add new task..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  onClick={addTodo}
                  className="p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Todo Items */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span
                      className={`flex-1 text-sm ${
                        todo.completed
                          ? 'text-gray-500 dark:text-gray-400 line-through'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-600 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-dark-600"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block p-4 bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 rounded-lg transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-500 group-hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-200">
                            {item.label}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}