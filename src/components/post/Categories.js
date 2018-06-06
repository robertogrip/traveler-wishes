import React, { Component } from 'react';
import { Link } from 'react-router';

//import contextApi
import AppContext from '../../context/Context';

class Categories extends Component {

	render() {
		return (
			<AppContext.Consumer>
				{(context) => {

					const categories = context.state.categories.map((category, index) => {
						const postCount = context.state.posts.filter(post => { return parseInt( post.category, 10) === parseInt( category.id, 10) }).length;
						
						return (
							<li key={index}>
								<Link to={ `/categorias/${category.id}`}>
									<i className="fa fa-angle-right"></i>
									{category.name} <small>({postCount})</small>
								</Link>
							</li>
						)
					});

					return (
						<div>
							<h4>Categorias</h4>
				            <ul className="icon-list list-category">
				                { categories }
				            </ul>
				        </div>
				    )
				}}
			</AppContext.Consumer>
		)
	}
}

export default Categories;