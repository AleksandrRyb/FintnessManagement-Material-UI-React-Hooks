import React, {Component} from 'react';
import {muscles, exercises} from './store';

const FitnessContext=React.createContext();

class ContexProvider extends Component {

    state={
        muscles:muscles,
        exercises,
        selectedMuscle:muscles,
        footerMenuToSelect:0,
        selectedExercise:null,
        OpenCreateExerciseModal:false,
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

    OpenModalHandler=()=>{
        this.setState({OpenCreateExerciseModal:!this.state.OpenCreateExerciseModal});
    };

    render() {
        return (
            <FitnessContext.Provider value={{...this.state,
                                            onSelectHandler:this.onSelectHandler,
                                            onSelectExerciseHandler:this.onSelectExerciseHandler,
                                            OpenModalHandler:this.OpenModalHandler}}>
                {this.props.children}
            </FitnessContext.Provider>
        );
    }
}

export {ContexProvider, FitnessContext};
