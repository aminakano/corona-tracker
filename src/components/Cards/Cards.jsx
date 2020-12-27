import React from 'react';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Cards.module.css";

function Cards({ data: { confirmed, recovered, deaths, lastUpdate }}) {
  if(!confirmed) {
    return "Loading..."
  }

  const properties = [{
      status : "Infected",
      value: confirmed,
      description: "Number of active cases of Covid-19",
      className: styles.infected
    }, {
        status : "Recovered",
        value: recovered,
        description: "Number of recoveries of Covid-19",
        className: styles.recovered
    }, {
        status : "Deaths",
        value: deaths,
        description: "Number of deaths caused by Covid-19",
        className: styles.deaths
  }];

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {properties.map((property, i) => 
          <Grid item component={Card} xs={12} md={3} className={cx(styles.card, property.className)} key={i}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>{property.status}</Typography>
              <Typography variant="h5">
                <CountUp 
                  start={0}
                  end={property.value.value}
                  duration={2.5}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
              <Typography variant="body2">{property.description}</Typography>
            </CardContent>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Cards;
