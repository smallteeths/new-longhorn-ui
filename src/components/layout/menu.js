import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { menu } from '../../utils'
import LinkTo from '../LinkTo/linkTo'

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, siderFold) {
  console.log(menuArray)
  return menuArray.map(item => {
    const linkTo = { pathname: `/${item.key}`, state: item.key === 'backup' }
    let menus, label
    let children = (item.child || []).filter(child => child.show === true)
    if (children.length > 0) {
      label = (<span>
        {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
      </span>)
      menus = {
        key: linkTo.pathname,
        label,
        children: getMenus(item.child, false),
        icon: item.icon ? item.icon : ''
      }
    } else {
      label = (<LinkTo to={linkTo}>
        {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
      </LinkTo>)
      menus = {
        key: linkTo.pathname,
        label,
        icon: item.icon ? item.icon : ''
      }
    }
    return menus
  })
}

function Menus({ location }) {
  const menuItems = getMenus(menu, false)
  const pathname = location.pathname
  const activeClass = (pathname && pathname !== '/') ? `/${pathname.split('/').filter(item => item && item !== '/')[0]}` : '/dashboard'
  return (
    <Menu
      mode='horizontal'
      selectedKeys={[activeClass]}
      items={menuItems}
    />
  )
}

Menus.propTypes = {
  location: PropTypes.object,
}

export default Menus
