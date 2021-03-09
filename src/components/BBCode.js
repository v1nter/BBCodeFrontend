import React, { Component } from "react";
import { Col, Container, Row, } from "reactstrap";
import Header from "./Header";
import FormBBCode from "./FormBBCode"

class BBCode extends Component {

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
            <FormBBCode
            delta={false} />
          </Col>
          <Col>
            <FormBBCode
            delta={true} />
          </Col>
        </Row>
      </Container>
      </div>
    );
  }

}

export default BBCode;
