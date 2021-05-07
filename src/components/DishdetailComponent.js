import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    ModalHeader,
    ModalBody, FormGroup, Label, Input, Button, Modal, FormFeedback
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, Form, Errors, actions} from "react-redux-form";

//Internal Imports
import {Loading} from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';


class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            name: '',
            touched: {
                name: false
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggleModal() {this.setState({isModalOpen: !this.state.isModalOpen});}

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        //this.props.resetCommentForm();
        //event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({touched: {...this.state.touched, [field]: true}});
    }

    validate(name) {
        const errors = {name: ''};
        if (this.state.touched.name && name.length <= 2)
            errors.name = 'Must be greater than 2 characters';
        else if (this.state.touched.name && name.length > 15)
            errors.name = 'Must be 15 characters or less';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.name);
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form model="comment" onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="select" id="rating" name="rating" innerRef={(input) => this.rating = input}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" id="name" name="name"
                                       placeholder="Your Name"
                                       value={this.state.name}
                                       valid={errors.name === ''}
                                       invalid={errors.name !== ''}
                                       onBlur={this.handleBlur('name')}
                                       onChange={this.handleInputChange} />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="comment">Your Comment</Label>
                                <Input type="textarea" name="comment" id="comment" rows={6} innerRef={(input) => this.comment = input}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}




function RenderDish(props) {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <Card>
                <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name}/>
                <CardBody>
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>{props.dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function RenderComments(dish, resetCommentForm) {
    console.log(dish);
    const comments = dish.comments.map((comments) => {
        return (
            <div style={{padding: 5}}>
                <li>{comments.comment}</li>
                <li> -- {comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
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
            <CommentForm resetCommentForm={resetCommentForm}/>
        </div>
    );
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} resetCommentForm={props.resetCommentForm}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}


export default DishDetail;