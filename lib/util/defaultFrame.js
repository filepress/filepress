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
const prevNextPost = filepress.prevNextPost

//Define a logger which can have it's formatting configured.
const logger = (indents = 2) => (obj) => {
    console.log('logging:', JSON.stringify(obj, null, indents))
    return obj
}

module.exports = () => {
	filepress
		.use(frontmatter())
		.use(permalinks())
		.use(markdown())
		.use(excerpt())
		.use(buildIndex())
	//	.use(buildArchive())
	//	.use(prevNextPost())
	//	.use(themes())
	//	.use(write(settings.destinationFolder))
	.use(logger())
		.start(settings.sourceFolder)
}
