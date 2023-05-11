import { call, takeLatest } from 'redux-saga/effects';
import { getSupportbundles, getSupportbundlesStepTwo } from '../../services/global'
import { GENERATE_SUPPORT_BUNDLES } from '../actionTypes'

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms, 'done')
  })
}

export function* generateSupportBundles(record) {
  const data = yield call(getSupportbundles, record.payload)
  if (data && data.status === 200) {
    let dataStepTwo = {}

    while (dataStepTwo.state !== 'ReadyForDownload') {
      yield call(timeout, 1000)
      dataStepTwo = yield call(getSupportbundlesStepTwo, data.nodeID, { name: data.name })
      record.callback(dataStepTwo.progressPercentage)
    }

    if (dataStepTwo.state === 'ReadyForDownload') {
      window.location.href = `${ window.__pathname_prefix__ }${ window.__pathname_prefix__.endsWith('/') ? '' : '/'}v1/supportbundles/${data.id}/${data.name}/download` // eslint-disable-line
    }
  }
  record.callback()
}

export default function* nodeSaga() {
  yield takeLatest(GENERATE_SUPPORT_BUNDLES, generateSupportBundles);
}