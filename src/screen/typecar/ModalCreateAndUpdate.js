import React, { Component } from 'react';
import { Modal, Button, Alert, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import { TextInput, SelectInput, FileInput } from '../../components/input'


class InsertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        name: '',
        description: '',
        weight: '',
        icon:'',
        img1x: '',
        img2x: '',
        img3x: ''
      },
      warning: '',
      isShow: false,
      isEdit: false,
    }
  };

  _onSave = () => {
    let { data, isEdit } = this.state
    if (!data.name) return this.setState({ warning: 'Nhập tên loại xe' })
    if (!data.weight) return this.setState({ warning: 'Nhập trọng lượng của loại xe' })
    let { onSave = () => console.log(arguments) } = this.props
    onSave(data, isEdit, err => {
      if (!err) return;
      this.setState({ warning: err + '' })
      this._onShow({}, isEdit)
    })
    this._onHide()
  }
  _onChangeData = (k) => (e) => {
    let { data } = this.state
    data[k] = e.target.value
    this.setState({ data })
  }
  _onHide = () => this.setState({ warning: '', isShow: false })

  _onShow = (dataEdit, isEdit) => {
    let { data } = this.state
    this.setState({
      data: { ...data, ...dataEdit },
      isShow: true,
      isEdit: !!isEdit
    })
  }
  render() {
    let { warning, data, isShow, isEdit } = this.state
    return (
      <Modal onHide={this._onHide} show={isShow} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{isEdit ? 'Cập nhật' : 'Thêm'} lái xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!warning && <Alert bsStyle="danger">{warning}</Alert>}
          <TextInput
            id="name"
            type="text"
            label="Tên loại xe"
            data={data}
            onChange={this._onChangeData}
          />
          <TextInput
            id="description"
            type="text"
            label="Mô tả"
            data={data}
            onChange={this._onChangeData}
          />
          <TextInput
            id="weight"
            type="number"
            label="Trọng lượng xe"
            data={data}
            onChange={this._onChangeData}
          />
          <FileInput
            id="icon"
            type="number"
            label="Icon choose"
            data={data}
            onChange={this._onChangeData}
          />
          <FileInput
            id="img1x"
            type="number"
            label="Icon1x map"
            data={data}
            onChange={this._onChangeData}
          />
          <FileInput
            id="img2x"
            type="number"
            label="Icon2x map"
            data={data}
            onChange={this._onChangeData}
          />
          <FileInput
            id="img3x"
            type="number"
            label="Icon3x map"
            data={data}
            onChange={this._onChangeData}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ width: "120px" }} bsStyle="success" onClick={this._onSave}>{isEdit ? 'Cập nhật' : 'Thêm'}</Button>
          <Button style={{ width: "120px" }} onClick={this._onHide}>Huỷ</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default InsertModal;