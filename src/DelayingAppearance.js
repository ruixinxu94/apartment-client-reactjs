import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(2),
    },
    placeholder: {
        height: 40,
    },
}));

export default function DelayingAppearance() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [query, setQuery] = React.useState('idle');
    const timerRef = React.useRef();
    const preventDefault = event => event.preventDefault();
    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [],
    );

    const handleClickQuery = () => {
        clearTimeout(timerRef.current);

        if (query !== 'idle') {
            setQuery('idle');
            return;
        }

        setQuery('progress');
        timerRef.current = setTimeout(() => {
            setQuery('success');
        }, 4000);
    };

    return (
        <div className={classes.root}>

            <div className={classes.placeholder}>
                {query === 'success' ? (
                    <Typography>
                    <Link href="https://msi-final-ruixinxu-resources.s3.us-east-2.amazonaws.com/usa.experian.com.pdf">
                        Download Report
                    </Link>
                    </Typography>
                ) : (
                    <Fade
                        in={query === 'progress'}
                        style={{
                            transitionDelay: query === 'progress' ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                )}
            </div>
            <Button variant="contained" color="secondary" onClick={handleClickQuery}>
                {query !== 'idle' ? 'Cancel' : 'Verify & Generate Report'}
            </Button>
        </div>
    );
}
