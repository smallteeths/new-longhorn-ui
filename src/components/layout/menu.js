import React from 'react'
import {
  DownOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { menu } from '../../utils'
import LinkTo from '../linkTo/linkTo'

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, siderFold, isNavbar) {
  return menuArray.map(item => {
    const linkTo = { pathname: `/${item.key}`, state: item.key === 'backup' }
    let menus, label
    let children = (item.child || []).filter(child => child.show === true)
    if (children.length > 0) {
      label = (<span className="flex">
        <span className="mr-5 flex-items-center">{item.icon ? item.icon : ''}</span>
        <span>{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>
        {!isNavbar && <span className="ml-2"><DownOutlined /></span>}
      </span>)
      menus = {
        key: linkTo.pathname,
        label,
        children: getMenus(item.child, false, isNavbar),
      }
    } else {
      label = (<LinkTo to={linkTo} className="flex">
        <span className="mr-5 flex-items-center">{item.icon ? item.icon : ''}</span>
        <span>{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>
      </LinkTo>)
      menus = {
        key: linkTo.pathname,
        label,
      }
    }
    return menus
  })
}

function Menus({ location, isNavbar }) {
  const menuItems = getMenus(menu, false, isNavbar)
  const pathname = location.pathname
  const activeClass = (pathname && pathname !== '/') ? `/${pathname.split('/').filter(item => item && item !== '/')[0]}` : '/dashboard'
  return (
    <Menu
      mode={isNavbar ? 'inline' : 'horizontal'}
      selectedKeys={[activeClass]}
      items={menuItems}
    />
  )
}

Menus.propTypes = {
  isNavbar: PropTypes.bool,
  location: PropTypes.object,
}

export default Menus
