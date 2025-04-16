import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoice = (order, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add content to the invoice
    doc.fontSize(20).text(`Invoice for Order ID: ${order._id}`, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleString()}`);
    doc.moveDown();

    // Loop through the menuItems and add them to the invoice
    order.menuItems.forEach(item => {
      doc.text(`${item.name} - $${item.price}`);
    });

    doc.moveDown();
    doc.text(`Total: $${order.totalPrice}`, { align: 'right' });

    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
};


