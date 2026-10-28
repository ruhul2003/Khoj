/**
 * Client-side catalog export utility for Khoj Admin Panel
 */

export function exportProductsToCsv(products = [], filename = `khoj-products-${Date.now()}.csv`) {
  if (!products || products.length === 0) {
    alert('No products available to export.');
    return;
  }

  const headers = [
    'Product ID',
    'Title',
    'Category',
    'Condition',
    'Price (BDT)',
    'Original Price (BDT)',
    'Status',
    'Is Featured',
    'Stock',
    'Views',
    'Seller Name',
    'Seller Phone',
    'Location',
    'Created At'
  ];

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = products.map(p => [
    escapeCsv(p._id || p.id),
    escapeCsv(p.title),
    escapeCsv(p.category),
    escapeCsv(p.condition),
    escapeCsv(p.price),
    escapeCsv(p.originalPrice || 0),
    escapeCsv(p.status || 'Available'),
    escapeCsv(p.isFeatured ? 'YES' : 'NO'),
    escapeCsv(p.stock !== undefined ? p.stock : 1),
    escapeCsv(p.views || 0),
    escapeCsv(p.sellerName || ''),
    escapeCsv(p.sellerPhone || ''),
    escapeCsv(p.location || ''),
    escapeCsv(p.createdAt || '')
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportProductsToJson(products = [], filename = `khoj-products-${Date.now()}.json`) {
  if (!products || products.length === 0) {
    alert('No products available to export.');
    return;
  }

  const jsonContent = JSON.stringify(products, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
