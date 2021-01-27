import React from 'react'
import './App.css';
import PopularRoutes from './components/PopularRoutes'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import SearchResults from './components/SearchResults';

export default class App extends React.Component {

  state = {
    flightsViewing: []
  }

  setFlights = (flights) => {
    this.setState({ flightsViewing: flights })
  }

render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={props => <PopularRoutes {...props} flights={this.state.flightsViewing} onFlightsChange={this.setFlights} />} />
            <Route exact path='/results' render={props => <SearchResults {...props} flights={this.state.flightsViewing} onFlightsChange={this.setFlights} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
 

