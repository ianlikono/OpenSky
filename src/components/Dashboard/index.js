import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import React, { useState } from "react";
import Modal from './Modal';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    minWidth: 300,
    margin: 5,
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
  },
}));

const cities = [
  {name: "Atlanta", ICAO: "KATL"},
  {name: "Shanghai", ICAO: "ZSPD"},
  {name: "Delhi", ICAO: "VIDP"},
  {name: "Beijing", ICAO: "ZBAA"},
  {name: "Dubai", ICAO: "OMDB"},
  {name: "Tokyo", ICAO: "RJTT"},
  {name: "Illinois", ICAO: "KORD"},
  {name: "London", ICAO: "EGLL"},
  {name: "Hesse", ICAO: "EDDF"},
  {name: "Texas", ICAO: "KDFW"}
];
const Dashboard = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIcao, setActiveIcao] = useState(null)
  function onAirportClicked(icao) {
    setActiveIcao(icao);
    setModalOpen(true);
  }
    function handleModalOpen() {
      setModalOpen(true);
    }

    function handleModalClose() {
      setModalOpen(false);
    }

  function renderAirpots() {
    return cities.map((city, i) => (
      <Card onClick={() => onAirportClicked(city.ICAO)} raised key={i} className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {city.ICAO}
          </Typography>
          <Typography variant="h5" component="h2">
            {city.name}
          </Typography>
        </CardContent>
      </Card>
    ))
  }
  return (
    <Paper className={classes.root}>
      <div className={classes.list}>
        {renderAirpots()}
      </div>
      <Modal activeIcao={activeIcao} open={modalOpen} handleModalOpen={handleModalOpen} handleModalClose = {handleModalClose} />
    </Paper>
  );
};

export default Dashboard;
