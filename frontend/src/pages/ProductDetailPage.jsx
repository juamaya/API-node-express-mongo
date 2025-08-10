import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Package, Calendar, Tag, DollarSign, Archive } from 'lucide-react'
import productService from '../services/productService'
import toast from 'react-hot-toast'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await productService.getProduct(id)
      
      if (response.success) {
        setProduct(response.data)
      }
    } catch (error) {
      toast.error('Error al cargar el producto')
      console.error(error)
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async () => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${product.nombre}"?`)) {
      return
    }

    try {
      await productService.deleteProduct(product._id)
      toast.success('Producto eliminado correctamente')
      navigate('/products')
    } catch (error) {
      toast.error(error.message || 'Error al eliminar el producto')
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      electronica: 'bg-blue-100 text-blue-800 border-blue-200',
      ropa: 'bg-pink-100 text-pink-800 border-pink-200',
      hogar: 'bg-green-100 text-green-800 border-green-200',
      deportes: 'bg-orange-100 text-orange-800 border-orange-200',
      libros: 'bg-purple-100 text-purple-800 border-purple-200',
      otros: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category] || colors.otros
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Agotado', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-200' }
    if (stock < 10) return { text: 'Pocas unidades', color: 'text-orange-600', bgColor: 'bg-orange-100', borderColor: 'border-orange-200' }
    return { text: 'En stock', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-200' }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Producto no encontrado
        </h3>
        <Link
          to="/products"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Volver a productos
        </Link>
      </div>
    )
  }

  const stockStatus = getStockStatus(product.stock)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/products"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Volver a productos</span>
        </Link>
      </div>

      {/* Product Detail */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {product.imagen ? (
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-24 w-24 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.nombre}
                </h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(product.categoria)}`}>
                  {product.categoria}
                </span>
              </div>
              <p className="text-gray-600 text-lg">
                {product.descripcion}
              </p>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Precio</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {productService.formatPrice(product.precio)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Archive className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Stock</span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {product.stock}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${stockStatus.bgColor} ${stockStatus.color} ${stockStatus.borderColor}`}>
                    {stockStatus.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-600">Creado:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {productService.formatDate(product.createdAt)}
                  </span>
                </div>
              </div>
              
              {product.updatedAt && product.updatedAt !== product.createdAt && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Actualizado:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {productService.formatDate(product.updatedAt)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-600">ID:</span>
                  <span className="ml-2 font-mono text-sm text-gray-900">
                    {product._id}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t">
              <Link
                to={`/edit/${product._id}`}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Edit className="h-5 w-5" />
                <span>Editar Producto</span>
              </Link>
              
              <button
                onClick={handleDeleteProduct}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Trash2 className="h-5 w-5" />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Información adicional
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Valor total en stock</h3>
            <p className="text-xl font-semibold text-gray-900">
              {productService.formatPrice(product.precio * product.stock)}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Estado</h3>
            <p className="text-xl font-semibold text-gray-900">
              {product.activo ? 'Activo' : 'Inactivo'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Imagen</h3>
            <p className="text-sm text-gray-900">
              {product.imagen ? (
                <a 
                  href={product.imagen} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Ver imagen original
                </a>
              ) : (
                'Sin imagen'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
