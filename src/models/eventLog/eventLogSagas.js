import { call, takeLatest, put, fork} from 'redux-saga/effects';
import { fetchData, setLoading, setWsStatus } from './eventLog';
import { query } from '../../services/eventlog'
import { FETCH_EVENTLOG, EVENTLOG_CONNECT_WS, DISCONNECT_EVENTLOG_WEBSOCKET } from '../actionTypes'
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

export function* eventLogConnectWs() {
  yield fork(manageWebSocketSaga, constructWebsocketURL('events', '1s'), setWsStatus, fetchData, DISCONNECT_EVENTLOG_WEBSOCKET);
}

export default function* eventLogSaga() {
  yield takeLatest(FETCH_EVENTLOG, fetchDataSaga);
  yield takeLatest(EVENTLOG_CONNECT_WS, eventLogConnectWs);
}