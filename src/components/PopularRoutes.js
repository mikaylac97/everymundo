import React, { Component } from 'react'
import MUNDO_SERVICE from '../services/RoutesService'
import '../App.css'

export default class PopularRoutes extends Component {
    state = {
        popularRoutes: []
    }

    componentDidMount() {
        this.getPopularRoutes();
    }

    getPopularRoutes = () => {
        MUNDO_SERVICE
            .popularRoutes()
            .then(responseFromAPI => {
                this.setState({
                    popularRoutes: responseFromAPI.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.popularRoutes)
        return (
            <div className='container'>
                <div className='row'>
                <ul>
                    {this.state.popularRoutes.map(route => {
                        return(
                            <div>
                                <li className='card'>
                                <div>
                                    <img className='destination-image' src={route.routeCoverImage} alt='destination' />
                                </div>
                                <div className='card-body'>
                                <div className='to-left'>
                                    <div className='route-card-top'>
                                        <p>{route.origin}-{route.destination}</p>
                                        <p>{route.departureDate}</p>
                                    </div>
                                </div>
                                <div className='to-right'>
                                    <div className='fares-from'>
                                    Fares From
                                    </div>
                                    <div className='fare-price'>
                                        <span>$</span><span>{route.priceUSD}</span>
                                    </div>
                                    <p>{route.tripType}</p>
                                </div>
                                </div>
                                <div className='card-body'>
                                <a href="/" class="btn btn-primary deal-btn">VIEW DEAL</a>
                                </div>
                                </li>
                            </div>
                        )
                    })}
                </ul>
                    {/* {this.state.popularRoutes.map(route => {
                        return(
                            <div class="card w-50">
                                <img class="card-img-top" src={route.routeCoverImage} alt="route" />
                                <div className='card-body'>
                                <div class="row">
                                    <div className='col-sm-8'>
                                        <h5 class="card-title">{route.origin}-{route.destination}</h5>
                                        <p class="card-text">{route.departureDate}</p>  
                                    </div>
                                    <div className='col-sm-4'></div>
                                </div>
                                <div className='row to-left'>
                                <div className='col-sm-8'></div>
                                    <div className='col-sm-4'>
                                        <p className='card-text'>Fares from ${route.priceUSD}</p>
                                        <p className='card-text'>{route.tripType}</p>
                                    </div>
                                </div>
                                <a href="/" class="btn btn-primary">VIEW DEAL</a>
                                </div>
                                
                            </div>
                        )
                    })} */}
                </div>
            </div>
        )
    }
}

