/**
 *   Create a very simple Archive listing all posts of a blog.
 *
 */

const html = require('../util/html')
const posts = []

const buildIndex = () => (page, site) => {
	if(page.last === true) {
		return {
			title: 'Archive',
			layout: 'archive',
			content: '',
			posts: posts.sort((a,b) => a.date < b.date),
			extension: '.html',
			path: 'archive/index',
			link: 'archive'
		}
	} else {
		posts.push({
			title: page.title,
			link: page.link,
			date: page.date,
			year: page.year,
			month: page.month
		})
	}
}

module.exports = buildIndex
