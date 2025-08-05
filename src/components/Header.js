import React from 'react';
import './Header.css';

function Header({ searchQuery, setSearchQuery, handleSearch, user, handleLogout }) {
  return (
    <header className="main-header">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search for rooms, hotels, or destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-icon-btn" aria-label="Search">
              <span className="search-icon">🔍</span>
            </button>
          </div>
        </form>
      </div>
      <div className="header-actions">
        <span className="user-welcome">Welcome, {user.name}</span>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;