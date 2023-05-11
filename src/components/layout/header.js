import React, { useEffect, useState } from 'react'
import { Row, Col, Popover } from 'antd'
import { useDispatch } from 'react-redux'
import {
  BarsOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { setIsPhoneSize } from '../../models/global/global'
import styles from './header.module.scss'
import Menus from './menu'
import longhornLogo from '../../assets/images/longhorn-logo.svg'

function Header() {
  const location = useLocation();
  const isNavbar = useWindowSize();
  const menusProps = {
    location,
    isNavbar,
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setIsPhoneSize(isNavbar))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavbar]);


  return (
    <div className={styles.header}>
      <Row>
        <Col className={styles.logoCol} lg={4} md={5} sm={8} xs={12}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={longhornLogo} alt="LONGHORN" />
          </div>
        </Col>
        <Col lg={0} md={0} sm={16} xs={12}>
          {isNavbar ? <div className={styles.popupMenu}>
            <Popover placement="bottomLeft" overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
              <div className={styles.button}>
                <BarsOutlined />
              </div>
            </Popover>
          </div> : ''}
        </Col>
        <Col className={styles.menuCol} lg={20} md={19} sm={0} xs={0}>
          <Menus {...menusProps} />
        </Col>
      </Row>
    </div>
  )
}

// Hook
function useWindowSize() {
  const [isNavbar, setisNavbarState] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (document.body.clientWidth < 768) {
        setisNavbarState(true)
      } else if (document.body.clientWidth >= 768) {
        setisNavbarState(false)
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isNavbar;
}

export default Header
