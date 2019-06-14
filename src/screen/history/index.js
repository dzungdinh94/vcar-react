import React, { Component } from 'react';
import {
    Breadcrumb,
} from 'react-bootstrap'
import PanelTable from '../../components/table'
// import ModalCreateAndUpdate from './ModalCreateAndUpdate'
import { PostWithToken, GetWithToken } from '../../Request'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment'
class History extends Component {
    constructor(props) {
        super(props);
        this.routerName = 'order'
        this.state = {
            data: [],
            configTable: [
                {
                    key: 'id',
                    name: 'Mã',
                },
                {
                    key: 'fromLocation',
                    name: 'Điểm đến',
                },
                {
                    key: 'toLocation',
                    name: 'Điểm kết thúc',
                },
                {
                    key: 'price',
                    name: 'Giá',
                },
                {
                    key: 'createdAt',
                    name: 'Ngày tạo',
                    dataFormat: (cel, row) => moment(cel).format('HH:mm DD/MM/YYYY')
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
                    dataFormat: (cel, row) => {
                        switch (cel) {
                            case 1: return 'Mới tạo';
                            case 2: return 'Đã nhận chuyến';
                            case 3: return 'Hoàn Thành';
                            case 4: return 'Hủy đơn';
                            case 5: return 'Lên xe';
                        }
                    }
                    // dataFormat: (cel, row) => !!cel ?
                    //     <Button bsStyle="success">Đã duyệt</Button>
                    //     :
                    //     <Button bsStyle="warning">Chưa duyệt</Button>
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
            console.log(data,"data 2")
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
            console.log(rows,"rows")
            this.setState({ typeCars: rows })
        })
    }
    _onChangePage = (page) => this.getData(page, this.state.search)
    _onChangeSearch = (search) => this.getData(this.state.activePage, search)
    render() {
        let { data, configTable, activePage, totalPage, typeCars } = this.state
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>{this.routerName}</Breadcrumb.Item>
                </Breadcrumb>
                {/* <ModalCreateAndUpdate
                    ref='domModalCreate'
                    onSave={this._onSaveModal}
                    typeCars={typeCars}
                /> */}
                <PanelTable
                    isKey="id"
                    config={configTable}
                    data={data}
                    totalPage={totalPage}
                    activePage={activePage}
                    onChangeSearch={this._onChangeSearch}
                    // onDelete={this._onDelete}
                    // onCreate={this._onCreate}
                    // onEdit={this._onEdit}
                    onChangePage={this._onChangePage}
                />

            </div>
        );
    }
}

export default History;
