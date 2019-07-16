import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary'
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Profile from './Components/Profile/Profile';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 700
      }
    }
  },
  interactivity: {
    events: {
      onresize: {
        enable: true,
        density_auto: true,
        density_area: 700
      }
    }
  }
}

const initialState = {
  input: '',
     imageUrl: '',
     box: {},
     route: 'signIn',
     isSignedIn: false,
     user: {
       id: '',
       name: '',
       email: '',
       entries: 0,
       joined: ''
     }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //calculate where the face box will be, using data obtained from clarifai API:
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    //clear the face box before new picture is submitted:
    this.setState({box: {}});
  }

  //adding enter key press option to initiate onPictureSubmit:
  handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        this.onPictureSubmit();
      }
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
      //send the img url to the server where first the handleApi function is triggered:
      fetch('https://fast-crag-39347.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        }) 
      })
      .then(response => response.json())
      .then(response => {
        if(response) {
          //if there is data received from API face box is displayed and user's id is sent to server:
          this.displayFaceBox(this.calculateFaceLocation(response))
          fetch('https://fast-crag-39347.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            }) 
          })
          //database finds the user based on the id and sends back incremented entries if face box exists:
          .then(response => response.json())
          .then(count => {
            if (this.state.box) {
              this.setState(Object.assign(this.state.user, {entries: count}))
            }
          })
          .catch(console.log)
        }  
      }) 
       .catch(err => alert('Face was not detected. Try again with a different image!'));         
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState)
    } else if (route === 'home' || route === 'profile') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  //updates state with user data received:
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
        }
    })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' 
          params={particlesOptions}
        />
        <Navigation 
          isSignedIn={isSignedIn}
          route={this.state.route}
          onRouteChange={this.onRouteChange}
        />
        {(() => {
          if (route === 'home') {
            return (
              <div>
                <Logo />
                <ErrorBoundary>
                  <Rank 
                    name={this.state.user.name}
                    entries={this.state.user.entries}
                  />
                </ErrorBoundary>
                <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  handleKeyPress={this.handleKeyPress} 
                  onPictureSubmit={this.onPictureSubmit}
                />
                <ErrorBoundary>
                  <FaceRecognition 
                    box={box}
                    imageUrl={imageUrl} 
                  />
                </ErrorBoundary>
              </div>
            )
          } else if (route === 'profile') {
              return (
                <Profile 
                  email={this.state.user.email}
                  onRouteChange={this.onRouteChange}
                />
              )
          } else if (route === 'signIn' || route === 'signOut') {
              return (
                <SignIn 
                  onRouteChange={this.onRouteChange} 
                  loadUser={this.loadUser}
                />
              )           
          } else {
              return (
                <Register 
                  onRouteChange={this.onRouteChange} 
                  loadUser={this.loadUser}
                />
              )
          }
        })()}       
      </div>
    );
  }
}

export default App;
