import React, { Component } from 'react';
import { Input, Button, FormGroup } from '../common';
import * as Auth from '../Auth';
import './SignIn.css'

class SignIn extends Component {
    state = {
        inputElements: {
            username: {
                value: '',
                type: 'text',
                name: 'username',
                placeholder: 'Username'
            },
            password: {
                value: '',
                type: 'password',
                name: 'password',
                placeholder: 'Password'
            }
        }
    }


    componentDidMount = () => {
        if (Auth.isAuthenticated()) {
            this.props.history.push({pathname: '/form'});
        }
    }


    onInputChange = (e) => {
        let updatedElement = {
            ...this.state.inputElements[e.target.name],
            value: e.target.value,
        };

        this.setState ({
            inputElements: {
                ...this.state.inputElements,
                [e.target.name]: updatedElement
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

        formElementsArray.forEach( element => {
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
            };
        })

        return result;
    }

    onSignIn = ()  => {
        if (this.validateForm()) {
            const { username, password } = this.state.inputElements;

            Auth.onSignIn(username.value, password.value, this.props.history);
        }
        
    }

    render () {
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
            <div className='form'>
                <FormGroup>

                    <h2>Sign in</h2>
                    {form}

                    <Button placeholder='Sign in' onClick={this.onSignIn}/>
                </FormGroup>
            </div>
        )
    }
}

export default SignIn;