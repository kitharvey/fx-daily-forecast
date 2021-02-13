import axios from 'axios';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';

import '../sass/FXChart.scss'

const FXChart = ({pair}) => {
    const { data, isFetching } = useQuery(['fetchChart', pair], async() => {
        const {data} = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${pair}?apikey=93cda20ae659089e470d6b3c63af17f3`)
        return await data ? data.historical.sort().reverse() : null
    }  )

    const options = {
        chart: {
          type: 'area',
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        },
        dataLabels: {
            enabled: false
          },
        stroke: {
            show: true,
            curve: 'smooth',
            colors: undefined,
            width: 1,
            dashArray: 0,      
        },
        tooltip: {
            x: {
                show: true,
                format: 'dd MMM yyyy',
                formatter: undefined,
            },
        }
        
      }

    const getPrice = (data) => {
        return [{name: "Price", data: data.map( ({open,close,high,low, date}) => {
            return {
                x: date,
                y: ((open + high + low + close)/4).toFixed(4)
            }
        }  )}] 
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload) {
            const date = payload[0].payload.date.split(" ")[0].split("-")
                return (
                    <div className="custom-tooltip">
                    <p className="label-price"> Price: <span className="price" >{payload[0].payload.price}</span> </p>
                    <p className="label-date">{`${date[2]}/${date[1]}/${date[0]}`}</p>
                    </div>
                );
        }
      
        return null;
      };
    
    return(
        <div className = 'chart-wrapper'>
            {isFetching ? <div className = 'loader'> <div className='spinner'></div> </div>
            : !data ? <div className='error'>Access blocked. Restriction remove after 1 minute.</div>
                :   <div className = 'chart'>
                        <h3> {`${pair} Daily Chart`}  </h3>
                         {data && <ReactApexChart options={options} series={getPrice(data)} type="area" height='95%' width='100%' />} 
                    </div>}
        </div>
    )
}

export default FXChart