interface DOMFilter {
  query: string
}

const blacklist: Array<DOMFilter> = [
  {
    query: '#masthead-ad'
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
  }
]

export function domBlocker(document: Document): void {
  blacklist.map((filter) => {
    const element = document.querySelector(filter.query)
    if (element && element.firstChild) {
      element.removeChild(element.firstChild)
      console.info(`Remove DOM: ${filter.query}`)
    }
  })
}
