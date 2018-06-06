import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

//import contextApi
import AppContext from '../../../context/Context';

//import api reqs
import Api from '../../../api/Api';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: '',
            slug: '',
            title: '',
            content: '',
            active: false,
            categories: [],
            description: '',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleChange = (value) => {
        this.setState({ content: value });
    }

    handleInputChange = (e) => {
        let postData = {};
        postData[e.target.name] = e.target.value;

        if( e.target.name === "title" ) {
            postData['slug'] = e.target.value.toLowerCase().trim().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
        }

        this.setState( postData );
    }

    handleSelectChange = (selectedOption) => {
        this.setState({ categories: selectedOption });
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'direction', 'code-block',
        'link', 'image'
    ]   

	render() {
		return (
            <AppContext.Consumer>
                {(context) => {
                    const { user } = context.state;

                    if( user && !this.state.user ) {
                        this.setState({ user: parseInt(user.id, 10) });
                    }

                    this.addNewPost = () => {

                        Api.posts.create( this.state )
                            .then(response => {
                                if( response.status === 201 && response.data ) {
                                    context.updateState({
                                        posts: [...context.state.posts, response.data]
                                    });
                                    context.notify.success("Postagem criada com sucesso!");
                                    this.props.router.push('/admin/posts');
                                } else {
                                    context.notify.error("Houve um problema ao criar a postagem, tente novamente!");
                                }
                            });
                    }

                    const categoriesList = context.state.categories.map((category, index) => {
                        return {
                            value: category.id,
                            label: category.name
                        }
                    });

                    return (
                        <div className="section__content section__content--p30">
                            <div className="container-fluid">
                    			<div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header"><strong>Nova Postagem</strong></div>
                                            <div className="card-body card-block">
                                                <div className="form-group">
                                                    <label htmlFor="title" className="form-control-label">Título</label>
                                                    <input type="text" name="title" id="title" placeholder="Título/Nome da postagem" className="form-control" value={this.state.title} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description" className=" form-control-label">Descrição</label>
                                                    <input type="text" name="description" id="description" placeholder="Descrição da postagem" className="form-control" value={this.state.description} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="category" className=" form-control-label">Categoria</label>
                                                    <Select
                                                        name="form-field-name"
                                                        id="category"
                                                        multi={true}
                                                        value={this.state.categories}
                                                        onChange={this.handleSelectChange}
                                                        options={categoriesList}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="country" className=" form-control-label">Conteúdo</label>
                                                    <ReactQuill value={this.state.content} onChange={this.handleChange} theme="snow" modules={this.modules} formats={this.formats}>
                                                        <div className="post-edit-area"/>
                                                    </ReactQuill>
                                                </div>
                                                <div className="form-actions form-group">
                                                    <button type="submit" className="btn btn-success btn-sm" onClick={this.addNewPost}>Salvar</button>
                                                    <Link to="/admin/posts" className="btn btn-danger btn-sm">Cancelar</Link>
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