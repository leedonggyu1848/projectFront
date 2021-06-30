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

function weightState(bmi){
  if(bmi <= 18.5){
    return '저체중';
  }else if(bmi <= 23){
    return '정상';
  }else if(bmi <= 25){
    return '과체중';
  }else if(bmi <= 30){
    return '비만';
  }else{
    return '고도비만';
  }
}


// 차트에 표현할 값을 리턴합니다
// bmi의 최대값을 35로 만들기 위해서 값을 변환시킵니다
// bmi를 그대로 넣으면 퍼센트로 들어가서 최대값이 100이됩니다
// val: array
function radialFormatter(val){
  const bmi = percentageToBmi(val.globals.seriesTotals[0]);
  return bmi + ' [ ' + weightState(bmi) + ' ]';
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

//bmi를 받아 radialChart정보를 넘겨줍니다.
export default function getRadialChartData(bmi){
  return {
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