import React, {Component} from 'react';

class Practice extends Component {

    constructor(props) {
        super();
        this.state = {
            city: '',
            zipcode: ''
        }
    }




    handleCityChange = (event) => {
        this.setState({city: event.target.value})
    }

    handleZipCode = (event) => {
        this.setState({zipcode: event.target.value})
    }


    render() {
        return (
            <form onSubmit = {this.mySubmit}>
                <p>City <input type={'text'} onChange = {this.handleCityChange}/></p>
                <p>Zip Code <input type={'test'} onChange = {this.handleZipCode}/></p>
                <p><input type='submit'/></p>
            </form>
        );
    }


}
export default Practice;
