import { createQuery } from '@tanstack/svelte-query';
import { env } from '$env/dynamic/public';

export type ScrobbleImageSize = 'small' | 'medium' | 'large' | 'extralarge'

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

// Preloads one image
function preloadImage(image: string): Promise<void> {
  // Don't preload empty images
  if (image === '') return new Promise((_, reject) => reject())

  // Preload image
  const preloadImage = new Image()
  preloadImage.src = image;

  return new Promise<void>((resolve, reject) => {
    preloadImage.onload = () => resolve()
    preloadImage.onerror = () => reject();
  })
}

// Retrieves the latest scrobble via API
async function getScrobbleRequest(): Promise<ScrobbleTrackQuery> {
  const scrobble: ScrobbleTrackQuery = await fetch(`${env.PUBLIC_API_URL}/scrobble`, {
    method: 'GET',
    headers: {
      ['Content-Type']: 'json'
    },
  }).then((res) => res.json())

  // Attempt to preload the images before returning the scrobble
  await Promise.allSettled([
    preloadImage(scrobble.images.small),
    preloadImage(scrobble.images.medium),
    preloadImage(scrobble.images.large),
    preloadImage(scrobble.images.extralarge)
  ])

  return scrobble
}

// Returns a stateful scrobble from the API, with images pre-loaded
export function getScrobbleQuery() {
  return createQuery<ScrobbleTrackQuery>(() => {

    return {
      queryKey: ['scrobble'],
      refetchInterval: 15000,
      queryFn: getScrobbleRequest,
    }
  });
}
