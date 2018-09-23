import { Loader, SourceLoaded } from '../src'

describe('Imgz', () => {
  const imgUrl = 'https://i.imgur.com/G5MR088.png'

  let lib: { Loader }
  let images: string[]
  let spy: jasmine.Spy

  beforeEach(() => {
    lib = { Loader }
    images = [ imgUrl, '', imgUrl ]

    spy = spyOn(lib, 'Loader').and.callThrough()
  })

  const onEvent: SourceLoaded = (image, index, event) => {
    if (index === 0) {
      expect(image).toEqual(jasmine.any(HTMLImageElement))
      expect(event.type).toEqual('load')
    }

    if (index === 1) {
      expect(image).toEqual(null)
      expect(event.type).toEqual('error')
    }

    if (index === 2) {
      expect(image).toEqual(jasmine.any(HTMLImageElement))
      expect(event.type).toEqual('load')
    }
  }

  const onLoaded = (image, index, event) => onEvent(image, index, event)

  const onCompleted = (len, done) => {
    expect(len).toEqual(images.length)
    done()
  }

  it('should be a valid Loader function', () => {
    expect(typeof Loader).toEqual('function')
  })

  it('should be called passing all allowed params to callback', (done) => {
    lib.Loader(images, onLoaded, (len) => onCompleted(len, done))
  })
})
