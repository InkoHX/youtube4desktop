import { domBlocker } from './blocker/DOMBlocker'

window.onload = (): void => {
  domBlocker(document)
}
