import React, { Component } from 'react';

import './Services.css';

class Services extends Component {
    state = {
        services: [{
            serviceId: 'P00',
            serviceType: 'EC2',
            startTime: '9:00 AM',
            endTime: '11:00 PM'
        }, {
            serviceId: 'P01',
            serviceType: 'RDS',
            startTime: '3:00 AM',
            endTime: '5:00 PM'
        }],
        search: {
            value: '',
            result: null,
            isEnter: false
        }
    };

    componentDidMount = () => {
        // Put API here
    }

    onInputChange = (e) => {
        const updatedSearch = this.state.search;
        updatedSearch.isEnter = false;
        updatedSearch.result = null;
        updatedSearch.value = e.target.value;

        this.setState({
            ...this.setState,
            search: updatedSearch
        })
    }

    onSearch = (e) => {
        if (e.key !== 'Enter' || this.state.search.value === '') {
            return;
        }

        const updatedSearch = this.state.search;
        updatedSearch.isEnter = true;
        this.setState({
            ...this.setState,
            search: updatedSearch
        })
        this.state.services.forEach(service => {
            if(this.state.search.value === service.serviceId) {
                updatedSearch.isEnter = true;
                updatedSearch.result = service;
                this.setState({
                    ...this.state,
                    search: updatedSearch
                })
                return;
            }
            
        })
    }

    onEdit = (service) => {
        console.log('Editing');
        console.log(service);
    }

    onDelete = (service) => {
        console.log('Deleting');
        console.log(service);
    }

    render () {
        let tableElement = null;
        const search = this.state.search;
        if (search.isEnter) {
            const searchResult = search.result;
            if (searchResult) {
                tableElement = (
                    <tr key={searchResult.serviceId}>
                        <td>{searchResult.serviceId}</td>
                        <td>{searchResult.serviceType}</td>
                        <td>{searchResult.startTime}</td>
                        <td>{searchResult.endTime}</td>
                        <td>
                            <button 
                                className='service-btn-edit' 
                                onClick={() => this.onEdit(searchResult)}>Edit</button>
                            <button 
                                className='service-btn-delete'
                                onClick={() => this.onDelete(searchResult)}>Delete</button>
                        </td>
                    </tr>
                )            
            }
            
        } else {
            const services = this.state.services;
            tableElement = services.map(service => {
                return (
                    <tr key={service.serviceId}>
                        <td>{service.serviceId}</td>
                        <td>{service.serviceType}</td>
                        <td>{service.startTime}</td>
                        <td>{service.endTime}</td>
                        <td>
                            <button 
                                className='service-btn-edit'
                                onClick={() => this.onEdit(service)}>Edit</button>
                            <button 
                                className='service-btn-delete'
                                onClick={() => this.onDelete(service)}>Delete</button>
                        </td>
                    </tr>
                );
                
            });
        }

        return (
            <div className="service-container">
                <div>
                    <input 
                        className="search-bar"
                        placeholder="Search"
                        value={this.state.search.value} 
                        onChange={e => this.onInputChange(e)}
                        onKeyPress={this.onSearch}></input>
                </div>
                
                <table className="service-table">
                    <thead>
                        <tr>
                            <th>Service Id</th>
                            <th>Service Type</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableElement}
                    </tbody>
                </table>
            </div>	
        );
    }
}

export default Services;