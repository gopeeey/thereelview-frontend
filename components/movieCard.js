import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StarIcon from '@material-ui/icons/Star';
import CustomRating from './rating';




const useStyles = makeStyles(theme => ({
    root: props => ({
        width: '58vw',
        borderRadius: '0.9em',
        boxShadow: `0px 0px 40px 2px ${props.movie.color}`,
        padding: '0px',
        transition: 'all 0.7s',
        overflow: 'hidden',
        '&:hover': {
            boxShadow: `0px 0px 75px 2px ${props.movie.color}`
        },
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: '74vw'
        },
        [theme.breakpoints.down('sm')]: {
            width: '90vw'
        },
        [theme.breakpoints.down('xs')]: {
            width: '94vw',
            flexDirection: 'column'
        }
    }),
    posterHolder: {

    },
    poster: {
        height: '30vw',
        [theme.breakpoints.down('md')]: {
            height: '40vw'
        },
        [theme.breakpoints.down('sm')]: {
            height: '50vw'
        },
        [theme.breakpoints.down('xs')]: {
            height: 'unset',
            width: '94vw'
        }
    },
    details: {
        padding: theme.spacing(4, 5)
    },
    title: {
        fontFamily: theme.typography.regular.fontFamily
    },
    yearDurationGenre: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        '& .small': {
            fontFamily: theme.typography.light.fontFamily,
            fontSize: '98%'
        }
    },
    spaceTop1: {
        marginTop: theme.spacing(1)
    },
    spaceTop2: {
        marginTop: theme.spacing(2)
    },
    description: {
        fontFamily: theme.typography.regular.fontFamily,
        letterSpacing: '1px',
        wordSpacing: '1px',
        lineHeight: '1.6em',
        marginTop: theme.spacing(2),
        fontSize: '92%'
    },
    trailer: props => ({
        color: props.movie.color.replace('a', '').replace(', 0.4', ''),
        paddingLeft: theme.spacing(0)
    }),
    spaceLeft1: {
        marginLeft: theme.spacing(1)
    },
    rating: {
        display: 'flex',
        alignItems: 'flex-start',
        '& .starIcon': {
            marginLeft: '3px'
        }
    },
    durationHolder: {
        display: 'flex',
        marginTop: theme.spacing(-1)
    },
    duration: {
        border: '0.2px solid',
        borderColor: 'rgba(250, 250, 250, 0.2)',
        borderRadius: '0.2em',
        padding: '4px',
        fontSize: '95%'
    }
}));

export default function MovieCard(props) {
    const classes = useStyles(props);


    const [movie, changeMovie] = React.useState(props.movie);

    const updateMovie = (newMovie) => {
        changeMovie(newMovie);
    }

    return (
        <div className={classes.root}>
            <img src={movie.posterImage} alt={movie.title}
                className={classes.poster} />
            <div className={classes.details}>
                <Typography variant="h4" className={classes.title}>
                    {movie.title}
                </Typography>


                <div className={clsx(classes.yearDurationGenre, classes.spaceTop2)}>
                    <div className={classes.durationHolder}>
                        <Typography variant="body2" className={classes.duration}>
                            {movie.duration} min
                        </Typography>
                    </div>
                    <Typography variant="body2" className='small'>
                        {movie.year}
                    </Typography>
                    <Typography variant="body2" className={clsx('small', classes.rating)}>
                        {Math.round(movie.rating * 10) / 10} <StarIcon fontSize="small" className="starIcon" />
                    </Typography>
                    <Typography variant="body2" className="small">
                        {movie.genres.length ? (movie.genres[0]) : (null)}
                    </Typography>

                </div>
                <div className={clsx(classes.rateBox, classes.spaceTop2)}>
                    <CustomRating
                        movie={movie}
                        updateMovie={(newMovie) => {
                            updateMovie(newMovie);
                        }}
                    />
                </div>
                <Typography variant="body2" className={classes.description}>
                    {movie.description.split(" ").slice(0, 30).join(" ")}...<span>Read more</span>
                </Typography>

                <Button color="primary" className={clsx(classes.trailer, classes.spaceTop2)}>
                    <PlayCircleFilledIcon color="inherit" /> <span className={classes.spaceLeft1}>
                        watch trailer
                    </span>
                </Button>

            </div>
        </div>
    )
}
