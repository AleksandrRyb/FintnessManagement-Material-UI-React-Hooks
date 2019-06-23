import React, {Component} from 'react';
import {muscles, exercises} from './store';

const FitnessContext=React.createContext();

class ContexProvider extends Component{

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
        },
        addBtnActive:true,
        editExercise:false,
        exerciseToEdit:null,
        indexOfExeToEdit:'',
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
                this.setState({selectedExercise:exercise, editExercise:false})
            }
        })
    };

    OpenModalHandler=()=>{
        this.setState({OpenCreateExerciseModal:!this.state.OpenCreateExerciseModal, addBtnActive:true});
    };
    addExerciseTitle=(event)=>{
        event.preventDefault();
        let tempTitle=event.target.value;
        let tempId=tempTitle.replace(/ /g, '-').toLocaleLowerCase();
        this.setState({ addedExercise:{...this.state.addedExercise, title:tempTitle, id:tempId} },
            ()=>this.validateAddedExercise(true) );
    };
    addExerciseMuscle=(event)=>{
        this.setState({ addedExercise:{...this.state.addedExercise, muscle:event.target.value} },
            ()=>this.validateAddedExercise(true) );
    };
    addExerciseDescription=(event)=>{
        this.setState({ addedExercise:{...this.state.addedExercise, description:event.target.value} },
            ()=>this.validateAddedExercise(true) );
    };
    addNewExerciseToList=()=>{
        this.setState({exercises:[...this.state.exercises, this.state.addedExercise],  OpenCreateExerciseModal:false},
            ()=>{ this.setState({addBtnActive:true, addedExercise:{id:'', title: '',description: '',muscle: ''} });
        });
    };


    validateAddedExercise=(toAddNew)=>{
        if(toAddNew){
            var {title, muscle, description}=this.state.addedExercise;
        }else{
            var {title, muscle, description}=this.state.exerciseToEdit;
        }

        if(title!=="" && muscle!=="" && description!==""){
            this.setState({addBtnActive:false});
        }else{
            this.setState({addBtnActive:true});
        }
    };


    onEditExercise=(index)=>{
        let exerciseToEdit={};
        this.state.exercises.forEach((exercise,indx)=>{
            if(indx===index){
                exerciseToEdit={...exercise}
            }
        });
        this.setState({exerciseToEdit:exerciseToEdit, indexOfExeToEdit:index}, ()=>{
            this.setState({editExercise:true, addBtnActive:false})
        });
    };
    editExerciseTitle=(event)=>{
        let tempTitle=event.target.value;
        let tempId=tempTitle.replace(/ /g, '-').toLocaleLowerCase();
        this.setState({exerciseToEdit:{...this.state.exerciseToEdit, title:tempTitle, id:tempId}},
            ()=>this.validateAddedExercise());
    };
    editExerciseMuscle=(event)=>{
        this.setState({ exerciseToEdit:{...this.state.exerciseToEdit, muscle:event.target.value} },
            ()=>this.validateAddedExercise());
    };
    editExerciseDescription=(event)=>{
        this.setState({ exerciseToEdit:{...this.state.exerciseToEdit, description:event.target.value} },
            ()=>this.validateAddedExercise());
    };
    saveEditedExercise=()=>{
        //validate
        const editedExercise=this.state.exerciseToEdit;
        const tempExercises=this.state.exercises.map((exercise,index)=>{
            if(index===this.state.indexOfExeToEdit){
                return editedExercise;
            }else {
                return exercise;
            }
        });
        console.log('EditedExercise',tempExercises);
        this.setState({exercises:tempExercises, editExercise:false, exerciseToEdit:null});
    };


    deleteExerciseFromList=(id)=>{
        let tempExercises=[];
        this.state.exercises.forEach(exercise=>{
            const tempExerc={...exercise};
            tempExercises=[...tempExercises, tempExerc];
        });//This safe copying of exercises into tempExercises was unnecessary because we are using "filter()" later anyway which don't changes the original array
        tempExercises=tempExercises.filter(exercise=>exercise.id!==id);

        this.setState({exercises:tempExercises, editExercise:false},()=>this.setState({
            selectedExercise:null, exerciseToEdit:null, indexOfExeToEdit:''})
        );
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
                deleteExerciseFromList:this.deleteExerciseFromList,
                onEditExercise:this.onEditExercise,
                editExerciseTitle:this.editExerciseTitle,
                editExerciseMuscle:this.editExerciseMuscle,
                editExerciseDescription:this.editExerciseDescription,
                saveEditedExercise:this.saveEditedExercise}}>
                {this.props.children}
            </FitnessContext.Provider>
        );
    }
}

export {ContexProvider, FitnessContext};
