<p align="center">
<img src="https://raw.githubusercontent.com/CodeDotJS/youtube-playlist/master/media/logo.png" width="340">
<br>
  <a href="https://travis-ci.org/CodeDotJS/youtube-playlist">
  <img src="https://travis-ci.org/CodeDotJS/youtube-playlist.svg?branch=master">
  </a>
  <img src="https://raw.githubusercontent.com/CodeDotJS/youtube-playlist/master/media/mid.png" width="50px;">
  <img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg">
  <br>
  <p align="center">Extract links, ids, and names from a youtube playlist</p>
  <br>
</p>


## Install

```
$ npm install --save youtube-playlist
```

## Usage

- __`urls`__

```js
const ytlist = require('youtube-playlist');

const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';

ytlist(url, 'url').then(res => {
  console.log(res);
  /* Object
  { data:
   { playlist:
      [ 'https://youtube.com/watch?v=bgU7FeiWKzc',
        'https://youtube.com/watch?v=3PUVr8jFMGg',
        'https://youtube.com/watch?v=3pXVHRT-amw',
        'https://youtube.com/watch?v=KOVc5o5kURE' ] } }
   */
});

// or

ytlist(url, 'url').then(res => {
  console.log(res.data.playlist);
  /* Array
  [ 'https://youtube.com/watch?v=bgU7FeiWKzc',
  'https://youtube.com/watch?v=3PUVr8jFMGg',
  'https://youtube.com/watch?v=3pXVHRT-amw',
  'https://youtube.com/watch?v=KOVc5o5kURE' ]
   */
});
```

- __`names`__

```js
ytlist(url, 'name').then(res => {
  console.log(res);
  /*
  { data:
   { playlist:
      [ 'Singleton Design Pattern - Beau teaches JavaScript',
        'Observer Design Pattern - Beau teaches JavaScript',
        'Module Design Pattern - Beau teaches JavaScript',
        'Mediator Design Pattern - Beau teaches JavaScript' ] } }
   */
});
```

- __`ids`__

```js
ytlist(url, 'id').then(res => {
  console.log(res);
  // => { data: { playlist: [ 'bgU7FeiWKzc', '3PUVr8jFMGg', '3pXVHRT-amw', 'KOVc5o5kURE' ] } }
})
```

- __`multiple details`__

```js
const ytlist = require('youtube-playlist');

const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';

ytlist(url, ['name', 'url']).then(res => {
  console.log(res);
  /* Object
  { data:
   { playlist:
      [
        {"name":"Singleton Design Pattern - Beau teaches JavaScript","id":"bgU7FeiWKzc"},{"name":"Observer Design Pattern - Beau teaches JavaScript","id":"3PUVr8jFMGg"},{"name":"Module Design Pattern - Beau teaches JavaScript","id":"3pXVHRT-amw"},{"name":"Mediator Design Pattern - Beau teaches JavaScript","id":"KOVc5o5kURE"}]} }
   */
});

## API

```js
ytlist(url, opts)
```
#### `opts`

- __`id`__ `:` `returns only ids of all the videos present in a playlist`
- __`url`__ `:` `returns only urls of all the videos present in a playlist`
- __`name`__ `:` `return only name of the videos present in a playlist`

__Type of__

- __`url`__ `:` __`string`__

- __`opts`__ `:` __`string`__


#### NOTE

- This `api` already supports `url-redirection`, so you are free to use the shortened url.

- For data extraction, you can either choose -
	- __`playlist url`__
	- __`url of the content from playlist`__ __[`#1`](https://github.com/CodeDotJS/youtube-playlist/issues/1)__


## Related

- __[`Pufetch`](https://github.com/CodeDotJS/pufetch)__ `:` `The best youtube playlist url scrapper and exporter!`

## License

MIT &copy; [Rishi Giri](http://rishigiri.ml)
