/**
 *   Create a very simple index listing all posts of a blog.
 *
 *   @module filepress/buildIndex
 */

const LAST = require('../filepress').LAST
const posts = []

const buildIndex = () => (page, site) => {
	if(page === LAST) {
		return [
			{
				title: 'Index',
				date: Date.now(),
				layout: 'index',
				content: '',
				posts: posts.sort((a,b) => a.date < b.date),
				extension: '.html',
				path: 'index',
				link: '/'
			},
			LAST
		]
	}
	if (page.layout === 'post') posts.push(page)
	return page
}

module.exports = buildIndex
