import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';



const ReusableForm = (props) => {

    const {muscles, title, description, muscle}=props.addedExercise;



    return (
        <form>
            <TextField
                id="standard-name"
                label="Title"
                className={props.classes.formControl}
                value={title}
                onChange={(event)=>props.onTitleTextFieldHandler(event)}
                margin="normal"
            />
            <br/>
            <FormControl>
                <NativeSelect  className={props.classes.formControl}
                               value={muscle}
                               onChange={(event)=>props.onMuscleNativeSelectHandler(event)}
                               style={{cursor:'pointer'}}
                               input={<Input name="muscle" id="muscle" />}>
                    <option value={''} disabled></option>
                    {muscles.map(muscle=><option value={muscle} key={muscle}>{muscle}</option>)}
                </NativeSelect>
            </FormControl>
            <br/>
            <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                rowsMax="4"
                className={props.classes.formControl}
                value={description}
                onChange={(event)=>props.onDcpTitleTextFieldHandler(event)}
                margin="normal"
            />
            <DialogActions>
                <Button variant="contained" color="primary" onClick={props.onButtonHandler}>
                    Done
                </Button>
            </DialogActions>
        </form>
    );
};

export default ReusableForm;
