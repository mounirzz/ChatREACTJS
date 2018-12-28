import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
// import { Form } from 'antd'
// import configure from '../../store/configureStore'

import './draw.less'

// const store = configure({ config: global.$GLOBALCONFIG })
// @Form.create({})

// Déclarer les composants et la sortie
export default class Drawer extends Component {
  // Initialiser les constantes de page, méthode de l'événement Bind
  constructor(props, context) {
    super(props, context)
    this.state = {
      // activeTab: 'pop' ,
      drawTrasformClass: '',
      maskTrasformClass: '',
      drawerSizeClass: 'modal-base',
      // drawerSizeClassList: ['modal-base', 'modal-sm', 'modal-lg'],
    }
  }
  componentWillMount() {
    document.body.classList.add('body-drawer')
  }


  // Le composant a été chargé dans le dom
  componentDidMount() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.initDrawer()
    }
    const {
      size = 'default',
    } = this.props
    this.getDrawerSize(size)
    this.setTrasformClass()
  }

  // Surveiller l'attribut visible,
  componentWillReceiveProps(nextProps) {

  }

  componentDidUpdate() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.renderDrawer()
    }
  }

  componentWillUnmount() {
    this.renderDrawer({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    })
    setTimeout(() => {
      // document.body.removeChild(this.popup)
      document.body.classList.remove('body-drawer')
      ReactDOM.unmountComponentAtNode(this.popup)
    }, 300) // Le composant sera désinstallé et l'animation sera désinstallée.
  }

  // Initialiser le tiroir
  initDrawer = () => {
    this.popup = document.createElement('div')
    this.popup.setAttribute('class', 'drawers')
    document.body.appendChild(this.popup)
    this.renderDrawer()
    this.setTrasformClass()
  }

  // Tiroir ajouter des paramètres de classe d'effet d'animation
  setTrasformClass = () => {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.setState({
        drawTrasformClass: 'draw-enter',
        maskTrasformClass: 'mask-enter',
      }, () => {
        setTimeout(() => {
          this.setState({
            drawTrasformClass: '',
            maskTrasformClass: '',
          })
        }, 300)
      })
    }
  }

  // Supprimer le popup
  removeDrawer = () => {
    this.setState({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    }, () => {
      setTimeout(() => {
        this.setState({
          drawTrasformClass: '',
          maskTrasformClass: '',
        })
        document.body.removeChild(this.popup)
        document.body.classList.remove('body-drawer')
        ReactDOM.unmountComponentAtNode(this.popup)
        this.props.onCancel()
      }, 250)
    })
  }

  // Déterminer la taille de la classe de tiroir
  getDrawerSize = (size) => {
    switch (size) {
      case 'sm':
        this.setState({
          drawerSizeClass: 'drawer-sm',
        })
        break
      case 'lg':
        this.setState({
          drawerSizeClass: 'drawer-lg',
        })
        break
      default:
        this.setState({
          drawerSizeClass: 'drawer-base',
        })
        break
    }
  }

  // Insérer un contenu contextuel dans le dom spécifié
  renderDrawer(_class = {}) {
    const {
      title = '标题',
      footer = null,
    } = this.props
    const {
      // drawTrasformClass,
      // maskTrasformClass,
      drawerSizeClass,
    } = this.state

    // Donnez la priorité à l’utilisation de votre propre animation de classe définie
    const drawTrasformClass = _class.drawTrasformClass || this.state.drawTrasformClass
    const maskTrasformClass = _class.maskTrasformClass || this.state.maskTrasformClass

    ReactDOM.render(
      <div className="drawer-wrap">
        <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
        <div className={`${drawTrasformClass} draw ${drawerSizeClass} ${this.props.className}`}>
          <div className="ant-modal">
            <div className="ant-modal-content">
              <button className="ant-modal-close">
                <span className="ant-modal-close-x" onClick={() => this.removeDrawer()} />
              </button>
              <div className="ant-modal-header">
                <div className="ant-modal-title">{title}</div>
              </div>
              <AntModalBody context={this.context}>
                {this.props.children}
              </AntModalBody>
              {
                footer ?
                  <div className="ant-modal-footer">
                    {footer}
                  </div> : null
              }
            </div>
          </div>
        </div>
      </div>,
      this.popup,
    )
  }

  render() {
    // const {
    //   title = 'Titre',
    //   footer = null,
    // } = this.props
    // const {
    //   drawTrasformClass,
    //   maskTrasformClass,
    //   drawerSizeClass,
    // } = this.state
    return (
      // <div className="drawer-wrap">
      //   <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
      //   <div className={`${drawTrasformClass} draw ${drawerSizeClass}`}>
      //     <div className="ant-modal">
      //       <div className="ant-modal-content">
      //         <button className="ant-modal-close">
      //           <span className="ant-modal-close-x" onClick={() => this.removeDrawer()} />
      //         </button>
      //         <div className="ant-modal-header">
      //           <div className="ant-modal-title">{title}</div>
      //         </div>
      //         <div className="ant-modal-body">
      //           {this.props.children}
      //         </div>
      //         <div className="ant-modal-footer">
      //           {footer}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      null
    )
  }
}


Drawer.contextTypes = {
  form: PropTypes.object,
  vertical: PropTypes.bool,
  store: PropTypes.object,
};

class AntModalBody extends Component {
  getChildContext() {
    return { form: this.props.context.form, vertical: this.props.context.vertical, store: this.props.context.store }
  }
  render() {
    return (
      <div className="ant-modal-body">
        {this.props.children}
      </div>
    )
  }
}

AntModalBody.childContextTypes = {
  form: PropTypes.object,
  vertical: PropTypes.string,
  store: PropTypes.object,
}
