import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import MUNDO_SERVICE from '../services/RoutesService'
// import FlightSearchModal from './FlightSearchModal'
import '../App.css'

export default class PopularRoutes extends Component {


    state = {
        popularRoutes: [],
        displayFlightModal: false,
        modalIndex: null,
        returnDate: '',
        passengerCount: 0,

    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        // this.setState({ [name]: value });
        const popularRoutesCopy = [...this.state.popularRoutes];
        popularRoutesCopy[this.state.modalIndex][name] = value;
        this.setState({ popularRoutes: popularRoutesCopy });
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
                 this.props.onFlightsChange(responseFromAPI.data)
            })
            .catch(err => console.log(err))
    }


    toggleModal = (event) => { 
        
        this.setState({
            displayFlightModal: !this.state.displayFlightModal,
            modalIndex: event.target.id
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { destination, origin, tripType, departureDate, returnDate, passengerCount, promoCode } = this.state.popularRoutes[this.state.modalIndex];
        let passengerParseInt = parseInt(passengerCount)
        let flightInfo = JSON.stringify({ destination, origin, tripType, departureDate, returnDate, promoCode, passengerCount: passengerParseInt })
       
        MUNDO_SERVICE
            .searchFlights(flightInfo)
            .then(responseFromAPI => {
                this.setState({ searchResults: responseFromAPI.data })
                this.props.onFlightsChange(responseFromAPI.data)
                this.props.history.push('/results')
            })
            .catch(err => console.log(err))
    }

    render() {
        const { popularRoutes,  modalIndex  } = this.state;
        
        return (
            <div className='container'>
                <div className='row'>
                <ul data-testid='popular-routes'>
                    {this.state.popularRoutes.map((route, i) => {
                         let textToConvert = route.tripType;
                        let result = textToConvert.replace( /([A-Z])/g, " $1" );
                        let sentenceCase = result.charAt(0).toUpperCase() + result.slice(1);
                        return(
                            <>
                            <div id={i}>
                                <li className='card'>
                                <div>
                                    <img className='destination-image' src={route.routeCoverImage} alt='destination' />
                                </div>
                                <div className='card-body'>
                                <div className='to-left'>
                                    <div className='route-card-top'>
                                        <p>{route.origin}-{route.destination}</p>
                                        <p>{route.departureDate} {route.returnDate && route.tripType === 'roundTrip' && <> - {route.returnDate}</>}</p>
                                    </div>
                                </div>
                                <div className='to-right'>
                                    <div className='fares-from'>
                                    Fares From
                                    </div>
                                    <div className='fare-price'>
                                        <span>$</span><span>{route.priceUSD}</span>
                                    </div>
                                    <p>{sentenceCase}</p>
                                </div>
                                </div>
                                <div className='card-body'>
                                <Button color='danger' onClick={this.toggleModal} id={i}>VIEW DEAL</Button>
                                </div>
                                </li>
                            </div>
                            
                    </>
                        )
                    })}
                            
                    
                    <Modal centered isOpen={this.state.displayFlightModal} >
                        <ModalHeader toggle={this.toggleModal}>Search Flights</ModalHeader>
                        <ModalBody>
                            <div className='modal-form'>
                                <form onSubmit={this.handleSubmit} className='flight-form'>
                                    <div>
                                    <label>
                                        Round-trip
                                        <input type='radio' name='tripType' required value='roundTrip' checked={popularRoutes[modalIndex]?.tripType === 'roundTrip'} onChange={this.handleInputChange} />
                                    </label>
                                    <label>
                                        One Way
                                        <input type='radio' name='tripType' required value='oneWay' checked={popularRoutes[modalIndex]?.tripType === 'oneWay'} onChange={this.handleInputChange} />
                                    </label>
                                    <label>From*
                                        <input type='text' name='origin' id='from' required value={popularRoutes[modalIndex]?.origin} onChange={this.handleInputChange} />
                                    </label>
                                    <label>To*   
                                        <input type='text' name='destination' id='to' required value={popularRoutes[modalIndex]?.destination} onChange={this.handleInputChange} />
                                    </label>
                                    <label>
                                        Depart*
                                        <input type='date' name='departureDate' id='depart' required value={popularRoutes[modalIndex]?.departureDate} onChange={this.handleInputChange} />
                                    </label>     
                                    <label>
                                        Return*
                                        <input type='date' name='returnDate' id='return' value={popularRoutes[modalIndex]?.returnDate} onChange={this.handleInputChange} />
                                    </label>
                                        <label>Passengers
                                        <input type='number' min='0' name='passengerCount' value={popularRoutes[modalIndex]?.passengerCount} id='passengers' pattern="^-?[0-9]\d*\.?\d*$" required onInput={this.handleInputChange} />
                                        </label>
                                    <label>
                                        Promo Code
                                        <input type='text' name='promoCode' id='promoCode' value='' onChange={this.handleInputChange} />
                                    </label>
                                        
                                    </div>
                                    <div className='form-group form-button'>
                                        <input type='submit' name='search' id='search' className='form-submit-btn' value='Search Flights' />
                                    </div>
                                </form>
                               
                            </div>
                        </ModalBody>
                    </Modal>
                    
                </ul>
                
                    
                </div>
            </div>
        )
    }
}

