/* eslint-disable */
export default function getBasePath() {
	if (window.__pathname_prefix__) {
		return window.__pathname_prefix__
	}
	const baseUrl = document.querySelector('head > base').href
	const basePath = `${baseUrl.replace(window.location.origin, '')}`
	window.__pathname_prefix__ = basePath
	console.log(window.__pathname_prefix__)
	return window.__pathname_prefix__
}
