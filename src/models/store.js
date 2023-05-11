import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import eventLogReducer from './eventLog/eventLog'
import eventLogSaga from './eventLog/eventLogSagas'
import volumeReducer from './volume/volume'
import volumeSaga from './volume/volumeSagas'
import nodeReducer from './node/node'
import nodeSaga from './node/nodeSagas'
import settingReducer from './setting/setting'
import settingSaga from './setting/settingSagas'
import globalReducer from './global/global'
import globalSaga from './global/globalSagas'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    global: globalReducer,
    eventLog: eventLogReducer,
    volume: volumeReducer,
    node: nodeReducer,
    setting: settingReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(globalSaga)
sagaMiddleware.run(eventLogSaga)
sagaMiddleware.run(volumeSaga)
sagaMiddleware.run(nodeSaga)
sagaMiddleware.run(settingSaga)
