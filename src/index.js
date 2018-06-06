import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

//import api reqs
import Api from './api/Api';

//import styles
import './styles/icomoon.css';
import './styles/bootstrap.css';
import './styles/font-awesome.css';
import './styles/index.css';

//import components
import Blog from './components/blog/Index';
import PostDetails from './components/post/Details';
import Category from './components/category/Index';

//import utils components
import Navigation from './components/utils/Navigation';
import Footer from './components/utils/Footer';
import Loading from './components/utils/Loading';

//import utilsAdmin components
import NavigationAdmin from './components/utils/NavigationAdmin';
import SidebarAdmin from './components/admin/Sidebar';
// import Loading from './components/utils/Loading';

//import components
import Admin from './components/admin/Index';
import PostsAdmin from './components/admin/post/Posts';
import NewPostAdmin from './components/admin/post/NewPost';
import EditPostAdmin from './components/admin/post/EditPost';

import UsersAdmin from './components/admin/user/Users';
import NewUserAdmin from './components/admin/user/NewUser';
import EditUserAdmin from './components/admin/user/EditUser';

//import contextApi
import AppContext from './context/Context';

//import Alert
import { ToastContainer } from 'react-toastify';
import Alerts from './components/utils/Alerts';
import 'react-toastify/dist/ReactToastify.css';

class AppProvider extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            posts: [],
            galeries: [],
            comments: [],
            categories: [],
            isLoading: false,
            userIsLogged: true,
            postsFiltered: null
        };
    }

    componentDidMount() {
        for ( const req in Api ) {
            Api[req].getAll()
                .then(response => {
                    const update = {};
                    if( (response && response.data) ) {
                        update[req] = response.data;
                        this.updateState( update );
                    }
                });
        };
    }

    updateState = (data) => {
        this.setState(data);
    }

    render() {
        const { children } = this.props;

        if( !this.state.userIsLogged ) {
            return <Loading />;
        }

        return (
            <AppContext.Provider value={{state: this.state, updateState: this.updateState}}>
                { ( this.state.isLoading && <Loading /> ) || null }
                <Navigation/>
                { children }
                <Footer/>
                <ToastContainer />
            </AppContext.Provider>
        )
    }
}

class AppProviderAdmin extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            users: [],
            posts: [],
            categories: [],
            isLoggedUser: false
        };
    }

    componentDidMount() {
        const tablesWhiteList = ["users", "posts", "categories"];

        for ( const req in Api ) {
            if( tablesWhiteList.indexOf( req ) !== -1 ) {
                Api[req].getAll()
                    .then(response => {
                        const update = {};
                        if( (response && response.data) ) {
                            update[req] = response.data;
                            if( req === "users" ) {
                                update['isLoggedUser'] = true;
                                update['user'] = response.data[0];
                            }
                            
                            this.updateState( update );
                        }
                    });
            }
        };
    }

    updateState = (data) => {
        this.setState(data);
    }

    render() {
        const { children } = this.props;
        
        if( !this.state.isLoggedUser ) {
            return <Loading/>
        }

        return (
            <AppContext.Provider value={{state: this.state, updateState: this.updateState, notify: Alerts}}>
                <SidebarAdmin/>
                <div className="page-container">
                    <NavigationAdmin/>
                    <div className="main-content">
                        { children }
                    </div>
                </div>
                <ToastContainer />
            </AppContext.Provider>
        )
    }
}

ReactDOM.render(
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
        <Route component={AppProvider}>
            <Route component={Blog} path="/" />
            <Route component={PostDetails} path="/post/:slug" />
            <Route component={Category} path="/categories/:slug" />
        </Route>
        <Route component={AppProviderAdmin}>
            <Route component={Admin} path="/admin" />
            <Route component={PostsAdmin} path="/admin/posts" />
            <Route component={NewPostAdmin} path="/admin/posts/new" />
            <Route component={EditPostAdmin} path="/admin/posts/edit/:slug" />
            <Route component={UsersAdmin} path="/admin/users" />
            <Route component={NewUserAdmin} path="/admin/users/new" />
            <Route component={EditUserAdmin} path="/admin/users/edit/:slug" />
        </Route>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
