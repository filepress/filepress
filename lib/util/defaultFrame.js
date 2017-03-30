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

module.exports = () => {
	filepress
		.use(frontmatter())
		.use(permalinks())
		.use(markdown())
		.use(excerpt())
		.observe(buildIndex())
		.observe(buildArchive())
		.use(themes())
		.use(write(settings.destinationFolder))
		.start(settings.sourceFolder)
}
