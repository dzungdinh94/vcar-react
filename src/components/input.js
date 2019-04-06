import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { UploadFile } from '../Request';

const _onUploadFile = (cb) => (e) => UploadFile('/fileupload', e.target.files, (err, res) => {
  if (!err) return cb({ target: { value: res } })
  alert(err)
  cb({ target: { value: '' } })
})

const TextInput = ({ id, label, type, onChange, data }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      value={data[id] || ''}
      type={type}
      onChange={onChange(id)}
      placeholder={`Nhập ${label.toLowerCase()}`}
    />
  </FormGroup>)
const TextAreaInput = ({ id, label, type, onChange, data }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      value={data[id] || ''}
      componentClass='textarea'
      onChange={onChange(id)}
      placeholder={`Nhập ${label.toLowerCase()}`}
    />
  </FormGroup>)
const SelectInput = ({ id, label, type, onChange, data, children, hideLable, notNull }) => (
  <FormGroup controlId={id}>
    {!hideLable && <ControlLabel>{label}</ControlLabel>}
    <FormControl
      defaultValue={data[id] || ''}
      // type='select'
      componentClass="select"
      onChange={onChange(id)}
    >
      {!notNull && <option value=''>Chọn {label.toLowerCase()}</option>}
      {children}
    </FormControl>
  </FormGroup >)
const FileInput = ({ id, label, type, onChange, data }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      type="file"
      onChange={_onUploadFile(onChange(id))}
      placeholder={`Chọn ${label.toLowerCase()}`}
    />
  </FormGroup>)
export {
  TextInput,
  SelectInput,
  TextAreaInput,
  FileInput
};
