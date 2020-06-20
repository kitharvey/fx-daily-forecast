import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
import '../css/FXChart.css'

const FXChart = ({pair}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null)
    const [series, setSeries] = useState(null);
    const options = {
        chart: {
            id: "fx-chart",
            type: "line",
        },
        title: {
            text: `${pair} Daily Chart`,
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
        colors: ["#00BAEC"],
        stroke: {
            width: 3
        },
        grid: {
            borderColor: "#000",
            clipMarkers: false,
            yaxis: {
              lines: {
                show: false
              }
            }
        },
    }

    const fetchFXAPI = (pair) => {
        const API = `https://fcsapi.com/api-v2/forex/history?symbol=${pair}&period=1d&access_key=32wsOaXpTRGNGkWDStdRRt0t6csigLrH5FV4qZjHe2cWljQy2E`
        let tempOpen
        let tempPrice
        let tempClose
        let tempDate
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
                            tempRate.push([tempDate,tempPrice])
                        }
                        setSeries([{
                            type: 'line',
                            name: 'Price',
                            data: tempRate
                        }])
                    }
                })

            
    }

    useEffect(() => fetchFXAPI(pair), [pair])
    
    return(
        <div>
            {error && <div className='error'>{error}</div>}
            {!isLoaded && <div className = 'loader'> <div className='spinner'></div> </div>}
            {series && <div className = 'chart'>
                <Chart
                    options = {options}
                    series = {series}
                    height = '300'
                    width = '100%'
                />
            </div>}
        </div>
    )
}

export default FXChart