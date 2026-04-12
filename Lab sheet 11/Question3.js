const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('userLogin', (username, role) => {
    console.log(`User logged in: ${username}`);
    console.log(`Role: ${role}`);
    console.log('-----------------------------');
});

eventEmitter.on('userLogin', (username) => {
    console.log(`Welcome back, ${username}! Sending notification...`);
    console.log('-----------------------------');
});

eventEmitter.on('orderPlaced', (orderId, amount, items) => {
    console.log(`New order received! Order ID: ${orderId}`);
    console.log(`Total Amount: ₹${amount}`);
    console.log(`Items: ${items.join(', ')}`);
    console.log('Order processing started...');
    console.log('-----------------------------');
});

eventEmitter.on('paymentSuccess', (orderId, amount) => {
    console.log(`Payment successful for Order: ${orderId}`);
    console.log(`Amount Paid: ₹${amount}`);
    console.log('Sending invoice to customer...');
    console.log('-----------------------------');
});

eventEmitter.on('errorOccurred', (errorMessage) => {
    console.log(`⚠️  Error: ${errorMessage}`);
    console.log('System alert triggered');
    console.log('-----------------------------');
});

console.log("=== Event-Driven Application Started ===\n");

eventEmitter.emit('userLogin', 'Prasanth', 'Premium User');

eventEmitter.emit('orderPlaced', 'ORD78945', 2499, ['Wireless Headphones', 'USB Cable', 'Phone Case']);

eventEmitter.emit('paymentSuccess', 'ORD78945', 2499);

eventEmitter.emit('userLogin', 'Rahul', 'Standard User');

eventEmitter.emit('errorOccurred', 'Database connection timeout');

setTimeout(() => {
    eventEmitter.emit('orderPlaced', 'ORD78946', 899, ['Smart Watch']);
}, 1500);

console.log("\nAll events triggered. Event listeners are handling them asynchronously.\n");