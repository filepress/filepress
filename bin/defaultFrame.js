const filepress = require('../lib/filepress')

const frontmatter = filepress.frontmatter
const markdown = filepress.markdown
const layouts = filepress.layouts
const buildIndex = filepress.buildIndex
const write = filepress.write
const settings = filepress.settings

module.exports = function() {
	filepress(settings.sourceFolder)
		.use(frontmatter())
		.use(markdown())
		.use(layouts())
		.use(write(settings.destinationFolder))
		.collect()
		.use(buildIndex())
		.seperate()
		.use(write(settings.destinationFolder))
		.use(layouts())
		.end()
}
