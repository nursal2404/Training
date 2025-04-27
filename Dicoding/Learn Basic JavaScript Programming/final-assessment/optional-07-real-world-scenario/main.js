import { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder } from './orders.js';

function displayOrders() {
  let output = '[\n';
  
  orders.forEach((order, index) => {
    output += '  {\n';
    output += `    id: '${order.id}',\n`;
    output += `    customerName: '${order.customerName}',\n`;
    output += '    items: [\n';
    
    order.items.forEach(item => {
      output += `      { name: '${item.name}', price: ${item.price} },\n`;
    });
    
    output += '    ],\n';
    output += `    totalPrice: ${order.totalPrice},\n`;
    output += `    status: '${order.status}'\n`;
    output += '  }' + (index < orders.length - 1 ? ',' : '') + '\n';
  });
  
  output += ']';
  console.log(output);
}

// Menambahkan pesanan baru
addOrder('Alice', [
  { name: 'Nasi Goreng', price: 20000 },
  { name: 'Teh Manis', price: 5000 }
]);

addOrder('Bob', [
  { name: 'Mie Goreng', price: 15000 },
  { name: 'Kopi', price: 10000 }
]);

console.log('Initial Orders:');
displayOrders(); // Menampilkan orders awal

/**
 * Output yang diharapkan:
 * [
 *   {
 *     id: '_someUniqueId1',
 *     customerName: 'Alice',
 *     items: [
 *       { name: 'Nasi Goreng', price: 20000 },
 *       { name: 'Teh Manis', price: 5000 }
 *     ],
 *     totalPrice: 25000,
 *     status: 'Menunggu'
 *   },
 *   {
 *     id: '_someUniqueId2',
 *     customerName: 'Bob',
 *     items: [
 *       { name: 'Mie Goreng', price: 15000 },
 *       { name: 'Kopi', price: 10000 }
 *     ],
 *     totalPrice: 25000,
 *     status: 'Menunggu'
 *   }
 * ]
 */

updateOrderStatus(orders[0].id, 'Diproses');
updateOrderStatus(orders[1].id, 'Selesai');

console.log('\nOrders after status update:');
displayOrders(); //// Menampilkan orders setelah pembaruan status

/**
 * Output yang diharapkan:
 * [
 *   {
 *     id: '_someUniqueId1',
 *     customerName: 'Alice',
 *     items: [
 *       { name: 'Nasi Goreng', price: 20000 },
 *       { name: 'Teh Manis', price: 5000 }
 *     ],
 *     totalPrice: 25000,
 *     status: 'Diproses'
 *   },
 *   {
 *     id: '_someUniqueId2',
 *     customerName: 'Bob',
 *     items: [
 *       { name: 'Mie Goreng', price: 15000 },
 *       { name: 'Kopi', price: 10000 }
 *     ],
 *     totalPrice: 25000,
 *     status: 'Selesai'
 *   }
 * ]
 */

console.log('\nTotal Revenue:');
console.log(calculateTotalRevenue()); //// Menghitung total pendapatan dari pesanan yang berstatus Selesai
/**
 * Output yang diharapkan:
 * 25000
 */

deleteOrder(orders[0].id);

console.log('\nOrders after deletion:');
displayOrders(); // Menampilkan orders setelah penghapusan

/**
 * Output yang diharapkan:
 * [
 *   {
 *     id: '_someUniqueId2',
 *     customerName: 'Bob',
 *     items: [
 *       { name: 'Mie Goreng', price: 15000 },
 *       { name: 'Kopi', price: 10000 }
 *     ],
 *     totalPrice: 25000,
 *     status: 'Selesai'
 *   }
 * ]
 */
