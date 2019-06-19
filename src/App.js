import React, {Component} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercises from './components/Exercisees/Exercises';
import {AppBar, Toolbar, IconButton, Typography, Button, Box} from '@material-ui/core';
import {muscles, exercises} from './store';

class App extends Component {

    state={
        muscles:muscles,
        exercises,
        selectedMuscle:muscles,
        footerMenuToSelect:0,
        selectedExercise:null
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


    onSelectHandler=(index)=>{
        let temSelectedMuscle=[];
        let tempFooterMenuSelection=0;

        if(index < 0){
            temSelectedMuscle=this.state.muscles;
            tempFooterMenuSelection=0;
        }else {
            this.state.muscles.forEach((muscle,ind)=>{
                if(ind===index){
                    temSelectedMuscle.push(muscle);
                }
            });
            tempFooterMenuSelection=index+1;
        }

        this.setState({selectedMuscle:temSelectedMuscle, footerMenuToSelect:tempFooterMenuSelection})
    };

    onSelectExerciseHandler=(id)=>{
        this.state.exercises.forEach(exercise=>{
            if(exercise.id===id){
                this.setState({selectedExercise:exercise})
            }
        })
    };

    render() {

        return (
            <React.Fragment>
              <Header/>
                <Box align="center">
                  <Exercises muscles={this.state.selectedMuscle} exercises={this.state.exercises} onSelectExercise={this.onSelectExerciseHandler} selectedExercise={this.state.selectedExercise}/>
                </Box>
              <Footer muscles={muscles} onSelect={this.onSelectHandler} footerMenuToSelect={this.state.footerMenuToSelect}/>
            </React.Fragment>
        );
    }
}

export default App;
