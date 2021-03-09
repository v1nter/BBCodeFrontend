import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormEditOrNewEvent from "./FormEditOrNewEvent";

/*
###############################################################################
#
# Standardform für Anlegen oder Editieren von Datensätzen
# Felder werden kontextuell geändert über externe Formen für
# Events, Spiele, Trailer etc.
#
###############################################################################
*/

class ModalEditOrNewEvent extends Component{
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    /*
    ###########################################################################
    #
    # create wird von außen übergeben. Dient zur Unterscheidung ob ein
    # Datensatz neu angelegt (POST) oder editiert (PUT) wird
    #
    ###########################################################################
    */
    const create = this.props.create;

    var title = "Editiere Event";
    var button = <Button color="outline-dark" onClick={this.toggle}>Ändern</Button>;

    /*
    ###########################################################################
    #
    # Falls create=true, wird der Title geändert => Klasse lässt sich
    # für verschiedene Fälle verwenden
    #
    ###########################################################################
    */
    if (create) {
      title = "Erstelle neues Event";

      button = (
        <Button
          color="dark"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Neues Event
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>


            <FormEditOrNewEvent
              resetState={this.props.resetState}
              toggle={this.toggle}
              event={this.props.events}
            />

          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default ModalEditOrNewEvent;
