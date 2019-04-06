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
        this.routerName = 'pricedistance'
        this.state = {
            data: [],
            configTable: [
                {
                    key: 'id',
                    name: 'Mã',
                },
                {
                    key: 'startTime',
                    name: 'Khoảng cách',
                    dataFormat: (cel, row) => <div>{row.startDistance} -> {row.endDistance} km</div>
                },
                {
                    key: 'price',
                    name: 'Giá mỗi km(đ)',
                },
                {
                    key: 'id',
                    name: 'Loại xe',
                    dataFormat: (cel, row) => {
                        let { data } = this.state
                        let lengthData = data.length
                        let bol = cel !== data[lengthData - 1].id
                        return <Button bsStyle="danger" disabled={bol} onClick={()=>this._onDelete([cel])}>Xóa</Button>

                    }
                }
            ],
            activePage: 1,
            totalPage: 1,
            search: '',
            priceTimeSlotId: props.match.params.id
        }
    };
    componentDidMount() {
        let { activePage, search } = this.state
        this.getData(activePage, search);
    }

    getData = (page, search, ) => {
        let { priceTimeSlotId } = this.state
        PostWithToken(`/${this.routerName}/getall`, { page, search, priceTimeSlotId }, (err, data) => {
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
        let startDistance = 0
        let endDistance = 0
        let { data } = this.state
        let lengthData = data.length
        if (lengthData > 0) {
            startDistance = data[lengthData - 1].endDistance;
            endDistance = data[lengthData - 1].endDistance;
        }
        let dataCreate = {
            id: 0,
            startDistance,
            endDistance,
            price: 0,
            priceTimeSlotId: this.state.priceTimeSlotId,
        }
        this.refs.domModalCreate._onShow(dataCreate, false);
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

    render() {
        let { data, configTable, activePage, totalPage } = this.state
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
                    // listPrice={data}
                />
                <PanelTable
                    isKey="id"
                    config={configTable}
                    data={data}
                    totalPage={totalPage}
                    activePage={activePage}
                    // onChangeSearch={this._onChangeSearch}
                    // onDelete={this._onDelete}
                    onCreate={this._onCreate}
                    // onEdit={this._onEdit}
                    onChangePage={this._onChangePage}
                />

            </div>
        );
    }
}

export default Home;
