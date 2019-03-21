import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {carouselImages} from "../actions";
import {settings} from "../actions";
import {instagram} from "../actions";
{/*import InstagramCarousel from "./InstagramCarousel"
import Register from "./Register";
import Footer from "./Footer";
import {auth} from "../actions";
import ReactInterval from 'react-interval';*/}

class Home extends Component {
	state = {
	}

	componentDidMount() {
		if (!this.props.instagram.length) {
	    	this.props.fetchInstagram();
	    	this.props.fetchSettings();
		}
	}	

	render(){
		let is_prelaunch;
		let prelaunch_code;

		if(!this.props.settings.isLoading){
			let prelaunch_setting = this.props.settings.settings.find(setting => setting.name === 'prelaunch_mode')
			is_prelaunch = prelaunch_setting.value
		}
		if (!this.props.instagram.isLoading){
			return(
				<div>
					<div className="container-fluid home-container">
					<div className="row">
							<div className="main-photo col-12">
								<div className="main-photo-text">
									<h1><span><strong>Gaia&apos;s Choice</strong></span></h1>
									<br />
									<Link to="/products"><button className="btn btn-primary">Shop Now&nbsp;&nbsp;▸</button></Link>
									&nbsp;
									<Link to="/whatiscbd"><button className="btn btn-secondary">About CBD&nbsp;&nbsp;▸</button></Link>
									<br />
									<div className="row justify-content-center">
									<div style={{width: "50%"}} className="justify-content-center">
										<hr />
									</div>
									</div>
									<h4><span>To provide wholesome, trustworthy products that will promote the well being of our community.</span></h4>
								</div>
							</div>
							{prelaunch_code}
							<div className="narrow-section container-fluid d-flex">
								<div className="row align-items-center">
									<div className="col align-self-center">
								With a combined 17 years in product manufacturing, a former research and develop chemist at a top medical cannabis company, and the drive and passion to provide natural and safe products, Gaia's Choice founders aim to better the community.
									</div>
								</div>
							</div>
							<div className="container-fluid color-div-1">
								<div className="row justify-content-center">
									<div className="col-12 col-md-6">
										<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
											<ol className="carousel-indicators">
												{Object.entries(this.props.instagram.errors).length === 0 && this.props.instagram.errors.constructor === Object &&
													this.props.instagram.instagramPictures.data.map((image, index) => { 
														if(index <=7){
															return <li data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : null} key={image.id}></li>
														}
													}
												)}
											</ol>
											<div className="carousel-inner">
												{Object.entries(this.props.instagram.errors).length === 0 && this.props.instagram.errors.constructor === Object &&
												this.props.instagram.instagramPictures.data.map((image, index) => {
													if (index <= 7){
													return(<div className={index === 0 ? "carousel-item active" : "carousel-item"} key={image.id}>
														<img className="d-block w-100" src={image.images.standard_resolution.url} alt={image.caption.text}/>
													</div>)
													}
												})}
											</div>
											<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
												<span className="carousel-control-prev-icon" aria-hidden="true"></span>
												<span className="sr-only">Previous</span>
											</a>
											<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
												<span className="carousel-control-next-icon" aria-hidden="true"></span>
												<span className="sr-only">Next</span>
											</a>
										</div>
									</div>
								</div>
							</div>
							<hr />
							<div className="narrow-section background-div d-flex">
								<div className="row align-items-center">
									<div className="col align-self-center">
								With a combined 17 years in product manufacturing, a former research and develop chemist at a top medical cannabis company, and the drive and passion to provide natural and safe products, Gaia's Choice founders aim to better the community.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (<div>Loading...</div>)
		}
	}

}

const mapStateToProps = state => {
	let errors = [];
	{/*if (state.instagramPictures.errors) {
		errors = Object.keys(state.instagramPictures.errors).map(field => {
			return {field, message: state.instagramPictures.errors[field]};
		});
	} */}
	if (state.settings.errors) {
		errors = [...errors, Object.keys(state.settings.errors).map(field => {
			return {field, message: state.settings.errors[field]};
		})];
	}
	return {
		instagram: state.instagram,
		settings: state.settings,
		errors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchInstagram: () => {
			dispatch(instagram.fetchInstagram());
	    },
		fetchSettings: () => {
			dispatch(settings.fetchSettings());
	    },

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);