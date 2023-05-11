import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  FilterOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { Table, Input, Button, Spin } from 'antd'
import TableGrid from '../../components/common/tableGrid'
import { sortTable, sortTableByISODate, setSortOrder } from '../../utils/sort'
import { getSorter } from '../../utils/localStore'
import './eventLogs.scss'

const parseData = (parameterData) => {
  if (!parameterData) {
    return []
  }
  let eventlogs = parameterData.map((item) => {
    let obj = {}
    obj.eventType = item.eventType
    return Object.assign(obj, item.event)
  })
  const getSourceText = (source) => {
    return source ? Object.values(source).join(', ') : ''
  }
  return eventlogs.map((item, index) => ({ ...item, sourceText: getSourceText(item.source), nameText: item.involvedObject ? item.involvedObject.name : '', index }))
}

const wrapValue = (value, searchText) => {
  if (value) {
    return value.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
      fragment.toLowerCase() === searchText.toLowerCase()
        ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
    ))
  }
  return value
}

const filterData = (parameterData, field, searchText) => {
  console.log(parameterData)
  if (searchText.trim() === '') {
    return parameterData
  }
  const d = parameterData.filter(item => item[field].toLowerCase().includes(searchText))
  switch (field) {
  case 'nameText':
    return d.map(item => ({ ...item, nameText: wrapValue(item.nameText, searchText) }))
  case 'sourceText':
    return d.map(item => ({ ...item, sourceText: wrapValue(item.sourceText, searchText) }))
  default:
    return d
  }
}
function EventLogs(props) {
  const { onSorterChange = f => f, loading} = props
  const [ state, setState ] = useState({
    filterDropdownVisible: false,
    filterNameDropdownVisible: false,
    filterSourceDropdownVisible: false,
    data: parseData(props.data),
    searchText: '',
    searchField: '',
    searchInput: {
      nameText: '',
      sourceText: '',
    },
  });
  const [ stateCurrentPage, setStateCurrentPage ] = useState(1)
  const searchNameInput = useRef(0);
  const searchSourceInput = useRef(1);
  // Compatible with mobile terminal
  const global = useSelector((state) => state.global)
  const { isPhoneSize } = global

  useEffect(() => {
    const newData = parseData(props.data)
    if (state.searchField && state.searchText) {
      setState({ ...state, data: filterData(newData, state.searchField, state.searchText) })
    } else {
      setState({ ...state, data: newData })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const onSearchNameChange = (e) => {
    setState({
      ...state, 
      searchInput: { 
        ...state.searchInput, 
        nameText: e.target.value
      }
    })
  }

  const onSearchSourceChange = (e) => {
    setState({
      ...state, 
      searchInput: { 
        ...state.searchInput, 
        sourceText: e.target.value
      }
    })
  }

  const onSearch = (searchField) => {
    const newData = parseData(props.data)
    const searchText = state.searchInput[searchField]
    const filteredData = filterData(newData, searchField, searchText)
    setState({
      ...state,
      filterDropdownVisible: false,
      filterNameDropdownVisible: false,
      filterSourceDropdownVisible: false,
      data: filteredData,
      searchField,
      searchText,
    })
  }

  const onReset = () => {
    setState({
      ...state,
      data: state.data,
      searchText: '',
      searchField: '',
      searchInput: {
        nameText: '',
        sourceText: '',
      },
    })
  }

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      return 'rowStriped'
    }
    return ''
  }
  
  const columns = [
    {
      title: 'Last Seen',
      dataIndex: 'lastTimestamp',
      key: 'lastTimestamp',
      className: 'date',
      sorter: {
        compare: (a, b) => sortTableByISODate(a, b, 'lastTimestamp')
      },
      render(text) {
        return (<div className="seenTime">{text}</div>)
      },
    }, {
      title: 'First Seen',
      dataIndex: 'firstTimestamp',
      key: 'firstTimestamp',
      className: 'date',
      sorter: (a, b) => sortTableByISODate(a, b, 'firstTimestamp'),
      render(text) {
        return (<div className="seenTime">{text}</div>)
      },
    }, {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      className: 'text',
      sorter: (a, b) => a.count - b.count,
      render(text) {
        return (<div className="count">{text}</div>)
      },
    }, {
      title: 'Name',
      dataIndex: 'nameText',
      key: 'nameText',
      className: 'name',
      filterIcon: <FilterOutlined style={{ color: state.searchField === 'nameText' && state.searchText ? '#108ee9' : '#aaa' }} />,
      filterDropdown: (
        <div className="filter-dropdown">
          <Input
            ref={searchNameInput}
            placeholder="Search name"
            value={state.searchInput.nameText}
            onChange={onSearchNameChange}
            onPressEnter={() => onSearch('nameText')}
          />
          <Button type="link" onClick={() => onSearch('nameText')}>OK</Button>
          <Button type="link" onClick={onReset}>Reset</Button>
        </div>
      ),
      filterDropdownVisible: state.filterNameDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        setState({
          ...state,
          filterNameDropdownVisible: visible,
        })
      },
      sorter: (a, b) => sortTable(a, b, 'nameText'),
      render: (text) => {
        const { filtered, searchField, searchText } = state
        return filtered && searchField === 'nameText' && searchText && text ? (
          <div className="name">
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </div>
        ) : <div className="name">{text}</div>
      },
    }, {
      title: 'Kind',
      dataIndex: 'involvedObject.kind',
      key: 'involvedObject.kind',
      className: 'text',
      sorter: (a, b) => sortTable(a, b, 'involvedObject.kind'),
      onFilter: (value, record) => ((record.involvedObject && record.involvedObject.kind) || '').indexOf(value) === 0,
      render(text) {
        return (<div className="kind">{text}</div>)
      },
    },
    {
      title: 'Type',
      dataIndex: 'eventType',
      key: 'eventType',
      className: 'text',
      width: 120,
      sorter: (a, b) => sortTable(a, b, 'eventType'),
      onFilter: (value, record) => (record.eventType || '').indexOf(value) === 0,
      render(text) {
        return (<div className="eventType">{text}</div>)
      },
    }, {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      className: 'reason',
      sorter: (a, b) => sortTable(a, b, 'reason'),
      render: (text) => {
        return <div className="reason">{text}</div>
      },
    }, {
      title: 'Source',
      dataIndex: 'sourceText',
      key: 'sourceText',
      className: 'text',
      sorter: (a, b) => sortTable(a, b, 'sourceText'),
      filterIcon: <FilterOutlined style={{ color: state.searchField === 'sourceText' && state.searchText ? '#108ee9' : '#aaa' }} />,
      filterDropdown: (
        <div className="filter-dropdown">
          <Input
            ref={searchSourceInput}
            placeholder="Search source"
            value={state.searchInput.sourceText}
            onChange={onSearchSourceChange}
            onPressEnter={() => onSearch('sourceText')}
          />
          <Button type="link" onClick={() => onSearch('sourceText')}>OK</Button>
          <Button type="link" onClick={onReset}>Reset</Button>
        </div>
      ),
      filterDropdownVisible: state.filterSourceDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        setState({
          ...state,
          filterSourceDropdownVisible: visible,
        })
      },
    }, {
      title: 'Message',
      dataIndex: 'message',
      className: 'text',
      width: 200,
      render: (text) => {
        return <div style={{ maxHeight: 80, overflow: 'auto' }}>{text}</div>
      },
    },
  ]
  const sorter = getSorter('eventlogList.sorter')
  setSortOrder(columns, sorter)

  const onChange = (p, f, s) => {
    setStateCurrentPage(p.current)
    onSorterChange(s)
    // Get local store sorter
    const sorter = getSorter('eventlogList.sorter')
    setSortOrder(columns, sorter)
  }

  return (
    <Spin spinning={loading}>
      <div className='px-20 mt-20 eventLogs'>
        <div className='font-extrabold text-18 text-current mt-10 mb-10'>Event Log</div>
        {!isPhoneSize && <div className="content">
          <Table columns={columns}
            onChange={onChange}
            rowKey={(record) => record.index}
            rowClassName={rowClassName}
            pagination={{
              current: stateCurrentPage
            }}
            dataSource={state.data} />
        </div>}
        {isPhoneSize && <div>
          <TableGrid
            columns={columns}
            dataSource={state.data}
            mainKey={'type'}
            rowKey={(record) => record.index}
            currentPage={stateCurrentPage}
            setPropsCurrentPage={setStateCurrentPage}
          />
        </div>}
      </div>
    </Spin>
  )
}

EventLogs.propTypes = {
  data: PropTypes.array,
  sorter: PropTypes.func,
  onSorterChange: PropTypes.func,
  loading: PropTypes.bool
}

export default EventLogs
