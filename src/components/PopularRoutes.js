import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import axios from 'axios'
import MUNDO_SERVICE from '../services/RoutesService'
import '../App.css'

export default class PopularRoutes extends Component {


    state = {
        popularRoutes: [],
        searchResults: [],
        displayFlightModal: false,
        destination: '',
        origin: '',
        tripType: '',
        departureDate: '',
        returnDate: '',
        passengerCount: 0,
        promoCode: '',
        modalIndex: 0
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

    
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { destination, origin, tripType, departureDate, returnDate, passengerCount, promoCode } = this.state;
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

    toggleModal = (event) => {
        console.log(event.target.id)
        const { displayFlightModal, modalIndex, destination, origin, tripType, departureDate, returnDate, popularRoutes } = this.state;
        this.setState({
            displayFlightModal: !displayFlightModal,
            modalIndex: event.target.id,
            destination: popularRoutes[modalIndex]?.destination,
            origin: popularRoutes[modalIndex]?.origin,
            tripType: popularRoutes[modalIndex]?.tripType,
            departureDate: popularRoutes[modalIndex]?.departureDate,
            returnDate: popularRoutes[modalIndex]?.returnDate
        })
    }




    render() {
        console.log(this.props)
        // const { message } = this.state;
        const { popularRoutes, displayFlightModal, modalIndex, departureDate, returnDate, tripType, origin, destination, passengerCount } = this.state;
        // const splitDate = departureDate?.split('/')
        // console.log(splitDate)
        return (
            <div className='container'>
                <div className='row'>
                <ul data-testid='popular-routes'>
                    {this.state.popularRoutes.map((route, i) => {
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
                                    <p>{route.tripType}</p>
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
                    <Modal centered isOpen={this.state.displayFlightModal}>
                        <ModalHeader toggle={this.toggleModal}>Search Flights</ModalHeader>
                        <ModalBody>
                            <div className='modal-form'>
                                <form onSubmit={this.handleSubmit} className='flight-form'>
                                    <div>
                                    <label>
                                        Round-trip
                                        <input type='radio' name='tripType' required value='roundTrip' checked={tripType === 'roundTrip'} onChange={this.handleInputChange} />
                                    </label>
                                    <label>
                                        One Way
                                        <input type='radio' name='tripType' required value='oneWay' checked={tripType === 'oneWay'} onChange={this.handleInputChange} />
                                    </label>
                                    <label>From*
                                        <input type='text' name='origin' id='from' required value={origin} onChange={this.handleInputChange} />
                                    </label>
                                    <label>To*   
                                        <input type='text' name='destination' id='to' required value={destination} onChange={this.handleInputChange} />
                                    </label>
                                    <label>
                                        Depart*
                                        <input type='date' name='departureDate' id='depart' required value={departureDate} onChange={this.handleInputChange} />
                                    </label>     
                                    <label>
                                        Return*
                                        <input type='date' name='returnDate' id='return' value={returnDate} onChange={this.handleInputChange} />
                                    </label>
                                        <label>Passengers
                                        <input type='number' min='1' name='passengerCount' value={passengerCount} id='passengers' pattern="^-?[0-9]\d*\.?\d*$" required onInput={this.handleInputChange} />
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
                                {/* {message && <div style={{ color: "red", paddingTop: "1rem" }}> {message} </div>} */}
                            </div>
                        </ModalBody>
                    </Modal>
                    
                </ul>
                
                    
                </div>
            </div>
        )
    }
}

