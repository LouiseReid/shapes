import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Circle } from 'react-konva';

class StageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: {},
      goalY: 0.75 * window.innerHeight
    };
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
  }

  isNearGoal = (shape, goal) => {
    let shapeX = shape.getX();
    let shapeY = shape.getY();
    const shapeWidth = shape.getWidth();
    const shapeHeight = shape.getHeight();
    const goalX = goal.getX();
    const goalWidth = goal.getWidth();
    const goalY = goal.getY();

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

    const objects = this.props.layer.layer.children.map(child => child)

    let shapes = []

    objects.forEach(object => {
      if(object.className === "Circle"){
        shapes.push(<Circle key={object.attrs.x} {...object.attrs} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}/>)
      }
      if(object.className === "Rect"){
        shapes.push(<Rect key={object.attrs.x} {...object.attrs} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}/>)
      }
    })

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
      {shapes}
      </Layer>
      </Stage>
    );
  }

}

export default StageContainer;
