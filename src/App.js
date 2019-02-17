import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './actions/simpleAction';
import getData from './JSON/getData';
import UserCredentials from './SubComponents/UserCredentials';
import QuestionSet from './SubComponents/QuestionSet';
import FinalDiv from './SubComponents/FinalDiv';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userCreds: true,
      questionSet: false,
      finalDiv: false
    };
  }

  componentDidMount() {
    let answers = [];
    let obj = {};
    if(localStorage.getItem("answers_subhojit_101") || localStorage.getItem("timeFinished_subhojit_101")) {
      answers = JSON.parse(localStorage.getItem("answers_subhojit_101") || "[]");
      obj = JSON.parse(localStorage.getItem("timeFinished_subhojit_101") || "{}");
      if(answers.length > 0 || obj.isFinished) {
        this.setState({
          userCreds: false,
          questionSet: false,
          finalDiv: true
        });
      }
    }
  }

  simpleAction = (event) => {
   this.props.simpleAction();
  };

  handleBooleans = (e) => {
    this.setState({
      userCreds: false,
      questionSet: true
    });
  };

  setFinalDiv = (e) => {
    this.setState({
      questionSet: false,
      finalDiv: true
    });
  };

  handleLogout = (e) => {
    // handing the exit button
    if(localStorage.getItem("answers_subhojit_101")) {
      localStorage.removeItem("answers_subhojit_101");
    }
    if(localStorage.getItem("timeFinished_subhojit_101")) {
      localStorage.removeItem("timeFinished_subhojit_101");
    }
    this.setState({
      userCreds: true,
      questionSet: false,
      finalDiv: false
    });
  };

  render() {

    let add_background = '';
    let add_width = '';
    let getHeight = " height_100";
    let getBackground = " get_background_img";

    let isComponent = (
      <UserCredentials
        getData={getData}
        handleBooleans={this.handleBooleans} 
      />
    );

    // Setting this component as the HOC and paving the way of the single page application

    if(this.state.questionSet) {

      add_background = " background_22 get_box_shadow";
      add_width = " width_80";

      isComponent = (
        <QuestionSet
          setFinalDiv={this.setFinalDiv}
        />
      );

      getHeight = " height_100";
      getBackground = " get_background_img";
      
    }

    if(this.state.finalDiv) {
      add_background = " background_22 get_box_shadow";
      add_width = " width_80";

      isComponent = (
        <FinalDiv
          handleLogout={this.handleLogout} 
        />
      );

      getHeight = "";
      getBackground = " get_background_img";
    }

    return (
     <div className={"App flex_centarize" + getHeight + getBackground}>
        <div className={"center_align" + add_background + add_width}>
          {isComponent}
        </div>
     </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: () => dispatch(simpleAction())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
