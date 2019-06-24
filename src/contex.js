import React, {useEffect, useState} from 'react';
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
    const [addBtnActive, setAddBtnActive]=useState(true);
    const [editExercise, setEditExercise]=useState(false);
    const [exerciseToEdit, setExerciseToEdit]=useState({});
    const [indexOfExeToEdit, setIndexOfExeToEdit]=useState('');
    //setTodoList(prevTodoList => prevTodoList.concat(todoItem));
    const myState={
        muscles,
        exercises,
        selectedMuscle,
        footerMenuToSelect,
        selectedExercise,
        OpenCreateExerciseModal,
        addedExercise,
        editExercise,
        exerciseToEdit,
        indexOfExeToEdit,
        addBtnActive
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const OpenModalHandler=()=>{
        setOpenCreateExerciseModal(!OpenCreateExerciseModal);
        setAddBtnActive(true);
    };
    const addExerciseTitle=(event)=>{
        event.preventDefault();
        let tempTitle=event.target.value;
        let tempId=tempTitle.replace(/ /g, '-').toLocaleLowerCase();

        setAddedExercise({...addedExercise, title:tempTitle, id:tempId});
        //validateAddedExercise(true);//will not work immediately properly because of Asyn state update use "useEffect()" instead
    };
    const addExerciseMuscle=(event)=>{
        setAddedExercise({...addedExercise, muscle:event.target.value});
        //validateAddedExercise(true);
    };
    const addExerciseDescription=(event)=>{
        setAddedExercise({...addedExercise, description:event.target.value});
        //validateAddedExercise(true);
    };
    //Because we cannot use callback funtion like this.setState for doing Asynchoronous tasks here like checking validity after updating the each property of "addedExercise" object so we can use useEffect() to check the  validity each time anything in "addedExercise" changes;
    useEffect(()=>{
        validateAddedExercise(true);
    },[addedExercise]);
    const addNewExerciseToList=()=>{
        setExercises(prevExercise=>prevExercise.concat(addedExercise));
        setOpenCreateExerciseModal(false);
        setAddedExercise({id:'', title: '',description: '',muscle: ''});
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const validateAddedExercise=(toAddNew)=>{
        if(toAddNew){
            var {title, muscle, description}=addedExercise;
        }else{
            var {title, muscle, description}=exerciseToEdit;
        }

        if(title!=="" && muscle!=="" && description!==""){
            setAddBtnActive(false);
        }else{
            setAddBtnActive(true);
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        setAddBtnActive(true);
    };
    const editExerciseTitle=(event)=>{
        let tempTitle=event.target.value;
        let tempId=tempTitle.replace(/ /g, '-').toLocaleLowerCase();

        setExerciseToEdit({...exerciseToEdit, title:tempTitle, id:tempId});
        //validateAddedExercise();
    };
    const editExerciseMuscle=(event)=>{
        setExerciseToEdit({...exerciseToEdit, muscle:event.target.value});
        //validateAddedExercise();
    };
    const editExerciseDescription=(event)=>{
        setExerciseToEdit({...exerciseToEdit,  description:event.target.value});
        //validateAddedExercise();
    };
    //Because we cannot use callback funtion like this.setState for doing Asynchoronous tasks here like checking validity after updating the each property of "exerciseToEdit" object so we can use useEffect() to check the  validity each time anything in "exerciseToEdit" changes;
    useEffect(()=>{
        validateAddedExercise();
    },[exerciseToEdit]);
    const saveEditedExercise=()=>{
        const editedExercise=exerciseToEdit;
        const tempExercises=exercises.map((exercise,index)=>{
            if(index===indexOfExeToEdit){
                return editedExercise;
            }else {
                return exercise;
            }
        });
        setExercises(tempExercises);
        setEditExercise(false);
        setExerciseToEdit({});
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const deleteExerciseFromList=(id)=>{
        let tempExercises=[];
        exercises.forEach(exercise=>{
            const tempExerc={...exercise};
            tempExercises=[...tempExercises, tempExerc];
        });//This safe copying of exercises into tempExercises was unnecessary because we are using "filter()" later anyway which don't changes the original array
        tempExercises=tempExercises.filter(exercise=>exercise.id!==id);

        setExercises(tempExercises);
        setEditExercise(false);
        setSelectedExercise(null);
        setExerciseToEdit({});
        setIndexOfExeToEdit('');
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
