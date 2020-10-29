import React from 'react';
import FXLatestPrice from './FXChart/FXLatestPrice'
import './sass/App.scss'

function App() {
  return (
    <div className="App">
      <header> FX Daily Forecast</header>
      <FXLatestPrice/>
      <footer>
        <small>
          Disclaimer:
          Prices, Market trends and signals are not designed for trading purpose, These signals are only for education or non-commercial purpose use. Data contained in this application/website is not necessarily real-time nor accurate and so prices may not be accurate and may differ from the actual market price, meaning prices are indicative and not appropriate for trading purposes. Therefore we doesn`t bear any responsibility for any trading losses you might incur as a result of using this data.
        </small>
      </footer>
    </div>
  );
}

export default App;
