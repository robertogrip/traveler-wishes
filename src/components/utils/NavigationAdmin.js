import React from 'react';
import {Link} from 'react-router';

//import contextApi
import AppContext from '../../context/Context';

class Navigation extends React.Component {

    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const { user } = context.state;

                    return (
                        <header className="header-desktop">
                            <div className="section__content section__content--p30">
                                <div className="container-fluid">
                                    <div className="header-wrap">
                                        <form className="form-header" action="" method="POST">
                                            <input className="au-input au-input--xl" type="text" name="search" placeholder="Procure por alguma coisa" />
                                            <button className="au-btn--submit" type="submit">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </form>
                                        <div className="header-button">
                                            <div className="account-wrap">
                                                <div className="account-item clearfix js-item-menu">
                                                    <div className="image">
                                                        <img src={user.avatar} alt={user.name} />
                                                    </div>
                                                    <div className="content">
                                                        <Link className="js-acc-btn" to="#">{user.name}</Link>
                                                    </div>
                                                    <div className="account-dropdown js-dropdown">
                                                        <div className="info clearfix">
                                                            <div className="image">
                                                                <Link to="#">
                                                                    <img src={user.avatar} alt={user.name} />
                                                                </Link>
                                                            </div>
                                                            <div className="content">
                                                                <h5 className="name">
                                                                    <Link to="#">{user.name}</Link>
                                                                </h5>
                                                                <span className="email">{user.email}</span>
                                                            </div>
                                                        </div>
                                                        <div className="account-dropdown__body">
                                                            <div className="account-dropdown__item">
                                                                <Link to="/admin/user/account">
                                                                    <i className="fa fa-user"></i>Conta</Link>
                                                            </div>
                                                            <div className="account-dropdown__item">
                                                                <Link to="/admin/user/settings">
                                                                    <i className="fa fa-gear"></i>Configurações</Link>
                                                            </div>
                                                        </div>
                                                        <div className="account-dropdown__footer">
                                                            <Link to="#">
                                                                <i className="fa fa-power-off"></i>Sair</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    )
                }}
            </AppContext.Consumer>
        );
    }
};

export default Navigation;