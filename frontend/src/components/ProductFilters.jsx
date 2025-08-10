import { Search, Filter, X } from 'lucide-react'
import productService from '../services/productService'

const ProductFilters = ({ filters, onFiltersChange, onClear }) => {
  const categories = productService.getCategories()

  const handleInputChange = (name, value) => {
    onFiltersChange({
      ...filters,
      [name]: value
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== null && value !== undefined)

  return (
    <div className="bg-slate-200 rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
          >
            <X className="h-4 w-4" />
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search by name */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar producto
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Nombre del producto..."
              value={filters.nombre || ''}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Category filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={filters.categoria || ''}
            onChange={(e) => handleInputChange('categoria', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio mínimo (€)
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            step="0.01"
            value={filters.minPrecio || ''}
            onChange={(e) => handleInputChange('minPrecio', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio máximo (€)
          </label>
          <input
            type="number"
            placeholder="1000"
            min="0"
            step="0.01"
            value={filters.maxPrecio || ''}
            onChange={(e) => handleInputChange('maxPrecio', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {filters.nombre && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Nombre: "{filters.nombre}"
                <button
                  onClick={() => handleInputChange('nombre', '')}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {filters.categoria && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Categoría: {filters.categoria}
                <button
                  onClick={() => handleInputChange('categoria', '')}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {filters.minPrecio && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Min: €{filters.minPrecio}
                <button
                  onClick={() => handleInputChange('minPrecio', '')}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {filters.maxPrecio && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                Max: €{filters.maxPrecio}
                <button
                  onClick={() => handleInputChange('maxPrecio', '')}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilters
