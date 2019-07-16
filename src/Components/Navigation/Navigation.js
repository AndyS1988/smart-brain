import React from 'react';

const Navigation = ({ route, onRouteChange, isSignedIn }) => {
	if (isSignedIn && route === 'home') {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('profile')} className='f3-ns f4 link dim black underline pa3 pointer'>My Profile</p>
				<p onClick={() => onRouteChange('signOut')} className='f3-ns f4 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
		);
	} else if (isSignedIn && route === 'profile') {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('home')} className='f3-ns f4 link dim black underline pa3 pointer'>Go Back</p>
				<p onClick={() => onRouteChange('signOut')} className='f3-ns f4 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
		);
	}

	else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signIn')} className='f3-ns f4 link dim black underline pa3 pointer'>Sign In</p>
				<p onClick={() => onRouteChange('register')} className='f3-ns f4 link dim black underline pa3 pointer'>Register</p>
			</nav>	
		);
	}
}
export default Navigation; 