import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormEditOrNewPlatform from "./FormEditOrNewPlatform";


class ModalEditOrNewPlatform extends Component{
  state = {
    modal: false
  };

  componentDidMount() {
    //alert(this.props.platform.platform_name);
  }

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

    var title = "Editiere Plattform";
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
      title = "Erstelle neue Plattform";

      button = (
        <Button
          color="dark"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Neue Plattform
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>


            <FormEditOrNewPlatform
              resetState={this.props.resetState}
              toggle={this.toggle}
              platform={this.props.platform}
            />

          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default ModalEditOrNewPlatform;
