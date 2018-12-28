import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { isLogin } from '@config/common'
import { set } from '@config'

import * as base from '@pages/base'
import * as sysSet from '@pages/setCenter'

const echarts = (location, cb) => {
  require.ensure([], (require) =>{
  cb(null, require('../pages/menu/echarts').default)
},'echarts')
}

const chat = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/menu/chat').default)

  }, 'chat')
}

const editor = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/menu/editor').default)
  }, 'editor')
}

export default () => (
    <Router history={hashHistory}>
      <Route path="/" component={base.app} onEnter={isLogin}
        <IndexRoute component={base.welcome} />
        <Route path="/" component={base.example} />
        {/** * Menu Démarrer */}
        <Route path="/echarts" getComponent={echarts} />
        <Route path="/editor" getComponent={editor} />
        <Route path="/chat" getComponent={chat} />
        {/** *Fin du menu*/}
        {/** *Paramètres du système */}
        <Route path={`/${set}/userManage`} component={sysSet.userManage} />
        <Route path={`/${set}/roleManage`} component={sysSet.roleManage} />
        <Route path={`/${set}/moduleManage`} component={sysSet.moduleManage} />
        {/** *Paramètres du système */}

      </Route>
        <Route path="/login" component={base.login} />
        <Route path="*" component={base.notfound} />
    </Router>
          )
