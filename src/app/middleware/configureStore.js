import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '@reducers'
import { logger, /* Router, */ reduxRouterMiddleware } from './index'

const nextRouter = require('@reducers')

export default function configure(InitialState){
  const create = window.devToolsExtension ? window.devToolsExtension()(createStore):createStore
  const createStoreWithMiddleware = applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
    logger,
    // router,
  )(create)
  const store = createStoreWithMiddleware(rootReducer, InitialState)

  if (module.hot) {
    module.hot.accept('../reducers', () =>{
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
