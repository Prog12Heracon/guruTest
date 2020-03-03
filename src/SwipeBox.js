import React, { Component } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: relative;
  width: 300%;
  display: flex;
  left: calc(${props => props.moveLeft} + ${props => props.swipeDistance}px);
  ${props => props.swipeDistance === 0 && " transition:left 0.5s ease-in"};
  div {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    height: 200px;
    border: 2px solid red;
  }
`;

class SwipeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeDistance: 0,
      startPosition: 0,
      leftSwipe: false,
      rightSwipe: false,
      toucheEnd: false,
      moveLeft: "-100%"
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.myRef.current.addEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.myRef.current.addEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
    this.myRef.current.addEventListener("touchend", this.handleTouchEnd, false);
  }
  getTouches = evt => {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  };

  handleTouchEnd = evt => {
    this.setState({ toucheEnd: true, startPosition: 0, swipeDistance: 0 });
    if (this.state.leftSwipe === true) {
      this.setState({ leftSwipe: false, moveLeft: "-100%" });
    }
    if (this.state.rightSwipe === true) {
      this.setState({ rightSwipe: false, moveLeft: "-100%" });
    }
  };

  handleTouchStart = evt => {
    this.setState({ toucheEnd: false });
    this.setState({ startPosition: this.getTouches(evt)[0].clientX });
  };

  handleTouchMove = evt => {
    const distance = evt.touches[0].clientX - this.state.startPosition;
    this.setState({ swipeDistance: distance });
    if (this.state.swipeDistance > 100 && this.state.rightSwipe === false) {
      console.log("Swipe right");
      this.props.handleSwipeRight();
      this.setState({ rightSwipe: true, moveLeft: "-200%" });
    }
    if (this.state.swipeDistance < -100 && this.state.leftSwipe === false) {
      console.log("Swipe left");
      this.props.handleSwipeLeft();

      this.setState({ leftSwipe: true, moveLeft: "0%" });
    }
  };

  render() {
    return (
      <div className="App" style={{ overflow: "hidden" }}>
        <StyledDiv
          swipeDistance={this.state.swipeDistance}
          leftSwipe={this.state.leftSwipe}
          rightSwipe={this.state.rightSwipe}
          toucheEnd={this.state.toucheEnd}
          moveLeft={this.state.moveLeft}
          ref={this.myRef}
        >
          <div style={{ marginRight: "20px" }}>{this.props.prevUser.name}</div>
          <div>{this.props.currentUser.name}</div>
          <div style={{ marginLeft: "20px" }}>{this.props.nextUser.name}</div>
        </StyledDiv>
      </div>
    );
  }
}

export default SwipeBox;
