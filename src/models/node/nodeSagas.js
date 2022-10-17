import { call, takeEvery, put } from "redux-saga/effects";
import { fetchData } from "./node";
import { query } from '../../services/node'

export function* fetchDataSaga(payload) {
  try {
    let result = yield call(query);
    yield put(fetchData(result.data));
  } catch (e) {
    yield put(fetchData([]));
  }
}

export default function* nodeSaga() {
  yield takeEvery("FETCH_NODE", fetchDataSaga);
}