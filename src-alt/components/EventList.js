import React, { Component } from "react";
import { Table } from "reactstrap";
import NewEventModal from "./NewEventModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class EventList extends Component {
  render() {
    const events = this.props.events;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            <th>Aktuelles Event</th>
            <th>Thread</th>
            <th>Posting</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            !events || events.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            events.map(event => (
              <tr key={event.pk}>
                <td>{event.event_name}</td>
                <td>{event.event_is_current}</td>
                <td>{event.event_url_thread}</td>
                <td>{event.event_url_posting}</td>
                <td align="center">
                  <NewEventModal
                    create={false}
                    events={event}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={event.pk}
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

export default EventList;
