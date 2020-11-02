import React, { useState, useEffect } from 'react';
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
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null)
    const [series, setSeries] = useState(null);


    const fetchFXAPI = (pair) => {
        const API = `https://fcsapi.com/api-v2/forex/history?symbol=${pair}&period=1d&access_key=32wsOaXpTRGNGkWDStdRRt0t6csigLrH5FV4qZjHe2cWljQy2E`
        let tempOpen
        let tempPrice
        let tempClose
        let tempDate = []
        let tempRate = []

        setIsLoaded(false)
        setSeries(null)
        setError(null)

        fetch(API)
        .then(results => results.json())
            .then(
                (results) => {
                    setIsLoaded(true)
                    if(results['response'] === undefined) setError('Access blocked. Restriction remove after 1 minute.')
                    else{
                        for(let result in results['response']) {
                            tempOpen = results['response'][result]['o']
                            tempClose = results['response'][result]['c']
                            tempDate = results['response'][result]['tm']
                            tempPrice = ((parseFloat(tempOpen) + parseFloat(tempClose))/2).toFixed(4)
                            tempRate.push({
                                date: tempDate,
                                price: tempPrice
                            })
                        }
                        setSeries(tempRate)
                        // console.log(tempRate)
                    }
                })

            
    }

    useEffect(() => fetchFXAPI(pair), [pair])
    useEffect(() => console.log(series), [series])

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
            <h3> {`${pair} Daily Chart`}  </h3>
            {error && <div className='error'>{error}</div>}
            {!isLoaded && <div className = 'loader'> <div className='spinner'></div> </div>}
            {series && <div className = 'chart'>
                <ResponsiveContainer>
                    <AreaChart
                        data={series}
                    >
                    <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={series[series.length-1] > series[series.length-2] ? "#00BAEC" : "#FF6347"} stopOpacity={1} />
                        <stop offset="95%" stopColor={series[series.length-1] > series[series.length-2] ? "#00BAEC00" : "#FF634700"}stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="0 "
                        vertical={false}
                        strokeOpacity={0.5}
                    />
                    <Tooltip payload={series} content={CustomTooltip} />
                    <YAxis
                        hide={false}
                        domain={['dataMin', 'auto']}
                        tickCount={21}
                        // tickFormatter={formatXAxis}
                        strokeOpacity={0}
                        fillOpacity={1}
                        // fill="rgb(0, 0, 0)"
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
                        stroke={series[series.length-1] > series[series.length-2] ? "#00BAEC" : "#FF6347"}
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