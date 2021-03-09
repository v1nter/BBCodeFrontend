import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter, } from "reactstrap";
import axios from "axios";
import { GAMES } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ModalDeleteGames extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteGames = id => {
    axios.delete(GAMES + id).then(() => {
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
            Wirklich das Spiel löschen?
          </ModalHeader>
          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Abbrechen
            </Button>
            <Button
              type="button"
              color="danger"
              onClick={() => this.deleteGames(this.props.id)}
            >
              Löschen
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ModalDeleteGames;
