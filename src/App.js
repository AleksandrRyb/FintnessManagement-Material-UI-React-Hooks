import React, {Component} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercises from './components/Exercisees/Exercises';
import {AppBar, Toolbar, IconButton, Typography, Button, Box} from '@material-ui/core';
import {muscles, exercises} from './store';

class App extends Component {

    state={
        exercises
    };

    getExerciseByMuscles=()=>{
        return Object.entries(this.state.exercises.reduce((exercises, exercise)=>{
            const {muscles}=exercise;
            exercises[muscles]=exercises[muscles]? {...exercises[muscles], exercise}:{exercise};
            return exercises;
        }, {}) );//Object.entries() turns object into array
    };

    render() {
        const exercisesPlan=this.getExerciseByMuscles();
        console.log(exercisesPlan)
        return (
            <React.Fragment>
              <Header/>
                <Box align="center">
                    <Exercises exercisesPlan={exercisesPlan}/>
                </Box>
              <Footer muscles={muscles}/>
            </React.Fragment>
        );
    }
}

export default App;
