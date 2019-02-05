import React, { Component } from 'react';
import StageContainer from './components/StageContainer'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [],
      currentLayer: null,
      goal: null,
      stageHeight: null,
      stageWidth: null
    }
    this.container = React.createRef()
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/shapes')
    .then(res => res.json())
    .then(layers => this.setState({layers}))
    .then(this.getCurrentLayer)

    this.setState({
      stageHeight: this.container.current.clientHeight,
      stageWidth: this.container.current.clientWidth
    })
  }

  getCurrentLayer = () => {
    let currentLayer = this.state.layers[0]
    this.setState({ currentLayer }, this.getGoal)
  }

  getGoal = () => {
    let goal = this.state.currentLayer.layer.children.find(child => child.attrs.name === 'goal')
    this.setState({goal})
  }

  render() {

    return (
      <div id="container" ref={this.container}>
      <StageContainer
      layer={this.state.currentLayer}
      goal={this.state.goal}
      stageHeight={this.state.stageHeight}
      stageWidth={this.state.stageWidth}
      />
      </div>
    );
  }
}

export default App;
