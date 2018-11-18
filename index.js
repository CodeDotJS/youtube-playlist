'use strict';

const got = require('got');
const cheerio = require('cheerio');

const url = 'https://youtube.com/watch?v=';

const tag = {
	name: 'data-title',
	url: 'data-video-id',
	id: 'data-video-id'
};

const splitCurrentPlay = str => {
	return str.indexOf('watch') === -1 ? str : `https://www.youtube.com/playlist?list=${str.split('&list=')[1].split('&t=')[0]}`;
};

module.exports = (data, opt) => {
	return got(splitCurrentPlay(data)).then(res => {
		const $ = cheerio.load(res.body);
		const thumb = $('tr');
		const arr = {playlist: []};

		const def = (cuts, marks) => {
			return cuts === 'url' ? arr.playlist.push(`${url}${marks}`) : arr.playlist.push(marks);
		};

		const multipleDetails = Array.isArray(opt);

		for (let i = 0; i < thumb.length; i++) {
			let data;
			if (multipleDetails) {
				data = {};
				opt.forEach(holder => {
					data[holder] = thumb.eq(i).attr(tag[holder]);
				});
			} else {
				data = thumb.eq(i).attr(tag[opt]);
			}
			def(opt, data);
		}
		return {data: arr};
	});
};
