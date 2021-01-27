import React, { Component } from 'react'

export default class SearchResults extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>Search Results</h2>

                    <table>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Journey type</th>
                        <th>Departs on</th>
                        <th>Returns on</th>
                        <th>Price USD</th>
                        <th>Fare class</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>
                    </table>
            </div>
        )
    }
}
