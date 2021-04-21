import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    Typography,
    Grid,
    Chip,
    InputBase,
    Button,
    CircularProgress
} from '@material-ui/core';
import DetailBanner from '../components/detailBanner';
import CommentBox from '../components/comment';
import axios from 'axios';
import { fetchUrl } from '../axiosparams';
import Link from 'next/link';
import { withRouter } from 'next/router';
import clsx from 'clsx';


const useStyles = theme => ({
    root: {
        width: '100%',
        paddingBottom: theme.spacing(2)
    },
    toolbar: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid',
        borderBottomColor: 'rgba(250, 250, 250, 0.6)'
    },
    logoHolder: {
        width: '4vw',
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
    spaceBottom1: {
        marginBottom: theme.spacing(1)
    },
    logoText: {
        fontFamily: theme.typography.semiBold.fontFamily,
        marginLeft: theme.spacing(2),
        fontSize: '140%',
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
    main: {
        width: '100%'
    },
    loadingMain: {
        display: 'flex',
        justifyContent: 'center',
        height: '80vh',
        alignItems: 'center'
    },
    descriptionRoot: {
        padding: theme.spacing(0, 22, 0, 3),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0, 17, 0, 5)
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 8, 0, 5)
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0, 2)
        }
    },
    description: {
        fontFamily: theme.typography.regular.fontFamily,
        letterSpacing: '1px',
        wordSpacing: '1px',
        lineHeight: '1.6em',
    },
    tags: {
        padding: theme.spacing(3, 9),
        display: 'flex',
        justifyContent: 'center',
        'flex-wrap': 'wrap',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(3, 2)
        }
    },
    tag: {
        borderColor: 'rgba(250, 250, 250, 0.3)',
        borderRadius: '0.3em',
        margin: theme.spacing(1),

    },
    tagText: {
        fontSize: '99%'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(8),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(6)
        }
    },
    commentBox: {
        border: '1px solid',
        borderColor: 'rgba(250, 250, 250, 0.2)',
        borderRadius: '0.3em',
        padding: theme.spacing(2),
        fontFamily: theme.typography.regular.fontFamily,
        fontSize: '97%'

    },
    commentBoxPlaceholder: {
        '&::placeholder': {
            fontFamily: theme.typography.regular.fontFamily,
        }
    },
    commentHolder: {
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            padding: '0px',
            marginTop: theme.spacing(1)
        }
    },
    commentSubmit: {
        padding: '12px'
    },
    commentSection: {
        marginTop: theme.spacing(9)
    },
    comment: {
        marginBottom: theme.spacing(5)
    },
    footer: {
        marginTop: theme.spacing(12),
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
});


class MovieDetail extends React.PureComponent {

    state = {
        movie: null,
        loading: false,
        comment: '',
        name: '',
        commentLoading: false
    }

    componentIsMounted = false;

    changeState = (newState, callback) => {
        this.componentIsMounted && this.setState(newState, callback);
    }

    fetchMovie = () => {
        this.changeState({ loading: true });
        axios.post(`${fetchUrl}movies/get`, {
            id: this.props.router.query.detail
        }).then(res => {
            if (!res.data.error) {
                this.changeState({
                    movie: res.data.data.movie,
                    loading: false
                });
            } else {
                this.changeState({ loading: false });
                console.log('Something went wrong');
            }
        }).catch(error => {
            this.changeState({ loading: false });
            console.log(error);
        });
    }


    componentDidMount() {
        this.componentIsMounted = true;
        if (this.props.router) {
            this.fetchMovie();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router !== this.props.router) {
            this.fetchMovie();
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleChange = (e) => {
        this.changeState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }

        if (this.state.comment.length) {
            const comment = {
                body: this.state.comment
            }
            if (this.state.name.length) {
                comment["username"] = this.state.name;
            }
            const form = {
                id: this.state.movie._id,
                comment
            }
            this.changeState({
                commentLoading: true
            })
            axios.post(`${fetchUrl}movies/comment`, form).then(res => {
                if (!res.data.error) {
                    this.changeState({
                        commentLoading: false,
                        movie: res.data.data.movie,
                        name: '',
                        comment: ''
                    });

                    if (document) {
                        document.querySelector('#nameInput').value = ''
                        document.querySelector('#commentInput').value = ''
                    }
                } else {
                    this.changeState({
                        commentLoading: false
                    });
                    console.log('Something went wrong');
                }
            }).catch(error => {
                this.changeState({
                    commentLoading: false
                });
                console.log(error);
            })
        }
    }

    render() {
        const { classes } = this.props;
        const movie = this.state.movie;
        return (
            <div className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Link href="/" as="/" passHref>
                        <a className={classes.link}>
                            <div className={classes.logoBox}>
                                <div className={classes.logoHolder}>
                                    <img src='/images/logo.png' alt="logo"
                                        className={classes.logo} />
                                </div>
                                <Typography variant="h4" className={classes.logoText}>
                                    The Reel View
        </Typography>
                            </div>
                        </a>
                    </Link>


                </Toolbar>

                <div className={clsx(classes.main, {
                    [classes.loadingMain]: this.state.loading
                })}>
                    {
                        this.state.loading ? (
                            <CircularProgress color="primary" />
                        ) : (
                            movie ? (
                                <>

                                    <DetailBanner movie={movie} />

                                    <Grid container>
                                        <Grid item xs={12} sm={4} className={classes.tags}>
                                            {
                                                movie.genres.map(genre => (
                                                    <Chip key={genre}
                                                        label={<Typography className={classes.tagText} variant="body2">{genre}</Typography>}
                                                        variant="outlined" color="secondary" className={classes.tag} />
                                                ))
                                            }
                                        </Grid>

                                        <Grid item xs={12} sm={8} className={classes.descriptionRoot}>
                                            <Typography variant="body2" className={classes.description}>
                                                {movie.description}
                                            </Typography>

                                            <form className={classes.form} onSubmit={this.handleSubmit}>
                                                <Grid container>
                                                    <Grid item xs={12} sm={8}>
                                                        <InputBase className={clsx(classes.commentBox, classes.spaceBottom1)}
                                                            fullWidth
                                                            inputProps={{
                                                                className: classes.commentBoxPlaceholder
                                                            }}
                                                            name="name"
                                                            id="nameInput"
                                                            placeholder="Name (optional)"
                                                            onChange={this.handleChange}
                                                            multiline />
                                                        <InputBase className={classes.commentBox}
                                                            fullWidth
                                                            name="comment"
                                                            id="commentInput"
                                                            inputProps={{
                                                                className: classes.commentBoxPlaceholder
                                                            }}
                                                            placeholder="Drop a comment"
                                                            onChange={this.handleChange}
                                                            multiline />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} className={classes.commentHolder}>
                                                        <Button
                                                            fullWidth
                                                            color="secondary"
                                                            variant="contained"
                                                            className={classes.commentSubmit}
                                                            onClick={this.handleSubmit}>
                                                            {this.state.commentLoading ? (
                                                                <CircularProgress size={20} color="primary" />
                                                            ) : ("Submit")}
                                                        </Button>
                                                    </Grid>
                                                </Grid>

                                            </form>


                                        </Grid>
                                    </Grid>
                                    <Grid container justify="flex-end">
                                        <Grid item xs={12} sm={8} className={classes.descriptionRoot}>
                                            <div className={classes.commentSection}>
                                                {movie.comments.map(comment => (
                                                    <div key={comment._id} className={classes.comment}>
                                                        <CommentBox comment={comment} key={comment._id} />
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (null)

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
}


export default withStyles(useStyles)(withRouter(MovieDetail));