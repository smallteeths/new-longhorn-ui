import { call, takeEvery, put } from "redux-saga/effects";
import { fetchData, setLoading } from "./node";
import { query } from '../../services/node'

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

export default function* nodeSaga() {
  yield takeEvery("FETCH_NODE", fetchDataSaga);
}