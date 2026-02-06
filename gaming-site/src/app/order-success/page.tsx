'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Package, Home, Receipt } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-2xl text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pedido Realizado!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
          </p>
        </motion.div>

        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Número do Pedido:</span>
            <span className="font-mono font-bold text-gray-900 dark:text-white">
              #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Link href="/orders" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-gaming py-3 flex items-center justify-center space-x-2"
            >
              <Receipt className="w-5 h-5" />
              <span>Ver Meus Pedidos</span>
            </motion.button>
          </Link>

          <Link href="/" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Voltar ao Início</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center space-x-2 text-sm text-blue-700 dark:text-blue-300">
            <Package className="w-4 h-4" />
            <span>Acompanhe seu pedido pelo email ou área do cliente</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}