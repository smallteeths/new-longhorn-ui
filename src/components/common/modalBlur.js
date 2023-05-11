import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'

class ModalBlur extends React.Component {
  componentDidMount() {
    if (this.props.visible) {
      document.addEventListener('keydown', this.onkeydown, false)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onkeydown, false)
  }

  onCancel = () => {
    console.log(this)
    this.props.onCancel && this.props.onCancel()
  }

  onOk = () => {
    this.props.onOk && this.props.onOk()
  }

  onkeydown = (e) => {
    if (e.keyCode === 13) {
      this.onOk()
    }
  }

  render() {
    let cancelButton = this.props.hasOnCancel ? '' : <Button key="cancel" onClick={this.onCancel}>Cancel</Button>
    return (
      <Modal
        footer={[
          cancelButton,
          <Button
            loading={this.props.disabled}
            disabled={this.props.disabled}
            width={this.props.width} 
            key="ok" 
            type="success"
            onClick={this.onOk}
          >
            {this.props.okText ? this.props.okText : 'OK'}
          </Button>,
        ]}
        {...this.props}
      >
      </Modal>
    )
  }
}

ModalBlur.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  hasOnCancel: PropTypes.bool,
  width: PropTypes.number,
  disabled: PropTypes.bool,
}

export default ModalBlur
