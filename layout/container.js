import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000000'
    }
});


class Container extends React.PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.props.children}
            </div>
        )
    }
}

export default withStyles(useStyles)(Container);