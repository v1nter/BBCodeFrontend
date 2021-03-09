import React from "react";
import { Button, Form, FormGroup, Input, Label, Col, Container, Row, } from "reactstrap";
import axios from "axios";
import { IMGUR_GET } from "../constants";
import { IMGUR_POST } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class FormImgur extends React.Component {

  state = {
    imgur: "",
    pin: "",
  };

  componentDidMount() {

    this.getImgur()

  }

  resetState() {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    this.setState({pin: ""});
    this.getImgur()
  }

  getImgur = () => {
    axios.get(IMGUR_GET).then(res => this.setState( {imgur: res.data}));
  };

  createImgur = e => {
     e.preventDefault();
     axios.post(IMGUR_POST, this.state)
     this.resetState()
   };

   onChange = e => {

     this.setState({ [e.target.name]: e.target.value });
   }

   defaultIfEmpty = value => {
     return value === "" ? "" : value;
   };


  render() {
    return(
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.createImgur}>
              <FormGroup>
                <Label for="pin">Imgur:</Label>
                <Input
                  type="text"
                  name="pin"
                  onChange={this.onChange}
                  value={this.defaultIfEmpty(this.state.pin)}
                  required
                />
              </FormGroup>
                <Row>
                  <Col>
                    <Button color="success" type="Submit">Einloggen</Button>
                  </Col>
                  <Col>
                    <Button color="dark" href={ this.state.imgur } target='_blank'>Pin holen</Button>
                  </Col>
                </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default FormImgur;
