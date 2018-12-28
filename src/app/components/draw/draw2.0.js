
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
// import configure from '../../store/configureStore'

import './draw.less'

// const store = configure({ config: global.$GLOBALCONFIG })

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
    const {
      size = 'default',
    } = this.props
    this.getDrawerSize(size)
    this.setTrasformClass()
  }


  // Le composant a été chargé dans le dom
  componentDidMount() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.initDrawer()
    }
  }

  // Surveiller l'attribut visible,
  componentWillReceiveProps(nextProps) {
    /* const {
      visible = true,
    } = this.props
    console.log(visible)
    console.log(nextProps)
    if (visible || nextProps.visible) {
      this.initDrawer()
    } else {
      this.removeDrawer()
    } */
  }

  componentDidUpdate() {
    this.renderDrawer()
  }

  componentWillUnmount() {
    // <setTimeo></setTimeo>ut(() => {
    ReactDOM.unmountComponentAtNode(this.popup)
    // }, 300)
  }

  // Initialiser le tiroir
  initDrawer = () => {
    this.popup = document.createElement('div')
    this.popup.setAttribute('class', 'drawers')
    this.renderDrawer()
    document.body.appendChild(this.popup)
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
      }, () =>
        setTimeout(() => {
          this.setState({
            drawTrasformClass: '',
            maskTrasformClass: '',
          })
        }, 300))
    }
  }

  // Supprimer le popup
  removeDrawer = () => {
    this.setState({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    }, () =>
      setTimeout(() => {
        this.setState({
          drawTrasformClass: '',
          maskTrasformClass: '',
        })
        document.body.removeChild(this.popup)
        ReactDOM.unmountComponentAtNode(this.popup)

        this.props.onCancel()
      }, 200))
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
  renderDrawer() {
    const {
      title = 'Titre',
      footer = null,
    } = this.props
    const {
      drawTrasformClass,
      maskTrasformClass,
      drawerSizeClass,
    } = this.state

    ReactDOM.render(
      <div className="drawer-wrap">
        <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
        <div className={`${drawTrasformClass} draw ${drawerSizeClass}`}>
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
              <div className="ant-modal-footer">
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>,
      this.popup,
    )
  }

  render() {
    return null
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
