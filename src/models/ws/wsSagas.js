import { eventChannel } from 'redux-saga';
import { put, take, call, fork } from 'redux-saga/effects';

function createWebSocketChannel(url, setWebSocketStatus, receiveWebSocketMessage) {
  let socket;

  return eventChannel((emit) => {
    socket = new WebSocket(url);

    socket.addEventListener('open', () => {
      console.log('WebSocket open');
      emit(setWebSocketStatus(true))
    });

    socket.addEventListener('message', (event) => {
      try {
        let data = JSON.parse(event.data);
        data.data && receiveWebSocketMessage && emit(receiveWebSocketMessage(data.data))
      } catch (error) {
        console.log('Error parsing JSON string:', error);
      }
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket close');
      emit(setWebSocketStatus(false))
    });

    return () => {
      console.log('cloase')
      socket.close();
    };
  });
}

function* watchWebSocketChannel(channel) {
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* manageWebSocketSaga(url, setWebSocketStatus, receiveWebSocketMessage, disconnectWebsocket) {
  const channel = yield call(createWebSocketChannel, url, setWebSocketStatus, receiveWebSocketMessage);

  try {
    yield fork(watchWebSocketChannel, channel);
    yield take(disconnectWebsocket);
  } finally {
    channel.close();
  }
}