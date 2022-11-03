import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Checkbox, Dropdown, Button, Pagination, Empty } from 'antd'
import PropTypes from 'prop-types'
import {
  UnorderedListOutlined,
} from '@ant-design/icons';

const TableGrid = function ({columns, dataSource, mainKey, rowKey, currentPage = 1, pageSize = 10, setPropsCurrentPage}) {
  const [ stateExpandAll, setStateExpandAll ] = useState(true)
  const [ stateDataSource, setStateDataSource ] = useState([])
  const [ stateCurrentPage, setstateCurrentPage ] = useState(currentPage)
  useEffect(()=>{
    const tableData = parseData(dataSource, pageSize, currentPage)
    setStateDataSource(tableData.data)
    console.log(tableData.currentPage)
    setstateCurrentPage(tableData.currentPage)
    setPropsCurrentPage(tableData.currentPage)
  }, [pageSize, currentPage, dataSource, setPropsCurrentPage])
  const onPageChange = (current) => {
    const tableData = parseData(dataSource, pageSize, current)
    setStateDataSource(tableData.data)
    setstateCurrentPage(current)
    setPropsCurrentPage(tableData.currentPage)
  };
  if (stateDataSource?.length > 0 && columns?.length > 0) {
    return (<div>
      <div className="mb-10 flex justify-end">
        <Button onClick={() => {setStateExpandAll(!stateExpandAll)}} size={'small'}>{stateExpandAll ? 'Collapse All' : 'Expand All'}</Button>
      </div>
      { stateDataSource.map((row) => {
        const cardProps = {
          mainKey,
          row,
          columns,
          stateExpandAll,
        }
        return <GetCard key={rowKey(row)} {...cardProps}/>
      }) }
      <div className="mb-10 flex justify-end">
        <Pagination
          showSizeChanger
          onChange={onPageChange}
          defaultCurrent={stateCurrentPage ? stateCurrentPage : 1}
          current={stateCurrentPage ? stateCurrentPage : 1}
          total={dataSource.length}
        />
      </div>
    </div>)
  }
  return <Empty />
}

const GetCard = function ({mainKey, row, columns, stateExpandAll}) {
  const [ stateExpand, setStateExpand ] = useState(stateExpandAll)
  useEffect(()=>{
    setStateExpand(stateExpandAll)
  }, [stateExpandAll])
  const actionItems = [
    {
      key: '1',
      label: (
        <div onClick={() => {setStateExpand(!stateExpand)}}>
          { stateExpand ? 'Collapse' : 'Expand'}
        </div>
      ),
    },
  ];

  return (<Card size="small" className='mb-10'>
    <div>
      {GetTitle(mainKey, row, actionItems)}
    </div>
    { stateExpand && <Descriptions className='mt-10' layout="vertical" bordered>
      {getRow(columns, row)}
    </Descriptions> }
  </Card>)
}


const getRow = function(columns, row) {
  return columns.map((column) => {
    return (
      <Descriptions.Item key={column.dataIndex} label={column.title}>
        {column.render ? column.render(row[column.dataIndex], row) : row[column.dataIndex]}
      </Descriptions.Item>
    )
  })
}

const GetTitle = function (mainKey, row, actionItems) {
  let titleText = ''
  if (mainKey) {
    titleText = row[mainKey]
  }

  let title = (<div className='flex justify-between items-center'>
    <Checkbox onChange={() => {
      console.log(row)
    }}>{titleText ? titleText : ''}</Checkbox>
    <Dropdown menu={{ items: actionItems }} arrow>
      <UnorderedListOutlined />
    </Dropdown>
  </div>)
  return title
}

const parseData = function(dataSource, pageSize, currentPage) {
  const tableData = {
    data: [],
    currentPage,
  };
  if (dataSource) {
    const length = dataSource.length
    if (pageSize >= length) {
      tableData.data = dataSource
      tableData.currentPage = 1
    } else {
      const num = pageSize * (currentPage - 1)
      if (num < length) {
        const startIndex = num
        const endIndex = num + pageSize - 1
        tableData.data = dataSource.filter((_, index) => index >= startIndex && index <= endIndex)
      } else {
        const size = parseInt(length / pageSize)
        const rest = length % pageSize
        if (rest > 0) {
          tableData.currentPage = size + 1
          tableData.data = dataSource.filter((_, index) => index >= (pageSize * size) && index <= length);
        } else if (rest === 0) {
          tableData.currentPage = size
          tableData.data = dataSource.filter((_, index) => index >= (pageSize * (size - 1)) && index <= length);
        }
      }
    }
  }
  return tableData;
}

TableGrid.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  mainKey: PropTypes.string,
  rowKey: PropTypes.func,
  currentPage: PropTypes.number
}

GetCard.propTypes = {
  columns: PropTypes.array,
  row: PropTypes.object,
  mainKey: PropTypes.string,
  rowKey: PropTypes.func,
  stateExpandAll: PropTypes.bool,
  setPropsCurrentPage: PropTypes.func,
}

export default TableGrid
