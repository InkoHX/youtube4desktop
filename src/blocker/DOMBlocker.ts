interface DOMFilter {
  query: string
}

const blacklist: Array<DOMFilter> = [
  {
    query: '#masthead-ad'
  },
  {
    query: '#merch-shelf'
  },
  {
    query: '#ticker.ytd-masthead'
  },
  {
    query: '.ytp-ce-playlist'
  },
  {
    query: 'iron-overlay-backdrop'
  },
  {
    query: '.ytp-cards-teaser'
  },
  {
    query: '.ytp-paid-content-overlay'
  },
  {
    query: '.ytp-pause-overlay'
  },
  {
    query: '.ytp-title-channel'
  },
  {
    query: '#secondary-links'
  },
  {
    query: '#pla-shelf'
  },
  {
    query: '#offer-module'
  },
  {
    query: '.ytp-ce-element'
  },
  {
    query: '.annotation.iv-branding'
  }
]

export function domBlocker(document: Document): void {
  blacklist.map((filter) => {
    const element = document.querySelector(filter.query)
    if (element && element.firstChild) element.removeChild(element.firstChild)
  })
}
