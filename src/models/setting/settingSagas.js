import { call, takeLatest, put, fork } from 'redux-saga/effects';
import { fetchData, setLoading, setWsStatus } from './setting';
import { query } from '../../services/setting'
import { FETCH_SETTING, SETTING_CONNECT_WS, DISCONNECT_SETTING_WEBSOCKET } from '../actionTypes'
import { manageWebSocketSaga } from '../ws/wsSagas'
import { constructWebsocketURL } from '../../utils/formater'

export function* fetchDataSaga() {
  yield put(setLoading(true))
  try {
    let result = yield call(query);
    yield put(fetchData(result.data)); 
  } catch (e) {
    yield put(fetchData([]));
  }
  yield put(setLoading(false))
}

export function* volumeConnectWs() {
  yield fork(manageWebSocketSaga, constructWebsocketURL('settings', '1s'), setWsStatus, fetchData, DISCONNECT_SETTING_WEBSOCKET);
}

export default function* eventLogSaga() {
  yield takeLatest(FETCH_SETTING, fetchDataSaga);
  yield takeLatest(SETTING_CONNECT_WS, volumeConnectWs);
}