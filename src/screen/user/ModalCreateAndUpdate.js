import React, { Component } from 'react';
import { Modal, Button, Alert, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import { TextInput, SelectInput } from '../../components/input'


class InsertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        // username: '',
        email: '',
        phone: '',
        password: '',
        fullname: '',
        numberCar: '',
        typeCarId: '',
      },
      warning: '',
      isShow: false,
      isEdit: false,
    }
  };

  _onSave = () => {
    let { data, isEdit } = this.state
    // if (!data.fullname) return this.setState({ warning: 'Nhập tên lái xe' })
    // if (!data.email) return this.setState({ warning: 'Nhập email' })
    // if (!data.phone) return this.setState({ warning: 'Nhập số điện thoại' })
    if (!data.password && !isEdit) return this.setState({ warning: 'Nhập mật khẩu cho người dùng' })
    // if (!data.numberCar) return this.setState({ warning: 'Nhập số xe' })
    // if (!data.typeCarId) return this.setState({ warning: 'Chọ loại xe ' })
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
          {/* <TextInput
            id="fullname"
            type="text"
            label="Tên lái xe"
            data={data}
            onChange={this._onChangeData}
          />
          <TextInput
            id="phone"
            type="text"
            label="Số điện thoại"
            data={data}
            onChange={this._onChangeData}
          />
          <TextInput
            id="email"
            type="email"
            label="Email"
            data={data}
            onChange={this._onChangeData}
          /> */}
          <TextInput
            id="password"
            type="password"
            label="Mật khẩu"
            data={data}
            onChange={this._onChangeData}
          />
          {/* <TextInput
            id="numberCar"
            type="text"
            label="Số xe"
            data={data}
            onChange={this._onChangeData}
          /> */}
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