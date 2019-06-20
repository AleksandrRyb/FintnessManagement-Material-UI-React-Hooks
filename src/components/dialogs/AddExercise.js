import React,{useContext} from 'react';
import {FitnessContext} from "../../contex";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';//For functional Components
import { withStyles } from '@material-ui/core/styles';//For Statefull Components




const useStyles=makeStyles(theme=>({
    fab: {
        margin:2,
    },
    formControl:{
        minWidth: 500,
    }
}));



const AddExercise=(props)=>{

    const classes = useStyles();

    const context=useContext(FitnessContext);
    const { muscles, OpenCreateExerciseModal, addedExercise:{ title, description,muscle}}=context;

    const validateAndAddExercise=()=>{
        console.log('validator')

        context.addNewExerciseToList();
    };

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
                    <form>
                        <TextField
                            id="standard-name"
                            label="Title"
                            className={classes.formControl}
                            value={title}
                            onChange={(event)=>context.addExerciseTitle(event)}
                            margin="normal"
                        /><br/>
                        <FormControl>
                            <InputLabel htmlFor="muscle">Muscle</InputLabel>
                            <NativeSelect  className={classes.formControl}
                                           value={muscle}
                                           onChange={(event)=>context.addExerciseMuscle(event)}
                                           style={{cursor:'pointer'}}
                                           input={<Input name="muscle" id="muscle" />}>
                                <option value={''} disabled></option>
                                {muscles.map(muscle=>{
                                    return <option value={muscle} key={muscle}>{muscle}</option>
                                })}
                            </NativeSelect>
                        </FormControl><br/>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Description"
                            multiline
                            rowsMax="4"
                            className={classes.formControl}
                            value={description}
                            onChange={(event)=>context.addExerciseDescription(event)}
                            margin="normal"
                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary" onClick={validateAndAddExercise}>
                        Create
                    </Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
};

export default AddExercise;
