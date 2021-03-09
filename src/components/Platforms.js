import React, { Component } from "react";
import { Col, Container, Row, } from "reactstrap";
import axios from "axios";

import CrudPlatforms from "./CrudPlatforms";
import Header from "./Header";
import ModalEditOrNewPlatform from "./ModalEditOrNewPlatform";

import { PLATFORM } from "../constants";

class Platforms extends Component {

  state = {
    platforms: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getPlatforms = () => {
    axios.get(PLATFORM).then(res => this.setState({ platforms: res.data }));
    // axios.get(PLATFORM).then(res => this.setState({ platforms: res.data }, function() { alert(this.state.platforms[0]['platform_name']) }));
  };

  resetState = () => {
    this.getPlatforms();
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
              <ModalEditOrNewPlatform
                create={true}
                resetState={this.resetState} />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px"}}>
            <Col>
              <CrudPlatforms
                platforms={this.state.platforms}
                resetState={this.resetState}
              />
            </Col>
          </Row>
          </Container>
          </div>

      )
  }
}

export default Platforms;
