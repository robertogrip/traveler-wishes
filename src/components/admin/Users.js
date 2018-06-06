import React, { Component } from 'react';
import { Link } from 'react-router';
import Moment from 'moment';

//import contextApi
import AppContext from '../../context/Context';

class Users extends Component {
	render() {
		return (
            <AppContext.Consumer>
                {(context) => {
                    const userList = context.state.users.map((user, index) => {
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
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Editar">
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button className="item" data-toggle="tooltip" data-placement="top" title="Deletar">
                                            <i className="fa fa-trash-o"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>,
                            <tr className="spacer"  key={index+1000}></tr>
                        ]
                    });

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
                                                        <input type="text" placeholder="Nome, usuário ou status" className="form-control"/>
                                                    </div>
                                                </div>
                                                <button className="au-btn-filter">
                                                    <i className="fa fa-filter"></i>filtrar</button>
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
                                                    { userList }
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