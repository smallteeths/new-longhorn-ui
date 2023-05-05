import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { fetchData, setLoading, setWsStatus } from './node';
import { query } from '../../services/node'
import { FETCH_NODE, NODE_CONNECT_WS, DISCONNECT_NODE_WEBSOCKET } from '../actionTypes'
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

export function* nodeConnectWs() {
  yield fork(manageWebSocketSaga, constructWebsocketURL('nodes', '1s'), setWsStatus, fetchData, DISCONNECT_NODE_WEBSOCKET);
}

export default function* nodeSaga() {
  yield takeLatest(FETCH_NODE, fetchDataSaga);
  yield takeLatest(NODE_CONNECT_WS, nodeConnectWs);
}