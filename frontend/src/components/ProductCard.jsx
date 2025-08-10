import { Link } from 'react-router-dom'
import { Eye, Edit, Trash2, Package } from 'lucide-react'
import productService from '../services/productService'

const ProductCard = ({ product, onDelete }) => {
  const getCategoryColor = (category) => {
    const colors = {
      electronica: 'bg-blue-100 text-blue-800',
      ropa: 'bg-pink-100 text-pink-800',
      hogar: 'bg-green-100 text-green-800',
      deportes: 'bg-orange-100 text-orange-800',
      libros: 'bg-purple-100 text-purple-800',
      otros: 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors.otros
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Agotado', color: 'text-red-600' }
    if (stock < 10) return { text: 'Pocas unidades', color: 'text-orange-600' }
    return { text: 'En stock', color: 'text-green-600' }
  }

  const stockStatus = getStockStatus(product.stock)

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden animate-fadeIn">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {product.imagen ? (
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <Package className="h-16 w-16 text-gray-400" />
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.categoria)}`}>
            {product.categoria}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.nombre}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.descripcion}
          </p>
        </div>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {productService.formatPrice(product.precio)}
            </p>
            <p className={`text-sm ${stockStatus.color}`}>
              {stockStatus.text} ({product.stock} unidades)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            to={`/products/${product._id}`}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
          >
            <Eye className="h-4 w-4" />
            <span>Ver</span>
          </Link>
          
          <Link
            to={`/edit/${product._id}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
            title="Editar producto"
          >
            <Edit className="h-4 w-4" />
          </Link>
          
          <button
            onClick={() => onDelete(product)}
            className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
            title="Eliminar producto"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
