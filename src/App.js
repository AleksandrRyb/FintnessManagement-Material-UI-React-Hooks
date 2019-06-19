import React, {Component} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercises from './components/Exercisees/Exercises';
import {AppBar, Toolbar, IconButton, Typography, Button, Box} from '@material-ui/core';
import {muscles, exercises} from './store';

class App extends Component {

    state={
        muscles,
        exercises
    };

    getExerciseByMuscles=()=>{
      /*  return Object.entries(this.state.exercises.reduce((exercises, exercise)=>{
            const {muscles}=exercise;
            exercises[muscles]=exercises[muscles]? {...exercises[muscles], exercise}:{exercise};
            //exercises[muscles]={...exercises[muscles], exercise}
            return exercises;
        }, {}) );//Object.entries() turns object into array*/
      console.log('running')
      let tempExercisePlan=[];
      exercises.forEach((exercise, index)=>{
          muscles.forEach(muslce=>{
              if(muslce===exercise.muscles){
                  const myExicise={...exercise};
                  const myMuslce=muslce;
                  let tempArr=[]
                 //console.log('exercise',myExicise, 'muscle', myMuslce)
                  if(tempExercisePlan[myMuslce]){
                      tempArr.push(tempExercisePlan[myMuslce])
                      //const tempMyPlan=tempExercisePlan[myMuslce];
                      tempArr.push([{myExicise}]);
                      tempExercisePlan[myMuslce]={...tempArr}
                  }else {
                      tempArr.push([{myExicise}]);
                      tempExercisePlan[myMuslce]={...tempArr}
                  }
              }
          });
      })
      return  tempExercisePlan;
    };


    render() {

        return (
            <React.Fragment>
              <Header/>
                <Box align="center">
                  <Exercises muscles={this.state.muscles} exercises={this.state.exercises}/>
                </Box>
              <Footer muscles={muscles}/>
            </React.Fragment>
        );
    }
}

export default App;
