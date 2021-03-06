//A quick and dirty manual test.

const filepress = require('../lib/filepress')
const frontmatter = filepress.frontmatter
const markdown = filepress.markdown
const themes = filepress.themes
const buildIndex = filepress.buildIndex
const write = filepress.write
const permalinks = filepress.permalinks
const excerpt = filepress.excerpt
const buildArchive = filepress.buildArchive

//Define a logger which can have it's formatting configured.
const logger = (indents) => (obj) => {
    console.log('logging:', JSON.stringify(obj, null, indents))
    return obj
}

module.exports = () => {
	filepress
		.use(frontmatter())
		.use(permalinks())
		.use(markdown())
		.use(excerpt())
		.observe(buildIndex())
		.observe(buildArchive())
		.use(themes())
		.use(write('./dist'))
		.start('./source')
}
