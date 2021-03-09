import React, { Component } from "react";
import { Table } from "reactstrap";
import ModalEditOrNewEvent from "./ModalEditOrNewEvent"
import ModalDeleteEvents from "./ModalDeleteEvents"


/*
###############################################################################
#
# View zum Anzeigen, anlegen und editieren von Events
#
###############################################################################
*/

class CrudEvents extends Component {

  render() {
    const events = this.props.events;
    return(
      <Table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Aktuell</th>
          <th>Thread</th>
          <th>Posting</th>
          <th>Album</th>
          <th>Ändern</th>
          <th>Löschen</th>
        </tr>
      </thead>

      <tbody>
        {
          !events || events.length <= 0 ? (
          <tr>
            <td colSpan="6" align="center">
              <b>Noch kein Event</b>
            </td>
          </tr>
        ) : (
          events.map(event => (
            <tr key={event.id}>
              <td>{event.event_name}</td>
              <td><input type="checkbox" checked={event.event_is_current}/></td>
              <td><a href={"https://forum.gamespodcast.de/posting.php?mode=edit&f=8&p=" + event.event_url_thread} target="_blank" rel="noreferrer">Link</a></td>
              <td><a href={"https://forum.gamespodcast.de/posting.php?mode=reply&f=8&t=" + event.event_url_posting} target="_blank" rel="noreferrer">Link</a></td>
              <td><a href={"https://imgur.com/a/" + event.event_album} target="_blank" rel="noreferrer">Zum Album</a></td>
              {/*
              #################################################################
              #
              # Füge den Edit-Button ein
              #
              #################################################################
              */}
              <td align="center">
                <ModalEditOrNewEvent
                  create={false}
                  events={event}
                  resetState={this.props.resetState}
                />
              </td>
              <td align="center">
                <ModalDeleteEvents
                  id={event.id}
                  resetState={this.props.resetState}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
      </Table>
    );
  }
}

export default CrudEvents;
