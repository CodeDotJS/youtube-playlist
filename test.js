import test from 'ava';
import m from './';

const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';
const urlWithPrivateVideos = 'https://www.youtube.com/playlist?list=PLtKALR6MChByCrbKkdxWwPOOMqM2ECPDv';
const base = 'https://youtube.com/watch?v=';

const mock = {
	playlistName: 'Design Patterns - Beau teaches JavaScript',
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

test('getAllDetails', async t => {
	const videos = await m(url, ['name', 'id', 'url']);
	videos.data.playlist.forEach((video, i) => {
		t.is(video.name, mock.names[i]);
		t.is(video.id, mock.ids[i]);
		t.is(video.url, `${base}${mock.ids[i]}`);
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

test('return isPrivate', async t => {
	const videos = await m(urlWithPrivateVideos);
	t.deepEqual(videos.data.playlist.map(video => video.isPrivate), [true, false, true]);
});

test('playlist name', async t => {
	const videos = await m(url);
	t.is(videos.data.name, mock.playlistName);
});
