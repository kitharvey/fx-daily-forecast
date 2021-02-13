import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import '../sass/FXLatestPrice.scss'
import FXChart from './FXChart'
// import FXSignals from './FXSignals'

const FXLatestPrice = () => {
    const [pair, setPair] = useState('EUR/USD')

    const { data } = useQuery('fetchLatestPrice', async() => {
        const {data} = await axios.get(`https://fcsapi.com/api-v3/forex/latest?symbol=all_forex&access_key=b05Bp18k1jkg0pVrjv11EhvQk0aseUUIO6ecMM1sJecSbP8M8G`)
        console.log(data.response)
        return await data.response
    }  )

    // const handleOnClick = (event) => {
    //     setPair(event.currentTarget.textContent.split(' ')[1])
    // }

    return (
        <div className='container'>
            
            {data && <div className = 'FXLatestPriceComponent'>
                <div className = 'Header'>
                    <h3> Symbol </h3>
                    <h3> Price </h3>
                    <h3> Change </h3>
                </div>
                <div className = 'latestPriceContainer'>
                    {data.map(({id,s,c,ch,cp}) => (
                        <div className = {`latestPrice ${s === pair ? 'active' : ''}`} key={id} onClick = {() => setPair(s)}>
                            <div className = 'symbol'>{s}</div>
                            <div className = 'price'>{parseFloat(c).toFixed(4)}</div>
                            <div className = 'change'>
                                <div className = {parseFloat(ch).toFixed(4)>0 ? 'positive' : 'negative'}>{parseFloat(ch).toFixed(4)}</div>
                                <div className = {parseFloat(cp).toFixed(2)>0 ? 'positive' : 'negative'}>{parseFloat(cp).toFixed(2)}%</div>
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