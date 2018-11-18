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

		if (!opt) {
			opt = Object.keys(tag);
		}

		const prefixUrl = (holder, marks) => holder === 'url' ? `${url}${marks}` : marks;

		const multipleDetails = Array.isArray(opt);

		arr.playlist = thumb.map((index, el) => {
			if (multipleDetails) {
				return opt.reduce((prev, holder) => {
					prev[holder] = prefixUrl(holder, el.attribs[tag[holder]]);
					return prev;
				}, {});
			}
			return prefixUrl(opt, el.attribs[tag[opt]]);
		}).get();

		return {data: arr};
	});
};
