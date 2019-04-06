import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../components/sidebar'

import Home from './home'
import Driver from './driver'
import User from './user'
import Typecar from './typecar'
import PriceTimeSlot from './pricetimeslot'
import ServiceAttach from './serviceattach'
import Notify from './notify'
import PriceDistance from './pricedistance'

class HomeScreen extends Component {

  render() {
    let { path } = this.props.match
    return (<div >
      <Sidebar pathname={this.props.location.pathname} />

      {/* screen  */}
      <div style={{ marginLeft: '300px', padding: '10px', background: '#f5f6fa', minHeight: window.innerHeight, overflow: 'auto' }}>
        <Route exact path={path} component={Home} />
        <Route path={`${path}/driver`} component={Driver} />
        <Route path={`${path}/user`} component={User} />
        <Route path={`${path}/typecar`} component={Typecar} />
        <Route path={`${path}/pricetimeslot`} component={PriceTimeSlot} />
        <Route path={`${path}/serviceattach`} component={ServiceAttach} />
        <Route path={`${path}/notify`} component={Notify} />
        <Route path={`${path}/pricedistance/:id`} component={PriceDistance} />
      </div>

    </div>
    );
  }
}

export default HomeScreen;