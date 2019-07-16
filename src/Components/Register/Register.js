import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '', 
			errorMessage: ''
		}
	}

	onEmailChange = (event) => {
		//if email address is not valid only the errorMessage gets updated in the state: 
		// eslint-disable-next-line
		const regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (regex.test(event.target.value) === false) {
			this.setState({errorMessage: 'Please enter valid email address!'})
		//if the email is valid state.email is updated and state.errorMessage is cleared:			
		} else if (regex.test(event.target.value) === true) {
		 	this.setState({email: event.target.value, errorMessage: ''});
		 }
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	handleKeyPress = (event) => {
  		if(event.key === 'Enter'){
    		this.onSubmitRegister();
  		}
	}

	onSubmitRegister = () => {
		const { email, password, name } = this.state;
		fetch('https://fast-crag-39347.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password,
				name: name
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
		return (
			<article className="br3 ba b--black-10 mv4 w-90 mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1-ns f2 fw6 ph0 mh0">Register</legend>
				       <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="text" 
				        	name="name"  
				        	id="name" 
				        	onChange={this.onNameChange}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	onChange={this.onEmailChange}
				        />
				        <p className="db fw6 lh-copy f6 white-90">{this.state.errorMessage}</p>
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
				      	onClick={this.onSubmitRegister}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Register"
				      	disabled={!this.state.email} 
				      >Register
				      </button>
				    </div>
				   </div>
				</main>
			</article>
		);
	}
}

export default Register;     