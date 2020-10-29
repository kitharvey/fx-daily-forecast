import React, { useState, useEffect } from 'react';
import '../sass/FXLatestPrice.scss'
import FXChart from './FXChart'
import FXSignals from './FXSignals'

const FXLatestPrice = () => {
    const pairs = ('EUR/USD,AUD/NZD,EUR/GBP,AUD/CAD,CHF/JPY,USD/JPY,GBP/USD,AUD/USD,USD/CAD,USD/CHF,NZD/USD');
    const [latestPrices, setLatestPrices] = useState(null)
    const [pair, setPair] = useState('EUR/USD')

    const fetchFXLatestPriceAPI = () => {
        const API = `https://fcsapi.com/api-v2/forex/latest?symbol=${pairs}&access_key=32wsOaXpTRGNGkWDStdRRt0t6csigLrH5FV4qZjHe2cWljQy2E`
        const tempData = []

        setLatestPrices(null)

        fetch(API)
        .then(results => results.json())
        .then(
            (results) => {
                if(!(results['response'] === undefined)) {
                    results['response'].map(data => tempData.push(data))
                    setLatestPrices(tempData)
                    }
                },
            (error) => {
                console.log(error)
            }
            )
    }

    useEffect(() => fetchFXLatestPriceAPI(), [])

    const handleOnClick = (event) => {
        setPair(event.currentTarget.textContent.split(' ')[1])
    }

    return (
        <div className='container'>
            
            {latestPrices && <div className = 'FXLatestPriceComponent'>
                <div className = 'Header'>
                    <h3> Symbol </h3>
                    <h3> Price </h3>
                    <h3> Change </h3>
                </div>
                <div className = 'latestPriceContainer'>
                    {latestPrices.map(({id,symbol,price,change,chg_per}) => (
                        <div className = {`latestPrice ${symbol === pair ? 'active' : ''}`} key={id} onClick = {handleOnClick}>
                            <div className = 'symbol'> {symbol} </div>
                            <div className = 'price'> {price} </div>
                            <div className = 'change'>
                                <div className = {change>0 ? 'positive' : 'negative'}> {change} </div>
                                <div className = {change>0 ? 'positive' : 'negative'}> {chg_per} </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            
            
            <div id='signal' className = 'FXSignalChartComponent'>
                <FXSignals pair={pair}></FXSignals>
                <FXChart pair={pair}></FXChart>
            </div>
        </div>
        )
}

export default FXLatestPrice