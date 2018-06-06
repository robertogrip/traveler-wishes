import React, { Component } from 'react';
import { Link } from 'react-router';

class Post extends Component {
	render() {
		return (
			<div className="article post">
                <header className="post-header">
                    <Link className="hover-img" to={{pathname: `/post/${this.props.details.slug}`}}>
                        <img src={this.props.details.image} alt="" title="196_365" /><i className="fa fa-link box-icon-# hover-icon round"></i>
                    </Link>
                </header>
                <div className="post-inner">
                    <ul className="post-meta">
                        <li>
                            <Link to={{pathname: `/post/${this.props.details.slug}`}} className="-by">por suzanne gripa</Link>
                        </li>
                        <li>
                            <Link to={{pathname: `/post/${this.props.details.slug}`}}>Maio 10, 2018 </Link>
                        </li>
                    </ul>
                    <h4 className="post-title"><Link className="text-darken" to={{pathname: `/post/${this.props.details.slug}`}}>{ this.props.details.title }</Link></h4>
                    <p className="post-desciption">{ this.props.details.description }</p><Link className="btn btn-small btn-primary-invert" to={{pathname: `/post/${this.props.details.slug}`}}>Leia mais</Link>
                </div>
            </div>
		)
	}
}

export default Post;