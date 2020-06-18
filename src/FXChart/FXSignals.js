import React, {useEffect, useState} from 'react'
import '../css/FXSignals.css'

const FXSignals = ({pair}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [summary, setSummary] = useState(null)
    const [error, setError] = useState(null)
    const fetchAPI = (pair) => {
        const API = `https://fcsapi.com/api-v2/forex/indicators?symbol=${pair}&period=1d&access_key=b05Bp18k1jkg0pVrjv11EhvQk0aseUUIO6ecMM1sJecSbP8M8G`
        
        setIsLoaded(false)
        setSummary(null)
        setError(null)

        fetch(API)
            .then(results => results.json())
            .then(
                (results) => {
                    setIsLoaded(true);
                    if(results['response'] === undefined) setError('Access blocked. Restriction remove after 1 minute.')
                    else {
                        setSummary({
                            signal: results['response']['indicators']['summary'],
                            indicators: {
                                ATR14: results['response']['indicators']['ATR14'],
                                CCI14: results['response']['indicators']['CCI14'],
                                MACD12_26: results['response']['indicators']['MACD12_26'],
                                ROC: results['response']['indicators']['ROC'],
                                STOCH9_6: results['response']['indicators']['STOCH9_6'],
                                STOCHRSI14: results['response']['indicators']['STOCHRSI14'],
                                UltimateOscillator: results['response']['indicators']['UltimateOscillator'],
                                WilliamsR: results['response']['indicators']['WilliamsR'],
                            },
                            count: {
                                buy: results['response']['count']['Total_Buy'],
                                sell: results['response']['count']['Total_Sell'],
                                neutral: results['response']['count']['Total_Neutral'],
                            }
                        })
                    }
                    
                },
            )
    }

    useEffect(() => fetchAPI(pair), [pair])

    const colorAction = (action) => {
        if(!(action === undefined)) {
            console.log(action.includes('Buy'), action)
            if (action.includes('Buy')) return 'buy'
            else if (action.includes('Sell')) return 'sell'
            else return 'neutral'
        } 
        
        
    }

    useEffect(() => {colorAction()}, [])

    return(
        <div>
            {error && <div className='error'>{error}</div>}
            {!isLoaded && <div className = 'loader'> <div className='spinner'></div> </div>}
            {summary &&  <div className = 'fx-signals'>
                <div className='signal'>
                    <div className = 'pair'>{pair}</div>
                    <div className= {`summary ${colorAction(summary.signal)}`}>{summary.signal.toUpperCase()}</div>
                    <div className='count'>
                        <div className='buy'>Buy {summary.count.buy}</div>
                        <div className='neutral'>Neutral {summary.count.neutral}</div>
                        <div className='sell'>Sell {summary.count.sell}</div>
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
                            <div className='value'>{summary.indicators.CCI14.v}</div>
                            <div className={`action ${colorAction(summary.indicators.CCI14.s)}`}>{summary.indicators.CCI14.s}</div>
                        </div>
                        <div className = 'indicator'>
                            <div className='name'>MACD (12, 26)</div>
                            <div className='value'>{summary.indicators.MACD12_26.v}</div>
                            <div className={`action ${colorAction(summary.indicators.MACD12_26.s)}`}>{summary.indicators.MACD12_26.s}</div>
                        </div>
                        <div className = 'indicator'>
                            <div className='name'>Rate of Change</div>
                            <div className='value'>{summary.indicators.ROC.v}</div>
                            <div className={`action ${colorAction(summary.indicators.ROC.s)}`}>{summary.indicators.ROC.s}</div>
                        </div>
                        <div className = 'indicator'>
                            <div className='name'>Stochastic (9, 6)</div>
                            <div className='value'>{summary.indicators.STOCH9_6.v}</div>
                            <div className={`action ${colorAction(summary.indicators.STOCH9_6.s)}`}>{summary.indicators.STOCH9_6.s}</div>
                        </div>
                        <div className = 'indicator'>
                            <div className='name'>Stochastic RSI (14)</div>
                            <div className='value'>{summary.indicators.STOCHRSI14.v}</div>
                            <div className={`action ${colorAction(summary.indicators.STOCHRSI14.s)}`}>{summary.indicators.STOCHRSI14.s}</div>
                        </div>
                        <div className = 'indicator'>
                            <div className='name'>Ultimate Oscillator</div>
                            <div className='value'>{summary.indicators.UltimateOscillator.v}</div>
                            <div className={`action ${colorAction(summary.indicators.UltimateOscillator.s)}`}>{summary.indicators.UltimateOscillator.s}</div>
                        </div>
                        <div className = 'indicator'>
                            <div className='name'>WilliamsR</div>
                            <div className='value'>{summary.indicators.WilliamsR.v}</div>
                            <div className={`action ${colorAction(summary.indicators.WilliamsR.s)}`}>{summary.indicators.WilliamsR.s}</div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default FXSignals