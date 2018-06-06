import React, { Component } from 'react';
import { Link } from 'react-router';
import Moment from 'moment';

//import contextApi
import AppContext from '../../../context/Context';

//import api reqs
import Api from '../../../api/Api';

class Users extends Component {
    state = {
        filter: '',
        filteredUsers: []
    }

    handleChange = (e) => {
        this.setState({filter: e.target.value.trim()});
    }

	render() {
		return (
            <AppContext.Consumer>
                {(context) => {
                    this.deleteUser = (e) => {
                        const userId = e.target.getAttribute('data-user-id');

                        if( userId ){
                            Api.users.delete( userId )
                                .then(response => {
                                    if( response.status === 200 && response.data ) {
                                        context.updateState({
                                            users: context.state.users.filter(user => user.id !== response.data.id)
                                        });
                                        context.notify.success("Usuário excluída com sucesso!");
                                    } else {
                                        context.notify.error("Houve um problema ao excluir, tente novamente!");
                                    }
                                });
                        }
                    }

                    const usersListElements = (user, index) => {
                        return [
                            <tr className="tr-shadow" key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <span className="block-email">{user.permission}</span>
                                </td>
                                <td>{ Moment(new Date(user.createdAt).toString()).format('DD-MM-YYYY') }</td>
                                <td>
                                    <div className="table-data-feature">
                                        <Link className="item" data-toggle="tooltip" data-placement="top" title="Editar" to={{pathname: `/admin/users/edit/${user.slug}`, state: user}}>
                                            <i className="fa fa-pencil"></i>
                                        </Link>
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Deletar" data-user-id={user.id} onClick={this.deleteUser}>
                                            <i className="fa fa-trash-o"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>,
                            <tr className="spacer"  key={index+1000}></tr>
                        ]
                    };

                    const usersList = (this.state.filteredUsers.length && this.state.filteredUsers.map( usersListElements ) ) || context.state.users.map( usersListElements );
                    
                    this.keyFilterUsers = (e) => {
                        if( e.key === "Enter" ) {
                            this.filterUsers();
                        }
                    }

                    this.filterUsers = () => {
                        if( this.state.filter ) {
                            const users = context.state.users.filter((user) => user.name.toLowerCase().indexOf( this.state.filter.toLowerCase() ) !== -1 );

                            this.setState({
                                filteredUsers: users
                            });
                        } else if( this.state.filteredUsers.length > 0 ) {
                            this.setState({
                                filteredUsers: []
                            });
                        }
                    }

                    return (
                        <div className="section__content section__content--p30">
                            <div className="container-fluid">
                    			<div className="row">
                                    <div className="col-md-12">
                                        <h3 className="title-5 m-b-35">Usuários</h3>
                                        <div className="table-data__tool">
                                            <div className="table-data__tool-left">
                                                <div className="col-md-7">
                                                    <div className="row">
                                                        <input type="text" placeholder="Nome, usuário ou status" className="form-control" value={this.state.filter} onChange={this.handleChange} onKeyPress={this.keyFilterUsers} />
                                                    </div>
                                                </div>
                                                <button className="au-btn-filter" onClick={this.filterUsers}>
                                                    <i className="fa fa-filter"></i>
                                                    filtrar
                                                </button>
                                            </div>
                                            <div className="table-data__tool-right">
                                                <Link to="/admin/users/new" className="au-btn au-btn-icon au-btn--green au-btn--small">
                                                    <i className="fa fa-plus"></i>
                                                    Novo usuário
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="table-responsive table-responsive-data2">
                                            <table className="table table-data2">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>nome</th>
                                                        <th>permissão</th>
                                                        <th>data</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { usersList }
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

export default Users;