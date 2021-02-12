import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useQuery } from 'react-query';
import '../sass/FXSignals.scss'

const FXSignals = ({pair}) => {
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [data, setSummary] = useState(null)
    // const [error, setError] = useState(null)

    const { data, isFetching, error } = useQuery( ['fetchSignal', pair], async() => {
        const {data} = await axios.get(`https://fcsapi.com/api-v2/forex/indicators?symbol=${pair}&period=1d&access_key=32wsOaXpTRGNGkWDStdRRt0t6csigLrH5FV4qZjHe2cWljQy2E`)
        return await data.response
    }  )

    // const fetchAPI = (pair) => {
    //     const API = `https://fcsapi.com/api-v2/forex/indicators?symbol=${pair}&period=1d&access_key=32wsOaXpTRGNGkWDStdRRt0t6csigLrH5FV4qZjHe2cWljQy2E`
        
    //     setIsLoaded(false)
    //     setSummary(null)
    //     setError(null)

    //     fetch(API)
    //         .then(results => results.json())
    //         .then(
    //             (results) => {
    //                 setIsLoaded(true);
    //                 if(results['response'] === undefined) setError('Access blocked. Restriction remove after 1 minute.')
    //                 else {
    //                     setSummary(results['response'])
    //                 }
    //                 console.log(results)
    //             }
    //         )
    // }

    // useEffect(() => fetchAPI(pair), [pair])

    // console.log(data)

    const colorAction = (action) => {
        if(!(action === undefined)) {
            console.log(action.includes('Buy'), action)
            if (action.includes('Buy')) return 'buy'
            else if (action.includes('Sell')) return 'sell'
            else return 'neutral'
        }   
    }

    return(
        <div className='fx-signal-component'>
            {/* {error && <div className='error'>Access blocked. Restriction remove after 1 minute.</div>} */}
            {isFetching
            ? <div className = 'loader'> <div className='spinner'></div> </div>
            : !data ? <div className='error'>Access blocked. Restriction remove after 1 minute.</div>
                    : <div className = 'fx-signals'>
                        <div className='signal'>
                            <div className = 'pair'>{pair}</div>
                            <div className= {`summary ${colorAction(data.indicators.summary)}`}>{data.indicators.summary.toUpperCase()}</div>
                            <div className='count'>
                                <div className='buy'>Buy {data.count.Total_Buy}</div>
                                <div className='neutral'>Neutral {data.count.Total_Neutral}</div>
                                <div className='sell'>Sell {data.count.Total_Sell}</div>
                            </div>
                        </div>
                        <div className='indicator-header-wrapper'>
                            <div className = 'Header'>
                                    <h3> Name </h3>
                                    <h3> Value </h3>
                                    <h3> Action </h3>
                            </div>
                            <div className='indicator-container'>
                                <div className = 'indicator'>
                                    <div className='name'>CCI (14)</div>
                                    <div className='value'>{data.indicators.CCI14.v}</div>
                                    <div className={`action ${colorAction(data.indicators.CCI14.s)}`}>{data.indicators.CCI14.s}</div>
                                </div>
                                <div className = 'indicator'>
                                    <div className='name'>MACD (12, 26)</div>
                                    <div className='value'>{data.indicators.MACD12_26.v}</div>
                                    <div className={`action ${colorAction(data.indicators.MACD12_26.s)}`}>{data.indicators.MACD12_26.s}</div>
                                </div>
                                <div className = 'indicator'>
                                    <div className='name'>Rate of Change</div>
                                    <div className='value'>{data.indicators.ROC.v}</div>
                                    <div className={`action ${colorAction(data.indicators.ROC.s)}`}>{data.indicators.ROC.s}</div>
                                </div>
                                <div className = 'indicator'>
                                    <div className='name'>Stochastic (9, 6)</div>
                                    <div className='value'>{data.indicators.STOCH9_6.v}</div>
                                    <div className={`action ${colorAction(data.indicators.STOCH9_6.s)}`}>{data.indicators.STOCH9_6.s}</div>
                                </div>
                                <div className = 'indicator'>
                                    <div className='name'>Stochastic RSI (14)</div>
                                    <div className='value'>{data.indicators.STOCHRSI14.v}</div>
                                    <div className={`action ${colorAction(data.indicators.STOCHRSI14.s)}`}>{data.indicators.STOCHRSI14.s}</div>
                                </div>
                                <div className = 'indicator'>
                                    <div className='name'>Ultimate Oscillator</div>
                                    <div className='value'>{data.indicators.UltimateOscillator.v}</div>
                                    <div className={`action ${colorAction(data.indicators.UltimateOscillator.s)}`}>{data.indicators.UltimateOscillator.s}</div>
                                </div>
                                <div className = 'indicator'>
                                    <div className='name'>WilliamsR</div>
                                    <div className='value'>{data.indicators.WilliamsR.v}</div>
                                    <div className={`action ${colorAction(data.indicators.WilliamsR.s)}`}>{data.indicators.WilliamsR.s}</div>
                                </div>
                            </div>
                        </div>
                    </div>}
        </div>
    )
}
export default FXSignals