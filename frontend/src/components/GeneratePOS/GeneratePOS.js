import { jsPDF } from 'jspdf';

export const generatePOS = (transaction) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(20);
  doc.text('Stock Transaction Receipt', pageWidth / 2, 20, { align: 'center' });

  // Transaction Details
  doc.setFontSize(12);
  const startY = 40;
  const lineHeight = 10;

  doc.text(`Transaction ID: ${transaction.transactionId}`, 20, startY);
  doc.text(`Date: ${new Date(transaction.timestamp).toLocaleString()}`, 20, startY + lineHeight);
  doc.text(`Type: ${transaction.type}`, 20, startY + lineHeight * 2);
  doc.text(`Symbol: ${transaction.symbol}`, 20, startY + lineHeight * 3);
  doc.text(`Quantity: ${transaction.quantity}`, 20, startY + lineHeight * 4);
  doc.text(`Price per Share: $${transaction.price.toFixed(2)}`, 20, startY + lineHeight * 5);
  
  const total = transaction.quantity * transaction.price;
  doc.text(`Total Amount: $${total.toFixed(2)}`, 20, startY + lineHeight * 6);

  // Footer
  doc.setFontSize(10);
  doc.text('Thank you for trading with us!', pageWidth / 2, 250, { align: 'center' });

  // Save the PDF
  const fileName = `transaction_${transaction.transactionId}.pdf`;
  doc.save(fileName);
};