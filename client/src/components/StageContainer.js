import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import './StageContainer.css';


class StageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalY: null,
      goal: null,
      goalColour: '#e20d0d',
      height: null,
      width: null
    };
  }


  static getDerivedStateFromProps(props, state) {
    if(props.goal){
      return {
        goal: <Rect {...props.goal.attrs}/>,
        height: props.stageHeight,
        width: props.stageWidth,
        goalY: props.stageHeight * 0.75
      }
    }
    return null;
  }


  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      }
    });
  }

  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.BounceEaseInOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    })
    let shape = e.target
    if (this.isNearGoal(shape, this.state.goal) && shape.attrs.result) {
      shape.setAttr("draggable", false);
      this.setState({goalColour: '#00814d'})
    } else if (this.isNearGoal(shape, this.state.goal)) {
      alert("try again");
    }
  }

  isNearGoal = (shape, goal) => {
    let shapeX = shape.getX();
    let shapeY = shape.getY();
    const shapeWidth = shape.getWidth();
    const shapeHeight = shape.getHeight();
    const goalX = goal.props.x
    const goalWidth = goal.props.width
    const goalY = goal.props.y;

    if (shape.className === "Rect") {
      return (
        shapeX > goalX &&
        shapeX + shapeWidth < goalX + goalWidth &&
        shapeY + shapeHeight > 0.99 * goalY
      );
    }

    if (shape.className === "Circle") {
      const shapeRadius = shape.getRadius();

      return (
        shapeX - shapeRadius * 0.95 > goalX &&
        shapeX + shapeRadius * 0.95 < goalX + goalWidth &&
        shapeY + shapeRadius > 0.99 * goalY
      );
    }
  }

  render() {

    if(!this.props.layer) return null
    if(!this.state.width > 0) return null;


    const objects = this.props.layer.layer.children.map(child => child)

    let shapes = []


    objects.forEach(object => {
      if(object.className === "Circle"){
        shapes.push(
          <Circle key={object.attrs.x}
          {...object.attrs}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}/>)
      }
      if(object.className === "Rect"){
        if(object.attrs.name === "goal"){
          shapes.push(
            <Rect key={object.attrs.x}
            {...object.attrs}
            fill={this.state.goalColour}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}/>)
        } else {
          shapes.push(
            <Rect key={object.attrs.x}
            {...object.attrs}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            />)
        }
      }
    })


    return (
      <Stage width={this.state.width} height={this.state.height}>
      <Layer>
        <Text
          text={this.props.layer.levelDesc}
          x={0.02 * window.innerWidth}
          y={0.02 * window.innerHeight}
        />
        {shapes}
      </Layer>
      </Stage>

    );
  }

}

export default StageContainer;
