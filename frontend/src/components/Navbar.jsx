import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Plus, Home, Package } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()

  const isActiveRoute = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-slate-400 shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
           <span className="text-xl font-bold text-gray-900">  Juamaya 🚀 2025</span>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">ProductStore  </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActiveRoute('/')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>

            <Link
              to="/products"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActiveRoute('/products')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Productos</span>
            </Link>

            <Link
              to="/create"
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActiveRoute('/create')
                  ? 'bg-primary-700 text-white'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo Producto</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
