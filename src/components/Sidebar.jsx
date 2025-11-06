import React from 'react'
import './Sidebar.css'

const categories = [
    { id: 'core-js', name: 'Core JavaScript', icon: 'fa-cog', badge: 12 },
    { id: 'advanced-js', name: 'Advanced JavaScript', icon: 'fa-rocket', badge: 6 },
    { id: 'react', name: 'React.js & Frontend', icon: 'fa-react', badge: 6 },
    { id: 'nodejs', name: 'Node.js Backend', icon: 'fa-node-js', badge: 10 },
    { id: 'databases', name: 'Databases', icon: 'fa-database', badge: 4 },
    { id: 'system-design', name: 'System Design', icon: 'fa-sitemap', badge: 4 },
]

function Sidebar({ activeCategory, setActiveCategory, progress, sidebarOpen, learningData }) {
    return (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
            <div className="sidebar-header">
                <h1><i className="fas fa-code"></i> JS Mastery</h1>
                <p>Interactive JavaScript Learning Platform</p>
            </div>
            
            <div className="progress-section">
                <div className="progress-title">Learning Progress</div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress-text">{progress}% Complete</div>
            </div>
            
            <div className="nav-menu">
                {categories.map(cat => (
                    <div
                        key={cat.id}
                        className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        <i className={`fas ${cat.icon} icon`}></i>
                        {cat.name}
                        <span className="badge">{learningData[cat.id]?.cards?.length || cat.badge}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar

