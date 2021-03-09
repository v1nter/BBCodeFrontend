import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter, } from "reactstrap";
import axios from "axios";
import { EVENT_URL } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ModalDeleteEvents extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteEvent = id => {
    axios.delete(EVENT_URL + id).then(() => {
      this.props.resetState();
      this.toggle();
    });
  };

  render() {
    return (
      <Fragment>
        <Button color="outline-danger" onClick={() => this.toggle()}>
          Löschen
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Wirklich das Event löschen?
          </ModalHeader>
          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Abbrechen
            </Button>
            <Button
              type="button"
              color="danger"
              onClick={() => this.deleteEvent(this.props.id)}
            >
              Löschen
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ModalDeleteEvents;
