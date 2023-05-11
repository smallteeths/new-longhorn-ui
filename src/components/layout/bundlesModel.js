import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Progress } from 'antd'
import ModalBlur from '../common/modalBlur'
import {
  GENERATE_SUPPORT_BUNDLES,
} from '../../models/actionTypes'
import styles from './bundlesModel.module.scss'

const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}
function BundlesModel(props) {
  const [form] = Form.useForm();
  const [ state, setState ] = useState({
    progressPercentage: null,
    disabled: false,
    okText: 'OK'
  })
  // Reset Fields
  useEffect(() => {
    if (props.visible) {
      form.resetFields()
    }
  }, [props.visible]);
  function handleOk() {
    setState({
      ...state,
      disabled: true,
      okText: 'Generating...'
    })
    form.validateFields().then((data) => {
      props.action(GENERATE_SUPPORT_BUNDLES, data, (record) => {
        setState({
          ...state,
          progressPercentage: record,
          disabled: false,
          okText: 'OK'
        })
      })
    })
  }
  const modalOpts = {
    title: 'Generate Support Bundle',
    open: props.visible,
    onCancel: props.onCancel,
    onOk: handleOk,
    disabled: state.disabled,
    okText: state.okText,
    width: 680,
  }
  return (
    <ModalBlur {...modalOpts}>
      <div style={{ position: 'relative' }}>
        <Form form={form}>
          <FormItem 
            label="Issue URL"
            hasFeedback 
            {...formItemLayout}
            name="issueURL"
          >
            <Input />
          </FormItem>
          <FormItem
            label="Description"
            hasFeedback
            {...formItemLayout}
            name="description"
            rules={[{
              required: true,
              whitespace: true,
              message: "Please fill in support bundle's issue description", // eslint-disable-line quotes
            },]}
          >
            <TextArea autoSize={{ minRows: 6, maxRows: 10 }} />
          </FormItem>
        </Form>
        {state.progressPercentage > 0 && <div className={styles.progress}>
          <Progress type="circle" strokeWidth={5} percent={state.progressPercentage} />
        </div>}
      </div>
    </ModalBlur>
  )
}

BundlesModel.propTypes = {
  onCancel: PropTypes.func,
  action: PropTypes.func,
  visible: PropTypes.bool,
  okText: PropTypes.string
}

export default BundlesModel
