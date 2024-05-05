export const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export const changeName = val => {
  const indx = val.indexOf('(')
  if (indx > 0) {
    return val.slice(0, indx)
  }
  return val
}

export const convertDuration = val => {
  const minutes = Math.floor(val / 60000)
  const seconds = ((val % 60000) / 6000).toFixed(0)

  const time = `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`
  return time
}

// Function to modify album data..
export const modifyAlumData = data => ({
  albumArtist: data.artists[0].name,
  albumId: data.id,
  albumImage: data.images[0].url,
  albumName: changeName(data.name),
  albumTracks: data.tracks.items.map(item => ({
    trackId: item.id,
    trackName: changeName(item.name),
    trackDuration: convertDuration(item.duration_ms),
    trackArtist: item.artists[0].name,
    trackNumber: item.track_number,
    previewUrl: item.preview_url,
  })),
})
