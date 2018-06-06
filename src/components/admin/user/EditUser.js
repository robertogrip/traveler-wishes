import React, { Component } from 'react';
import { Link } from 'react-router';

//import contextApi
import AppContext from '../../../context/Context';

//import api reqs
import Api from '../../../api/Api';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.location.state.id,
            bio: props.location.state.bio,
            slug: props.location.state.slug,
            name: props.location.state.name,
            email: props.location.state.email,
            password: props.location.state.password,
            permission: props.location.state.permission,
            updatedAt: new Date().getTime(),
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (e) => {
        let userData = {};
        userData[e.target.name] = e.target.value;

        if( e.target.name === "name" ) {
            userData['slug'] = e.target.value.toLowerCase().trim().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
        }

        this.setState( userData );
    }   

    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    this.addNewUser = () => {

                        Api.users.update( this.state.id, this.state )
                            .then(response => {
                                if( response.status === 200 && response.data ) {
                                    context.updateState({
                                        users: [...context.state.users.filter(user => user.id !== response.data.id), response.data].sort((previousUser, nextUser) => { return previousUser.id - nextUser.id})
                                    });
                                    context.notify.success("Usuário editado com sucesso!");
                                    this.props.router.push('/admin/users');
                                } else {
                                    context.notify.error("Houve um problema ao editar o usuário, tente novamente!");
                                }
                            });
                    }

                    return (
                        <div className="section__content section__content--p30">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header"><strong>Novo Usuário</strong></div>
                                            <div className="card-body card-block">
                                                <div className="form-group">
                                                    <label htmlFor="name" className="form-control-label">Nome</label>
                                                    <input type="text" name="name" id="name" placeholder="Nome do usuário" className="form-control" value={this.state.name} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email" className=" form-control-label">Email</label>
                                                    <input type="text" name="email" id="email" placeholder="Email o usuário" className="form-control" value={this.state.email} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="bio" className=" form-control-label">Biografia</label>
                                                    <input type="text" name="bio" id="bio" placeholder="Biografia do usuário" className="form-control" value={this.state.bio} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="permission" className=" form-control-label">Permissão</label>
                                                    <select name="permission" size="1" id="permission" className="form-control" value={this.state.permission} onChange={this.handleInputChange}>
                                                        <option value="normal">Normal</option>
                                                        <option value="admin">Administrador</option>
                                                    </select>
                                                </div>
                                                <div className="form-actions form-group">
                                                    <button type="submit" className="btn btn-success btn-sm" onClick={this.addNewUser}>Salvar</button>
                                                    <Link to="/admin/users" className="btn btn-danger btn-sm">Cancelar</Link>
                                                </div>
                                            </div>
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

export default NewPost;