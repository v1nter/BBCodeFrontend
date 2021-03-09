import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormNewGame from "./FormNewGame"

class ModalNewGame extends Component{
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {

    var title = "Erstelle neues Spiel";
    var button = <Button onClick={this.toggle}>Neu erstellen</Button>;

    button = (
      <Button
        color="dark"
        className="float-right"
        onClick={this.toggle}
        style={{ minWidth: "200px" }}
      >
        Neues Spiel
      </Button>
    );

  return (
    <Fragment>
      {button}
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
        <ModalBody>
          <FormNewGame
            resetState={this.props.resetState}
            toggle={this.toggle}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
  }
}

export default ModalNewGame;
