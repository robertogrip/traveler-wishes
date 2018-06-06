import React, { Component } from 'react';
// import { Link } from 'react-router';
import { Parallax, Background } from 'react-parallax';

//import contextApi
import AppContext from '../../context/Context';

//import Componenets
import Post from '../post/Index';

class Blog extends Component {

    filteredPost = (posts, search) => {
        return (
            posts.filter(post => {
                return post.name.indexOf( search ) !== -1
            })
        )
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const posts = ( this.props.location.query.search && this.filteredPost( context.state.posts, this.props.location.query.search ) ) || context.state.posts;

                    const postList = posts.map((item, index) => (
                        <div key={index} className="col-md-4">
                            <Post details={item} index={index} />
                        </div>
                    ));

                    return (
                        <section>
                            <div className="header-image">
                                <Parallax strength={300}>
                                    <Background className="custom-bg">
                                        <img src="./img/travel-wishes-loading.jpg" alt="fill murray" />
                                    </Background>
                                    <div className="container">
                                        <h1 className="page-title">Desejos de viagens</h1>
                                    </div>
                                </Parallax>
                            </div>

                            <div className="container">
                                <div className="row">
                                        
                                    { postList }

                                    {/*<ul className="pagination">
                                        <li className="active">
                                            <Link to="#">1</Link>
                                        </li>
                                        <li>
                                            <Link to="#">2</Link>
                                        </li>
                                        <li>
                                            <Link to="#">3</Link>
                                        </li>
                                        <li>
                                            <Link to="#">4</Link>
                                        </li>
                                        <li>
                                            <Link to="#">5</Link>
                                        </li>
                                        <li>
                                            <Link to="#">6</Link>
                                        </li>
                                        <li>
                                            <Link to="#">7</Link>
                                        </li>
                                        <li className="dots">...</li>
                                        <li>
                                            <Link to="#">43</Link>
                                        </li>
                                        <li className="next">
                                            <Link to="#">Next Page</Link>
                                        </li>
                                    </ul>*/}
                                </div>
                            </div>
                            <div className="gap"></div>
                        </section>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default Blog;