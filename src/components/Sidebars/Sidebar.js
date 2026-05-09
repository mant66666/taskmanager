export function Sidebar(){
    return(
            <div className="sidebar">
                <div className="sidebar__logo">
                    <span className="sidebar__logo-text">📋 TASK MANAGER</span>
                </div>

                <nav className="sidebar__nav">
                    <div className="sidebar__nav-item sidebar__nav-item--active">
                        <span className="sidebar__nav-icon">📊</span>
                        <span className="sidebar__nav-text">Мои задачи</span>
                    </div>

                    <div className="sidebar__nav-item">
                        <span className="sidebar__nav-icon">📈</span>
                        <span className="sidebar__nav-text">Аналитика</span>
                    </div>
                </nav>

                <div className="sidebar__user">
                    <div className="sidebar__user-avatar">👤</div>
                    <div className="sidebar__user-info">
                        <div className="sidebar__user-name">Алексей Смирнов</div>
                        <div className="sidebar__user-email">alex@example.com</div>
                    </div>
                </div>
            </div>
    )
}