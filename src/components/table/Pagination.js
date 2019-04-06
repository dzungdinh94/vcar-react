import React, { Component } from 'react';
import { Button, Pagination } from 'react-bootstrap'

class Pagi extends Component {
  render() {
    let { totalPage, activePage, changePage } = this.props
    return (
      <div style={{ textAlign: "right" }}>
        <Pagination bsSize="small"   >
          <Pagination.First
            disabled={activePage === 1}
            onClick={() => {
              if (activePage === 1) return;
              changePage(1)
            }}
          />
          <Pagination.Prev
            disabled={activePage === 1}
            onClick={() => {
              if (activePage === 1) return;
              changePage(activePage - 1);
            }}
          />
          {
            [...Array(totalPage)].map((i, k) => {
              let number = k + 1;
              return <Pagination.Item
                key={number}
                active={number === activePage}
                onClick={() => changePage(number)}>{number}
              </Pagination.Item>
            })
          }
          <Pagination.Next
            disabled={activePage === totalPage}
            onClick={() => {
              if (activePage === totalPage) return;
              changePage(activePage + 1);
            }}
          />
          <Pagination.Last
            disabled={activePage === totalPage}
            onClick={() => {
              if (activePage === totalPage) return;
              changePage(totalPage);
            }}
          />
        </Pagination>
      </div>
    );
  }
}
export default Pagi;