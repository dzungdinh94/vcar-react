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
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, } from 'react-dates';
class Home extends Component {
    constructor(props) {
        super(props);
        this.routerName = 'driver'
        this.state = {
            data: [],
            configTable: [
                {
                    key: 'driverId',
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
                    key: 'driverId',
                    name: 'Hoàn thành/hủy',
                    dataFormat: (cel, row) => <span>{row.orderdone.length}/{row.ordercancel.length}(chuyến)</span>
                },
            ],
            activePage: 1,
            totalPage: 1,
            search: '',
            typeCars: [],
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month'),
            // focusedInput: true
        }
    };
    componentDidMount() {
        let { activePage, search } = this.state
        this.getData(activePage, search);
    }

    getData = (page, search, ) => {
        let { startDate, endDate } = this.state
        PostWithToken(`/${this.routerName}/orderlist`, {
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD')
        }, (err, data) => {
            if (err) return console.log(err);
            let objDriver = {};
            [...data].map(v => {
                if (!objDriver[v.driverId]) {
                    objDriver[v.driverId] = {
                        driverId: v.driverId,
                        fullname: v.fullname,
                        numberCar: v.numberCar,
                        phone: v.phone,
                        typeCarId: v.typeCarId,
                        orderdone: [],
                        ordercancel: []
                    }
                }

                if (v.sttOdod == 1) {
                    objDriver[v.driverId].orderdone.push(v)
                }
                if (v.sttOdod == 3) {
                    objDriver[v.driverId].ordercancel.push(v)
                }
            })
            console.log(objDriver)

            this.setState({
                totalPage: 1,
                data: Object.values(objDriver)
            })
        })
    }
    _onChangePage = (page) => this.getData(page, this.state.search)
    // _onChangeSearch = (search) => this.getData(this.state.activePage, search)
    // _onEdit = (data) => this.refs.domModalCreate._onShow(data, true);

    _onSaveModal = (data, isEdit, cberr) => {
        let urlAction = !!isEdit ? 'update' : 'create'
        PostWithToken(`/${this.routerName}/${urlAction}`, { id: data.driverId, password: data.password }, (err, res) => {
            if (err) return cberr(err);
            PostWithToken(`/${this.routerName}/delrequestpass`, { id: data.id }, (err, data) => {
                this.getData(this.state.activePage, this.state.search)
            })
        })
    }
    _onChangeDate = async ({ startDate, endDate }) => {
        await this.setState({ startDate, endDate })
        if (!!startDate && !!endDate) this.getData()
    }

    render() {
        let { data, configTable, activePage, totalPage } = this.state
        return (
            <div>
                <h3>Danh sách đơn theo lái xe</h3>

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
                        <DateRangePicker
                            startDate={this.state.startDate}
                            startDateId="your_unique_start_date_id"
                            endDate={this.state.endDate}
                            endDateId="your_unique_end_date_id"
                            onDatesChange={this._onChangeDate}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({ focusedInput })}
                            isOutsideRange={(day) => day.isAfter(moment().endOf('month')) || day.isBefore(moment().subtract(100, 'years'))}
                        />
                    }
                />
            </div>
        );
    }
}

export default Home;
