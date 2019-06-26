import React, {Component} from 'react';
import {muscles, exercises} from './store';
import axios from 'axios';

const FitnessContext=React.createContext();

class ContexProvider extends Component{

    state={
        muscles:[],
        exercises:[],
        selectedMuscle:[],
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
        alreadyExists:false,
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onLoadData=()=>{
        axios.get('https://e-handy-store.firebaseio.com/FitnessManagement/muscles.json')
            .then(res=>{
                this.setState({muscles:res.data, selectedMuscle:res.data});
                console.log(res);
            }).catch(err=>console.log(err));

        axios.get('https://e-handy-store.firebaseio.com/FitnessManagement/exercises.json')
            .then(res=>{
                this.setState({exercises:res.data});
                console.log(res);
            }).catch(err=>console.log(err));
    };
    onSaveData=()=>{
        axios.put('https://e-handy-store.firebaseio.com/FitnessManagement/exercises.json', this.state.exercises)
            .then(res=>{
                console.log(res);
            }).catch(err=>console.log(err));
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    OpenModalHandler=()=>{
        this.setState({OpenCreateExerciseModal:!this.state.OpenCreateExerciseModal, addBtnActive:true});
    };
    addExerciseTitle=(event)=>{
        let tempTitle=event.target.value;
        let tempId=tempTitle.replace(/ /g, '-').toLocaleLowerCase();

        this.setState({ addedExercise:{...this.state.addedExercise, title:tempTitle, id:tempId} },
            ()=>this.validateAddedExercise(true) );
    };
    onAddcheckExistance=(event)=>{
        let tempId=event.target.value.replace(/ /g, '-').toLocaleLowerCase();
        var existFlag=false;

        this.state.exercises.forEach(exercise=>{
            if(exercise.id===tempId){
                existFlag=true;
            }
        });
        if(existFlag){
            this.setState({alreadyExists:true});
        }
        else{
            this.setState({alreadyExists:false});
        }
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
            ()=>{ this.setState({addedExercise:{id:'', title: '',description: '',muscle: ''} }, ()=>{
                this.onSaveData();
            });
            });
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    onEditcheckExistance=(event)=>{
        let tempId=event.target.value.replace(/ /g, '-').toLocaleLowerCase();
        var editFlag=false;
        this.state.exercises.forEach( (exercise)=>{
            if(exercise.id===tempId){
                editFlag=true;
            }
        });
        if(this.state.exercises[this.state.indexOfExeToEdit].id===tempId){
            editFlag=false;
        }

        if(editFlag){
            this.setState({alreadyExists:true});
        }
        else{
            this.setState({alreadyExists:false});
        }
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
        const editedExercise=this.state.exerciseToEdit;
        const tempExercises=this.state.exercises.map((exercise,index)=>{
            if(index===this.state.indexOfExeToEdit){
                return editedExercise;
            }else {
                return exercise;
            }
        });
        this.setState({exercises:tempExercises, editExercise:false, exerciseToEdit:null}, ()=>{
            this.onSaveData();
        });
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    deleteExerciseFromList=(id)=>{
        let tempExercises=[];
        this.state.exercises.forEach(exercise=>{
            const tempExerc={...exercise};
            tempExercises=[...tempExercises, tempExerc];
        });//This safe copying of exercises into tempExercises was unnecessary because we are using "filter()" later anyway which don't changes the original array
        tempExercises=tempExercises.filter(exercise=>exercise.id!==id);

        this.setState({exercises:tempExercises, editExercise:false},()=>this.setState({
                selectedExercise:null, exerciseToEdit:null, indexOfExeToEdit:''}, ()=>{
                this.onSaveData();console.log('working');
            })
        );
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                saveEditedExercise:this.saveEditedExercise,
                onEditcheckExistance:this.onEditcheckExistance,
                onAddcheckExistance:this.onAddcheckExistance,
                onLoadData:this.onLoadData}}>
                {this.props.children}
            </FitnessContext.Provider>
        );
    }
}

export {ContexProvider, FitnessContext};
