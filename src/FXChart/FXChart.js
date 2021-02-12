import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
// import Chart from 'react-apexcharts'
import { Area,
    AreaChart, 
    CartesianGrid,
    ResponsiveContainer, 
    Tooltip, 
    // XAxis, 
    YAxis } from 'recharts';
import '../sass/FXChart.scss'

const FXChart = ({pair}) => {
    const { data, isFetching } = useQuery(['fetchChart', pair], async() => {
        const {data} = await axios.get(`https://fcsapi.com/api-v2/forex/history?symbol=${pair}&period=1d&access_key=32wsOaXpTRGNGkWDStdRRt0t6csigLrH5FV4qZjHe2cWljQy2E`)
        console.log(data.response)
        return await data.response
    }  )

    const getPrice = ({o,c,h,l, tm}) => {
            return {date: tm, price: ((parseFloat(o) + parseFloat(c) + parseFloat(h) + parseFloat(l))/4).toFixed(4)}
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
                        <ResponsiveContainer height={230}>
                            <AreaChart
                                data={data.map( ( price ) => getPrice(price) )}
                                margin={{top: 30, right: 5, left: 5}}
                            >
                            <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={getPrice(data[data.length-1]).price > getPrice(data[data.length-2]).price ? "#00BAEC" : "#FF6347"} stopOpacity={1} />
                                <stop offset="95%" stopColor={getPrice(data[data.length-1]).price > getPrice(data[data.length-2]).price ? "#00BAEC00" : "#FF634700"}stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="0 "
                                vertical={false}
                                strokeOpacity={0.5}
                            />
                            <Tooltip payload={data} content={CustomTooltip} />
                            <YAxis
                                hide={false}
                                domain={['dataMin', 'auto']}
                                tickCount={11}
                                strokeOpacity={0}
                                fillOpacity={1}
                                width={40}
                                style={{
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontSize: "12px",
                                lineHeight: "9px",
                                }}
                            />
                            <Area
                                // isAnimationActive={false}
                                type="monotone"
                                dataKey="price"
                                stroke={getPrice(data[data.length-1]).price > getPrice(data[data.length-2]).price ? "#00BAEC" : "#FF6347"}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#grad)"
                            >
                            </Area>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>}
        </div>
    )
}

export default FXChart