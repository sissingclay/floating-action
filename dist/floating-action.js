/* globals HTMLElement, customElements */
/**
 * Created by claysissing on 12/07/2016.
 */

class Csfloatingaction extends HTMLElement {
  connectedCallback () {
    this.setAttributes()
    this.setElements()
    this.addEvents()
    this.hasScrolled()
  }

  disconnectedCallback () {
    this.removeEventListener('mouseenter', this.buttonAction)
    this.removeEventListener('mouseleave', this.buttonAction)
    this.removeEventListener('click', this.buttonAction)
    window.removeEventListener('scroll', this.scrollEvent)
    this.buttonElement.removeEventListener('click', this.preventBtnClick)
  }

  setAttributes () {
    this.button = this.getAttribute('button')
    this.container = this.getAttribute('container')
    this.toggle = this.getAttribute('toggle')
    this.moveContainer = this.getAttribute('move-container')
    this.offSet = parseInt(this.getAttribute('to-bottom')) || 0
  }

  setElements () {
    this.buttonElement = this.querySelector(this.button)
    this.containerElement = this.querySelector(this.container)
  }

  addEvents () {
    if (!this.isTouchDevice()) {
      this.addEventListener('mouseenter', this.buttonAction.bind(this), false)
      this.addEventListener('mouseleave', this.buttonAction.bind(this), false)
    }

    if (this.isTouchDevice()) {
      this.buttonElement.addEventListener('click', this.buttonAction.bind(this), false)
    }
  }

  hasScrolled () {
    window.addEventListener('scroll', this.scrollEvent.bind(this), false)
  }

  scrollEvent () {
    var isBottom = this.isBottom(this.offSet)
    var hasClass = this.classList.contains(this.moveContainer)

    if (isBottom) {
      if (!hasClass) {
        this.classList.add(this.moveContainer)
      }
    }

    if (!isBottom) {
      if (hasClass) {
        this.classList.remove(this.moveContainer)
      }
    }
  }

  buttonAction (e) {
    e.preventDefault()
    this.addRemoveClass()
    this.buttonElement.addEventListener('click', this.preventBtnClick, false)
  }

  preventBtnClick (e) {
    e.preventDefault()
  }

  addRemoveClass () {
    var conElement = this.containerElement
    var isVisible = conElement.classList.contains(this.toggle)
    if (!isVisible) {
      conElement.classList.add(this.toggle)
    }
    if (isVisible) {
      conElement.classList.remove(this.toggle)
    }
  }

  isTouchDevice () {
    try {
      document.createEvent('TouchEvent')
      return true
    } catch (e) {
      return false
    }
  }

  isBottom (offSet) {
    var totalHeight = document.body.offsetHeight - offSet
    var visibleHeight = document.documentElement.clientHeight
    var currentScroll

    if (document.documentElement.scrollTop) {
      currentScroll = document.documentElement.scrollTop
    } else {
      currentScroll = document.body.scrollTop
    }

    if (totalHeight <= currentScroll + visibleHeight) {
      return true
    } else {
      return false
    }
  }


}

// Define the new element
customElements.define('cs-floatingaction', Csfloatingaction)
