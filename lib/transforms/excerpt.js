/**
 *   Create excerpts for posts.
 *
 *   Excerpts can be marked by "<!-- more -->" in markdown files.
 */

const excerpts = () => (page, site) => {
	if(page.layout !== 'post') return page
	const regex = /<!--\s*more\s*-->/
	page.excerpt = (page.content.match(regex) !== null) ? page.content.split(regex)[0] : page.content
	return page
}
module.exports = excerpts
