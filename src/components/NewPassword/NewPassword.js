import React, { Component } from 'react';
import { Input, Button, FormGroup } from '../common';
import './NewPassword.css'

class SignIn extends Component {
    state = {
        inputElements: {
            username: {
                value: '',
                type: 'text',
                name: 'username',
                placeholder: 'Username',
                alert: false
            },
            oldPassword: {
                value: '',
                type: 'password',
                name: 'oldPassword',
                placeholder: 'Old Password',
                alert: false
            },
            newPassword: {
                value: '',
                type: 'password',
                name: 'newPassword',
                placeholder: 'New Password',
                alert: false
            }, 
            rePassword: {
                value: '',
                type: 'password',
                name: 'rePassword',
                placeholder: 'Confirm password',
                alert: false
            }
        }
    }

    componentDidMount = () => {

    }


    onInputChange = (e) => {
        let updatedElement = this.state.inputElements[e.target.name];
        updatedElement.value = e.target.value;
        updatedElement.alert = false

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

        const { newPassword, rePassword } = this.state.inputElements;
        if (newPassword.value !== rePassword.value) {
            result = false;
            let updateInputElements = this.state.inputElements;
            updateInputElements.newPassword.alert = true;
            updateInputElements.rePassword.alert = true;
            this.setState({
                inputElements: updateInputElements
            })
        }

        return result;
    }

    onClick = ()  => {

        if (this.validateForm()) {
            // do stuff
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
                    <h2>Update Password</h2>
                    {form}
                    <Button placeholder='Confirm' onClick={this.onClick}/>
                </FormGroup>
            </div>
        )
    }
}

export default SignIn;