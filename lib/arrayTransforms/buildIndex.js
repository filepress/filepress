/**
 *   Create a very simple index listing all posts of a blog.
 *
 *   @module filepress/buildIndex
 */

const buildIndex = () => (pages, site) => {
	const posts = pages.filter(page => page.layout === 'post')
		.sort((a,b) => a.date < b.date)
	pages.push({
		title: 'Index',
		date: Date.now(),
		layout: 'index',
		content: '',
		posts,
		extension: '.html',
		path: 'index',
		link: '/'
	})
	return pages
}

module.exports = buildIndex
