interface LoadEvent extends Event {
  type: 'load'
}

interface ErrorEvent extends Event {
  type: 'error'
}

type SourceLoaded = (image: HTMLImageElement | null, event: LoadEvent | ErrorEvent) => void

const loadImage = (source: string, loaded: SourceLoaded) => {
  const img = new Image()
  img.onload = (event: Event) => loaded(event.target as HTMLImageElement, event as LoadEvent)
  img.onerror = (event: Event) => loaded(null, event as ErrorEvent)
  img.src = source
}

const loadImages = (sources: string[], loaded: SourceLoaded, completed?: () => void) => {
  if (!sources.length) return

  const load = (i: number) => {
    if (i < sources.length) {
      loadImage(sources[i], (image: HTMLImageElement | null, event: LoadEvent | ErrorEvent) => {
        loaded(image, event)
        load(i + 1)
      })
    } else if (completed) completed()
  }

  load(0)
}

/**
 * Load one image string source
 *
 * @param source Image source URL
 * @param sourceLoaded Callback executed per source loading. It includes 'success' or 'error' loadings.
 * If source loading was successful `image` param will contains an `HTMLImageElement`, otherwise `null`.
 * `event` param contains a 'load' or 'error' `Event` object
 */
export function Loader (source: string, sourceLoaded: SourceLoaded): void

/**
 * Load an array of image string sources
 *
 * @param sources Image source URLs
 * @param sourceLoaded Callback executed per source loading. It includes 'success' or 'error' loadings.
 * If source loading was successful `image` param will contains an `HTMLImageElement`, otherwise `null`.
 * `event` param contains a 'load' or 'error' `Event` object
 * @param completed Callback executed when all image sources were loaded
 */
export function Loader (sources: string[], sourceLoaded: SourceLoaded, completed?: () => void): void

export function Loader (source: string | string[], sourceLoaded: SourceLoaded, completed?: () => void) {
  if (Array.isArray(source)) loadImages(source, sourceLoaded, completed)
  else loadImage(source, sourceLoaded)
}
