import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import MUNDO_SERVICE from '../services/RoutesService'

export default class FlightSearchModal extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            displayFlightModal: false,
            destination: '',
            origin: '',
            tripType: '',
            departureDate: '',
            returnDate: '',
            passengerCount: 0,
            promoCode: ''
        }
    }

    componentDidMount(){
        this.getSingleFlight();
    }
    
    getSingleFlight = () => {
        
        MUNDO_SERVICE
            .popularRoutes()
            .then(responseFromAPI => {
                this.setState({
                    flights: responseFromAPI.data
                })
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        const selectedFlight = {...this.props.flightToView}
        selectedFlight[name] = value;
        this.setState({
            selectedFlight
        })
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
                // this.props.onFlightsChange(responseFromAPI.data)
                // this.props.history.push('/results')
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.flights)
        const selectedFlight = {...this.props?.flightToView};
        // console.log(this.state)
        // const { flightToView } = this.props;
        return (
            <div>
            <Modal centered isOpen={this.props.displayFlightModal} >
                        <ModalHeader toggle={this.props.toggleModal}>Search Flights</ModalHeader>
                        <ModalBody>
                            <div className='modal-form'>
                                <form onSubmit={this.handleSubmit} className='flight-form'>
                                    <div>
                                    <label>
                                        Round-trip
                                        <input type='radio' name='tripType' required value='roundTrip' checked={selectedFlight?.tripType === 'roundTrip'} onChange={this.handleInputChange} />
                                    </label>
                                    <label>
                                        One Way
                                        <input type='radio' name='tripType' required value='oneWay' checked={selectedFlight?.tripType === 'oneWay'} onChange={this.handleInputChange} />
                                    </label>
                                    <label>From*
                                        <input type='text' name='origin' id='from' required value={selectedFlight?.origin} onChange={this.handleInputChange} />
                                    </label>
                                    <label>To*   
                                        <input type='text' name='destination' id='to' required value={selectedFlight?.destination} onChange={this.handleInputChange} />
                                    </label>
                                    <label>
                                        Depart*
                                        <input type='date' name='departureDate' id='depart' required value={selectedFlight?.departureDate} onChange={this.handleInputChange} />
                                    </label>     
                                    <label>
                                        Return*
                                        <input type='date' name='returnDate' id='return' value={selectedFlight?.returnDate} onChange={this.handleInputChange} />
                                    </label>
                                        <label>Passengers
                                        <input type='number' min='0' name='passengerCount' value={selectedFlight.passengerCount} id='passengers' pattern="^-?[0-9]\d*\.?\d*$" required onInput={this.handleInputChange} />
                                        </label>
                                    <label>
                                        Promo Code
                                        <input type='text' name='promoCode' id='promoCode' value={selectedFlight.promoCode} onChange={this.handleInputChange} />
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
                
            </div>
        )
    }
}