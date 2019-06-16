import React from 'react';
import {Grid, Paper} from '@material-ui/core';

import LeftPlane from './LeftPlane';
import RightPlane from './RightPlane';

const style={
    Paper:{padding:20, marginTop:10, marginBottom:10}
}

const Exercises = (props) => {
    return (
        <Grid container>
            <Grid item xs>
                <LeftPlane style={style}/>
            </Grid>
            <Grid item xs>
                <RightPlane style={style}/>
            </Grid>
        </Grid>
    );
};

export default Exercises;
