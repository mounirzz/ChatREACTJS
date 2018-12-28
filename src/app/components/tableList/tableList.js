import React, { Component } from 'react'
import {Table, Pagination } from 'antd'

export default class tableList extends Component {
componentDidMount() {
  this.tabeWidthAdaptive()
}
componentWillUnmount(){
  clearInterval(this.t)
}
// Calculer dynamiquement la largeur de td
  tabeWidthAdaptive = () => {
    if (this.props.className && this.props.className.indexOf('nowrap') > -1 )  {
      this.t = setInterval(() => {// à travers la boucle du timer pour voir si le noeud réel est chargé dans le dom
          const tds = document.querySelector('.ant-table-row') && document.querySelector('.ant-table-row').querySelectorAll('td')
          const ths = document.querySelectorAll('.ant-table-header th')
          if (tds && tds.length) {
            clearInterval(this.t)
            for (let i = 0; i < tds.length; i+= 1) {
              const tdw = tds[i].offsetWidth
              const thw = ths[i].offsetWidth
              const w = (tdw > thw) ? tdw : thw
              tds[i].style.minWidth = `${w}px`
              ths[i].style.minWidth = `${w}px`
            }
          }
      }, 100)
    }
  }
  render(){
    const {
      currentPage,
      pageSize,
      totalCount,
      onShowSizeChange,
      onChange,
      columns,
    } = this.props
    const hasMultiHead = columns.filter(one => !!one.children).lenght > 0
    return (
      <div className={`table-content ${hasMultiHead ? 'clear-overlap-border' : ''}`}>
        <Table
          pagination={false}
          bordered
          rowKey="id"
          // rowClassName={this.props.rowClassName}
          {...this.props}
        />
        { currentPage ?
          <Pagination
            total={totalCount || 0}
            showSizeChanger // Est-il possible de changer pageSize?
            showQuickJumper={false}// Puis-je aller rapidement à une page?
            onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            showTotal={_totalCount => `Total ${_totalCount} d'article`}
            current={currentPage || 1}
            pageSize={pageSize || 10}
            {...this.props}
          /> : null
        }
      </div>
    )
  }
}
