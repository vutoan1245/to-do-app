import React, { Component } from 'react';
import './AddService.css';

class AddService extends Component {

    state = {
        inputElements: {
            serviceId: {
                value: '', 
                type: 'text',
                name: 'serviceId',
                placeholder: 'Task Name:'
            },
            serviceType: { 
                value: 'EC2', 
                type: 'drop-down',
                name: 'serviceType',
                placeholder: 'Class:',
                options: ['Calculus 2', 'Computer Science 2', 'Communication', 'English Composition']
            },
            startTime: { 
                value: '', 
                type: 'time',
                name: 'startTime',
                placeholder: 'Start Time:'
            },
            endTime: { 
                value: '', 
                type: 'time',
                name: 'endTime',
                placeholder: 'End Time:'
            }
        },
        
    }

    onInputChange = (e) => {
        let updatedElements = {
            ...this.state.inputElements[e.target.name],
        };
        updatedElements.value = e.target.value;

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
                this.setState({
                    inputElements: {
                        ...this.state.inputElements,
                        [element.name]: updateElement
                    }
                })
            }
        })

        return result;
    }

    onClick = () => {
        console.log(this.state.inputElements);
    }

    render() {
        const formElementsArray = [];
        for( let key in this.state.inputElements ) {
            formElementsArray.push({
                id: key,
                config: this.state.inputElements[key]
            });
        }

        const form = formElementsArray.map(element => {
            switch (element.config.type) {
                case 'text':
                    return(
                        <div className='group-input' key={element.id}>
                            <p>{element.config.placeholder}</p>
                            <input 
                                key={element.id}
                                type={element.config.type}
                                name={element.config.name}
                                value={element.config.value} 
                                onChange={e => this.onInputChange(e)} />
                        </div>
                        
                    );
                case 'drop-down':
                    return (
                        <div className='group-input' key={element.id}>
                            <p>{element.config.placeholder}</p>
                            <select 
                                key={element.id}
                                name={element.config.name}
                                value={element.config.value}
                                onChange={e => this.onInputChange(e)}
                                placeholder={element.config.placeholder}>
                                {element.config.options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                    );
                default: 
                    return(
                        <div className='group-input' key={element.id}>
                            <p>{element.config.placeholder}</p>
                            <input 
                                type={element.config.type}
                                name={element.config.name}
                                value={element.config.value} 
                                placeholder={element.config.placeholder}
                                onChange={e => this.onInputChange(e)} />
                        </div>
                    );
            }
        })

        return (
            <div className='service-form'>
                <div className='service-form-group'>
                    <h2>Add Task</h2>
                    {form}
                    <button className='service-submit' onClick={this.onClick}>Submit</button>

                </div>
            </div>
        );
    };
}

export default AddService;