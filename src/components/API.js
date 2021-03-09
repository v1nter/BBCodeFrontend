import React, { Component } from "react";
import { Col, Container, Row, } from "reactstrap";
import FormImgur from "./FormImgur"
import Header from "./Header";

class API extends Component {

  state = {
    imgur: [],
  };

  render() {

    return(

      <div>
      <Container style={{ marginTop: "20px"}}>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormImgur
            />
          </Col>
        </Row>
      </Container>
      </div>
    );
  }

}

export default API;
