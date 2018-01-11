const LAST = require('../filepress').LAST
const posts = []

const prevNextPost = () => (page, site) => {
	if(page === LAST) {
		const sortedPosts = posts.sort((a,b) => a.date < b.date)
		posts.forEach(post => {
			const index = sortedPosts.findIndex(indexPost => indexPost.path === post.path)
			post.previousPostLink = (index <= 0) ? undefined : sortedPosts[index - 1].link
			post.nextPostLink = (index >= (sortedPosts.length - 1)) ? undefined : sortedPosts[index + 1].link
		})
		return posts.concat([page])
	}
	if (page.layout === 'post') {
		posts.push(page)
		return false
	} else {
		return page
	}

}

module.exports = prevNextPost
