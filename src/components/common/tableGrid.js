import React from 'react'
import { Card, Descriptions } from 'antd'
import PropTypes from 'prop-types'


const getCard = function (columns, dataSource) {
  if (dataSource?.length > 0 && columns?.length > 0) {
    return dataSource.map((row) => {
      return (<Card size="small" className='mb-10'>
        
        <Descriptions layout="vertical" bordered>
          {getRow(columns, row)}
        </Descriptions>
      </Card>)
    })
  }
  return ''
}

const getRow = function(columns, row) {
  return columns.map((column) => {
    console.log("===================")
    console.log(row[column.dataIndex])
    console.log(column.render)
    return (
      <Descriptions.Item key={column.dataIndex} label={column.title}>
        {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
      </Descriptions.Item>
    )
  })
}

function TableGrid({ columns, dataSource }) {
  return getCard(columns, dataSource)
}

TableGrid.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
}

export default TableGrid