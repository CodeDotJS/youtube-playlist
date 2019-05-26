import test from 'ava';
import m from './';

const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';
const base = 'https://youtube.com/watch?v=';

const mock = {
	ids: [
		'bgU7FeiWKzc',
		'3PUVr8jFMGg',
		'3pXVHRT-amw',
		'KOVc5o5kURE'
	],
	names: [
		`Singleton Design Pattern - Beau teaches JavaScript`,
		`Observer Design Pattern - Beau teaches JavaScript`,
		`Module Design Pattern - Beau teaches JavaScript`,
		`Mediator Design Pattern - Beau teaches JavaScript`
	],
	durations: [
		(4 * 60) + 51,
		(3 * 60) + 57,
		(2 * 60) + 44,
		(5 * 60) + 9
	]
};

test('getId', async t => {
	const ids = await m(url, 'id');
	ids.data.playlist.forEach((id, i) => {
		t.is(id, mock.ids[i]);
	});
});

test('getUrl', async t => {
	const urls = await m(url, 'url');
	urls.data.playlist.forEach((uurl, i) => {
		t.is(uurl, `${base}${mock.ids[i]}`);
	});
});

test('getNames', async t => {
	const names = await m(url, 'name');
	names.data.playlist.forEach((name, i) => {
		t.is(name, mock.names[i]);
	});
});

test('getDurations', async t => {
	const durations = await m(url, 'duration');
	durations.data.playlist.forEach((duration, i) => {
		t.is(duration, mock.durations[i]);
	});
});

test('getAllDetails', async t => {
	const videos = await m(url, ['name', 'id', 'url', 'duration']);
	videos.data.playlist.forEach((video, i) => {
		t.is(video.name, mock.names[i]);
		t.is(video.id, mock.ids[i]);
		t.is(video.url, `${base}${mock.ids[i]}`);
		t.is(video.duration, mock.durations[i]);
	});
});

test('getAllDetailsByDefault', async t => {
	const videos = await m(url);
	videos.data.playlist.forEach((video, i) => {
		t.is(video.name, mock.names[i]);
		t.is(video.id, mock.ids[i]);
		t.is(video.url, `${base}${mock.ids[i]}`);
	});
});
