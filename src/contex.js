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
        addedExercise:{
            id:'',
            title: '',
            description: '',
            muscle: ''
        }
    };

    onSelectHandler=(index)=>{
        let temSelectedMuscle=[];
        let tempFooterMenuSelection=0;

        if(index < 0){
            temSelectedMuscle=this.state.muscles;
            tempFooterMenuSelection=0;
        }else {
            this.state.muscles.forEach((muscle, ind)=>{
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

    addExerciseTitle=(event)=>{
        event.preventDefault();
        let tempTitle=event.target.value;
        let tempId=tempTitle.replace(/ /g, '-').toLocaleLowerCase();
        this.setState({ addedExercise:{...this.state.addedExercise, title:tempTitle, id:tempId} });
    };
    addExerciseMuscle=(event)=>{
        this.setState({ addedExercise:{...this.state.addedExercise, muscle:event.target.value} });
    };
    addExerciseDescription=(event)=>{
        this.setState({ addedExercise:{...this.state.addedExercise, description:event.target.value} });
    };

    addNewExerciseToList=()=>{
        this.setState({exercises:[...exercises, this.state.addedExercise],  OpenCreateExerciseModal:false},
            ()=>{ this.setState({addedExercise:{id:'', title: '',description: '',muscle: ''} });
        });
    };
    deleteExerciseFromList=(id)=>{
        let tempExercises=[];
        this.state.exercises.forEach(exercise=>{
            const tempExerc={...exercise};
            tempExercises=[...tempExercises, tempExerc];
        });
        tempExercises=tempExercises.filter(exercise=>exercise.id!==id);
        this.setState({exercises:tempExercises});
    };

    render() {
        return (
            <FitnessContext.Provider value={{...this.state,
                                            onSelectHandler:this.onSelectHandler,
                                            onSelectExerciseHandler:this.onSelectExerciseHandler,
                                            OpenModalHandler:this.OpenModalHandler,
                                            addExerciseTitle:this.addExerciseTitle,
                                            addExerciseMuscle:this.addExerciseMuscle,
                                            addExerciseDescription:this.addExerciseDescription,
                                            addNewExerciseToList:this.addNewExerciseToList,
                                            deleteExerciseFromList:this.deleteExerciseFromList}}>
                {this.props.children}
            </FitnessContext.Provider>
        );
    }
}

export {ContexProvider, FitnessContext};
