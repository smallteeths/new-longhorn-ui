import { getNodeStatus } from '../../../utils/filter'

export function formatNodeData(nodeData, volumeData) {
  return nodeData.map(node => {
    let item = Object.assign({}, node)
    let replicas = []
    volumeData.forEach(vol => {
      if (vol.replicas) {
        vol.replicas.forEach(replica => {
          if (item.id === replica.hostId) {
            let newReplica = Object.assign({}, replica)
            newReplica.removeUrl = vol.actions.replicaRemove
            newReplica.volState = vol.state
            newReplica.volumeName = vol.name
            replicas.push(newReplica)
          }
        })
      }
    })
    item.replicas = replicas
    Object.keys(item.disks).reduce(id => {
      let disk = Object.assign({}, item.disks[id], { replicas: replicas.filter(r => r.diskID === id) })
      return {[id]: disk}
    })
    item.status = getNodeStatus(item)
    console.log(item)
    return item
  })
}
