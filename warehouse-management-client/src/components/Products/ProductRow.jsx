import React from 'react';
import { Button } from "react-bootstrap";

export default function ProductRow(props) {

    return (
        <tr>
            <td>{props.product.id}</td>
            <td>{props.product.name}</td>
            <td>{props.product.price}</td>
            <td>
                <Button
                    className="mx-1 my-0"
                    variant="outline-success"
                    size="sm"
                    onClick={() => console.log("Button Update")}>
                    Update
                </Button>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => console.log("Button Delete")}>
                    Delete
                </Button>
            </td>
        </tr>
    )
}