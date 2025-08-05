import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Dashboard.css';
import profileImg from '../assets/profile.jpg';

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Premium Room', price: 120, quantity: 1 },
    { id: 2, name: 'City View Suite', price: 200, quantity: 1 }
  ]);

  const [user] = useState({
    name: 'Tripti Verma',
    email: 'tripti.verma@example.com',
    role: 'Software Engineer',
    lastLogin: new Date().toLocaleDateString(),
    image: profileImg // Use the new local image
  });

  const [stats] = useState({
    totalUsers: 1250,
    activeUsers: 892,
    totalRevenue: '$45,230',
    growthRate: '+12.5%'
  });

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would implement search functionality
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="dashboard-container">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        user={user}
        handleLogout={handleLogout}
      />

      <main className="dashboard-main">
        <div className="dashboard-grid-areas">
          {/* Cart at top right */}
          <div className="dashboard-card cart-tile" style={{ gridArea: 'cart' }}>
            <h2>
              <span role="img" aria-label="cart">🛒</span> Shopping Cart
              <span className="cart-count-tile">{cartItemCount}</span>
            </h2>
            <div className="cart-items-tile">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price} per night</p>
                    </div>
                    <div className="cart-item-controls">
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="cart-footer-tile">
                <div className="cart-summary">
                  <span>Total: ${getCartTotal()}</span>
                </div>
                <button className="checkout-button">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>

          {/* Profile Information at top left */}
          <div className="dashboard-card profile-card profile-animate" style={{ gridArea: 'profile' }}>
            <h2>Profile Information</h2>
            <div className="profile-content">
              <div className="avatar profile-avatar-animate">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="profile-img"
                    onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
                  />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
              </div>
              <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Last Login:</strong> {user.lastLogin}</p>
              </div>
            </div>
          </div>

          {/* Statistics below profile info */}
          <div className="dashboard-card stats-card" style={{ gridArea: 'stats' }}>
            <h2>Statistics</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
              </div>
              <div className="stat-item">
                <h3>{stats.activeUsers}</h3>
                <p>Active Users</p>
              </div>
              <div className="stat-item">
                <h3>{stats.totalRevenue}</h3>
                <p>Total Revenue</p>
              </div>
              <div className="stat-item">
                <h3>{stats.growthRate}</h3>
                <p>Growth Rate</p>
              </div>
            </div>
          </div>

          {/* Quick Actions in the middle (top) */}
          <div className="dashboard-card actions-card" style={{ gridArea: 'actions' }}>
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-button">
                <span className="action-icon">👥</span>
                Manage Users
              </button>
              <button className="action-button">
                <span className="action-icon">📊</span>
                View Reports
              </button>
              <button className="action-button">
                <span className="action-icon">⚙️</span>
                Settings
              </button>
              <button className="action-button">
                <span className="action-icon">📧</span>
                Messages
              </button>
            </div>
          </div>

          {/* Recent Activity below quick actions */}
          <div className="dashboard-card activity-card" style={{ gridArea: 'activity' }}>
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <div className="activity-content">
                  <p>User login successful</p>
                  <small>2 minutes ago</small>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📝</span>
                <div className="activity-content">
                  <p>Profile updated</p>
                  <small>1 hour ago</small>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🔔</span>
                <div className="activity-content">
                  <p>New notification received</p>
                  <small>3 hours ago</small>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📈</span>
                <div className="activity-content">
                  <p>Monthly report generated</p>
                  <small>1 day ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#safety">Safety Information</a></li>
              <li><a href="#cancellation">Cancellation Options</a></li>
              <li><a href="#covid">COVID-19 Response</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Community</h3>
            <ul>
              <li><a href="#disaster">Disaster Relief</a></li>
              <li><a href="#refugees">Support Refugees</a></li>
              <li><a href="#combat">Combat Discrimination</a></li>
              <li><a href="#volunteer">Volunteer</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Hosting</h3>
            <ul>
              <li><a href="#host">Become a Host</a></li>
              <li><a href="#hosting">Hosting Resources</a></li>
              <li><a href="#community">Community Forum</a></li>
              <li><a href="#responsible">Responsible Hosting</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#accessibility">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-left">
              <p>&copy; 2024 Dashboard App. All rights reserved.</p>
            </div>
            <div className="footer-right">
              <div className="social-links">
                <a href="#facebook" className="social-link">📘</a>
                <a href="#twitter" className="social-link">🐦</a>
                <a href="#instagram" className="social-link">📷</a>
                <a href="#linkedin" className="social-link">💼</a>
              </div>
              <div className="language-selector">
                <select className="language-select">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard; 