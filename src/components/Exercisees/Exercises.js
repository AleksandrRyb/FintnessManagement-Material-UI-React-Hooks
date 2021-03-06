import React,{useContext, useEffect} from 'react';
import {Grid, Paper, Typography, List,
        ListItem, ListItemText, ListItemSecondaryAction,
        IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColor from '@material-ui/icons/BorderColor';
import {FitnessContext} from '../../contex';
import ReusableForm from '../dialogs/ReusableForm';
import { makeStyles } from '@material-ui/core/styles';//For functional Components


const useEditFormStyles=makeStyles(theme=>({
    formControl:{
        minWidth:'50em',
        marginLeft:  theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    Paper:{
        padding:20,
        marginTop:10,
        marginBottom:10,
        height:500,
        overflowY:'auto',
        marginLeft:0,
        /*[theme.breakpoints.up('sm')]:{
            marginTop:5,
            height:'calc(100% - 64px - 48px)'
        }, */
        [theme.breakpoints.down('xs')]:{
            height:'100%'
        }
    },
    //https://material-ui.com/customization/breakpoints/
    container:{
        [theme.breakpoints.up('sm')]:{
            height:'calc(100% - 64px - 48px)'
        },
        [theme.breakpoints.down('xs')]:{
            height:'calc(100% - 64px - 48px)'
        }
    },
    item:{
        [theme.breakpoints.down('xs')]:{
            height:'50%'
        }
    },
    spacing:{
        unit:0
    }
}));
const style={
    Paper:{padding:20, marginTop:10, marginBottom:10, height:500, overflowY:'auto', marginLeft:0}
};

const Exercises =(props)=>{

    const EditFormClasses = useEditFormStyles();

    const context=useContext(FitnessContext);
    const {selectedMuscle, exercises, selectedExercise, editExercise, muscles, addBtnActive, alreadyExists}=context;

    if(editExercise){
        var { exerciseToEdit:{title, description, muscle} }=context;
    }

    useEffect(()=>{
    }, [exercises, selectedMuscle]);


    return (
        <Grid container className={EditFormClasses.container}>
            <Grid item className={EditFormClasses.item} xs={12} sm={4} md={4} lg={4} xl={4}>
                <Paper className={EditFormClasses.Paper}>
                    {selectedMuscle.map(muscle=>{
                        return(
                            <React.Fragment key={muscle}>
                                <Typography variant="h5" style={{textTransform:'capitalize', display:'flex'}}>
                                    {muscle}
                                </Typography>
                                <List component="ul">
                                 {exercises.map((exercise,index)=>{
                                    if(exercise.muscle===muscle){
                                        return (
                                            <ListItem button key={exercise.id} onClick={()=>context.onSelectExerciseHandler(exercise.id)}>
                                                <ListItemText primary={exercise.title} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="Delete" onClick={()=>context.onEditExercise(index)}>
                                                        <BorderColor />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="Delete" onClick={()=>context.deleteExerciseFromList(exercise.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            );
                                        }
                                      })
                                    }
                                </List>
                            </React.Fragment>
                        );
                      })
                    }
                </Paper>
            </Grid>
            <Grid item className={EditFormClasses.item} xs={12} sm={8} md={8} lg={8} xl={8}>
                { editExercise? ( <ReusableForm toEdit
                                                classes={EditFormClasses}
                                                addedExercise={{muscles, title, description, muscle, addBtnActive, alreadyExists}}
                                                onTitleTextFieldHandler={context.editExerciseTitle}
                                                onCheckExistance={context.onEditcheckExistance}
                                                onMuscleNativeSelectHandler={context.editExerciseMuscle}
                                                onDcpTitleTextFieldHandler={context.editExerciseDescription}
                                                onButtonHandler={context.saveEditedExercise}/> ) :
                   ( <Paper className={EditFormClasses.Paper}>
                        <Typography variant="h4" style={{marginTop:'20px'}}>
                            {selectedExercise? selectedExercise.title:'Welcome'}
                        </Typography>
                        <Typography variant="body1">
                            {selectedExercise? '':'Please select exercise from the list on the left'}{selectedExercise? selectedExercise.description:''}
                        </Typography>
                     </Paper> )
                }
            </Grid>
        </Grid>
    );
};

export default Exercises;
