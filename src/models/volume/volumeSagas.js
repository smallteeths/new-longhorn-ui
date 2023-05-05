import { call, takeLatest, put, fork } from 'redux-saga/effects';
import { fetchData, setLoading, setWsStatus } from './volume';
import { query } from '../../services/volume'
import { FETCH_VOLUME, VOLUME_CONNECT_WS, DISCONNECT_VOLUME_WEBSOCKET} from '../actionTypes'
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
  yield fork(manageWebSocketSaga, constructWebsocketURL('volumes', '1s'), setWsStatus, fetchData, DISCONNECT_VOLUME_WEBSOCKET);
}

export default function* eventLogSaga() {
  yield takeLatest(FETCH_VOLUME, fetchDataSaga);
  yield takeLatest(VOLUME_CONNECT_WS, volumeConnectWs);
}