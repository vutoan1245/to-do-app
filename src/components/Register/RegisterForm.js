import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FormGroup, Input, Button } from '../common';
import * as Auth from '../Auth';
import './RegisterForm.css';


class RegisterForm extends Component {
    state = {
        inputElements: {
            firstName: {
                value: '', 
                alert: false,
                type: 'text',
                name: 'firstName',
                placeholder: 'First Name'
            },
            lastName: { 
                value: '', 
                alert: false,
                type: 'text',
                name: 'lastName',
                placeholder: 'Last Name'
            },
            email: { 
                value: '', 
                alert: false,
                type: 'email',
                name: 'email',
                placeholder: 'Email'
            },
            password: { 
                value: '', 
                alert: false,
                type: 'text',
                name: 'password',
                placeholder: 'Password'
            },
            rePassword: { 
                value: '', 
                alert: false,
                type: 'text',
                name: 'rePassword',
                placeholder: 'Confirm Password'
            }
        }
        
    }


    // componentDidMount = () => {
    //     if (!Auth.isAuthenticated()) {
    //         this.props.history.push({pathname: '/signin'});
    //     }
    // }

    onInputChange = (e) => {
        let updatedElements = {
            ...this.state.inputElements[e.target.name],
            value: e.target.value,
            alert: false
        };

        this.setState ({
            inputElements: {
                ...this.state.inputElements,
                [e.target.name]: updatedElements
            }
        });
    }

    validateForm = () => {

        let result = true;

        const formElementsArray = [];
        for( let key in this.state.inputElements ) {
            formElementsArray.push(
                this.state.inputElements[key]
            );
        }

        formElementsArray.forEach(element => {
            if (element.value === '') {
                result = false;
                let updateElement = element;
                updateElement.alert = true;
                this.setState({
                    inputElements: {
                        ...this.state.inputElements,
                        [element.name]: updateElement
                    }
                })
            }

            if (element.name === 'email') {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(element.value.toLowerCase())) {
                    result = false;
                    let updateElement = element;
                    updateElement.alert = true;
                    this.setState({
                        inputElements: {
                            ...this.state.inputElements,
                            [element.name]: updateElement
                        }
                    })
                }
            }
        })

        return result;
    }


    onSignOut = () => {
        this.props.history.push({pathname: '/signin'});
        Auth.onSignOut();
    }

    onSubmit = () => {
        if (this.validateForm()) {
            const { firstName, lastName, company, address, city, state, zipCode, email, phone } = this.state.inputElements;


            const body = {
                Email: email.value,
                FirstName: firstName.value,
                LastName: lastName.value,
                Company: company.value,
                Address: address.value,
                City: city.value,
                State: state.value,
                ZipCode: zipCode.value,
                Phone: phone.value
            }

            axios.post(Auth.APIUrl, body, {
                    headers: {
                        'Authorization': Auth.getJwtToken()
                    }
                })
                .then(response => {
                    console.log('success');
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }  
    }

    render() {
        const formElementsArray = [];
        for( let key in this.state.inputElements ) {
            formElementsArray.push({
                id: key,
                config: this.state.inputElements[key]
            });
        }

        const form = formElementsArray.map(element => (
                <Input 
                    key={element.id}
                    type={element.config.type}
                    name={element.config.name}
                    value={element.config.value} 
                    placeholder={element.config.placeholder}
                    onChange={e => this.onInputChange(e)}
                    alert={element.config.alert} />
            )
        );

        return (
            <div className="form"> 
                <div className='service-form-group'>
                    <FormGroup>
                        <h2>Smart Registration</h2>
                        {form}
                        <Button placeholder='Register' onClick={this.onSubmit}/>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </FormGroup>
                </div>
            </div>

        );
    };
}

export default RegisterForm;