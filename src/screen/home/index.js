import React, { Component } from 'react';
import {
    Breadcrumb,
} from 'react-bootstrap'
import PanelTable from '../../components/table'
import ModalCreateAndUpdate from './ModalCreateAndUpdate'
import { PostWithToken, GetWithToken } from '../../Request'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment';
import OrderDriver from './listorder'
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
                {
                    key: 'numberCar',
                    name: 'Số xe',
                },
                {
                    key: 'createdAt',
                    name: 'Ngày yêu cầu',
                    dataFormat: (cel, row) => moment(cel).format('HH:mm DD/MM/YYYY')
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
        this.getData(activePage, search);

        // let socket = io.connect('http://localhost:3000/mobile', {
        //     query: "fcmId=aaaaaa" + "&token=" + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmY21JZCI6IjEyMzEiLCJpZCI6MSwidHlwZSI6MCwidXNlclR5cGUiOjIsInN0YXR1cyI6MSwiaWF0IjoxNTM1Mjc5MTUwfQ.aALHuMlSHfP-E61-1yV0vzLNUkehBq_lahqy255WQiY',
        //     reconnection: true,
        //     reconnectionAttempts: 100,
        //     reconnectionDelay: 10000
        // });

        // socket.on('disconnect', () => {
        //     console.log('user disconnected');
        // });
        // socket.on('connect', () => {
        //     console.log('user connection')
        // });
        // socket.on('test', (data) => {
        //     alert(JSON.stringify(data))
        // });
        // socket.on('test', (data) => {
        //     alert(data)
        // });
    }

    getData = (page, search) => {
        GetWithToken(`/${this.routerName}/requestpass`, (err, data) => {
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
    // _onChangeSearch = (search) => this.getData(this.state.activePage, search)
    _onEdit = (data) => this.refs.domModalCreate._onShow(data, true);

    _onSaveModal = (data, isEdit, cberr) => {
        let urlAction = !!isEdit ? 'update' : 'create'
        PostWithToken(`/${this.routerName}/${urlAction}`, { id: data.driverId, password: data.password }, (err, res) => {
            if (err) return cberr(err);
            PostWithToken(`/${this.routerName}/delrequestpass`, { id: data.id }, (err, data) => {
                this.getData(this.state.activePage, this.state.search)
            })
        })
    }
    _onChangeStatus = (row, status) => () => this._onSaveModal({ id: row.id, status }, true)
    render() {
        let { data, configTable, activePage, totalPage, typeCars } = this.state
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    {/* <Breadcrumb.Item active>Trang chủ</Breadcrumb.Item> */}
                </Breadcrumb>
                <OrderDriver />
                {(!!data.length) &&
                    <div>
                        <ModalCreateAndUpdate
                            ref='domModalCreate'
                            onSave={this._onSaveModal}
                        />
                        <h3>Yêu cầu thay đổi mật khẩu của lái xe</h3>
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
                    </div>}

            </div>
        );
    }
}

export default Home;
