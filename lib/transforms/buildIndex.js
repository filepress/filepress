/**
 *   Create a very simple index listing all posts of a blog.
 *
 *   @module filepress/buildIndex
 */

const html = require('./html')
const posts = []

const buildIndex = () => (page, site) => {
	if(page.last === true) {
		return {
			title: 'Index',
			layout: 'index',
			content: '',
			posts: posts.sort((a,b) => a.date < b.date),
			extension: '.html',
			path: 'index',
			link: '/'
		}
	} else if(page.layout === 'post') {
		posts.push({
			title: page.title,
			content: page.content,
			excerpt: page.excerpt,
			link: page.link
		})
	}
}

module.exports = buildIndex
