// models/Menu.js
import mongoose from 'mongoose';
const menuSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String
});
const Menu = mongoose.model('Menu', menuSchema);
export default Menu;