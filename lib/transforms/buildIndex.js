/**
 *   Create a very simple index listing all posts of a blog.
 *
 *   @module filepress/buildIndex
 */

const html = require('./html')

//TODO really generate something indexing all posts
const buildIndex = () => (pages, site) => {
	const content = html`<ul>
		${pages.filter(page => page.layout === 'post').sort((a,b) => {a.date < b.date}).map(post => {
			return html`<li><a href="${post.link}"><h1>${post.title}</h1></a>${post.excerpt ? post.excerpt : post.content}</li>`
		})}
	</ul>`
	pages.push({
		title: site.title,
		date: Date.now(),
		layout: 'index',
		content,
		extension: '.html',
		path: 'index'
	})
	return pages
}

module.exports = buildIndex
