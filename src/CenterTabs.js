import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import UserMaintenance from "./UserMaintenance";
import ResetPassword from "./ResetPassword";
import Paper from "@material-ui/core/Paper";
import PayLease from "./PayLease";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
            paddingRight: 0
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://msi-final-ruixinxu-resources.s3.us-east-2.amazonaws.com/WX20191114-232607%402x.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }
}));

export default function CenterTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    centered
                >
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="Settings" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={3}>
                        </Grid>


                            <Paper className={classes.mainFeaturedPost}>

                                <div className={classes.overlay} />
                                <Grid container>
                                    <Grid item md={8} container
                                          justify="center">
                                        <div className={classes.mainFeaturedPostContent}>
                                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                                 Welcome, {JSON.parse(localStorage.getItem("user")).lastname} !
                                            </Typography>
                                            <Typography variant="h5" color="inherit" paragraph>
                                                You can request for maintenance service and pay your rental here! Party room reservation is at the front desk.

                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>

                        <Grid item xs={6} sm={3}>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                        </Grid>
                    </Grid>
                    <UserMaintenance/>
                    <PayLease/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ResetPassword/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
