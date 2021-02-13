import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import '../sass/FXLatestPrice.scss'
import FXChart from './FXChart'
// import FXSignals from './FXSignals'

const FXLatestPrice = () => {
    const [pair, setPair] = useState('EURUSD')
    useState(2000)
    const { data } = useQuery('fetchLatestPrice', async() => {
        const {data} = await axios.get(`https://financialmodelingprep.com/api/v3/quotes/forex?apikey=93cda20ae659089e470d6b3c63af17f3`)
        return await data
    })


    return (
        <div className='container'>
            
            {data && <div className = 'FXLatestPriceComponent'>
                <div className = 'Header'>
                    <h3> Symbol </h3>
                    <h3> Price </h3>
                    <h3> Change </h3>
                </div>
                <div className = 'latestPriceContainer'>
                    {data.map(({name,symbol,price,change,changesPercentage}) => (
                        <div className = {`latestPrice ${name === pair ? 'active' : ''}`} key={symbol} onClick = {() => setPair(symbol)}>
                            <div className = 'symbol'>{name}</div>
                            <div className = 'price'>{price.toFixed(4)}</div>
                            <div className = 'change'>
                                <div className = {change.toFixed(4)>0 ? 'positive' : 'negative'}>{change.toFixed(4)}</div>
                                <div className = {changesPercentage.toFixed(2)>0 ? 'positive' : 'negative'}>{changesPercentage.toFixed(2)}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            
            
            {data && <div id='signal' className = 'FXSignalChartComponent'>
                {/* <FXSignals pair={pair}></FXSignals> */}
                <FXChart pair={pair}></FXChart>
            </div>}
        </div>
        )
}

export default FXLatestPrice