import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import MUNDO_SERVICE from '../services/RoutesService'
import '../App.css'

export default class PopularRoutes extends Component {
    state = {
        popularRoutes: [],
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
        MUNDO_SERVICE
            .searchFlights({ destination, origin, tripType, departureDate, returnDate, passengerCount, promoCode })
            .then(responseFromAPI => console.log(responseFromAPI))
            .catch(err => console.log(err))
    }

    toggleModal = (event) => {
        console.log(event.target.id)
        this.setState({
            displayFlightModal: !this.state.displayFlightModal,
            modalIndex: event.target.id
        })
    }

    // convertDate = (date) => {
    //     let splitDate = date.split('/')
    //     return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`
    //   }



    render() {
        // const { message } = this.state;
        const { popularRoutes, displayFlightModal, modalIndex } = this.state;
        let splitDate = popularRoutes[modalIndex]?.departureDate.split('/')
        return (
            <div className='container'>
                <div className='row'>
                <ul>
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
                                        <input type='radio' name='tripType'/>
                                    </label>
                                    <label>
                                        One Way
                                        <input type='radio' name='tripType'/>
                                    </label>
                                    <label>From*
                                        <input type='text' name='origin' id='from' required value={this.state.popularRoutes[this.state.modalIndex]?.origin} onChange={this.handleInputChange} />
                                    </label>
                                    <label>To*   
                                        <input type='text' name='destination' id='to' required value={this.state.popularRoutes[this.state.modalIndex]?.destination} onChange={this.handleInputChange} />
                                    </label>
                                    <label>
                                        Depart*
                                        <input type='date' name='departureDate' id='depart' required value={} onChange={this.handleInputChange} />
                                    </label>     
                                    <label>
                                        Return*
                                        <input type='date' name='returnDate' id='return' required value={this.state.popularRoutes[this.state.modalIndex]?.returnDate} onChange={this.handleInputChange} />
                                    </label>
                                        <label>Passengers
                                        <input type='number' min='1' max='10' name='passengers' id='passengers' required onChange={this.handleInputChange} />
                                        </label>
                                    <label>
                                        Promo Code
                                        <input type='text' name='promoCode' id='promoCode' onChange={this.handleInputChange} />
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

