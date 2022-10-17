import React, { useEffect }  from 'react';
import { useSelector } from 'react-redux'
import store from '../../models/store';

export function Dashboard() {
  const action = type => store.dispatch({type})
  const eventLogData = useSelector((state) => state.eventLog.data)
  const volumeData = useSelector((state) => state.volume.data)
  const nodeData = useSelector((state) => state.node.data)

  useEffect(()=>{
    // FETCH_EVENTLOG
    action('FETCH_EVENTLOG')
    // FETCH_VOLUME
    action('FETCH_VOLUME')
    // FETCH_NODE
    action('FETCH_NODE')
  }, [])
  let onIncrementAsync = ()=> {
    action('FETCH_EVENTLOG')
  }

  console.log(nodeData)
  return (
    <div>
      Dashboard
      <button onClick={onIncrementAsync}>
        Get Data
      </button>
    </div>
  )
}