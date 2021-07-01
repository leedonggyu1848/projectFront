import processedData from './processedData.json' 
//processedData: {data: object}
//data(weight, height, bmi): {rank: array, result: array}
//rank, 각 분위 경계
//result, 각 분위 퍼센트

function getDataRank(rank, userData){
  for (let i=0; i<rank.length; ++i){
    if (userData < rank[i]){
      return i;
    }else if(i === (rank.length - 2)){
      return i;
    }
  }
}

//받은 json데이터를 이용하여 barChart데이터를 넘겨줍니다.
//getBarChartDatas의 helper
function getBarChartData(data, userData){
  let categories = new Array(data.result.length);
  for (let i=0; i<data.result.length; ++i){
    categories[i] = Math.round((data.rank[i+1] + data.rank[i])/2)
  }
  return{
    series: [{
      name: 'Inflation',
      data: data.result.map((e) => Math.round(e*10)/10)
    }],
    options: {
      annotations: {
        points: [{
          x: String(getDataRank(data.rank, userData) + 1),
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
        categories: categories,
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
    }
  }
}

//유저 정보(bmi, height, weight)를 받아 barChart를 만드는 데이터를 넘겨줍니다.
//userData{bmi: number, height: number, weight: number}
export default function getBarChartDatas(userData){
  return {
    bmi: getBarChartData(processedData.bmi, userData.bmi),
    height: getBarChartData(processedData.height, userData.height),
    weight: getBarChartData(processedData.weight, userData.weight)
  }
}