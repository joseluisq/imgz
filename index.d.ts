export interface LoadEvent extends Event {
  type: 'load'
}

export interface ErrorEvent extends Event {
  type: 'error'
}

export type SourceLoaded = (image: HTMLImageElement | null, index: number, event: LoadEvent | ErrorEvent) => void
export type SourcesCompleted = (length: number) => void

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
