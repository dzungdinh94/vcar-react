import React, { Component } from 'react';
import { Modal, Button, Alert, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import { TextInput, SelectInput } from '../../components/input'


class InsertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        startTime: '',
        endTime: '',
        price: 0,
        typeCarId: '',
      },
      warning: '',
      isShow: false,
      isEdit: false,
    }
  };

  _onSave = () => {
    let { data, isEdit } = this.state
    if (!data.startTime) return this.setState({ warning: 'Nhập thời gian bắt đầu' })
    if (!data.endTime) return this.setState({ warning: 'Nhập thời gian kết thúc' })
    if (!data.price && !isEdit) return this.setState({ warning: 'Nhập giá dịch vụ' })
    if (!data.typeCarId) return this.setState({ warning: 'Chọn loại xe ' })
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
    const { typeCars } = this.props;
    let { warning, data, isShow, isEdit } = this.state
    return (
      <Modal onHide={this._onHide} show={isShow} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{isEdit ? 'Cập nhật' : 'Thêm'} lái xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!warning && <Alert bsStyle="danger">{warning}</Alert>}
          <TextInput
            id="startTime"
            type="time"
            label="Thời gian bắt đầu"
            data={data}
            onChange={this._onChangeData}
          />
          <TextInput
            id="endTime"
            type="time"
            label="Thời gian kết thúc"
            data={data}
            onChange={this._onChangeData}
          />
          <TextInput
            id="price"
            type="number"
            label="Giá mở cửa (đ)"
            data={data}
            onChange={this._onChangeData}
          />
          <SelectInput
            id="typeCarId"
            label="Loại xe"
            data={data}
            onChange={this._onChangeData}
          >
            {typeCars.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </SelectInput>
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