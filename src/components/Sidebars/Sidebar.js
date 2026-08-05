import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserThunk } from "../../store/userSlice";
export function Sidebar(props){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user) || {};
    const userInitial = user.name ? user.name.charAt(0) : 'U';
    return(
            <div className="sidebar">
                <div className="sidebar__logo">
                    <span className="sidebar__logo-mark">TM</span>
                    <span className="sidebar__logo-text">Taskboard</span>
                </div>

                <nav className="sidebar__nav">
                    <NavLink to="/" className={({ isActive }) => `sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}>
                        <span className="sidebar__nav-icon">01</span>
                        <span className="sidebar__nav-text">Мои задачи</span>
                    </NavLink>

                    <NavLink to="/analytics" className={({ isActive }) => `sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}>
                        <span className="sidebar__nav-icon">02</span>
                        <span className="sidebar__nav-text">Аналитика</span>
                    </NavLink>
                </nav>

                <div className="sidebar__user">
                    <div className="sidebar__user-avatar">{userInitial}</div>
                    <div className="sidebar__user-info">
                        <div className="sidebar__user-name">{user.name}</div>
                    </div>

                    <button
                        className="sidebar__logout"
                        type="button"
                        onClick={()=>dispatch(logoutUserThunk())}
                    >
                        Выйти
                    </button>
                </div>
            </div>
    )
}
