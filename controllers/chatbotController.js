// controllers/chatbotController.js
import Order from '../models/Order.js';
import Menu from '../models/Menu.js';

const handleChat = async (req, res) => {
  const { message, userId } = req.body;
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes('order')) {
    const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!order) return res.json({ response: "You don't have any recent orders." });

    return res.json({
      response: `Your last order status is: ${order.status}. Delivery status: ${order.deliveryStatus}`
    });
  }

  if (lowerCaseMessage.includes('menu')) {
    const menuItems = await Menu.find().limit(5);
    return res.json({
      response: `Here are some menu items: ${menuItems.map(item => item.name).join(', ')}`
    });
  }

  if (lowerCaseMessage.includes('popular') || lowerCaseMessage.includes('suggest')) {
    // Simple AI: Fetch top 3 ordered items
    const orders = await Order.find().populate('items.menuItem');
    const countMap = {};

    for (const order of orders) {
      for (const i of order.items) {
        const name = i.menuItem.name;
        countMap[name] = (countMap[name] || 0) + 1;
      }
    }

    const popularItems = Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([item]) => item);

    return res.json({
      response: `Popular menu items: ${popularItems.join(', ')}`
    });
  }

  return res.json({
    response: "Sorry, I didn't understand that. Try asking about your order or the menu!"
  });
};

export { handleChat };
