import React, {useEffect, useState} from 'react'
import '../sass/FXSignals.scss'

const FXSignals = ({pair}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [summary, setSummary] = useState(null)
    const [error, setError] = useState(null)
    // const pairs = ('EUR/USD,AUD/NZD,EUR/GBP,AUD/CAD,CHF/JPY,USD/JPY,GBP/USD,AUD/USD,USD/CAD,USD/CHF,NZD/USD');


    const fetchAPI = (pair) => {
        const API = `https://fcsapi.com/api-v2/forex/indicators?symbol=${pair}&period=1d&access_key=32wsOaXpTRGNGkWDStdRRt0t6csigLrH5FV4qZjHe2cWljQy2E`
        
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
                        setSummary(results['response'])
                    }
                    console.log(results)
                }
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

    return(
        <div className='fx-signal-component'>
            {error && <div className='error'>{error}</div>}
            {!isLoaded && <div className = 'loader'> <div className='spinner'></div> </div>}
            {summary &&  <div className = 'fx-signals'>
                <div className='signal'>
                    <div className = 'pair'>{pair}</div>
                    <div className= {`summary ${colorAction(summary.indicators.summary)}`}>{summary.indicators.summary.toUpperCase()}</div>
                    <div className='count'>
                        <div className='buy'>Buy {summary.count.Total_Buy}</div>
                        <div className='neutral'>Neutral {summary.count.Total_Neutral}</div>
                        <div className='sell'>Sell {summary.count.Total_Sell}</div>
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