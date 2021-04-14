import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import {DISHES} from "../shared/dishes";

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
        };
    }

    renderDish(dish) {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(dish) {
        const comments = dish.comments.map((comments) => {
            return (
                <div style={{padding: 5}}>
                    <li>{comments.comment}</li>
                    <li> -- {comments.author}</li>
                    <br/>
                </div>
            )
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul style={{padding: 5}} className={"list-unstyled"}>
                    {comments} <br/>
                </ul>
            </div>
        );
    }

    render() {
        if (this.props.selectedDish != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.state.dishes[this.props.selectedDish])}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.state.dishes[this.props.selectedDish])}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default DishDetail;