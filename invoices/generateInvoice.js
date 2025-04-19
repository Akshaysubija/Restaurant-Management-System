import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateInvoice = async (order, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  // Header
  doc.fontSize(22).text('Restaurant Invoice', { align: 'center' });
  doc.moveDown();

  // Order Details
  doc.fontSize(12).text(`Order ID: ${order._id}`);
  doc.text(`User ID: ${order.user}`);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
  doc.moveDown();

  // Ordered Items
  doc.fontSize(14).text('Ordered Items:');
  doc.moveDown(0.5);

  if (!order.items || order.items.length === 0) {
    // If there are no items or population failed.
    doc.text('No items found in this order.');
  } else {
    order.items.forEach((item, index) => {
      // Use the populated menu item's name if available; otherwise, fall back.
      const itemName = item.menuItem && item.menuItem.name ? item.menuItem.name : 'Unknown Item';
      const quantity = item.quantity || 0;
      const itemPrice = item.price || 0;
      const itemTotal = itemPrice * quantity;
      doc.text(`${index + 1}. ${itemName} x ${quantity} = \u20B9${itemTotal}`);
    });
  }

  doc.moveDown();
  // Use Unicode \u20B9 for the rupee symbol for proper formatting.
  doc.fontSize(16).text(`Total Amount: \u20B9${order.totalPrice}`, { align: 'right' });

  // Footer
  doc.moveDown(2);
  doc.fontSize(10).text('Thank you for your order!', { align: 'center' });

  doc.end();
};
