import React from "react";
import { useRecoilValue } from "recoil";
import { makeStyles } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import { Grid } from "@material-ui/core";
import { userBmi } from "./selector";

//임시 데이터

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

// bmi값을 차트에 맞는 퍼센트 값으로 바꿉니다.
//val: number
function bmiToPercentage(val){
  return val / 35 * 100
}

// bmi값을 차트에 맞는 퍼센트 값으로 바꿉니다.
// val: number
function percentageToBmi(val){
  return val / 100 * 35
}

// 차트에 표현할 값을 리턴합니다
// bmi의 최대값을 35로 만들기 위해서 값을 변환시킵니다
// bmi를 그대로 넣으면 퍼센트로 들어가서 최대값이 100이됩니다
// val: array
function radialFormatter(val){
  return percentageToBmi(val.globals.seriesTotals[0]);
}

// bmi별 색상을 결정합니다
// TODO: 색을 연속적으로 바꾸는것도 생각해볼만하다
function fillColors({ value }) {
  if(value < bmiToPercentage(18.5)) {
      return '#95DA74'
  } else if (value < bmiToPercentage(23)) {
      return '#61DBC3'
  } else if (value < bmiToPercentage(25)){
      return '#FAD375'
  } else if (value < bmiToPercentage(30)){
    return '#EB656F'
  } else{
    return '#FF0000'
  }
}

function UserResult(){
  const classes = useStyles();
  const bmi = useRecoilValue(userBmi)
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
      series: [bmiToPercentage(bmi)],
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
              },
              total:{
                show:true,
                formatter: radialFormatter
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
          colors: [fillColors]
        },
        labels: ['Average Results'],
      },  
    }
  }
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

