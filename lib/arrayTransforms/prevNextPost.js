const prevNextPost = () => (pages, site) => {
	const sortedPosts = pages.filter(page => page.layout === 'post').sort((a,b) => a.date < b.date)
	pages.map(page => {
		if(page.layout === 'post') {
			const index = sortedPosts.findIndex(post => post.path === page.path)
			page.previousPostLink = (index <= 0) ? undefined : sortedPosts[index - 1].link
			page.nextPostLink = (index >= (sortedPosts.length - 1)) ? undefined : sortedPosts[index + 1].link
		}
		return page
	})
	return pages
}

module.exports = prevNextPost
