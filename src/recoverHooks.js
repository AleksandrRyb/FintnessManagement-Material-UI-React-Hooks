import React,{useState} from 'react';
import {muscles as m, exercises as e} from './store';

const FitnessContext=React.createContext();

const ContexProvider=(props)=>{

    const [muscles, setMuscles]=useState(m);
    const [exercises, setExercises]=useState(e);
    const [selectedMuscle, setSelectedMuscle]=useState(m);
    const [footerMenuToSelect, setFooterMenuToSelect]=useState(0);
    const [selectedExercise, setSelectedExercise]=useState(null);
    const [OpenCreateExerciseModal, setOpenCreateExerciseModal]=useState(false);
    const [addedExercise, setAddedExercise]=useState({id:'', title: '', description: '', muscle: ''});
    const [editExercise, setEditExercise]=useState(false);
    const [exerciseToEdit, setExerciseToEdit]=useState(null);
    const [indexOfExeToEdit, setIndexOfExeToEdit]=useState('');
    //setTodoList(prevTodoList => prevTodoList.concat(todoItem));
    const myState={ muscles,
        exercises,
        selectedMuscle,
        footerMenuToSelect,
        selectedExercise,
        OpenCreateExerciseModal,
        addedExercise,
        editExercise,
        exerciseToEdit,
        indexOfExeToEdit
    };

    const onSelectHandler=(index)=>{
        let temSelectedMuscle=[];
        let tempFooterMenuSelection=0;

        if(index < 0){
            temSelectedMuscle=muscles;
            tempFooterMenuSelection=0;
        }else {
            muscles.forEach((muscle, ind)=>{
                if(ind===index){
                    temSelectedMuscle.push(muscle);
                }
            });
            tempFooterMenuSelection=index+1;
        }
        setSelectedMuscle(temSelectedMuscle);
        setFooterMenuToSelect(tempFooterMenuSelection);
    };

    const onSelectExerciseHandler=(id)=>{
        exercises.forEach(exercise=>{
            if(exercise.id===id){
                setSelectedExercise(exercise);
                setEditExercise(false);
            }
        })
    };

    const OpenModalHandler=()=>{
        setOpenCreateExerciseModal(!OpenCreateExerciseModal)
    };

    const addExerciseTitle=(event)=>{
        event.preventDefault();
        let tempTitle=event.target.value;
        let tempId=tempTitle.replace(/ /g, '-').toLocaleLowerCase();

        setAddedExercise({...addedExercise, title:tempTitle, id:tempId});
    };
    const addExerciseMuscle=(event)=>{
        setAddedExercise({...addedExercise, muscle:event.target.value});
    };
    const addExerciseDescription=(event)=>{
        setAddedExercise({...addedExercise, description:event.target.value});
    };

    const addNewExerciseToList=()=>{
        setExercises(prevExercise=>prevExercise.concat(addedExercise));
        console.log('Exercises',exercises);
        setOpenCreateExerciseModal(false);
        setAddedExercise({id:'', title: '',description: '',muscle: ''});
    };
    const deleteExerciseFromList=(id)=>{
        let tempExercises=[];
        exercises.forEach(exercise=>{
            const tempExerc={...exercise};
            tempExercises=[...tempExercises, tempExerc];
        });//This safe copying of exercises into tempExercises was unnecessary because we are using "filter()" later anyway which don't changes the original array
        tempExercises=tempExercises.filter(exercise=>exercise.id!==id);

        //if(tempExercises.length>0){
            setExercises(tempExercises);
            setEditExercise(false);
            setSelectedExercise(null);
            setExerciseToEdit(null);
            setIndexOfExeToEdit('');
        //}else{
          //  setExercises(tempExercises);
            //setSelectedExercise(null);
        //}
    };


    const onEditExercise=(index)=>{
        let exerciseToEdit={};
        exercises.forEach((exercise,indx)=>{
            if(indx===index){
                exerciseToEdit={...exercise}
            }
        });
        setExerciseToEdit(exerciseToEdit);
        setIndexOfExeToEdit(index);
        setEditExercise(true);
        console.log('ToeDit',exerciseToEdit.id);
    };
    const editExerciseTitle=(event)=>{
        let tempTitle=event.target.value;
        let tempId=tempTitle.replace(/ /g, '-').toLocaleLowerCase();

        setExerciseToEdit({...exerciseToEdit, title:tempTitle, id:tempId})
    };
    const editExerciseMuscle=(event)=>{
        setExerciseToEdit({...exerciseToEdit, muscle:event.target.value})
    };
    const editExerciseDescription=(event)=>{
        setExerciseToEdit({...exerciseToEdit,  description:event.target.value})
    };
    const saveEditedExercise=()=>{
        //validate
        const editedExercise=exerciseToEdit;
        const tempExercises=exercises.map((exercise,index)=>{
            if(index===indexOfExeToEdit){
                return editedExercise;
            }else {
                return exercise;
            }
        });
        console.log('EditedExercise',tempExercises);
        setExercises(tempExercises);
        setEditExercise(false);
        setExerciseToEdit(null);
    };

    return (
        <FitnessContext.Provider value={{...myState,
            onSelectHandler:onSelectHandler,
            onSelectExerciseHandler:onSelectExerciseHandler,
            OpenModalHandler:OpenModalHandler,
            addExerciseTitle:addExerciseTitle,
            addExerciseMuscle:addExerciseMuscle,
            addExerciseDescription:addExerciseDescription,
            addNewExerciseToList:addNewExerciseToList,
            deleteExerciseFromList:deleteExerciseFromList,
            onEditExercise:onEditExercise,
            editExerciseTitle:editExerciseTitle,
            editExerciseMuscle:editExerciseMuscle,
            editExerciseDescription:editExerciseDescription,
            saveEditedExercise:saveEditedExercise}}>
            {props.children}
        </FitnessContext.Provider>
    );
};

export {ContexProvider, FitnessContext};
