import moment from 'moment'

// api constant values while fetching data
export const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// functions to remove "()" in given name.
export const changeName = val => {
  const indx = val.indexOf('(')
  if (indx > 0) {
    return val.slice(0, indx)
  }
  return val
}

// Function to modify Album name.
export const albumName = val => {
  const indx = val.indexOf('(')
  const end = val.length
  if (indx > 0) {
    const album = val.slice(indx, end)
    const index = val.indexOf('\\') - 1
    return album.slice(7, index)
  }
  return val
}

// function to convert 36000ms => 01:00.
export const convertDuration = val => {
  const minutes = Math.floor(val / 60000)
  const seconds = ((val % 60000) / 6000).toFixed(0)

  const time = `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`
  return time
}

// Generates time stamp
export const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

// Function to get the uploaded distance.
export const findDistanceFromNow = date => {
  const newDate = new Date(date)

  return moment(newDate).fromNow()
}

// Function to modify Home Editor's Picks
export const modifyEditorsPicks = data => ({
  id: data.id,
  name: changeName(data.name),
  imageUrl: data.images[0].url,
})

// Functions to modify Home Categories response.
export const modifyHomeCategories = data => ({
  id: data.id,
  name: changeName(data.name),
  imageUrl: data.icons[0].url,
})

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

// Function to modify the response of Genre&Moods.
export const modifyGenreAndMoods = data => ({
  id: data.id,
  name: changeName(data.name),
  imageUrl: data.images[0].url,
  tracks: data.tracks.total,
})

// Function to modify the response of SpecificPlaylists.
export const modifyPlaylistData = data => ({
  id: data.id,
  name: changeName(data.name),
  image: data.images[0].url,
  artist: data.tracks.items[0].track.artists[0].name,
  description: data.description,
  tracks: data.tracks.items.map(song => ({
    trackArtist: song.track.artists.map(artist => artist.name).join(' '),
    trackAlbum: albumName(song.track.album.name),
    duration: convertDuration(song.track.duration_ms),
    trackImage:
      song.track.album.images[0] !== (null || undefined)
        ? song.track.album.images[0].url
        : 'https://i.scdn.co/image/ab67706f0000000366c4920349468f0970205a6a',
    trackId: song.track.id,
    trackName: changeName(song.track.name),
    popularity: song.track.popularity,
    previewUrl: song.track.preview_url,
    addedAt: findDistanceFromNow(song.added_at),
  })),
})
