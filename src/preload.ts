import { domBlocker } from './blocker/DOMBlocker'

window.addEventListener('load', () => {
  domBlocker(document)
})
