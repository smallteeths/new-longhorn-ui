import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Popover, Icon } from 'antd'
import { useLocation } from 'react-router-dom';
import styles from './header.module.scss'
import Menus from './menu'
import longhornLogo from '../../assets/images/longhorn-logo.svg'

function Header() {
  let location = useLocation();
  console.log(styles)
  const menusProps = {
    location,
  }
  return (
    <div className={styles.header}>
      <Row>
        <Col className={styles.logoCol} lg={4} md={5} sm={8} xs={12}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={longhornLogo} alt="LONGHORN" />
          </div>
        </Col>
        <Col className={styles.menuCol} lg={20} md={19} sm={0} xs={0}>
          <Menus {...menusProps} />
        </Col>
      </Row>
    </div>
  )
}

export default Header
