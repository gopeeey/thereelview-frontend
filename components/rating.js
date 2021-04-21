import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Modal,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import LoadingBackdrop from './loadingBackdrop';
import axios from 'axios';
import { fetchUrl } from '../axiosparams';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

function StyledRating(props) {

    const SubStyledRating = withStyles({
        iconFilled: {
            color: props.color.replace('a', '').replace(', 0.4', '')
        },
        iconHover: {
            color: props.color.replace('a', '').replace(', 0.4', '')
        },
        iconEmpty: {
            color: 'white'
        }
    })((moreProps) => {
        const filteredFromWithStyles = Object.fromEntries(
            Object.entries(moreProps).filter(([key, value]) => (key !== "color"))
        )
        const superProps = {
            ...props,
            ...filteredFromWithStyles
        }
        return <Rating {...superProps} precision={0.5} />
    });
    return <SubStyledRating />
}


export default function CustomRating(props) {
    const classes = useStyles();

    const {
        movie,
        updateMovie
    } = props;
    const [rating, changeRating] = React.useState(movie.rating || 0);
    const [loading, changeLoading] = React.useState(false);

    const handleChange = (rating) => {
        changeLoading(true);
        axios.post(`${fetchUrl}movies/rate`, {
            id: movie._id,
            rating
        }).then(res => {
            changeLoading(false);
            if (!res.data.error) {
                changeRating(rating);
                updateMovie(res.data.data.movie);
            } else {
                console.log('Something went wrong')
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <LoadingBackdrop
                open={loading} />
            <StyledRating
                name="movie-rating"
                value={rating}
                color={movie.color}
                onChange={(event, newValue) => {
                    handleChange(newValue);
                }}
            />
        </div>

    )
}