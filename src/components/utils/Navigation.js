import React from 'react';
import {Link} from 'react-router';

//import contextApi
import AppContext from '../../context/Context';

class Navigation extends React.Component {

    constructor() {
        super();

        this.state = {
            floatBar: false
        }

        window.onscroll = function() {
            if( window.$('html, body').scrollTop() > 150 ) {
                this.setState({floatBar: true});
            }
            if( window.$('html, body').scrollTop() === 0 ) {
                this.setState({floatBar: false});
            }
        }.bind(this);
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        <header className={`float-header ${ ( this.state.floatBar && 'float-bar' ) || ''}`}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-6 text-left">
                                        <Link to="/">
                                            <img src="/img/logo.svg" alt="Desejos de Viagens" />
                                        </Link>
                                    </div>
                                    <div className="col-xs-6 text-right">
                                        <Link to="/admin" className="bar-icon">
                                            <i className="fa fa-bars"></i>
                                        </Link>
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