import React from 'react';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

const Header = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="Menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                       Exercise Database
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
