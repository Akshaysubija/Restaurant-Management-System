import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateInvoice = (order, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add invoice content
    doc.fontSize(20).text('Restaurant Invoice', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.text(`User ID: ${order.user}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
    doc.moveDown();

    doc.fontSize(16).text('Ordered Items:', { underline: true });

    if (order.menuItems && order.menuItems.length > 0) {
      order.menuItems.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name} - ₹${item.price}`);
      });
    } else {
      doc.text('No items found in this order.');
    }

    doc.moveDown();
    doc.text(`Total Amount: ₹${order.totalPrice || 'N/A'}`);

    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
};
