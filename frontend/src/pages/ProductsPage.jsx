import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Package } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import productService from '../services/productService'
import toast from 'react-hot-toast'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    nombre: '',
    categoria: '',
    minPrecio: '',
    maxPrecio: '',
    page: 1,
    limit: 12
  })
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    count: 0
  })

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts(filters)
      
      if (response.success) {
        setProducts(response.data)
        setPagination({
          page: response.page,
          pages: response.pages,
          total: response.total,
          count: response.count
        })
      }
    } catch (error) {
      toast.error('Error al cargar productos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters({
      ...newFilters,
      page: 1 // Reset to first page when filters change
    })
  }

  const handleClearFilters = () => {
    setFilters({
      nombre: '',
      categoria: '',
      minPrecio: '',
      maxPrecio: '',
      page: 1,
      limit: 12
    })
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${product.nombre}"?`)) {
      return
    }

    try {
      await productService.deleteProduct(product._id)
      toast.success('Producto eliminado correctamente')
      fetchProducts() // Refresh the list
    } catch (error) {
      toast.error(error.message || 'Error al eliminar el producto')
    }
  }

  const Pagination = () => {
    if (pagination.pages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    const startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(pagination.pages, startPage + maxVisiblePages - 1)

    // Previous button
    if (pagination.page > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(pagination.page - 1)}
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-500 focus:z-20 focus:outline-offset-0 rounded-l-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            i === pagination.page
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'text-gray-900'
          }`}
        >
          {i}
        </button>
      )
    }

    // Next button
    if (pagination.page < pagination.pages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(pagination.page + 1)}
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-500 focus:z-20 focus:outline-offset-0 rounded-r-md"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )
    }

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{((pagination.page - 1) * filters.limit) + 1}</span> a{' '}
              <span className="font-medium">
                {Math.min(pagination.page * filters.limit, pagination.total)}
              </span>{' '}
              de <span className="font-medium">{pagination.total}</span> productos
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              {pages}
            </nav>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Productos</h1>
        <p className="text-gray-600">
          Explora y gestiona todo tu catálogo de productos
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClear={handleClearFilters}
      />

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner w-8 h-8"></div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros o crear un nuevo producto.
              </p>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {pagination.total} producto{pagination.total !== 1 ? 's' : ''} encontrado{pagination.total !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard
                    key={product._id}
                    
                    product={product}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ProductsPage
