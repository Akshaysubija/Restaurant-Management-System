import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
        setFilteredItems(response.data);
        const uniqueCategories = ['All', ...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="menu-container">
      <h2 className="menu-heading">🍽️ Our Menu</h2>

      <div className="menu-filters">
        {categories.map((category, index) => (
          <button
            key={index}
            className={activeCategory === category ? 'filter-button active' : 'filter-button'}
            onClick={() => handleFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div className="menu-card" key={item._id}>
              <img src={item.image} alt={item.name} className="menu-image" />
              <h3>{item.name}</h3>
              <p className="menu-category">{item.category}</p>
              <p className="menu-description">{item.description}</p>
              <p className="menu-price">₹{item.price}</p>
              <button className="order-button">Order Now</button>
            </div>
          ))
        ) : (
          <p>Loading menu...</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
