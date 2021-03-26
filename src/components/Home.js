import React, { Component } from "react";
import { Col, Container, Row} from "reactstrap";
import Header from "./Header"


class Home extends Component {

  render() {
    return (

      <Container style={{ marginTop: "20px"}}>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
      </Container>

    );
  }

}

export default Home;
