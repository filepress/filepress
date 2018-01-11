/**
 *   Create a very simple Archive listing all posts of a blog.
 *
 */

const LAST = require('../filepress').LAST
const posts = []

const buildArchive = () => (page, site) => {
	if(page === LAST) {
		return [
			{
				title: 'Archive',
				date: Date.now(),
				layout: 'archive',
				content: '',
				posts : posts.sort((a,b) => a.date < b.date),
				extension: '.html',
				path: 'archive/index',
				link: 'archive'
			},
			LAST
		]
	}
	if (page.layout === 'post') posts.push(page)
	return page
}

module.exports = buildArchive
