import { call, takeEvery, put } from "redux-saga/effects";
import { fetchData, setLoading } from "./eventLog";
import { query } from '../../services/eventlog'

export function* fetchDataSaga(payload) {
  yield put(setLoading(true))
  try {
    let result = yield call(query);
    yield put(fetchData(result.data));
  } catch (e) {
    yield put(fetchData([]));
  }
  yield put(setLoading(false))
}

export default function* eventLogSaga() {
  yield takeEvery("FETCH_EVENTLOG", fetchDataSaga);
}