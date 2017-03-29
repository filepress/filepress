const filepress = require('../filepress')

const frontmatter = filepress.frontmatter
const markdown = filepress.markdown
const themes = filepress.themes
const buildIndex = filepress.buildIndex
const write = filepress.write
const permalinks = filepress.permalinks
const excerpt = filepress.excerpt
const buildArchive = filepress.buildArchive
const settings = filepress.settings

module.exports = function() {
	filepress(settings.sourceFolder)
		.use(frontmatter())
		.use(permalinks())
		.use(markdown())
		.use(excerpt())
		.collect()
		.use(buildIndex())
		.use(buildArchive())
		.seperate()
		.use(themes())
		.use(write(settings.destinationFolder))
		.end()
}
