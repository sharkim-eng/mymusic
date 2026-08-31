export type Track = {
  id: string
  title: string
  artist: string
  album: string
  src: string
  duration?: number
  source: 'demo' | 'local'
  addedAt?: number
}

export type StoredTrack = {
  id: string
  title: string
  artist: string
  album: string
  blob: Blob
  duration?: number
  addedAt: number
}
