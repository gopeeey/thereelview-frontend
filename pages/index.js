import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Toolbar,
  CircularProgress
} from '@material-ui/core';
import MovieCard from '../components/movieCard';
import axios from 'axios';
import { fetchUrl } from '../axiosparams';
import clsx from 'clsx';
import Link from 'next/link';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(12)
  },
  loadingMain: {
    justifyContent: 'center',
    height: '84vh',
    alignItems: 'center'
  },
  toolbar: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid',
    borderBottomColor: 'rgba(250, 250, 250, 0.6)'
  },
  logoHolder: {
    width: '6vw',
    [theme.breakpoints.down('md')]: {
      width: '7vw'
    },
    [theme.breakpoints.down('sm')]: {
      width: '10vw'
    },
    [theme.breakpoints.down('xs')]: {
      width: '17vw'
    }
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    maxWidth: '100%'
  },
  spaceLeft2: {
    marginLeft: theme.spacing(2)
  },
  logoText: {
    fontFamily: theme.typography.semiBold.fontFamily,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      fontSize: '144%'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '146%'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '152%'
    }
  },
  movieCardBox: {
    marginBottom: theme.spacing(12)
  },
  footer: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderTop: '1px solid',
    borderTopColor: 'rgba(250, 250, 250, 0.6)'
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}));

export default function Index(props) {
  const classes = useStyles();
  const [mounted, setMounted] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    if (!mounted) {
      setFetching(true);
      axios.get(`${fetchUrl}movies/getall`).then(res => {
        setFetching(false);
        if (!res.data.error) {
          setMovies(res.data.data.movies)
        } else {
          console.log(res.data.error)
        }

      }).catch(error => {
        console.log(error);
      });
      setMounted(true);
    }
  }, [])
  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logoBox}>
          <div className={classes.logoHolder}>
            <img src='/images/logo.png' alt="logo"
              className={classes.logo} />
          </div>
          <Typography variant="h4" className={classes.logoText}>
            The Reel View
        </Typography>
        </div>

      </Toolbar>

      <div className={clsx(classes.main, {
        [classes.loadingMain]: fetching
      })}>
        {
          fetching ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              {
                movies.map(movie => (
                  <Link href="/[detail]" as={`/${movie._id}`} passHref
                    key={movie._id}>
                    <a className={classes.link}>
                      <div className={classes.movieCardBox} >
                        <MovieCard movie={movie} />
                      </div>
                    </a>
                  </Link>

                ))
              }
            </>
          )
        }

      </div>
      <footer className={classes.footer}>
        <Typography variant="body2">
          Created by a Zuri Intern
        </Typography>
      </footer>
    </div>
  )
}