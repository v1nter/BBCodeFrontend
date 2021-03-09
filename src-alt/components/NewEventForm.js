import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

///////////////////////////////////////////////////////////////////////////////
//
// Form zum Erstellen eines neuen Events
//
///////////////////////////////////////////////////////////////////////////////
class NewEventForm extends React.Component {
  state = {
    pk: 0,
    event_name: "",
    event_is_current: "",
    event_url_thread: "",
    event_url_posting: "",
  };

  /////////////////////////////////////////////////////////////////////////////
  //
  // Falls ein vorhandenes Event aufgerufen/editiert wird, werden die Felder
  // mit den entsprechenden Daten vorbefüllt
  //
  /////////////////////////////////////////////////////////////////////////////
  componentDidMount(){
    if (this.props.events) {
      const {pk, event_name, event_is_current, event_url_thread, event_url_posting} = this.props.events;
      this.setState(
        {
          pk,
          event_name,
          event_is_current,
          event_url_thread,
          event_url_posting
        }
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  //
  // Behandelt das Updaten state.props mit dem aktuellen Wert im
  // entsprechenden Feld
  //
  /////////////////////////////////////////////////////////////////////////////
  onChange = e => {
    alert("e.target.name: " + e.target.name + " e.target.value: " + e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  };

  /////////////////////////////////////////////////////////////////////////////
  //
  // Behandelt die HTTP POST Requests beim drücken des Submit-Buttons
  // Wird genutzt, um ein neues Event zu erstellen
  //  Axios ist der HTTP Client
  //
  /////////////////////////////////////////////////////////////////////////////
  createEvent = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  ///////////////////////////////////////////////////////////////////////////////
  //
  // Funktioniert wie createEvent, aber nutzt PUT statt POST
  // => Zum Editieren eines bestehenden Events
  //
  ///////////////////////////////////////////////////////////////////////////////
  editEvent = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  ///////////////////////////////////////////////////////////////////////////////
  //
  // render() wird die NewEventForm mit Hilfe von
  // reactstrap Komponenten erstellen
  //
  ///////////////////////////////////////////////////////////////////////////////
  render() {
    return(
      <Form onSubmit={this.props.events ? this.editEvent : this.createEvent}>

        <FormGroup>
          <Label for="event_name">Event Name: </Label>
          <Input
            type="text"
            name="event_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="event_is_current">Aktuelles Event: </Label>
          <Input
            type="checkbox"
            name="event_is_current"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="event_url_thread">Thread URL: </Label>
          <Input
            type="text"
            name="event_url_thread"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="event_url_posting">Posting URL: </Label>
          <Input
            type="text"
            name="event_url_posting"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewEventForm;














// Kommentar, damit beim Speichern die Leerzeilen nicht verschwinden
