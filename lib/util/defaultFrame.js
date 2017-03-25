const filepress = require('../filepress')

const frontmatter = filepress.frontmatter
const markdown = filepress.markdown
const layouts = filepress.layouts
const buildIndex = filepress.buildIndex
const write = filepress.write
const permalinks = filepress.permalinks
const excerpt = filepress.excerpt
const settings = filepress.settings

module.exports = function() {
	filepress(settings.sourceFolder)
		.use(frontmatter())
		.use(permalinks())
		.use(markdown())
		.use(excerpt())
		.collect()
		.use(buildIndex())
		.seperate()
		.use(layouts())
		.use(write(settings.destinationFolder))
		.use(layouts())
		.end()
}
