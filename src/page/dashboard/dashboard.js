import React, { useEffect }  from 'react';
import { useSelector } from 'react-redux'
import store from '../../models/store';
import ResourceOverview from './resourceOverview'
import EventLogs from './eventLogs'
import { saveSorter } from '../../utils/localStore'

export function Dashboard() {
  const action = type => store.dispatch({type})
  const eventLog= useSelector((state) => state.eventLog)
  const volume = useSelector((state) => state.volume)
  const node = useSelector((state) => state.node)
  const {data: volumeData, loading: volumeLoading } = volume
  const {data: nodeData, loading: nodeLoading } = node
  const {data: eventLogData, loading: eventLogLoading } = eventLog
  
  useEffect(()=>{
    // FETCH_EVENTLOG
    action('FETCH_EVENTLOG')
    // FETCH_VOLUME
    action('FETCH_VOLUME')
    // FETCH_NODE
    action('FETCH_NODE')
  }, [])

  const resourceOverviewProps = {
    host: nodeData,
    volume: volumeData,
    volumeLoading,
    nodeLoading,
    onVolumeClick(v) {
      console.log(v)
    },
    onNodeClick(n) {
      console.log(n)
    },
  }

  const eventLogsProps = {
    data: eventLogData,
    loading: eventLogLoading,
    onSorterChange(s) {
      // Save to local store
      saveSorter('eventlogList.sorter', s)
    },
  }

  return (
    <div>
      <ResourceOverview {...resourceOverviewProps} />
      <EventLogs {...eventLogsProps} />
    </div>
  )
}