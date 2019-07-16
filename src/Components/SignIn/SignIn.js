import React, { Component } from 'react';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	//adding option to press enter, rather than clicking button:
	handleKeyPress = (event) => {
  		if(event.key === 'Enter'){
    		this.onSubmitSignIn();
  		}
	}

	onSubmitSignIn = () => {
		const { signInEmail, signInPassword } = this.state;
		fetch('https://fast-crag-39347.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: signInEmail,
				password: signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			} else {
				alert(user)
			}
		})
		.catch(console.log)
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-90 mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1-ns f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	onChange={this.onEmailChange}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" 
				        	onChange={this.onPasswordChange}
				        	onKeyPress={this.handleKeyPress}
				        />
				      </div>			      
				    </fieldset>
				    <div className="">
				      <button 
				      	onClick={this.onSubmitSignIn}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Sign in"
				      	disabled={!this.state.signInEmail || !this.state.signInPassword}  
				      >Sign In
				    </button>
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				    </div>
		  			</div>
				</main>
			</article>
		);
	}
}

export default SignIn;     