import React, { Component } from 'react';
import axios from 'axios';
import './PersonList.css'; 

export default class PersonList extends Component {
    // Define state default values
    state = {
        persons: []
    }

    detailsClick = (index) => {
        const person = this.state.persons[index];
        console.log('Details clicked for:', person.name.first, person.name.last);
    }
    // Component Lifecycle Callback
    // Axios Version
    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(response => {
                console.log(response.data);
                this.setState({ persons: response.data.results });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    //  Fetch Version
    // // fetch('https://randomuser.me/api/?results=10')
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     console.log(data);
    //     this.setState({ persons: data.results });
    // })
    // .catch(error => {
    //     console.error('Error fetching data:', error);
    // });

    render() {
        return (
            // Avatar
            <div className="person-list-container">
                <h2>Person List</h2>
                <div className="person-list">
                    {this.state.persons.map((person, index) => (
                        <div key={index} className="person">
                            <div className="avatar-container">
                                <img
                                    src={person.picture.thumbnail}
                                    alt={`${person.name.first} ${person.name.last} avatar`}
                                    className="avatar"
                                />
                            </div>
                            {/* Person info */}
                            <button onClick={() => this.detailsClick(index)}>Details</button>
                            <div><strong>Name:</strong> {person.name.title} {person.name.first} {person.name.last} - {person.login.uuid}</div>
                            <div><strong>Username:</strong> {person.login.username}</div>
                            <div><strong>Gender:</strong> {person.gender.toUpperCase()}</div>
                            <div><strong>TimeZone:</strong> {person.location.timezone.description}</div>
                            <div><strong>Address:</strong> {person.location.street.number} {person.location.street.name},{person.location.city},{person.location.state},
                            {person.location.country},{person.location.postcode}</div>
                            <div><strong>Email:</strong> {person.email}</div>
                            <div><strong>Date of Birth:</strong> {new Date(person.dob.date).toLocaleDateString()}</div>
                            <div><strong>Phone:</strong> {person.phone}</div>
                            <div><strong>Cell:</strong> {person.cell}</div>
                           
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
