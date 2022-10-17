import { call, takeEvery, put } from "redux-saga/effects";
import { fetchData } from "./eventLog";
import { query } from '../../services/eventlog'

export function* fetchDataSaga(payload) {
  try {
    let result = yield call(query);
    yield put(fetchData(result.data));
  } catch (e) {
    yield put(fetchData([]));
  }
}

export default function* eventLogSaga() {
  yield takeEvery("FETCH_EVENTLOG", fetchDataSaga);
}