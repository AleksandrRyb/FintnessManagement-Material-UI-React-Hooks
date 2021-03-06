import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';





const ReusableForm = (props) => {

    const {muscles, title, description, muscle, addBtnActive, alreadyExists}=props.addedExercise;

    return (
        <form>
            <TextField
                id="standard-name"
                label="Title"
                fullWidth
                value={title}
                onChange={(event)=>props.onTitleTextFieldHandler(event)}
                onInput={(event)=>props.onCheckExistance(event)}
                margin="normal"
                required
            />
            {alreadyExists? <p style={{color:'red'}}>Title already exists please use an unique one</p>: ''}
            <br/>
            <FormControl fullWidth>
                <NativeSelect  value={muscle}
                               style={{cursor:'pointer'}}
                               onChange={(event)=>props.onMuscleNativeSelectHandler(event)}
                               input={<Input name="muscle" id="muscle" placeholder="Please select"/>}>
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
                fullWidth
                value={description}
                onChange={(event)=>props.onDcpTitleTextFieldHandler(event)}
                margin="normal"
                placeholder="Please feel"
                required
            />
            <DialogActions>
                <Button variant="contained" color="primary" onClick={props.onButtonHandler} disabled={addBtnActive || alreadyExists}>
                    {addBtnActive || alreadyExists ? 'Please feel all the fields first': (props.toAdd? 'Add':'Save')}
                </Button>
            </DialogActions>
        </form>
    );
};

export default ReusableForm;
