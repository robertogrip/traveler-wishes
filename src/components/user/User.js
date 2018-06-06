import React, { Component } from 'react';


import AppContext from '../../context/Context';

class User extends Component {

	render() {
		return (
			<AppContext.Consumer>
				{(context) => {
					if( !context.state.userIsLogged ) {
						return null;
					}

					return (
						<div>
							<h1>{context.state.user.firstName + ' ' + context.state.user.lastName}</h1>
						</div>
					)
				}}
			</AppContext.Consumer>
		)
	}
}

export default User;