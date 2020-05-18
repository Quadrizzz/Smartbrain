import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FacialRecognition from './Components/FacialRecognition/FacialRecognition';
import Signin from './Components/Signin/signIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js'
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';




const particleOptions = 
{
  "particles": {
      "number": {
          "value": 100
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

const initialState = {
  input : "",
  imageUrl : "",
  box : {},
  route : 'signin',
  isSignedIn : false,
  user: {
    id : "",
    name : "",
    email : "",
    entrie : 0,
    joined : ""

  }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }


  calculatefacelocation = (data)=>{
    const clarifaiFace = (data.outputs[0].data.regions[0].region_info.bounding_box);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height =  Number(image.height);
    return{
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box)=>{
    this.setState({box : box})
  }
  onInputChange = (event)=>{
      this.setState({ input : event.target.value });
  }

  onRouteChange = (route)=>{
    if (route === 'signout'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route})
  }

  loadUser = (data)=>{
      this.setState({user : {
        id : data.id,
        name : data.name,
        email : data.email,
        entrie : data.entrie,
        joined : data.joined
      }})
  }

  onButtonSubmit = ()=>{
    this.setState({ imageUrl : this.state.input})
    fetch('https://whispering-lowlands-41822.herokuapp.com/imageurl' , {
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        input : this.state.input
      })
    })
    .then(response => response.json())
    .then(response =>{
      if(response){
        fetch('https://whispering-lowlands-41822.herokuapp.com/image' , {
          method : 'put',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            id : this.state.user.id
          })
        }).then(response => response.json()).then(count => {
          this.setState(Object.assign(this.state.user , {entrie : count}))
        })
        .catch(console.log)
    }
    this.displayFaceBox(this.calculatefacelocation(response))})
    .catch(err => console.log(err));
  
  }

  render (){
    const { route , isSignedIn , box, imageUrl } = this.state;
  if( route === 'signin' || route === 'signout'){
    return(
      <div className = "App">
        <Particles className = 'particles' params = { particleOptions }/>
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        <Signin  loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
      </div>
    )
  }

  else if (this.state.route === 'register'){
    return(
      <div className = "App">
        <Particles className = 'particles' params = { particleOptions }/>
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
      </div>
    )
  }

  else{
    return (
      <div className="App">
        <Particles className = 'particles' params = { particleOptions }/>
        <Navigation  isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        <Logo/>
        <Rank name = {this.state.user.name}
              entries = {this.state.user.entrie}
        />
        <ImageLinkForm 
          onInputChange = {this.onInputChange} 
          onButtonSubmit = {this.onButtonSubmit}/>
        <FacialRecognition 
          box = {box}
          imageUrl = {imageUrl}/>   
      </div>
    );
  }
  
}

}

export default App;
