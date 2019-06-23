import React,{useContext} from 'react';
import {FitnessContext} from "../../contex";
import ReusableForm from './ReusableForm';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';//For functional Components
import { withStyles } from '@material-ui/core/styles';//For Statefull Components




const useStyles=makeStyles(theme=>({
    fab: {
        margin:1,
    },
    formControl:{
        minWidth: 500,
    }
}));



const AddExercise=(props)=>{

    const classes = useStyles();

    const context=useContext(FitnessContext);
    const { muscles, OpenCreateExerciseModal, addBtnActive, addedExercise:{title, description,muscle}}=context;


    return (
        <React.Fragment>
            <Fab color="secondary" aria-label="Add" size="small" className={classes.fab} onClick={context.OpenModalHandler}>
                <AddIcon />
            </Fab>
            <Dialog open={OpenCreateExerciseModal} onClose={context.OpenModalHandler} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Create a New Exercise</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                      Please fill out the form below:
                    </DialogContentText>
                    <ReusableForm toAdd
                                  classes={classes}
                                  addedExercise={{muscles, title, description, muscle, addBtnActive}}
                                  onTitleTextFieldHandler={context.addExerciseTitle}
                                  onMuscleNativeSelectHandler={context.addExerciseMuscle}
                                  onDcpTitleTextFieldHandler={context.addExerciseDescription}
                                  onButtonHandler={context.addNewExerciseToList}/>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default AddExercise;
