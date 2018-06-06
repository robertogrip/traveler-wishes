import React, { Component } from 'react';

class Loading extends Component {
	render() {
		return (
			<div className="full-page __loading">
	            <div className="bg-holder full">
	                <div className="bg-mask"></div>
	                <div className="bg-img" style={{backgroundImage: 'url(/img/travel-wishes-loading.jpg)'}}></div>
	                <div className="bg-holder-content full text-white text-center">
	                    <a className="logo-holder" href="index.html">
	                        <img src="img/logo-white.png" alt="" title="Image Title" />
	                    </a>
	                    <div className="full-center">
	                        <div className="container">
	                            <div className="spinner-clock">
	                                <div className="spinner-clock-hour"></div>
	                                <div className="spinner-clock-minute"></div>
	                            </div>
	                            <h2 className="mb5">Carregando</h2>
	                            <p className="text-bigger">Aguarde alguns instantes</p>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		)
	}
}

export default Loading;