import React, { Component } from 'react';
import { Link } from 'react-router';
import Moment from 'moment';

//import contextApi
import AppContext from '../../../context/Context';

//import api reqs
import Api from '../../../api/Api';

class Posts extends Component {
    state = {
        filter: '',
        filteredPosts: []
    }

    handleChange = (e) => {
        this.setState({filter: e.target.value.trim()});
    }

	render() {
		return (
            <AppContext.Consumer>
                {(context) => {
                    this.deletePost = (e) => {
                        const postId = e.target.getAttribute('data-post-id');

                        if( postId ){
                            Api.posts.delete( postId )
                                .then(response => {
                                    if( response.status === 200 && response.data ) {
                                        context.updateState({
                                            posts: context.state.posts.filter(post => post.id !== response.data.id)
                                        });
                                        context.notify.success("Postagem excluída com sucesso!");
                                    } else {
                                        context.notify.error("Houve um problema ao excluir, tente novamente!");
                                    }
                                });
                        }
                    }

                    const postsListElements = (post, index) => {
                        const user = context.state.users.filter(user => parseInt(user.id, 10) === post.user );
                        return [
                            <tr className="tr-shadow" key={index}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <span className="block-email">{user[0].name}</span>
                                </td>
                                <td>{Moment(new Date(post.createdAt).toString()).format('DD-MM-YYYY')}</td>
                                <td>
                                    {   post.active ?
                                        <span className="status--process">Publicado</span>
                                        :
                                        <span className="status--denied">Não publicado</span>
                                    }
                                </td>
                                <td>
                                    <div className="table-data-feature">
                                        <Link className="item" data-toggle="tooltip" data-placement="top" title="Editar" to={{pathname: `/admin/posts/edit/${post.slug}`, state: post}}>
                                            <i className="fa fa-pencil"></i>
                                        </Link>
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Deletar" data-post-id={post.id} onClick={this.deletePost}>
                                            <i className="fa fa-trash-o"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>,
                            <tr className="spacer"  key={index+1000}></tr>
                        ]
                    };

                    const postsList = (this.state.filteredPosts.length && this.state.filteredPosts.map( postsListElements ) ) || context.state.posts.map( postsListElements );
                    
                    this.keyFilterPosts = (e) => {
                        if( e.key === "Enter" ) {
                            this.filterPosts();
                        }
                    }

                    this.filterPosts = () => {
                        if( this.state.filter ) {
                            const posts = context.state.posts.filter((post) => post.title.toLowerCase().indexOf( this.state.filter.toLowerCase() ) !== -1 );

                            this.setState({
                                filteredPosts: posts
                            });
                        } else if( this.state.filteredPosts.length > 0 ) {
                            this.setState({
                                filteredPosts: []
                            });
                        }
                    }

                    return (
                        <div className="section__content section__content--p30">
                            <div className="container-fluid">
                    			<div className="row">
                                    <div className="col-md-12">
                                        <h3 className="title-5 m-b-35">Postagens</h3>
                                        <div className="table-data__tool">
                                            <div className="table-data__tool-left">
                                                <div className="col-md-7">
                                                    <div className="row">
                                                        <input type="text" placeholder="Nome, usuário ou status" className="form-control" value={this.state.filter} onChange={this.handleChange} onKeyPress={this.keyFilterPosts} />
                                                    </div>
                                                </div>
                                                <button className="au-btn-filter" onClick={this.filterPosts}>
                                                    <i className="fa fa-filter"></i>
                                                    filtrar
                                                </button>
                                            </div>
                                            <div className="table-data__tool-right">
                                                <Link to="/admin/posts/new" className="au-btn au-btn-icon au-btn--green au-btn--small">
                                                    <i className="fa fa-plus"></i>
                                                    Novo post
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="table-responsive table-responsive-data2">
                                            <table className="table table-data2">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>nome</th>
                                                        <th>usuário</th>
                                                        <th>data</th>
                                                        <th>status</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { postsList }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
		)
	}
}

export default Posts;