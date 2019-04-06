import React, { Component } from 'react';
import {
    Breadcrumb,
} from 'react-bootstrap'
import PanelTable from '../../components/table'
import ModalCreateAndUpdate from './ModalCreateAndUpdate'
import { PostWithToken, GetWithToken } from '../../Request'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
class Home extends Component {
    constructor(props) {
        super(props);
        this.routerName = 'driver'
        this.state = {
            data: [],
            configTable: [
                {
                    key: 'id',
                    name: 'Mã',
                },
                {
                    key: 'fullname',
                    name: 'Họ và tên',
                },
                {
                    key: 'phone',
                    name: 'Số điện thoại',
                },
                // {
                //     key: 'email',
                //     name: 'Email',
                // },
                {
                    key: 'numberCar',
                    name: 'Số xe',
                },
                {
                    key: 'typeCarId',
                    name: 'Loại xe',
                    dataFormat: (cel, row) => <div>
                        {(_.findLast(this.state.typeCars, o => o.id === cel) || { name: 'Chưa gán loại xe' }).name}
                    </div>
                },
                {
                    key: 'status',
                    name: 'Trạng thái',
                    dataFormat: (cel, row) => !!cel ?
                        <Button bsStyle="success" onClick={this._onChangeStatus(row, 0)}>Đã duyệt</Button>
                        :
                        <Button bsStyle="warning" onClick={this._onChangeStatus(row, 1)}>Chưa duyệt</Button>
                },
            ],
            activePage: 1,
            totalPage: 1,
            search: '',
            typeCars: []
        }
    };
    componentDidMount() {
        let { activePage, search } = this.state
        this.getTypeCar()
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
    getTypeCar = () => {

        PostWithToken(`typecar/getall`, { page: 1, search: '', isAll: true }, (err, data) => {
            if (err) return console.log(err);
            let { totalPage, rows } = data;
            this.setState({ typeCars: rows })
        })
    }
    _onChangePage = (page) => this.getData(page, this.state.search)
    _onChangeSearch = (search) => this.getData(this.state.activePage, search)
    _onCreate = () => {
        let data = {
            id: 0,
            username: '',
            // email: '',
            phone: '',
            password: '',
            fullname: '',
            numberCar: '',
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
                />

            </div>
        );
    }
}

export default Home;
