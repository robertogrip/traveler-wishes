import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {

	componentDidMount() {
        if( typeof window.customTraveler === "object" ){
            window.setTimeout(function() {
                window.customTraveler.init();
            }, 500);
        }
    }       

    componentDidUpdate() {
        if( typeof window.customTraveler === "object" ){
            window.setTimeout(function() {
                window.customTraveler.init();
            }, 500);
        }
    }

	render() {
		return (
			<footer id="main-footer">
	            <div className="container">
	                <div className="row row-wrap">
	                    <div className="col-md-3">
	                        <Link className="logo" to="/">
	                            <img src="/img/logo-invert.png" alt="" title="Image Title" />
	                        </Link>
	                        <p className="mb20">Booking, reviews and advices on hotels, resorts, flights, vacation rentals, travel packages, and lots more!</p>
	                        <ul className="list list-horizontal list-space">
	                            <li>
	                                <Link className="fa fa-facebook box-icon-normal round animate-icon-bottom-to-top" to="#"></Link>
	                            </li>
	                            <li>
	                                <Link className="fa fa-twitter box-icon-normal round animate-icon-bottom-to-top" to="#"></Link>
	                            </li>
	                            <li>
	                                <Link className="fa fa-google-plus box-icon-normal round animate-icon-bottom-to-top" to="#"></Link>
	                            </li>
	                            <li>
	                                <Link className="fa fa-linkedin box-icon-normal round animate-icon-bottom-to-top" to="#"></Link>
	                            </li>
	                            <li>
	                                <Link className="fa fa-pinterest box-icon-normal round animate-icon-bottom-to-top" to="#"></Link>
	                            </li>
	                        </ul>
	                    </div>

	                    <div className="col-md-3">
	                        <h4>Newsletter</h4>
	                        <form>
	                            <label>Enter your E-mail Address</label>
	                            <input type="text" className="form-control" />
	                            <p className="mt5"><small>*We Never Send Spam</small>
	                            </p>
	                            <input type="submit" className="btn btn-primary" value="Subscribe" />
	                        </form>
	                    </div>
	                    <div className="col-md-2">
	                        <ul className="list list-footer">
	                            <li><Link to="#">About US</Link>
	                            </li>
	                            <li><Link to="#">Press Centre</Link>
	                            </li>
	                            <li><Link to="#">Best Price Guarantee</Link>
	                            </li>
	                            <li><Link to="#">Travel News</Link>
	                            </li>
	                            <li><Link to="#">Jobs</Link>
	                            </li>
	                            <li><Link to="#">Privacy Policy</Link>
	                            </li>
	                            <li><Link to="#">Terms of Use</Link>
	                            </li>
	                            <li><Link to="#">Feedback</Link>
	                            </li>
	                        </ul>
	                    </div>
	                    <div className="col-md-4">
	                        <h4>Have Questions?</h4>
	                        <h4 className="text-color">+1-202-555-0173</h4>
	                        <h4><Link to="#" className="text-color">support@traveler.com</Link></h4>
	                        <p>24/7 Dedicated Customer Support</p>
	                    </div>

	                </div>
	            </div>
	        </footer>
		)
	}
}

export default Footer;