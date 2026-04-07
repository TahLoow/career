import { createQuery } from '@tanstack/svelte-query';
import { env } from '$env/dynamic/public';

export type ScrobbleArtist = {
  // Artist ID
  mbid: string,
  // Artist Name
  '#text': string
}

export type ScrobbleAlbum = {
  // Album ID
  mbid: string,
  // Album name
  '#text': string
}

export type ScrobbleImageSize = 'small' | 'medium' | 'large' | 'extralarge'

export type ScrobbleImage = {
  size: ScrobbleImageSize,
  // JPG URL for the image
  '#text': string
}

export type ScrobbleDate = {
  uts: string;
  '#text': string;
}

export type Scrobble = {
  recenttracks: {
    track: [
      {

        // Last.fm track ID
        mbid: string,

        // Track name
        name: string,

        // Track artist
        artist: ScrobbleArtist,

        // Last.fm track URL
        url: string

        // Track album
        album: ScrobbleAlbum,

        // Different thumbnails
        image: ScrobbleImage[],

        // Accessible when nowplaying is false
        date?: ScrobbleDate,

        // Unknown
        streamable: string,

        // Track-level requested attributes
        '@attr'?: {
          // Whether the track is currently playing
          nowplaying: 'true'
        },
      },
    ]

    // Request attributes
    '@attr': {
      user: string,
      totalPages: string,
      page: string,
      perPage: string,
      total: string
    }
  }
};

export type ScrobbleTrackQuery = {
  name: string,
  id: string,
  url: string,
  currentlyPlaying: boolean,
  artist: {
    name: string,
    id: string
  },
  album: {
    name: string,
    id: string
  }
  images: Record<ScrobbleImageSize, string>
  datePlayed?: Date
}

function preloadSrc(image: ScrobbleImage): Promise<ScrobbleImage> {
  // Preload image
  const preloadImage = new Image()
  preloadImage.src = image['#text'];

  return new Promise((resolve) => {
    preloadImage.onload = () => resolve(image)
  })
}

export function getScrobbleQuery() {
  return createQuery<ScrobbleTrackQuery>(() => {
    const url = new URL('https://ws.audioscrobbler.com/2.0/?')
    const params = new URLSearchParams({
      ['method']: 'user.getrecenttracks',
      ['user']: 'WahTool',
      ['api_key']: env.PUBLIC_LAST_FM_API_KEY,
      ['format']: 'json',
      ['nowplaying']: 'true',
      ['limit']: '1',
    })


    return {
      queryKey: ['scrobble'],
      queryFn: () => {
        return fetch(url.toString() + params.toString())
          .then((res) => res.json())
          .then(async (data) => {
            const result = data as Scrobble

            try {
              const track = result.recenttracks.track[0]

              let datePlayed = track.date ? new Date(parseInt(track.date.uts) * 1000) : undefined

              const scrobble = {
                name: track.name,
                id: track.mbid,
                url: track.url,
                currentlyPlaying: !!track['@attr']?.nowplaying,
                artist: {
                  name: track.artist['#text'],
                  id: track.artist.mbid
                },
                album: {
                  name: track.album['#text'],
                  id: track.album.mbid
                },
                images: (await Promise.all(track.image.map(src => preloadSrc(src)))).reduce((obj, image) => {
                  if (image['#text'].includes('2a96cbd8b46e442fc41c2b86b821562f')) {
                    obj[image.size] = ""
                  } else {
                    obj[image.size] = image['#text']
                  }

                  return obj
                }, {} as Record<ScrobbleImageSize, string>),
                datePlayed
              } as ScrobbleTrackQuery

              console.log(scrobble.images)

              return scrobble
            } catch (err) {
              console.error(err)
              throw err
            }

          })
      },
    }
  });
}
