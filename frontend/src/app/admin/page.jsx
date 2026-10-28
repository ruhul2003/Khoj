"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Database,
  CheckCircle2,
  SlidersHorizontal,
  PackageCheck
} from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { AdminStatsOverview } from '@/components/admin/AdminStatsOverview';
import { AdminFilterBar } from '@/components/admin/AdminFilterBar';
import { AdminProductTable } from '@/components/admin/AdminProductTable';
import { AdminProductGrid } from '@/components/admin/AdminProductGrid';
import { AdminBulkActionsBar } from '@/components/admin/AdminBulkActionsBar';
import { ProductInspectModal } from '@/components/admin/ProductInspectModal';
import { ProductEditDrawer } from '@/components/admin/ProductEditDrawer';
import { ProductCreateModal } from '@/components/admin/ProductCreateModal';
import { AdminReportsTab } from '@/components/admin/AdminReportsTab';
import { exportProductsToCsv, exportProductsToJson } from '@/utils/adminExport';

export default function AdminPage() {
  const { showToast } = useToast();

  // State
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'moderation'
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // View & Pagination
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    condition: 'All',
    status: 'All',
    featuredOnly: false,
    sort: 'newest'
  });

  // Selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals & Drawers
  const [inspectProduct, setInspectProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // { id, title }

  // Fetch Products & Stats
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats
      try {
        const statsRes = await api.get('/products/admin/stats');
        setStats(statsRes.data);
      } catch (statsErr) {
        console.warn('Stats fetch note:', statsErr.message);
      }

      // 2. Fetch Products
      const res = await api.get('/products');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to load products:', err);
      showToast('Could not load products from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.sellerName && p.sellerName.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Category
    if (filters.category && filters.category !== 'All') {
      list = list.filter(p => p.category === filters.category);
    }

    // Condition
    if (filters.condition && filters.condition !== 'All') {
      list = list.filter(p => p.condition === filters.condition);
    }

    // Status
    if (filters.status && filters.status !== 'All') {
      list = list.filter(p => (p.status || 'Available') === filters.status);
    }

    // Featured only
    if (filters.featuredOnly) {
      list = list.filter(p => p.isFeatured === true);
    }

    // Sort
    switch (filters.sort) {
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'oldest':
        list.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case 'price_asc':
        list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price_desc':
        list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'views':
        list.sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0));
        break;
      case 'discount':
        list.sort((a, b) => {
          const discA = a.originalPrice && a.originalPrice > a.price ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discB = b.originalPrice && b.originalPrice > b.price ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discB - discA;
        });
        break;
      default:
        break;
    }

    return list;
  }, [products, filters]);

  // Paginated View
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      condition: 'All',
      status: 'All',
      featuredOnly: false,
      sort: 'newest'
    });
    setCurrentPage(1);
  };

  // Selection handlers
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const pageIds = paginatedProducts.map(p => p._id || p.id);
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = paginatedProducts.map(p => p._id || p.id);
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    }
  };

  // Actions: Quick Featured Toggle
  const handleToggleFeatured = async (id, isFeatured) => {
    // Optimistic UI update
    setProducts(prev => prev.map(p => {
      if ((p._id || p.id) === id) {
        return { ...p, isFeatured };
      }
      return p;
    }));

    try {
      await api.put(`/products/${id}/featured`, { isFeatured });
      showToast(isFeatured ? 'Product promoted to Featured' : 'Product unfeatured', 'success');
    } catch (err) {
      console.warn('Featured update note:', err.message);
      // Fallback update
      try {
        await api.put(`/products/${id}`, { isFeatured });
      } catch (fallbackErr) {}
    }
  };

  // Actions: Quick Status Change
  const handleUpdateStatus = async (id, status) => {
    setProducts(prev => prev.map(p => {
      if ((p._id || p.id) === id) {
        return { ...p, status };
      }
      return p;
    }));

    try {
      await api.put(`/products/${id}/status`, { status });
      showToast(`Status changed to ${status}`, 'success');
    } catch (err) {
      try {
        await api.put(`/products/${id}`, { status });
        showToast(`Status changed to ${status}`, 'success');
      } catch (fallbackErr) {
        showToast('Failed to update status', 'error');
      }
    }
  };

  // Actions: Quick Inline Price Edit
  const handleUpdatePrice = async (id, newPrice) => {
    setProducts(prev => prev.map(p => {
      if ((p._id || p.id) === id) {
        return { ...p, price: newPrice };
      }
      return p;
    }));

    try {
      await api.put(`/products/${id}`, { price: newPrice });
      showToast(`Price updated to ৳ ${newPrice.toLocaleString()}`, 'success');
    } catch (err) {
      showToast('Failed to update price', 'error');
    }
  };

  // Actions: Full Save from Drawer
  const handleSaveProduct = async (id, cleanData) => {
    const res = await api.put(`/products/${id}`, cleanData);
    const updated = res.data;

    setProducts(prev => prev.map(p => {
      if ((p._id || p.id) === id) {
        return { ...p, ...updated };
      }
      return p;
    }));

    showToast('Product updated successfully', 'success');
  };

  // Actions: Direct Create Product
  const handleCreateProduct = async (payload) => {
    const res = await api.post('/products/admin/create', payload);
    const created = res.data;
    setProducts(prev => [created, ...prev]);
    showToast('Product published to catalog', 'success');
  };

  // Actions: Single Delete
  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
      setSelectedIds(prev => prev.filter(i => i !== id));
      setDeleteConfirmation(null);
      showToast('Listing deleted from catalog', 'success');
    } catch (err) {
      showToast('Failed to delete listing', 'error');
    }
  };

  // Actions: Bulk Status
  const handleBulkStatus = async (status) => {
    try {
      await api.post('/products/admin/bulk-status', { ids: selectedIds, status });
      setProducts(prev => prev.map(p => {
        if (selectedIds.includes(p._id || p.id)) {
          return { ...p, status };
        }
        return p;
      }));
      showToast(`Updated ${selectedIds.length} products to ${status}`, 'success');
      setSelectedIds([]);
    } catch (err) {
      showToast('Failed to perform bulk status update', 'error');
    }
  };

  // Actions: Bulk Feature
  const handleBulkFeature = async (isFeatured) => {
    try {
      await api.post('/products/admin/bulk-feature', { ids: selectedIds, isFeatured });
      setProducts(prev => prev.map(p => {
        if (selectedIds.includes(p._id || p.id)) {
          return { ...p, isFeatured };
        }
        return p;
      }));
      showToast(`Updated featured status for ${selectedIds.length} items`, 'success');
      setSelectedIds([]);
    } catch (err) {
      showToast('Failed to bulk feature', 'error');
    }
  };

  // Actions: Bulk Discount
  const handleBulkDiscount = async (discountPercent) => {
    try {
      await api.post('/products/admin/bulk-discount', { ids: selectedIds, discountPercent });
      fetchData(); // Refresh to get recalculated prices
      showToast(`Applied ${discountPercent}% discount to ${selectedIds.length} items`, 'success');
      setSelectedIds([]);
    } catch (err) {
      showToast('Failed to apply discount', 'error');
    }
  };

  // Actions: Bulk Delete
  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete ${selectedIds.length} listings?`)) {
      return;
    }

    try {
      await api.post('/products/admin/bulk-delete', { ids: selectedIds });
      setProducts(prev => prev.filter(p => !selectedIds.includes(p._id || p.id)));
      showToast(`Deleted ${selectedIds.length} listings`, 'success');
      setSelectedIds([]);
    } catch (err) {
      showToast('Failed to delete selected items', 'error');
    }
  };

  // Actions: Export Selected
  const handleExportSelected = () => {
    const selectedItems = products.filter(p => selectedIds.includes(p._id || p.id));
    exportProductsToCsv(selectedItems, `khoj-selected-${selectedIds.length}-products.csv`);
    showToast(`Exported ${selectedIds.length} products to CSV`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Admin Console
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Catalog Active</span>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Product Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Audit catalog inventory, customize listing attributes, and resolve trust & safety flags
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Refresh */}
          <button
            onClick={fetchData}
            title="Refresh Catalog Data"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111726] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Export Full Catalog */}
          <button
            onClick={() => exportProductsToCsv(products)}
            title="Download full catalog CSV"
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111726] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Create Product Button */}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-px text-xs font-semibold">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-3 transition-colors relative cursor-pointer ${
            activeTab === 'products'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>All Products</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {products.length}
            </span>
          </div>
          {activeTab === 'products' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`pb-3 px-3 transition-colors relative cursor-pointer ${
            activeTab === 'moderation'
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Trust & Moderation</span>
            {stats?.reportedCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold">
                {stats.reportedCount}
              </span>
            )}
          </div>
          {activeTab === 'moderation' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
          )}
        </button>
      </div>

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Stats Overview */}
          <AdminStatsOverview
            stats={stats}
            selectedCategory={filters.category}
            onSelectCategory={(cat) => handleFilterChange('category', cat)}
          />

          {/* Filter Bar */}
          <AdminFilterBar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalMatching={filteredProducts.length}
          />

          {/* Table or Grid View */}
          {viewMode === 'table' ? (
            <AdminProductTable
              products={paginatedProducts}
              loading={loading}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
              onInspect={setInspectProduct}
              onEdit={setEditProduct}
              onDelete={(id, title) => setDeleteConfirmation({ id, title })}
              onToggleFeatured={handleToggleFeatured}
              onUpdateStatus={handleUpdateStatus}
              onUpdatePrice={handleUpdatePrice}
            />
          ) : (
            <AdminProductGrid
              products={paginatedProducts}
              loading={loading}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onInspect={setInspectProduct}
              onEdit={setEditProduct}
              onDelete={(id, title) => setDeleteConfirmation({ id, title })}
              onToggleFeatured={handleToggleFeatured}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {/* Minimalist Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span>Showing</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {Math.min(filteredProducts.length, (currentPage - 1) * pageSize + 1)} - {Math.min(filteredProducts.length, currentPage * pageSize)}
                </span>
                <span>of</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredProducts.length}</span>
                <span>items</span>

                <span className="mx-2 text-slate-300 dark:text-slate-700">|</span>

                <span>Per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111726] text-slate-700 dark:text-slate-300 focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111726] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            currentPage === pageNum
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                              : 'bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="text-slate-400 px-1">... {totalPages}</span>
                    )}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111726] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MODERATION */}
      {activeTab === 'moderation' && (
        <AdminReportsTab onInspectProduct={setInspectProduct} />
      )}

      {/* Bulk Operations Toolbar */}
      <AdminBulkActionsBar
        selectedIds={selectedIds}
        onClearSelection={() => setSelectedIds([])}
        onBulkStatus={handleBulkStatus}
        onBulkFeature={handleBulkFeature}
        onBulkDiscount={handleBulkDiscount}
        onBulkDelete={handleBulkDelete}
        onExportSelected={handleExportSelected}
      />

      {/* Full Product Edit Drawer */}
      <ProductEditDrawer
        product={editProduct}
        isOpen={Boolean(editProduct)}
        onClose={() => setEditProduct(null)}
        onSave={handleSaveProduct}
      />

      {/* Quick Inspection Modal */}
      <ProductInspectModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
        onEdit={(p) => setEditProduct(p)}
      />

      {/* Product Creation Modal */}
      <ProductCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateProduct}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Delete Listing?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Are you sure you want to delete <span className="font-semibold text-slate-800 dark:text-slate-200">"{deleteConfirmation.title}"</span>? This will permanently remove the item from the Khoj marketplace.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(deleteConfirmation.id)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
