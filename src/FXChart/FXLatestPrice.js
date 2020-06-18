import React, { useState, useEffect } from 'react';
import '../css/FXLatestPrice.css'
import FXChart from './FXChart'
import FXSignals from './FXSignals'

const FXLatestPrice = () => {
    const pairs = ('EUR/USD,AUD/NZD,EUR/GBP,AUD/CAD,CHF/JPY,USD/JPY,GBP/USD,AUD/USD,USD/CAD,USD/CHF,NZD/USD');
    const [latestPrices, setLatestPrices] = useState(null)
    const [pair, setPair] = useState('EUR/USD')

    const fetchFXLatestPriceAPI = () => {
        const API = `https://fcsapi.com/api-v2/forex/latest?symbol=${pairs}&access_key=b05Bp18k1jkg0pVrjv11EhvQk0aseUUIO6ecMM1sJecSbP8M8G`
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
                }
            )
    }

    useEffect(() => fetchFXLatestPriceAPI(), [])

    const handleOnClick = (event) => {
        setPair(event.currentTarget.textContent.split(' ')[1])
    }

    return (
        <div className='container'>
            <header> FX Daily Forecast</header>

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
            
            
            <div className = 'FXSignalChartComponent'>
                <FXSignals pair={pair}></FXSignals>
                <FXChart pair={pair}></FXChart>
            </div>

            <footer>
                <small>
                    Disclaimer:
                    Prices, Market trends and signals are not designed for trading purpose, These signals are only for education or non-commercial purpose use. Data contained in this application/website is not necessarily real-time nor accurate and so prices may not be accurate and may differ from the actual market price, meaning prices are indicative and not appropriate for trading purposes. Therefore we doesn`t bear any responsibility for any trading losses you might incur as a result of using this data.
                </small>
            </footer>
           
        </div>
        
        
        )
       

   
    
}

export default FXLatestPrice