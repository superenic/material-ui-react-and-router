import React from 'react';
import { STYLE } from '../index.style';
import Container from '@material-ui/core/Container';

export default function PageNotFound() {
    const useStyles = STYLE;
    const classes = useStyles();

    return <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="sm" className={classes.container}>
            <h1 style={{textAlign:"center"}}>Page not found.</h1>
        </Container>
    </main>
};