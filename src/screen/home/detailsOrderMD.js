import React, { Component } from 'react';
import { Modal, Button, Alert, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import { TextInput, SelectInput } from '../../components/input'


class InsertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
      },
      warning: '',
      isShow: false,
      isEdit: false,
    }
  };

  _onChangeData = (k) => (e) => {
    let { data } = this.state
    data[k] = e.target.value
    this.setState({ data })
  }
  _onHide = () => this.setState({ warning: '', isShow: false })

  _onShow = (dataEdit) => {
    let { data } = this.state
    this.setState({
      data: dataEdit,
      isShow: true,
    })
  }
  render() {
    let { warning, data, isShow } = this.state
    return (
      <Modal onHide={this._onHide} show={isShow} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg"> lái xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!warning && <Alert bsStyle="danger">{warning}</Alert>}
          <h3>{data.fullname} - {data.phone}</h3>
          <TextInput
            id="password"
            type="password"
            label="Mật khẩu"
            data={data}
            onChange={this._onChangeData}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ width: "120px" }} onClick={this._onHide}>Huỷ</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default InsertModal;