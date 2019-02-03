import React, { Component } from 'react';
import StageContainer from './components/StageContainer'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [],
      currentLayer: null
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/shapes')
    .then(res => res.json())
    .then(layers => this.setState({layers}))
    .then(this.getCurrentLayer)
  }

  getCurrentLayer = () => {
    let currentLayer = this.state.layers[0]
    this.setState({ currentLayer })
  }

  render() {
    return (
      <StageContainer layer={this.state.currentLayer}/>
    );
  }
}

export default App;
