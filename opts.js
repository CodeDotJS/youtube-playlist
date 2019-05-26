'use strict';

const ytlist = require('./index.js');

const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';

const func = (data, opt) => {
	return ytlist(data, opt).then(res => {
		console.log(res.data.playlist);
	});
};

func(url, 'id');
func(url, 'name');
func(url, 'url');
func(url, 'duration');
func(url, ['id', 'name', 'url', 'duration']);
