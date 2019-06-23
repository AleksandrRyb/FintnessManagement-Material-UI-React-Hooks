import React, {useContext} from 'react';
import {Paper, Tab, Tabs, Grid} from '@material-ui/core';
import {FitnessContext} from '../contex';

const Footer = (props) => {

    const context=useContext(FitnessContext);
    const { muscles, footerMenuToSelect}=context.myState;

    return (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper>
                <Tabs value={footerMenuToSelect}  indicatorColor="primary" textColor="primary" centered >
                    <Tab label="All" onClick={()=>context.onSelectHandler(-1)}/>
                    {muscles.map((muscle, index)=>{
                        return <Tab label={muscle} key={muscle} onClick={()=>context.onSelectHandler(index)}></Tab>
                    })}
                </Tabs>
            </Paper>
        </Grid>
    );
};

export default Footer;
