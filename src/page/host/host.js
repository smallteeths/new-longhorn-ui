import React, { useEffect, useState }  from 'react';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import store from '../../models/store';
import {
  FETCH_VOLUME, 
  FETCH_NODE,
  NODE_CONNECT_WS,
  DISCONNECT_NODE_WEBSOCKET,
  VOLUME_CONNECT_WS,
  DISCONNECT_VOLUME_WEBSOCKET
} from '../../models/actionTypes'
import { getSorter } from '../../utils/localStore'
import HostList from './hostList'
import HostFilter from './components/hostFilter'
import { formatNodeData } from './help/index'

export function Host() {
  const action = type => store.dispatch({type})
  const location = useLocation()
  const volume = useSelector((state) => state.volume)
  const node = useSelector((state) => state.node)
  const setting = useSelector((state) => state.setting)
  const {data: volumeData, loading: volumeLoading } = volume
  const {data: nodeData, loading: nodeLoading } = node
  const {data: settingData } = setting
  const storageOverProvisioningPercentage = setting.data.find(item => item.id === 'storage-over-provisioning-percentage') || { value: '0' }
  const minimalSchedulingQuotaWarning = setting.data.find(item => item.id === 'minimal-scheduling-quota-warning') || { value: '90' }
  const defaultInstanceManager = settingData.find(item => item.id === 'default-instance-manager-image')
  const defaultEngineImage = setting.data.find(item => item.id === 'default-engine-image')
  
  useEffect(()=>{
    // FETCH_VOLUME
    action(FETCH_VOLUME)
    // FETCH_NODE
    action(FETCH_NODE)
    action(NODE_CONNECT_WS)
    action(VOLUME_CONNECT_WS)


    return () => {
      action(DISCONNECT_NODE_WEBSOCKET)
      action(DISCONNECT_VOLUME_WEBSOCKET)
    }
  }, [])

  const [ state ] = useState({
    instanceManagerVisible: false,
    stableLonghornVersionsVisible: false,
    currentNode: {},
    selectedHostRows: []
  })

  const hostListProps = {
    dataSource: formatNodeData(nodeData, volumeData),
    dispatch: action,
    instanceManagerVisible: state.instanceManagerVisible,
    defaultInstanceManager,
    defaultEngineImage,
    currentNode: state.currentNode,
    storageOverProvisioningPercentage: Number(storageOverProvisioningPercentage.value) || 0,
    minimalSchedulingQuotaWarning: Number(minimalSchedulingQuotaWarning.value) || 90,
    loading: nodeLoading && volumeLoading,
    sorter: getSorter('nodeList.sorter'),
    onSorterChange() {
      
    },
    onAllExpandedOrCollapsed() {
      
    },
    showAddDiskModal() {
      
    },
    showReplicaModal() {
      
    },
    showDiskReplicaModal() {
      
    },
    deleteHost() {
      
    },
    updateDisk() {
      
    },
    showEditDisksModal() {
      
    },
  }

  const HostFilterProps = {
    location,
    selectedHostRows: state.selectedHostRows,
    dispatch: action,
    stateOption: [
      { value: 'schedulable', name: 'Schedulable' },
      { value: 'unschedulable', name: 'Unschedulable' },
      { value: 'schedulingDisabled', name: 'Disabled' },
      { value: 'down', name: 'Down' },
    ],
    fieldOption: [
      { value: 'name', name: 'Name' },
      { value: 'status', name: 'Status' },
      { value: 'NodeTag', name: 'Node Tag' },
      { value: 'DiskTag', name: 'Disk Tag' },
    ],
    expandAll() {

    },
    collapseAll() {

    },
    onSearch() {
      
    },
  }

  return (
    <div className='w-full h-full p-12'>
      <HostFilter {...HostFilterProps}/>
      <HostList {...hostListProps}/>
    </div>
  )
}
