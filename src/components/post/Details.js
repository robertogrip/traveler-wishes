import React, { Component } from 'react';
import { Link } from 'react-router';

//import contextApi
import AppContext from '../../context/Context';

class postDetails extends Component {
	render() {
		return (
			<AppContext.Consumer>
				{(context) => {
					const post = context.state.posts.filter(post => { return post.slug === this.props.params.slug })[0];
					
					if( !post ) {
						return null;
					}

					return (
						<div>
							<div className="container">
					            <h1 className="page-title">Blog</h1>
					        </div>
							<div className="container">
					            <div className="row">
					                <div className="col-md-12">
					                    <article className="post">
					                        <header className="post-header">
					                            <div className="fotorama" data-allowfullscreen="true">
					                                <img src={post.image} alt="" title={post.name} />
					                            </div>
					                        </header>
					                        <div className="post-inner">
					                            <h4 className="post-title text-darken">{post.name}</h4>
					                            <ul className="post-meta">
					                                <li><i className="fa fa-calendar"></i><Link to="#">19 October, 2014</Link>
					                                </li>
					                                <li><i className="fa fa-user"></i><Link to="#">Keith Churchill</Link>
					                                </li>
					                                <li><i className="fa fa-tags"></i><Link to="#">Web</Link>
					                                </li>
					                                <li><i className="fa fa-comments"></i><Link to="#">0 Comments</Link>
					                                </li>
					                            </ul>
					                            <div dangerouslySetInnerHTML={{__html: post.content}} />
					                        </div>
					                    </article>
					                    <h3>Leave a Comment</h3>
					                    <form action="#">
					                        <div className="row">
					                            <div className="col-md-4">
					                                <div className="form-group">
					                                    <label>Name</label>
					                                    <input className="form-control" type="text" />
					                                </div>
					                            </div>
					                            <div className="col-md-4">
					                                <div className="form-group">
					                                    <label>E-mail</label>
					                                    <input className="form-control" type="text" />
					                                </div>
					                            </div>
					                            <div className="col-md-4">
					                                <div className="form-group">
					                                    <label>Website</label>
					                                    <input className="form-control" type="text" />
					                                </div>
					                            </div>
					                        </div>
					                        <div className="form-group">
					                            <label>Comment</label>
					                            <textarea className="form-control"></textarea>
					                        </div>
					                        <input className="btn btn-primary-invert" type="submit" value="Leave a Comment" />
					                    </form>
					                </div>
					            </div>
					        </div>
					        <div className="gap"></div>
				       	</div>
					)
				}}
			</AppContext.Consumer>
		)
	}
}

export default postDetails;