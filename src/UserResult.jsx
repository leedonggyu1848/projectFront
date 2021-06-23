import React from "react";
import { makeStyles } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userResult:{
    width: 'calc(100vw - 256px)',
    height: '100vh',
    left: '256px',
    position: 'absolute',
    padding: '30px',
    margin: '0px',
    overflow:'hidden',
    '@media (max-width: 960px)':{
      overflow:'scroll',
    },
    '@media (max-width: 600px)':{
      padding: 'unset',
      position: 'unset',
      width: '100vw',
      height: 'unset',
      position: 'unset',
      left: 'unset',
      overflow:'unset'
    }
  },
  mainContents:{  
    backgroundColor:'white',
    width: '100%',
    height:'100%',
    '@media (max-width: 960px)':{
      height:'unset'
    },
    '@media (max-width: 600px)' :{
      height: 'unset',
      flexDirection: 'column',
    }
  },
  card:{
    height:'20vh',
    width: 'calc(20vh * 2.5)',
    maxWidth: 'calc((100vw - 316px)/2)',
    '@media (max-width: 960px)':{
      height: 'unset',
      width: 'unset',
      maxWidth: 'unset'
    }
  },
  x2Card:{
    height:'20vh',
    overflowY: 'scroll',
    wordBreak:'break-all',
    '@media (max-width: 960px)':{
      height: 'unset'
    },
    '@media (max-width:600px)':{
      overflow: 'unset'
    }
  }
}));

const data = {
  bar:{
    series: [{
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    options: {
      annotations: {
        points: [{
          x: 'May',
          seriesIndex: 0,
          label: {
            borderColor: '#775DD0',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: 'yours',
          }
        }],
      },
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => {
          return val + "%";
        },
        offsetY: 20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      
      },
    },
  },
  radial: {
    series: [100],
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: '22px'
            }
          }
        }
      },
      grid: {
        padding: {
          top: -10
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          colors:['#000000', '#FFFFFF'],
          stops: [0, 50, 100]
        },
      },
      labels: ['Average Results'],
    },  
  }
}

function UserResult(){
  const classes = useStyles();
  return (
    <div className={classes.userResult}>
      <Grid container spacing={1} className={classes.mainContents}>
        <Grid item md={12} sm={12}>
          <div className={classes.x2Card}>
            식단, 칼로리
            hellohellohellohehellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellollohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello
          </div>
        </Grid>
        <Grid item md={6} sm={12} >
            <div className={classes.card}>
              정상치
              <ReactApexChart options={data.radial.options} series={data.radial.series} type="radialBar" />
            </div>
        </Grid>
        <Grid item md={6} sm={12} >
          <div className={classes.card}>
            키
            <ReactApexChart options={data.bar.options} series={data.bar.series} type="bar"/>
          </div>
        </Grid>
        
        <Grid item md={6} sm={12} >
          
          <div className={classes.card}>
            몸무게
            <ReactApexChart options={data.bar.options} series={data.bar.series} type="bar" />
          </div>
        </Grid>

        <Grid item md={6} sm={12}>
          <div className={classes.card}>
            bmi
            <ReactApexChart options={data.bar.options} series={data.bar.series} type="bar" />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserResult;

