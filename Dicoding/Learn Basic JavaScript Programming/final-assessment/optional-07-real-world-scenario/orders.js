// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}


// TODO: buatlah variabel yang menampung data orders
let orders = []; // Variabel untuk menyimpan data orders

// TODO: selesaikan fungsi addOrder
  // Fungsi untuk menambahkan pesanan baru
function addOrder(customerName, items) {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    
    const newOrder = {
      id: generateUniqueId(),
      customerName,
      items,
      totalPrice,
      status: 'Menunggu'
    };
    
    orders.push(newOrder);
    return newOrder;
} 

// TODO: selesaikan fungsi updateOrderStatus
  // Fungsi untuk memperbarui status pesanan berdasarkan ID
function updateOrderStatus(orderId, status) {
  const order = orders.find(order => order.id === orderId);
  if (order) {
    order.status = status;
    return true;
  }
  return false;
} 

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
  // Fungsi untuk menghitung total pendapatan dari pesanan yang berstatus Selesai
function calculateTotalRevenue() {
  return orders
    .filter(order => order.status === 'Selesai')
    .reduce((sum, order) => sum + order.totalPrice, 0);
} 

// TODO: selesaikan fungsi deleteOrder
  // Fungsi untuk menghapus pesanan berdasarkan ID
function deleteOrder(id) {
  const index = orders.findIndex(order => order.id === id);
  if (index !== -1) {
    orders.splice(index, 1);
    return true;
  }
  return false;
} 

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
