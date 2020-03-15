import React from 'react'
import { ListGroup } from 'react-bootstrap'

const LocationResult = ({ results, onClickHandler }) => {
    return (
        <ListGroup>
            {results.filter((e) => e.class==="place").map((result) => (
                <ListGroup.Item key={result.place_id} action onClick={() => onClickHandler(result)}>{result.display_name}</ListGroup.Item>
            ))}
        </ListGroup>
    )
};

export default LocationResult