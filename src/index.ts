export interface LoadEvent extends Event {
  type: 'load'
}

export interface ErrorEvent extends Event {
  type: 'error'
}

export type SourceLoaded = (image: HTMLImageElement | null, index: number, event: LoadEvent | ErrorEvent) => void

export type SourcesCompleted = (length: number) => void

const loadImage = (source: string, index: number, done: SourceLoaded) => {
  const img = new Image()
  img.onload = (event: Event) => done(event.target as HTMLImageElement, index, event as LoadEvent)
  img.onerror = (event: Event) => done(null, index, event as ErrorEvent)
  img.src = source
}

const loadImages = (sources: string[], done: SourceLoaded, completed?: SourcesCompleted) => {
  if (!sources.length) return

  const load = (i: number) => {
    if (i < sources.length) {
      loadImage(sources[i], i, (image: HTMLImageElement | null, index: number, event: LoadEvent | ErrorEvent) => {
        done(image, index, event)
        load(i + 1)
      })
    } else if (completed) completed(i)
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
 * @param sourcesCompleted Callback executed when all image sources were loaded
 */
export function Loader (sources: string[], sourceLoaded: SourceLoaded, sourcesCompleted?: SourcesCompleted): void

export function Loader (source: string | string[], sourceLoaded: SourceLoaded, sourcesCompleted?: SourcesCompleted) {
  loadImages(Array.isArray(source) ? source : [ source ], sourceLoaded, sourcesCompleted)
}
