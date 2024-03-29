import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import ModalBlur from '../common/modalBlur'
import styles from './stableLonghornVersions.module.scss'

function StableLonghornVersions(props) {
  const title = (<div>
    <div>Newer Stable Versions</div>
    <small className={styles.describeText}>We only show the latest stable version of Longhorn minor releases. For the full list, please check out the <a target="blank" href="https://github.com/longhorn/longhorn/releases">release page</a></small>
  </div>)

  const modalOpts = {
    title,
    open: props.visible,
    onOk: props.onOk,
    onCancel: props.onOk,
    hasOnCancel: true,
  }

  return (
    <ModalBlur {...modalOpts}>
      <div className={styles.container}>
        <List
          bordered
          dataSource={props.versions}
          renderItem={item => (<List.Item>{item}</List.Item>)} />
      </div>
    </ModalBlur>
  )
}

StableLonghornVersions.propTypes = {
  visible: PropTypes.bool,
  versions: PropTypes.array,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default StableLonghornVersions
