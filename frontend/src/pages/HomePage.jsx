import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Plus, TrendingUp, ShoppingCart, Eye } from 'lucide-react'
import productService from '../services/productService'
import toast from 'react-hot-toast'

const HomePage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    categories: 0,
    lowStock: 0
  })
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts({ limit: 100 })
      
      if (response.success) {
        const products = response.data
        
        // Calculate stats
        const totalProducts = products.length
        const totalValue = products.reduce((sum, product) => sum + (product.precio * product.stock), 0)
        const categories = new Set(products.map(p => p.categoria)).size
        const lowStock = products.filter(p => p.stock < 10).length
        
        setStats({ totalProducts, totalValue, categories, lowStock })
        
        // Get recent products (last 5)
        const recent = products.slice(0, 5)
        setRecentProducts(recent)
      }
    } catch (error) {
      toast.error('Error al cargar el dashboard')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon className="h-6 w-6" style={{ color: color }} />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenido a ProductStore
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestiona tu inventario de productos de manera eficiente. Aquí tienes un resumen 
          de tu tienda y acceso rápido a las funciones principales.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/products"
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Eye className="h-5 w-5" />
          <span>Ver Productos</span>
        </Link>
        <Link
          to="/create"
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Productos"
          value={stats.totalProducts}
          icon={Package}
          color="#3b82f6"
          subtitle="productos activos"
        />
        <StatCard
          title="Valor Inventario"
          value={productService.formatPrice(stats.totalValue)}
          icon={TrendingUp}
          color="#10b981"
          subtitle="valor total stock"
        />
        <StatCard
          title="Categorías"
          value={stats.categories}
          icon={ShoppingCart}
          color="#f59e0b"
          subtitle="categorías activas"
        />
        <StatCard
          title="Stock Bajo"
          value={stats.lowStock}
          icon={Package}
          color="#ef4444"
          subtitle="< 10 unidades"
        />
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Productos Recientes
            </h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Ver todos →
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {recentProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay productos disponibles</p>
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 mt-4 text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4" />
                <span>Crear primer producto</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentProducts.map(product => (
                <div key={product._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <Package className="h-10 w-10 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {product.nombre}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {product.categoria} • {product.stock} unidades
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {productService.formatPrice(product.precio)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {productService.formatDate(product.createdAt)}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
