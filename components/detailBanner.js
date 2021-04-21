import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import clsx from 'clsx';
import CustomRating from './rating';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    bannerRoot: props => ({
        width: '100%',
        height: '40vw',
        'clip-path': 'polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)',
        background: `url('${props.movie.bannerImage}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [theme.breakpoints.down('xs')]: {
            height: '100vw'
        }
    }),
    screen: {
        width: '100%',
        height: '100%',
        'clip-path': 'polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)',
        background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8))'
    },
    posterHolder: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: '2'
    },
    poster: {
        maxWidth: '90%',
        borderRadius: '0.7em'
    },
    bannerDetails: {
        marginTop: theme.spacing(-42),
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(-36)
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(-29)
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(-23)
        }
    },
    detail: {
        zIndex: 2,
        marginTop: theme.spacing(8),
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(4)
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0, 2)
        },
    },
    title: {
        fontFamily: theme.typography.semiBold.fontFamily,
        [theme.breakpoints.down('sm')]: {
            fontSize: '250%'
        }
    },
    yearDurationGenre: {
        display: 'flex',
        width: '40%',
        justifyContent: 'space-between',
        '& .small': {
            fontFamily: theme.typography.bold.fontFamily,
            fontSize: '98%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '60%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: theme.spacing(2, 0)
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


export default function DetailBanner(props) {
    const classes = useStyles(props);

    const [movie, changeMovie] = React.useState(props.movie);

    const updateMovie = (newMovie) => {
        changeMovie(newMovie);
    }

    return (
        <div className={classes.root}>

            <div className={classes.bannerRoot}>
                <div className={classes.screen}>

                </div>
            </div>
            <Grid container className={classes.bannerDetails}>
                <Grid item xs={12} sm={4} className={classes.posterHolder}>
                    <img src={movie.posterImage} alt={movie.title}
                        className={classes.poster} />
                </Grid>
                <Grid item xs={12} sm={8} className={classes.detail}>
                    <Typography variant="h3" className={classes.title}>
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

                    </div>

                    <div className={classes.spaceTop2}>
                        <CustomRating
                            movie={movie}
                            updateMovie={(newMovie) => {
                                updateMovie(newMovie);
                            }}
                        />
                    </div>
                </Grid>
            </Grid>

        </div >
    )
}