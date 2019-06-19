import React from 'react';
import {Grid, Paper, Typography, List, ListItem, ListItemText, ListItemLink} from '@material-ui/core';


const style={
    Paper:{padding:20, marginTop:10, marginBottom:10}
}

const Exercises = ({exercisesPlan}) => {
    console.log(exercisesPlan);
    return (
        <Grid container>
            <Grid item xs>
                <Paper style={style.Paper}>{/*because "exercisees" is an array containing 5 different arrays where each of these array haas a value and an object*/}
                    {exercisesPlan.map(([muscleGroup, exercises])=>{
                        return( <React.Fragment>
                                  <Typography variant="h5" style={{textTransform:'capitalize'}}>
                                    {muscleGroup}
                                  </Typography>
                                  <List component="ul">
                                    {exercises.map(exercise=>{
                                         return ( <ListItem button>
                                                      {exercise.title}
                                                    <ListItemText primary={'Aman'}  style={{color:'red'}} />
                                                  </ListItem> );
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
                    Right Plane
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Exercises;
