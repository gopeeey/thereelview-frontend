import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Typography
} from '@material-ui/core';
import FDate from '../components/date';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        border: '1px solid',
        borderColor: 'rgba(250, 250, 250, 0.2)',
        borderRadius: '0.3em',
        padding: theme.spacing(3)
    },
    comment: {
        fontFamily: theme.typography.regular.fontFamily,
        letterSpacing: '1px',
        wordSpacing: '1px',
        lineHeight: '1.6em',
        marginTop: theme.spacing(4)
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.blackish.main,
        fontFamily: theme.typography.bold.fontFamily,
        fontSize: '180%',
        width: '60px',
        height: '60px'
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    nameDate: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(3),
        '& .date': {
            fontFamily: theme.typography.regular.fontFamily,
            fontSize: '93%'
        }
    }
}));

export default function CommentBox(props) {
    const classes = useStyles();
    const { comment } = props;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Avatar className={classes.avatar}>
                    {comment.username.slice(0, 1)}
                </Avatar>
                <div className={classes.nameDate}>
                    <Typography variant="body1">
                        {comment.username}
                    </Typography>
                    <Typography variant="body2" className="date">
                        <FDate dateString={comment.date} />
                    </Typography>
                </div>
            </div>

            <div className={classes.body}>
                <Typography variant="body2" className={classes.comment}>
                    {comment.body}
                </Typography>

            </div>

        </div>
    )
}