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


const Styles = {
    fab: {
        margin:2,
    }
};

const AddExercise=(props)=>{

    const context=useContext(FitnessContext);
    const { muscles, exercises, OpenCreateExerciseModal}=context;

    return (
        <React.Fragment>
            <Fab color="secondary" aria-label="Add" size="small" className={Styles.fab} onClick={context.OpenModalHandler}>
                <AddIcon />
            </Fab>
            <Dialog open={OpenCreateExerciseModal} onClose={context.OpenModalHandler} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Create a New Exercise</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                      Please fill out the form below:
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
};

export default AddExercise;
