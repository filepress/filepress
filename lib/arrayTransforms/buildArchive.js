/**
 *   Create a very simple Archive listing all posts of a blog.
 *
 */

const buildIndex = () => (pages, site) => {
	const posts = pages.filter(page => page.layout === 'post')
		.sort((a,b) => a.date < b.date)
	pages.push({
		title: 'Archive',
		date: Date.now(),
		layout: 'archive',
		content: '',
		posts,
		extension: '.html',
		path: 'archive/index',
		link: 'archive'
	})
	return pages
}

module.exports = buildIndex
