import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormEditOrNewTrailer from "./FormEditOrNewTrailer";

class ModalEditOrNewTrailer extends Component {

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
      const game_name = this.props.game.game_name

      var title = "Editiere Trailer für " + game_name;
      var button = <Button color="outline-dark" onClick={this.toggle}>Ändern</Button>;


      if (create) {
        title= "Neuer Trailer für " + game_name

        button = (
          <Button
            color = "dark"
            onClick={this.toggle}
            style={{ minWidth: "200px" }}
          >
            Neuer Trailer
          </Button>
        );
      }

      return(

        <Fragment>
          {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
              <ModalBody>

                <FormEditOrNewTrailer
                create={this.props.create}
                resetState={this.props.resetState}
                toggle={this.toggle}

                game={this.props.game}
                trailer={this.props.trailer}
                get_yt_code={this.props.get_yt_code}
                onChangeTrailer={this.props.onChangeTrailer}


                />

              </ModalBody>
            </Modal>
        </Fragment>

      );

    };

}

export default ModalEditOrNewTrailer;
