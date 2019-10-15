import { OnBeforeRequestDetails } from 'electron'

interface Filter {
  url: string,
  type?: string
}

const blacklist: Array<Filter> = [
  {
    url: 'youtube.com/get_midroll_'
  },
  {
    url: 'youtube.com/api/stats/qoe?'
  },
  {
    url: 'youtube.com/api/stats/watchtime?'
  },
  {
    url: 'youtube.com/csi_204?'
  },
  {
    url: 'doubleclick.net/'
  },
  {
    url: 'google.com/pagead/'
  },
  {
    url: 'youtube.com/pagead/'
  },
  {
    url: 'youtube.com/ptracking?'
  },
  {
    url: 'youtube.com/api/stats/playback?'
  },
  {
    url: '/generate_204',
    type: 'image'
  },
  {
    url: '/log_event?'
  },
  {
    url: '/log_interaction?'
  },
  {
    url: 'youtube.com/api/stats/ads?'
  }
]

export function isAdvertisement(details: OnBeforeRequestDetails): boolean {
  let advertisement = false
  blacklist.map((filter) => {
    const black = details.url.includes(filter.url)
    if (black && filter.type) {
      if (details.resourceType === filter.type) advertisement = true
    } else if (black) advertisement = true
  })

  return advertisement
}


