import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import LocationResult from './locationResult';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
/* import { Icon } from "leaflet"; */

class Location extends Component {
    state = {
        value: '',
        data: null,
        position: [0, 0]
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleListItemSelect = this.handleListItemSelect.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value, data: null });
    }

    handleSubmit(event) {
        //alert('Location was given ' + this.state.value);
        var searchExpr = 'https://nominatim.openstreetmap.org/search?format=json&limit=50&q=' + this.state.value;
        fetch(searchExpr)
            .then(res => res.json())
            .then((data) => {
                this.setState({ value: this.state.value, data: data })
            })
            .catch(console.log)
        event.preventDefault();
    }

    handleListItemSelect(location) {
        this.setState({ value: this.state.value, data: this.state.data, position: [Number.parseFloat(location.lat), Number.parseFloat(location.lon)] });
        //event.preventDefault();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Location</Form.Label>
                                <Col sm={8}>
                                    <Form.Control id="location" defaultValue={this.state.value}></Form.Control>
                                </Col>
                                <Col sm={2}>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                        {this.state.data && <LocationResult results={this.state.data} onClickHandler={this.handleListItemSelect}></LocationResult>}
                    </Col>
                    <Col>
                        <div>
                            <Map center={this.state.position} zoom={12} style={ {height:"100vh"} }>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker key="posi1"
                                    position={this.state.position} />
                            </Map>
                        </div>
                    </Col>
                </Row>
            </div>
        );

    }
}

export default Location;