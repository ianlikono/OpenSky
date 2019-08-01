import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React from 'react';
import Table from './Table';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  formHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  footer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  error: {
      color: 'red'
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function Modal(props) {
  const classes = useStyles();
  const [type, setType] = React.useState("");
  const [time, setTime] = React.useState("")
  const [searchValidationError, setSearchValidationError] = React.useState(false);
  const [flights, setFlights] = React.useState([]);
  const [fetching, setFetching] = React.useState(false);

  function renderFlights(){
      console.log(flights);
     return flights && flights.length ? (
         <>
            <Table data={flights}/>
        </>
     ):(
        <Typography component="p">
          Please select type and input time to search for flights
        </Typography>
     )
  }

  function handleTypeChange(event) {
    setSearchValidationError(false)
    setType(event.target.value);
  }

  async function onFlightsSearch() {
    const validType = type.length > 0;
    const validTime = parseInt(time) > 0;
    if(validType && validTime) {
        setFetching(true);
        const beginTime = getTime(parseInt(time));
        const endTime = getTime(0);
        try {
            const response = await axios.get(`http://localhost:3001/api/flights`, {params: {type: type, icao: props.activeIcao, beginTime: Math.round(beginTime), endTime: Math.round(endTime)}});
            await setFlights(response.data.data);
            await setFetching(false);
        }catch(e) {
            console.log(e);
        }
    } else {
        setSearchValidationError(true)
    }
  }
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        open={props.open}
        onClose={props.handleModalOpen}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{props.activeIcao} Flights</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Select Categories
          </DialogContentText>
          {searchValidationError && (<Typography component="p" className={classes.error}>
          Please select type and input time
        </Typography>)}
          <form className={classes.form} noValidate>
            <div className={classes.formHeader}>
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Select Type</InputLabel>
                <Select
                    value={type}
                    onChange={handleTypeChange}
                    inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                    }}
                >
                    <MenuItem value="arrival">arrival</MenuItem>
                    <MenuItem value="departure">departure</MenuItem>
                </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                <TextField
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    id="time"
                    label="Time in minutes"
                    className={classes.textField}
                    margin="normal"
                    placeholder="Input time in minutes"
                    type="number"
                />
                </FormControl>
            </div>
          </form>
          <div>
              {fetching ? (
                  <div>
                    <p>Loading...</p>
                    <LinearProgress color="secondary" />
                </div>
              ): renderFlights()}
          </div>
        </DialogContent>
        <DialogActions>
            <div className={classes.footer}>
                <Button onClick={props.handleModalClose} color="primary">
                    Close
                </Button>
                <Button onClick={onFlightsSearch} color="primary">
                    Search
                </Button>
            </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function getTime(minutes){
    const time = new Date();
    time.setMinutes(time.getMinutes() - minutes);
    return Math.round(time.getTime()/1000);
}