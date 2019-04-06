import React, { Component } from 'react';
import {
    Breadcrumb,
} from 'react-bootstrap'
import PanelTable from '../../components/table'
import ModalCreateAndUpdate from './ModalCreateAndUpdate'
import { PostWithToken, GetWithToken } from '../../Request'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import { SelectInput } from '../../components/input'
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.routerName = 'pricetimeslot'
        this.state = {
            data: [],
            configTable: [
                {
                    key: 'id',
                    name: 'Mã',
                },
                {
                    key: 'startTime',
                    name: 'Khung giờ',
                    dataFormat: (cel, row) => <div>{row.startTime} - {row.endTime}</div>
                },
                {
                    key: 'price',
                    name: 'Giá mở cửa (đ)',
                },
                {
                    key: 'typeCarId',
                    name: 'Loại xe',
                    dataFormat: (cel, row) => <div>
                        {(_.findLast(this.state.typeCars, o => o.id === cel) || { name: 'Chưa gán loại xe' }).name}
                    </div>
                },

                {
                    key: 'id',
                    name: 'Bảng giá',
                    dataFormat: (cel, row) => <Link to={`/home/pricedistance/${cel}`} >
                        <Button bsStyle="success">Bảng giá</Button>
                    </Link>
                }
            ],
            activePage: 1,
            totalPage: 1,
            search: '',
            typeCars: [],
            typeCarId: 0
        }
    };
    componentDidMount() {
        let { activePage, search, typeCarId } = this.state
        this.getTypeCar()
        this.getData(activePage, search, typeCarId);
    }

    getData = (page, search, typeCarId) => {
        PostWithToken(`/${this.routerName}/getall`, { page, search, typeCarId }, (err, data) => {
            if (err) return console.log(err);
            let { totalPage, rows } = data;
            this.setState({
                search,
                totalPage,
                activePage: page,
                data: rows
            })
        })
    }
    getTypeCar = () => {
        PostWithToken(`/typecar/getall`, { page: 1, search: '', isAll: true }, (err, data) => {
            if (err) return console.log(err);
            let { totalPage, rows } = data;
            this.setState({ typeCars: rows })
        })
    }
    _onChangePage = (page) => this.getData(page, this.state.search, this.state.typeCarId)
    _onChangeSearch = (search) => this.getData(this.state.activePage, search, this.state.typeCarId)
    _onCreate = () => {
        let data = {
            id: 0,
            startTime: '',
            endTime: '',
            price: 0,
            typeCarId: '',
        }
        this.refs.domModalCreate._onShow(data, false);
    }
    _onEdit = (data) => this.refs.domModalCreate._onShow(data, true);

    _onDelete = (keys) => {
        PostWithToken(`/${this.routerName}/delete`, { id: keys }, (err, data) => {
            if (err) return console.log(err);
            this.getData(this.state.activePage, this.state.search)
        })
    }
    _onSaveModal = (data, isEdit, cberr) => {
        let urlAction = !!isEdit ? 'update' : 'create'
        PostWithToken(`/${this.routerName}/${urlAction}`, { ...data }, (err, data) => {
            if (err) return cberr(err);
            this.getData(this.state.activePage, this.state.search)
        })
    }
    _onChangeStatus = (row, status) => () => this._onSaveModal({ id: row.id, status }, true)
    _onChangeTypeCarFillter = (k) => (e) => this.getData(this.state.activePage, this.state.search, e.target.value)
    render() {
        let { data, configTable, activePage, totalPage, typeCars } = this.state
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>{this.routerName}</Breadcrumb.Item>
                </Breadcrumb>
                <ModalCreateAndUpdate
                    ref='domModalCreate'
                    onSave={this._onSaveModal}

                    //data extent
                    typeCars={typeCars}
                />
                <PanelTable
                    isKey="id"
                    config={configTable}
                    data={data}
                    totalPage={totalPage}
                    activePage={activePage}
                    onChangeSearch={this._onChangeSearch}
                    onDelete={this._onDelete}
                    onCreate={this._onCreate}
                    onEdit={this._onEdit}
                    onChangePage={this._onChangePage}
                    headBtns={
                        <div style={{ width: '150px', float: 'right' }}>
                            <SelectInput
                                hideLable
                                id="typeCarId"
                                label="Loại xe"
                                data={{}}
                                onChange={this._onChangeTypeCarFillter}
                            >
                                {typeCars.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                            </SelectInput>
                        </div>
                    }
                />

            </div>
        );
    }
}

export default Home;
