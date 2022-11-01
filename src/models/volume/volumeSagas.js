import { call, takeEvery, put } from "redux-saga/effects";
import { fetchData, setLoading } from "./volume";
import { query } from '../../services/volume'

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
  yield takeEvery("FETCH_VOLUME", fetchDataSaga);
}