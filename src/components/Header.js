import React, {useContext} from 'react';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import AddEcercise from './dialogs/AddExercise';
import {FitnessContext} from '../contex';

const Header = (props) => {

    const context=useContext(FitnessContext);

    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="Menu" onClick={()=>context.onSelectHandler(-1)}>
                        <Menu/>
                    </IconButton>

                    <Typography variant="h6" style={{flex:1}}>
                        Fitness Manager
                    </Typography>

                    <AddEcercise />
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
