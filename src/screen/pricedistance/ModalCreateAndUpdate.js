import React, { Component } from 'react';
import { Modal, Button, Alert, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import { TextInput } from '../../components/input'


class InsertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        startDistance: 0,
        endDistance: 0,
        price: 0,
        priceTimeSlotId: '',
      },
      warning: '',
      isShow: false,
      isEdit: false,
    }
  };

  _onSave = () => {
    let { data, isEdit } = this.state
    // if (!data.startTime) return this.setState({ warning: 'Nhập thời gian bắt đầu' })
    if (!data.endDistance) return this.setState({ warning: 'Nhập mốc kết thúc' })
    if (!data.price) return this.setState({ warning: 'Nhập giá' })
    if (!data.priceTimeSlotId) return this.setState({ warning: 'Có lỗi xảy ra xin thực hiện lại' })
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
          <FormGroup controlId='startDistance'>
            <ControlLabel>Khoảng cách bắt đầu</ControlLabel>
            <FormControl
              disabled
              value={data.startDistance || 0}
              type='number'
              placeholder={`Nhập`}
            />
          </FormGroup>
          <TextInput
            id="endDistance"
            type="number"
            label="Khoảng cách kết thúc"
            data={data}
            onChange={this._onChangeData}
          />
          <TextInput
            id="price"
            type="number"
            label="Giá dịch vụ (đ/km)"
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