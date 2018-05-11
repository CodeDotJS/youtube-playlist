import test from 'ava';
import m from './';

const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';
const base = 'https://youtube.com/watch?v=';

test('getId', async t => {
	const ids = await m(url, 'id');

	t.is(ids.data.playlist[0], 'bgU7FeiWKzc');
	t.is(ids.data.playlist[1], '3PUVr8jFMGg');
	t.is(ids.data.playlist[2], '3pXVHRT-amw');
	t.is(ids.data.playlist[3], 'KOVc5o5kURE');
});

test('getUrl', async t => {
	const urls = await m(url, 'url');

	t.is(urls.data.playlist[0], `${base}bgU7FeiWKzc`);
	t.is(urls.data.playlist[1], `${base}3PUVr8jFMGg`);
	t.is(urls.data.playlist[2], `${base}3pXVHRT-amw`);
	t.is(urls.data.playlist[3], `${base}KOVc5o5kURE`);
});

test('getNames', async t => {
	const names = await m(url, 'name');

	t.is(names.data.playlist[0], `Singleton Design Pattern - Beau teaches JavaScript`);
	t.is(names.data.playlist[1], `Observer Design Pattern - Beau teaches JavaScript`);
	t.is(names.data.playlist[2], `Module Design Pattern - Beau teaches JavaScript`);
	t.is(names.data.playlist[3], `Mediator Design Pattern - Beau teaches JavaScript`);
});
