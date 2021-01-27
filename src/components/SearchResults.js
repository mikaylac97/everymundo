import React, { Component } from 'react'

export default class SearchResults extends Component {
    render() {
        console.log(this.props.flights)
        return (
            <div>
            {!this.props.flights && 
            <div>
                Page not found
            </div>}
                {this.props.flights &&
                <>
                    <h2>Search Results</h2>
                    <h3>{this?.props?.flights[0]?.origin}-{this?.props?.flights[0]?.destination}</h3>
                    <table>
                    <tr>
                        <th>Departs at</th>
                        <th>Arrives at</th>
                        <th>Price USD</th>
                        
                    </tr>
                    {this.props.flights[0]?.routes.map(route => {
                        return(
                            <tr>
                                <th>{route.departureTime}</th>
                                <th>{route.arrivalTime}</th>
                                <th>${route.priceUSD}</th>
                            </tr>
                        )
                    })}
                    </table>
                    {this.props.flights[0].tripType === 'roundTrip' && <>
                    <h3>{this.props.flights[1]?.origin}-{this.props.flights[1]?.destination}</h3>
                    <table>
                    <tr>
                        <th>Departs at</th>
                        <th>Arrives at</th>
                        <th>Price USD</th>
                        
                    </tr>
                    {this.props.flights[1]?.routes.map(route => {
                        return(
                            <tr>
                                <th>{route.departureTime}</th>
                                <th>{route.arrivalTime}</th>
                                <th>${route.priceUSD}</th>
                            </tr>
                        )
                    })}
                    </table>
                    </>}
                    </>
                    }
            </div>
        )
    }
}
