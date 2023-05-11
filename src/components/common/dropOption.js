import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button, Menu, Tooltip } from 'antd'
import {
  DownOutlined,
  BarsOutlined,
} from '@ant-design/icons'

const DropOption = ({
  onMenuClick,
  menuOptions = [],
  buttonStyle,
  dropdownProps,
  tooltipProps
}) => {
  const menu = menuOptions.map(item => {
    const tooltip = item.tooltip !== undefined ? item.tooltip : ''
    return (
      <Menu.Item key={item.key} disabled={!!item.disabled}>
        <Tooltip title={tooltip} {...tooltipProps}><div>{ item.name }</div></Tooltip>
      </Menu.Item>
    )
  })
  return (<Dropdown
    menu={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <Button style={{ border: 'none', ...buttonStyle }}>
      <BarsOutlined className='mr-2'/>
      <DownOutlined />
    </Button>
  </Dropdown>)
}

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
  tooltipProps: PropTypes.object,
}

export default DropOption
