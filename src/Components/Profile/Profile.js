import React, { Component } from 'react';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: props.email, 
			newEmail: '',
			newPassword: '',
			verifyPassword: '',
			errorMessageEmail: '',
			errorMessagePassword: ''
		}
	}

	onEmailChange = (event) => {
		//if email address is not valid only the errorMessage gets updated in the state: 
		// eslint-disable-next-line
		const regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (regex.test(event.target.value) === false) {
			this.setState({errorMessageEmail: 'Please enter valid email address!'})
		//if the email is valid state.email is updated and state.errorMessage is cleared:			
		} else if (regex.test(event.target.value) === true) {
		 	this.setState({newEmail: event.target.value, errorMessageEmail: ''});
		 }
	}

	onPasswordChange = (event) => {
		this.setState({newPassword: event.target.value})
	}

	onVerifyPasswordChange = (event) => {
		this.setState({verifyPassword: event.target.value})
	}

	onSubmitChangeEmail = () => {
		const { userEmail, newEmail } = this.state;
		fetch('https://fast-crag-39347.herokuapp.com/profile/emailChange', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				userEmail: userEmail,
				newEmail: newEmail
			})
		})
		.then(response => response.json())
		.then(message => {
			if (message === "Email change was successful") {
				alert("Email change was successful. Now, verify your new email by signing back in!")
				this.props.onRouteChange('signOut');
			} else {
				alert('Unable to change email address.')
			}
		})
		.catch(console.log)
	}

	onSubmitChangePassword = () => {
		const { userEmail, newPassword, verifyPassword } = this.state;
		if (newPassword === verifyPassword) {
			fetch('https://fast-crag-39347.herokuapp.com/profile/passwordChange', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				userEmail: userEmail,
				newPassword: newPassword
				})
			})
			.then(response => response.json())
			.then(message => {
				if (message === "Password change was successful") {
					alert("Password change was successful. Now, verify your new password by signing back in!")
					this.props.onRouteChange('signOut');
				} else {
					alert('Unable to change password.')
				}
			})
			.catch(console.log)
		} else {
			this.setState({errorMessagePassword: 'Error: passwords did not match. Try again!'});
		} 		
	}

	onSubmitDelete = () => {
		const { userEmail } = this.state;
		fetch('https://fast-crag-39347.herokuapp.com/profile/delete', {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				userEmail: userEmail
			})
		})
		.then(response => response.json())
		.then(message => {
			if (message === "User profile was deleted successfully") {
				alert("We are sorry to see you go.")
				this.props.onRouteChange('signOut');
			} else {
				alert('Unable to delete user.')
			}
		})
		.catch(console.log)
	}

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-90 mw8 shadow-5 center">
				<main className="pa2 black-80">				  
				    <fieldset id="profile" className="ba b--transparent ph0 mh0">
				    	<legend className="f1-ns f2 fw6 ph0 mh0">My Profile</legend>
				     	<p className='f3-ns f4'>
						{'Here you can change your email and password, or delete your account.'}
						</p>	
				     	<div className="mt3">				     	
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">New Email</label>
				        <input
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	onChange={this.onEmailChange}
				        />
				        <p className="db fw6 lh-copy f6 white-90">{this.state.errorMessageEmail}</p>
				        <button 
				      		onClick={this.onSubmitChangeEmail}
				      		className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
				      		type="submit" 
				      		value="Change"
				      		disabled={!this.state.newEmail} 
				      	>Change
				      	</button>
				      </div>
				      <div className="mv3 mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="newPassword">New Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70" 
				        	type="password" 
				        	name="password"  
				        	id="newPassword" 
				        	onChange={this.onPasswordChange}
				        />
				        <label className="db fw6 lh-copy f6 mt2" htmlFor="verifyPassword">Verify New Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70" 
				        	type="password" 
				        	name="password"  
				        	id="verifyPassword" 
				        	onChange={this.onVerifyPasswordChange}
				        />
				        <p className="db fw6 lh-copy f6 white-90">{this.state.errorMessagePassword}</p>
				        <button 
				      	onClick={this.onSubmitChangePassword}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
				      	type="submit" 
				      	value="Change"
				      	disabled={!this.state.newPassword || !this.state.verifyPassword} 
				      >Change
				      </button>
				      </div>			      
				    </fieldset>
				    <div className="">
				    	<p className='f3-ns f4 dark-red'>
						{'!WARNING! Entering the danger zone! '}
						</p>
					    <button 
					    	onClick={this.onSubmitDelete}
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-dark-red" 
					      	type="submit" 
					      	value="Delete" 
					    >Delete Account
					    </button>
				    </div>
				</main>
			</article>
		);
	}
}

export default Profile;  