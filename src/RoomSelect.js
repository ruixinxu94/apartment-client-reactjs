import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ResponsiveDrawer from "./ResponsiveDrawer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import RegisterUser from "./RegisterUser";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AllTypesRoom from "./AllTypesRoom";
import StudioRooms from "./StudioRooms";
import OneBOneB from "./OneBOneB";
import TwoBTwoB from "./TwoBTwoB";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkin from "./Checkin";
import MoveOut from "./MoveOut";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

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
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
}));


export default function RoomSelect() {
    const classes = useStyles();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <React.Fragment>
            <ResponsiveDrawer/>
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
                        <Tab label="Room Selection" {...a11yProps(0)} />
                        <Tab label="Resident Registering & Verifying" {...a11yProps(1)} />
                        <Tab label="Resident Move Out" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Grid container
                              justify="center">

                            <CssBaseline/>
                            <main>
                                <Typography variant="h3" color="inherit" noWrap>
                                    <HomeWorkIcon className={classes.icon}/>Room Selection
                                </Typography>
                                <Container className={classes.cardGrid} maxWidth="md">
                                    {/* End hero unit */}
                                    <Grid container spacing={4}>

                                        <Grid item key={1} xs={8} >
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image="https://msi-final-ruixinxu-resources.s3.us-east-2.amazonaws.com/all.png"
                                                    title="Image title"
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        All Types
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <div className={classes.root}>
                                                        <ExpansionPanel>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography className={classes.heading}>Show All Room Details</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <Typography>
                                                                    <AllTypesRoom/>
                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                    </div>
                                                </CardActions>
                                            </Card>
                                        </Grid>

                                        <Grid item key={2} xs={8} >
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image="https://msi-final-ruixinxu-resources.s3.us-east-2.amazonaws.com/studio.png"
                                                    title="Image title"
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Studio
                                                    </Typography>
                                                    <Typography>
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <div className={classes.root}>
                                                        <ExpansionPanel>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography className={classes.heading}>Show Studio Room Details</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <Typography>
                                                                    <StudioRooms/>
                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                    </div>
                                                </CardActions>
                                            </Card>
                                        </Grid>

                                        <Grid item key={3} xs={8} >
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image="https://msi-final-ruixinxu-resources.s3.us-east-2.amazonaws.com/1b1b.png"
                                                    title="Image title"
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        1b1b
                                                    </Typography>
                                                    <Typography>
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <div className={classes.root}>
                                                        <ExpansionPanel>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography className={classes.heading}>Show 1b1b Room Details</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <Typography>
                                                                    <OneBOneB/>
                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                    </div>
                                                </CardActions>
                                            </Card>
                                        </Grid>

                                        <Grid item key={4} xs={8} >
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image="https://msi-final-ruixinxu-resources.s3.us-east-2.amazonaws.com/2b2b.png"
                                                    title="Image title"
                                                />
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        2b2b
                                                    </Typography>
                                                    <Typography>

                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <div className={classes.root}>
                                                        <ExpansionPanel>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography className={classes.heading}>Show 2b2b Room Details</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <Typography>
                                                                    <TwoBTwoB/>
                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                    </div>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </main>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Checkin/>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <MoveOut/>
                    </TabPanel>
                </SwipeableViews>
            </div>

        </React.Fragment>
    );
}
