import React from "react";
import { useRecoilValue } from "recoil";
import { makeStyles } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import { Grid } from "@material-ui/core";
import { userBmi } from "./selector";
import { userWeight, userHeight } from "./atom";
import getBarChartDatas from "./getBarChartDatas";
import getRadialChartData from "./getRadialChartData";

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

function UserResult(){
  const classes = useStyles();
  const userData = {
    bmi: useRecoilValue(userBmi),
    height: useRecoilValue(userHeight),
    weight: useRecoilValue(userWeight)
  }
  const bar = getBarChartDatas(userData);
  const radial = getRadialChartData(userData.bmi);
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
              <ReactApexChart options={radial.options} series={radial.series} type="radialBar" />
            </div>
        </Grid>

        <Grid item md={6} sm={12}>
          <div className={classes.card}>
            bmi
            <ReactApexChart options={bar.bmi.options} series={bar.bmi.series} type="bar" />
          </div>
        </Grid>
        
        <Grid item md={6} sm={12} >
          <div className={classes.card}>
            키
            <ReactApexChart options={bar.height.options} series={bar.height.series} type="bar"/>
          </div>
        </Grid>
        
        <Grid item md={6} sm={12} >
          <div className={classes.card}>
            몸무게
            <ReactApexChart options={bar.weight.options} series={bar.weight.series} type="bar" />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserResult;

