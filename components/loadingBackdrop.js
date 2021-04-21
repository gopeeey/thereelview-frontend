import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Modal,
    Backdrop,
    CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        '&:focus': {
            outline: 'none'
        }
    }
}));


export default function LoadingBackdrop(props) {
    const classes = useStyles();
    const {
        open
    } = props;

    return (
        <Modal
            BackdropComponent={Backdrop}
            className={classes.modal}
            open={open}
            BackdropProps={{
                timeout: 500
            }}
            closeAfterTransition
        >
            <CircularProgress color="primary" className={classes.circle} />
        </Modal>

    )
}