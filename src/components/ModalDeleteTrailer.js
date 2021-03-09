import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter, } from "reactstrap";
import axios from "axios";
import { TRAILER } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ModalDeleteTrailer extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteTrailer = id => {
    axios.delete(TRAILER + id).then(() => {
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
            Wirklich den Trailer löschen?
          </ModalHeader>
          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Abbrechen
            </Button>
            <Button
              type="button"
              color="danger"
              onClick={() => this.deleteTrailer(this.props.id)}
            >
              Löschen
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ModalDeleteTrailer;
