import React, { Component } from 'react';
import {
  Row, Col,
  Table, ButtonToolbar, Button,
  FormControl, Panel, Checkbox
} from 'react-bootstrap'
import Pagination from './Pagination'
import { debounce } from 'lodash'

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      activePage: props.activePage,

    }
    this._onChecked = this._onChecked.bind(this)
    this._onSearch = debounce(this._onSearch.bind(this), 500)
    this._onDelete = this._onDelete.bind(this)
  };
  _onChangePage = (page) => {
    this.setState({ activePage: page })
    let { onChangePage } = this.props
    !!onChangePage && onChangePage(page)
  }
  _onChecked = (id) => (e) => {
    let { checked } = e.target
    let { selected } = this.state
    if (checked) {
      selected.push(id)
    } else {
      selected.splice(selected.indexOf(id), 1)
    }
    this.setState({ selected })
  }
  _onSearch(search) {
    this.props.onChangeSearch(search)
  }
  _onDelete = (value) => () => {
    let { selected } = this.state
    let { isKey, onDelete } = this.props
    if (!!value) selected = [value[isKey]]
    let bol = window.confirm("Bạn có chắc chắn muốn xóa ?");
    if (bol) onDelete(selected);
  }
  _onEdit = (value) => () => {
    this.props.onEdit(value)
  }
  render() {
    let { config, isKey,
      onDelete,
      onCreate,
      onEdit,
      headBtns,
      onChangeSearch,
      totalPage,
      data
    } = this.props
    let { selected, activePage } = this.state
    return (
      <Panel>
        <Panel.Heading>
          <Row >
            <Col xs={12} md={8} lg={8}>
              <ButtonToolbar>
                {!!onDelete && <Button bsStyle="danger" onClick={this._onDelete()}>Xóa</Button>}
                {!!onCreate && <Button bsStyle="success" onClick={onCreate}>Thêm</Button>}
                {headBtns}

                {/* <Button>Default</Button> */}
                {/* <Button bsStyle="primary">Primary</Button> */}
                {/* <Button bsStyle="info">Info</Button> */}
                {/* <Button bsStyle="danger">Danger</Button> */}
                {/* <Button bsStyle="link">Link</Button> */}
              </ButtonToolbar>
            </Col>
            {!!onChangeSearch && <Col xs={12} md={4} lg={4}>
              <FormControl
                type="text"
                placeholder="Tìm kiếm"
                onChange={(e) => this._onSearch(e.target.value)}
              />
            </Col>}
          </Row >
        </Panel.Heading>
        <Panel.Body>
          <Table striped bordered condensed hover responsive>
            <thead>
              <tr>
                <th style={{ width: '30px' }} />
                {[...config].map((v, k) => <th key={k}>{v.name}</th>)}
                {(!!onDelete || !!onEdit) && <th>Tác vụ</th>}
              </tr>
            </thead>
            <tbody>
              {
                [...data].map((v, k) => <tr key={k}>
                  <td style={{ width: '30px' }}>
                    <Checkbox
                      defaultChecked={selected.indexOf(v[isKey]) > -1}
                      onChange={this._onChecked(v[isKey])}
                    />
                  </td>
                  {
                    [...config].map((v1, k1) => <td key={k1}>
                      {
                        v1.dataFormat ?
                          v1.dataFormat(v[v1.key], v)
                          :
                          v[v1.key]
                      }
                    </td>)
                  }
                  {(!!onDelete || !!onEdit) && <td style={{ width: '140px' }}>
                    <ButtonToolbar>
                      {!!onDelete && <Button bsStyle="danger" onClick={this._onDelete(v)}>Xóa</Button>}
                      {!!onEdit && <Button bsStyle="primary" onClick={this._onEdit(v)}>Sửa</Button>}
                    </ButtonToolbar>
                  </td>}
                </tr>)
              }
            </tbody>
          </Table>
        </Panel.Body>
        <Panel.Footer>
          <Pagination
            totalPage={totalPage}
            activePage={activePage}
            changePage={this._onChangePage}
          />
        </Panel.Footer>
      </Panel>
    );
  }
}

export default TableView;