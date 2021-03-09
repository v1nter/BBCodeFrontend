import React, { Component } from "react";
import { Col, Container, Row, } from "reactstrap";
import axios from "axios";
import CrudEvents from "./CrudEvents";
import ModalEditOrNewEvent from "./ModalEditOrNewEvent"
import Header from "./Header";
import { EVENT_URL } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Events extends Component {

  /*
  #############################################################################
  #
  # Deklariert Arrays
  #
  #############################################################################
  */
  state = {
    events: [],
  };

  /*
  #############################################################################
  #
  # componentDidMount() wird beim Öffnen aufgerufen. Startet die Kette
  # resetState() => GetEvents() um die Daten aus der Datenbank zu holen
  #
  #
  #############################################################################
  */
  componentDidMount() {
    this.resetState();
  }

  /*
  #############################################################################
  #
  # Hole Daten
  #
  #############################################################################
  */
  getEvents = () => {
    axios.get(EVENT_URL).then(res => this.setState({ events: res.data }));
  };

  resetState = () => {
    this.getEvents();
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
              <ModalEditOrNewEvent
                create={true}
                resetState={this.resetState} />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px"}}>
            <Col>
              <CrudEvents
                events={this.state.events}
                resetState={this.resetState}
              />
            </Col>
          </Row>
          </Container>
          </div>

      )
  }
}

export default Events;
