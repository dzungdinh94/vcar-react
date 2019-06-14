import React, { Component } from 'react';
import './index.css'
import {
    // ListGroup, ListGroupItem,
    Glyphicon,
    Button
} from 'react-bootstrap'
import { Config } from '../../Config'
import { Link } from 'react-router-dom';


class Sidebar extends Component {
    _onLogout = () => {
        localStorage.clear()
        Config.history.push('/login')
    }
    render() {
        // let  !!data.token && localStorage.setItem('token', data.token);
        let avatar = localStorage.getItem('avatar');
        let fullname = localStorage.getItem('fullname');
        let { pathname } = this.props
        return (
            <div className='sidenav'>
                <div className='header-sidenav'>
                    <Button onClick={this._onLogout} bsSize="large">
                        <Glyphicon glyph="log-out" />
                    </Button>
                    <h4>{fullname}</h4>
                </div>
                <div className="vertical-menu">
                    <Link className={`link ${pathname === '/home' && 'active'}`} to="/home" >Dashboard</Link>
                    <Link className={`link ${pathname === '/home/user' && 'active'}`} to="/home/user" >Danh sách người dùng</Link>
                    <Link className={`link ${pathname === '/home/driver' && 'active'}`} to="/home/driver" >Danh sách lái xe</Link>
                    <Link className={`link ${pathname === '/home/typecar' && 'active'}`} to="/home/typecar" >Danh sách loại xe</Link>
                    <Link className={`link ${pathname === '/home/pricetimeslot' && 'active'}`} to="/home/pricetimeslot" >Giá xe theo khung giờ</Link>
                    <Link className={`link ${pathname === '/home/serviceattach' && 'active'}`} to="/home/serviceattach" >Dịch vụ đính kèm xe</Link>
                    <Link className={`link ${pathname === '/home/history' && 'active'}`} to="/home/history" >Lịch sử đơn hàng</Link>
                    <Link className={`link ${pathname === '/home/notify' && 'active'}`} to="/home/notify" >Gửi thông báo</Link>
                </div>
            </div>
        );
    }
}

export default Sidebar;
