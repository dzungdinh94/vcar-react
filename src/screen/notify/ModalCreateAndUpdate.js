import React, { Component } from 'react';
import { Modal, Button, Alert, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import { TextInput, SelectInput, TextAreaInput, FileInput } from '../../components/input'


class InsertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        title: '',
        content: '',
        description: '',
        url: '',
        image: '',
        type: 0,
        // userId: 0
      },
      warning: '',
      isShow: false,
      isEdit: false,
    }
  };

  _onSave = () => {
    let { data, isEdit } = this.state
    if (!data.title) return this.setState({ warning: 'Nhập tiêu đề ' })
    if (!data.image) return this.setState({ warning: 'Chọn ảnh tiêu đề ' })
    if (!data.content) return this.setState({ warning: 'Nhập nội dung' })
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
          <Modal.Title id="contained-modal-title-lg">{isEdit ? 'Cập nhật' : 'Gửi'} thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!warning && <Alert bsStyle="danger">{warning}</Alert>}
          <TextInput
            id="title"
            type="text"
            label="Tiêu đề "
            data={data}
            onChange={this._onChangeData}
          />
          <FileInput
            id="image"
            type="number"
            label="Ảnh tiêu đề "
            data={data}
            onChange={this._onChangeData}
          />
          <TextInput
            id="url"
            type="text"
            label="Url"
            data={data}
            onChange={this._onChangeData}
          />
          <TextAreaInput
            id="content"
            type="textarea"
            label="Nội dung"
            data={data}
            onChange={this._onChangeData}
          />
          <SelectInput
            id="type"
            label="Loại thông báo"
            data={data}
            onChange={this._onChangeData}
            notNull
          >
            <option value='0'>Gửi tất cả</option>
            <option value='1'>Gửi cho người dùng</option>
            <option value='2'>Gửi cho lái xe</option>
          </SelectInput>
          {/* <TextInput
            id="description"
            type="textarea"
            label="Email"
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