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
const logger = (indents) => (objs) => {
    console.log('logging:', JSON.stringify(objs, null, indents))
    return objs
}

module.exports = () => {
	filepress
		//.use(frontmatter())
		.use(logger(2))
	/*	.use(permalinks())
		.use(markdown())
		.use(excerpt())
		.use(buildIndex())
		.use(buildArchive())
		.use(themes())
		.use(write('./dist'))*/
		.start('./source')
}
