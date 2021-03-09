import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewEventForm from "./NewEventForm";

class NewEventModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    /*
    ###########################################################################
    #
    # Bei Create=True wird der Titel geändert
    #
    ###########################################################################
    */

    var title = "Editiere Event";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Erstelle neues Event";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Neu erstellen
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewEventForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              events={this.props.events}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewEventModal;
