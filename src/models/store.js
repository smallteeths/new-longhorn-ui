import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import eventLogReducer from './eventLog/eventLog'
import eventLogSaga from './eventLog/eventLogSagas'
import volumeReducer from './volume/volume'
import volumeSaga from './volume/volumeSagas'
import nodeReducer from './node/node'
import nodeSaga from './node/nodeSagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    eventLog: eventLogReducer,
    volume: volumeReducer,
    node: nodeReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(eventLogSaga)
sagaMiddleware.run(volumeSaga)
sagaMiddleware.run(nodeSaga)
