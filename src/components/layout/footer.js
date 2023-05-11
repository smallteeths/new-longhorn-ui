import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Tooltip } from 'antd'
import semver from 'semver'
import store from '../../models/store';
import { config } from '../../utils'
import styles from './footer.module.scss'
import upgradeIcon from '../../assets/images/upgrade.svg'
import {
  FETCH_SETTING,
  SETTING_CONNECT_WS,
  DISCONNECT_SETTING_WEBSOCKET,
} from '../../models/actionTypes'
import BundlesModel from './bundlesModel'
import StableLonghornVersions from './stableLonghornVersions'
import wsClosed from '../../assets/images/ws-closed.svg'
import wsOpen from '../../assets/images/ws-open.svg'


function getWsStatus(...models) {
  let wsStatus = []
  if (models && models.length > 0) {
    wsStatus = models.map((item) => {
      return {
        name: item.name,
        wsStatus: item.wsStatus,
      }
    })
  }
  console.log(wsClosed)
  return (
    <div className="flex justify-end items-center">
      {wsStatus.map((item) => {
        return (<Tooltip key={item.name} placement="topRight" title={`${item.name}:${item.wsStatus? 'connected' : 'closed'}`}>
          <img src={item.wsStatus ? wsOpen : wsClosed} alt="WS"></img>
        </Tooltip>)
      })}
    </div>
  )
}

function Footer() {
  const action = (type, payload, callback) => store.dispatch({type, payload, callback})
  const eventLog = useSelector((state) => state.eventLog)
  const volume = useSelector((state) => state.volume)
  const node = useSelector((state) => state.node)
  const setting = useSelector((state) => state.setting)
  const [ state, setState ] = useState({
    bundlesVisible: false,
    stableLonghornVersionsVisible: false
  })
  useEffect(()=>{
    action(FETCH_SETTING)
    action(SETTING_CONNECT_WS)
    return () => {
      action(DISCONNECT_SETTING_WEBSOCKET)
    }
  }, [])
  const { data } = setting
  const currentVersion = config.version === '${VERSION}' ? 'dev' : config.version // eslint-disable-line no-template-curly-in-string
  const issueHref = 'https://github.com/longhorn/longhorn/issues/new/choose'
  let checkUpgrade = false
  let latestVersion = ''
  let stableLonghornVersions = ''
  let stableLonghornVersionsList = []
  data.forEach(option => {
    switch (option.id) {
    case 'upgrade-checker':
      checkUpgrade = option.value === 'true'
      break
    case 'latest-longhorn-version':
      latestVersion = option.value
      break
    case 'stable-longhorn-versions':
      stableLonghornVersions = option.value
      break
    default:
      break
    }
  })
  if (stableLonghornVersions) stableLonghornVersionsList = stableLonghornVersions.split(',')
  let gtCurrentLonghornVersionsList = stableLonghornVersionsList.filter((item) => {
    let stableVersion = semver.valid(item)
    if (!semver.valid(currentVersion)) return true
    return stableVersion && semver.valid(currentVersion) && semver.gt(stableVersion, semver.valid(currentVersion))
  })
  let gtStableLonghornVersions = gtCurrentLonghornVersionsList.join(', ')
  if (gtCurrentLonghornVersionsList && gtCurrentLonghornVersionsList.length > 3) {
    gtStableLonghornVersions = gtCurrentLonghornVersionsList.slice(0, 3).join(' ')
    gtStableLonghornVersions += ', ...'
  }
  let versionTag = semver.valid(currentVersion) && semver.valid(latestVersion) && semver.lt(currentVersion, latestVersion)
  let upgrade = ''
  if (checkUpgrade && currentVersion !== 'dev' && latestVersion !== '' && versionTag) {
    const upgradeTooltip = `Longhorn ${latestVersion} is now available!`
    upgrade = (
      <Tooltip placement="topLeft" title={upgradeTooltip}>
        <img src={upgradeIcon} alt="Upgrade"></img>
      </Tooltip>
    )
  }
  const showBundlesModel = () => {
    setState({
      ...state,
      bundlesVisible: true,
    })
  }
  const hideBundlesModel = () => {
    setState({
      ...state,
      bundlesVisible: false,
    })
  }

  const hideStableLonghornVersions = () => {
    setState({
      ...state,
      stableLonghornVersionsVisible: false,
    })
  }
  const showStableLonghornVersions = () => {
    setState({
      ...state,
      stableLonghornVersionsVisible: true,
    })
  }

  return (
    <div className={styles.footer}>
      <Row className="flex justify-between">
        <Col>
          {upgrade}
          <a>{currentVersion}</a>
          <a target="blank" href="https://longhorn.io/docs">Documentation</a>
          <a target="blank" onClick={showBundlesModel}>Generate Support Bundle</a>
          <a target="blank" href={issueHref}>File an Issue</a>
          <a target="blank" href="https://slack.cncf.io/">Slack</a>
          {gtCurrentLonghornVersionsList
          && gtCurrentLonghornVersionsList.length > 0
          && <a target="blank"
            onClick={showStableLonghornVersions}>
            {`Newer Stable Versions (${gtStableLonghornVersions})`}
          </a>}
        </Col>
        <Col className='flex-1'>
          {getWsStatus(eventLog, volume, node, setting)}
        </Col>
        <BundlesModel
          visible={state.bundlesVisible}
          action={action}
          onCancel={hideBundlesModel}
          okText={'OK'}
        />
        <StableLonghornVersions
          visible={state.stableLonghornVersionsVisible}
          versions={gtCurrentLonghornVersionsList || []}
          onOk={hideStableLonghornVersions}
        />
      </Row>
    </div>
  )
}

export default Footer
