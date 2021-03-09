import React, { Component } from "react";
import { Table } from "reactstrap";
import ModalEditOrNewPlatform from "./ModalEditOrNewPlatform";
import ModalDeletePlatforms from "./ModalDeletePlatforms"

const PlatformsEnum = Object.freeze({"pc": "PC", "console": "Konsole", "vr": "VR", "stream": "Stream"})

class CrudPlatforms extends Component {

  componentDidMount() {
    //alert(this.props.platforms[1].platform_name);
  }

  render() {
    const platforms = this.props.platforms;
    return(
      <Table>
      <thead>
        <tr>
          <th>Bild</th>
          <th>Plattform</th>
          <th>Typ</th>
          <th>Ändern</th>
          <th>Löschen</th>
        </tr>
      </thead>

      <tbody>
        {
          !platforms || platforms.length <= 0 ? (
          <tr>
            <td colSpan="6" align="center">
              <b>Noch keine Plattform</b>
            </td>
          </tr>
        ) : (
          platforms.map(platform => (
            <tr key={platform.id}>
              <td><img src={platform.platform_image} alt="" /></td>
              <td>{platform.platform_name}</td>
              <td>{PlatformsEnum[platform.platform_type]}</td>
              {/*
              #################################################################
              #
              # Füge den Edit-Button ein
              #
              #################################################################
              */}
              <td align="center">
                <ModalEditOrNewPlatform
                  create={false}
                  platform={platform}
                  resetState={this.props.resetState}
                />
              </td>
              <td align="center">
                <ModalDeletePlatforms
                  id={platform.id}
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

export default CrudPlatforms;
