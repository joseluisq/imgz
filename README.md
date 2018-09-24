# Imgz [![npm](https://img.shields.io/npm/v/imgz.svg)](https://www.npmjs.com/package/imgz) [![npm](https://img.shields.io/npm/dt/imgz.svg)](https://www.npmjs.com/package/imgz) [![Build Status](https://travis-ci.org/joseluisq/imgz.svg?branch=master)](https://travis-ci.org/joseluisq/imgz) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Tiny image sources loader. :framed_picture:

__Imgz__ just loads string image URLs by index emitting a callback with `image`, `index` and `event` parameters per load.

## Install

[Yarn](https://github.com/yarnpkg/)

```sh
yarn add imgz
```

[NPM](https://www.npmjs.com/)

```sh
npm install imgz --save
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com).

```html
<link rel="stylesheet" href="https://unpkg.com/imgz/dist/imgz.min.js">
```

You can use the library via `window.imgz`

## Usage

```ts
import { Loader } from 'imgz'

const images = [
  'https://i.imgur.com/G5MR088.png',   // ok!
  'http://server/not-found-image.png', // error!
  'https://i.imgur.com/G5MR088.png'    // ok!
]

Loader(images, (image: HTMLImageElement | null, index: number, event: LoadEvent | ErrorEvent) => { })
```

## API

```ts
function Loader (
  // Sources
  source: string | string[],

  // Source loaded
  (image: HTMLImageElement | null, index: number, event: LoadEvent | ErrorEvent) => void,

  // Sources completed (optional)
  (length: number) => void
)
```

See [index.d.ts](./index.d.ts) for more details.

## Contributions

[Pull requests](https://github.com/joseluisq/imgz/pulls) or [issues](https://github.com/joseluisq/imgz/issues) are very appreciated.

## License
MIT license

© 2018 [José Luis Quintana](http://git.io/joseluisq)
