import React from 'react';
import {Grid, Paper, Typography, List, ListItem, ListItemText, ListItemLink} from '@material-ui/core';


const style={
    Paper:{padding:20, marginTop:10, marginBottom:10, height:500, overflowY:'auto'}
};

const Exercises = (props) => {

    return (
        <Grid container>
            <Grid item xs>
                <Paper style={style.Paper}>
                    {props.muscles.map(muscle=>{
                        return( <React.Fragment>
                                  <Typography variant="h5" style={{textTransform:'capitalize'}}>
                                    {muscle}
                                  </Typography>
                                  <List component="ul">
                                    {props.exercises.map(exercise=>{
                                        if(exercise.muscles===muscle){
                                            return ( <ListItem button>
                                                        {console.log('each',exercise)}
                                                        <ListItemText primary={exercise.title} />
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
                    <Typography variant="h4" style={{marginTop:'20px'}}>Welcome</Typography>
                    <Typography variant="body1">Please select exercise from the list on the left</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Exercises;
