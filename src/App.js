import React, { Component } from "react";
// import styled from "styled-components";
import SwipeBox from "./SwipeBox";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: [],
      prevUser: [],
      nextUser: []
    };
  }
  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(data => data.json())
      .then(users => {
        const firstIndex = Math.floor(Math.random() * 5);
        const secondIndx = firstIndex + 3;
        const slicedUsers = users.slice(firstIndex, secondIndx);
        this.setState({
          currentUser: slicedUsers[1],
          prevUser: slicedUsers[0],
          nextUser: slicedUsers[2]
        });
      });
  };

  handleSwipeLeft = () => {
    this.setState({
      currentUser: this.state.prevUser,
      nextUser: this.state.currentUser,
      prevUser: this.state.nextUser
    });
  };

  handleSwipeLeft = () => {
    this.setState({
      currentUser: this.state.nextUser,
      nextUser: this.state.prevUser,
      prevUser: this.state.currentUser
    });
  };
  handleSwipeRight = () => {
    this.setState({
      currentUser: this.state.prevUser,
      nextUser: this.state.currentUser,
      prevUser: this.state.nextUser
    });
  };
  render() {
    const { currentUser, prevUser, nextUser } = this.state;
    return (
      <div className="App" style={{ overflow: "hidden" }}>
        <h1>test h1</h1>
        <SwipeBox
          handleSwipeLeft={this.handleSwipeLeft}
          handleSwipeRight={this.handleSwipeRight}
          currentUser={currentUser}
          prevUser={prevUser}
          nextUser={nextUser}
        />
      </div>
    );
  }
}

export default App;

// const StyledDiv = styled.div`
//   box-sizing: border-box;
//   width: 100%;
//   position: relative;
//   left: ${props => props.swipeDistance}px;
//   height: 200px;
//   border: 2px solid red;
//   ${props => props.move === true && " transform:scale(0)"};
//   transition: transform 0.3s ease-in;
//   ${props => props.swipeDistance === 0 && " transition:left 0.5s ease-in"};
// `;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       swipeDistance: 0,
//       startPosition: 0,
//       move: false,
//       user: []
//     };
//     this.myRef = React.createRef();
//   }
//   componentDidMount() {
//     this.fetchUser();
//     this.myRef.current.addEventListener(
//       "touchstart",
//       this.handleTouchStart,
//       false
//     );
//     this.myRef.current.addEventListener(
//       "touchmove",
//       this.handleTouchMove,
//       false
//     );
//     this.myRef.current.addEventListener("touchend", this.handleTouchEnd, false);
//   }

//   getTouches = evt => {
//     return (
//       evt.touches || evt.originalEvent.touches // browser API
//     ); // jQuery
//   };

//   handleTouchEnd = evt => {
//     if (this.state.move !== true) {
//       this.setState({ swipeDistance: 0 });
//     } else {
//       this.setState({ move: false });
//       this.setState({ swipeDistance: 0 });
//     }
//     this.setState({ startPosition: 0 });
//   };

//   handleTouchStart = evt => {
//     this.setState({ startPosition: this.getTouches(evt)[0].clientX });
//   };

//   fetchUser = () => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then(data => data.json())
//       .then(users =>
//         this.setState({ user: users[Math.floor(Math.random() * 10)] })
//       );
//   };

//   handleTouchMove = evt => {
//     const distance = evt.touches[0].clientX - this.state.startPosition;
//     this.setState({ swipeDistance: distance });
//     if (this.state.swipeDistance > 150) {
//       this.setState({ move: true });
//       this.fetchUser();
//       console.log("Right Swipe");
//     }
//     if (this.state.swipeDistance < -150) {
//       this.setState({ move: true });
//       this.fetchUser();
//       console.log("Left Swipe");
//     }
//   };

//   render() {
//     console.log(this.state.swipeDistance);
//     return (
//       <div className="App" style={{ overflow: "hidden" }}>
//         <StyledDiv
//           ref={this.myRef}
//           swipeDistance={this.state.swipeDistance}
//           move={this.state.move}
//         >
//           {this.state.user.name}
//         </StyledDiv>
//       </div>
//     );
//   }
// }

// export default App;
