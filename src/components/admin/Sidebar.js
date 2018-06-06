import React, { Component } from 'react';
import { Link } from 'react-router';

//import adminStyles
import '../../styles/admin/bootstrap.css';
import '../../styles/admin/index.css';

class SidebarAdmin extends Component {
    render() {
        return (
            <aside className="menu-sidebar d-none d-lg-block">
                <div className="logo">
                    <Link to="/admin">
                        <img src="/img/logo.svg" alt="Cool Admin" />
                    </Link>
                </div>
                <div className="menu-sidebar__content js-scrollbar1">
                    <nav className="navbar-sidebar">
                        <ul className="list-unstyled navbar__list">
                            <li>
                                <Link to="/admin" activeClassName="active">
                                    <i className="fa fa-tachometer"></i>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/posts" activeClassName="active">
                                    <i className="fa fa-list"></i>
                                    Postagens
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/users" activeClassName="active">
                                    <i className="fa fa-users"></i>
                                    Usuários
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        )
    }
}

export default SidebarAdmin;