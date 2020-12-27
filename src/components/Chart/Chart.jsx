import React, { useState, useEffect } from 'react';
import { fetchDailyData } from "../../api";
import { Line, Bar, HorizontalBar, defaults } from "react-chartjs-2";
import styles from "./Chart.module.css";

defaults.global.defaultFontFamily = "Roboto";
defaults.global.title.fontSize = window.innerWidth < 780 ? 16 : 24;

const Chart = ({ data: { confirmed, recovered, deaths }, country })  => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }

    fetchAPI();
  }, []);

  const lineChart = (
    dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true
          }]
        }}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return value.toLocaleString()
                }
              }
            }]
          }
        }}  
      />
    ) : null
  );

  const barChart = (
    confirmed ? 
    window.innerWidth < 780 ? 
    (
      <HorizontalBar
        data={{
          labels: ["infected", "Recovered", "Deaths"],
          datasets: [{
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)", 
              "rgba(0, 255, 0, 0.5)", 
              "rgba(255, 0, 0, 0.5)"],
            data: [confirmed.value, recovered.value, deaths.value]
          }],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}`},
          scales: {
            xAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return value.toLocaleString()
                }
              }
            }]
          }
        }}
      />
    ) : (
      <Bar
        data={{
          labels: ["infected", "Recovered", "Deaths"],
          datasets: [{
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)", 
              "rgba(0, 255, 0, 0.5)", 
              "rgba(255, 0, 0, 0.5)"],
            data: [confirmed.value, recovered.value, deaths.value]
          }],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}`},
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return value.toLocaleString()
                }
              }
            }]
          }
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart
