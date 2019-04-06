import React, { Component } from 'react';
import {
    Breadcrumb,
} from 'react-bootstrap'
import PanelTable from '../../components/table'
import ModalCreateAndUpdate from './ModalCreateAndUpdate'
import { PostWithToken, GetWithToken } from '../../Request'
import { Button } from 'react-bootstrap'
import { Config } from '../../Config'
import _ from 'lodash'
class Home extends Component {
    constructor(props) {
        super(props);
        this.routerName = 'typecar'
        this.state = {
            data: [],
            configTable: [
                {
                    key: 'id',
                    name: 'Mã',
                },
                {
                    key: 'name',
                    name: 'Tên',
                },
                {
                    key: 'description',
                    name: 'Mô tả',
                },
                {
                    key: 'weight',
                    name: 'Trọng lượng',
                },
                {
                    key: 'icon',
                    name: 'icon',
                    dataFormat: (cel, row) => <img style={{ width: '70px', maxHeight: '70px', objectFit: 'contain' }} src={Config.imageUrl + cel} alt="no icon" />
                },
                {
                    key: 'img1x',
                    name: 'iconmap',
                    dataFormat: (cel, row) => <img style={{ width: '70px', maxHeight: '70px', objectFit: 'contain' }} src={Config.imageUrl + cel} alt="no icon" />
                },
            ],
            activePage: 1,
            totalPage: 1,
            search: '',
        }
    };
    componentDidMount() {
        let { activePage, search } = this.state
        this.getData(activePage, search);
    }

    getData = (page, search) => {
        PostWithToken(`/${this.routerName}/getall`, { page, search }, (err, data) => {
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
    _onChangePage = (page) => this.getData(page, this.state.search)
    _onChangeSearch = (search) => this.getData(this.state.activePage, search)
    _onCreate = () => {
        let data = {
            id: 0,
            name: '',
            description: '',
            weight: '',
            icon:'',
            img1x: '',
            img2x: '',
            img3x: ''
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
                />

            </div>
        );
    }
}

export default Home;
