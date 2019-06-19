import React from 'react';
import {Grid, Paper, Typography, List, ListItem, ListItemText, ListItemLink} from '@material-ui/core';


const style={
    Paper:{padding:20, marginTop:10, marginBottom:10, height:500, overflowY:'auto', marginLeft:0}
};

const Exercises = (props) => {

    return (
        <Grid container>
            <Grid item xs>
                <Paper style={style.Paper}>
                    {props.muscles.map(muscle=>{
                        return( <React.Fragment key={muscle}>
                                  <Typography variant="h5" style={{textTransform:'capitalize'}}>
                                    {muscle}
                                  </Typography>
                                  <List component="ul">
                                    {props.exercises.map((exercise,index)=>{
                                        if(exercise.muscles===muscle){
                                            return ( <ListItem button key={exercise.id}>
                                                        <ListItemText primary={exercise.title} onClick={()=>props.onSelectExercise(exercise.id)}/>
                                                     </ListItem> );
                                        }
                                      })
                                    }
                                  </List>
                                </React.Fragment> );
                      })
                    }
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper style={style.Paper}>
                    <Typography variant="h4" style={{marginTop:'20px'}}>{props.selectedExercise? props.selectedExercise.title:'Welcome'}</Typography>
                    <Typography variant="body1">{props.selectedExercise? '':'Please select exercise from the list on the left'}{props.selectedExercise? props.selectedExercise.description:''}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Exercises;
