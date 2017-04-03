/**
 *   Apply wrap content into a layout.
 *
 *   By default this uses simple ES6 template literals.
 *
 *   @module filepress/layouts
 */

const fs = require('fs-extra')
const settings = require('../settings')
const path = require('path')
const html = require('../util/html')

//We can already copy over static files.
const themesFolder = path.join(process.cwd(), settings.themesFolder, settings.theme)
fs.copy(themesFolder, settings.destinationFolder, {
	filter: (path) => !/.*layouts.*/.test(path)
}, (err) => {
	console.log('COPYING IS DONE NOW :)');
	if(err) console.log(err) //TODO
})

//Lets have a cache for template we already read once.
const templateCache = new Map()

//The general Layout should be present from the start.
const layoutsFolder = path.join(themesFolder, 'layouts')
templateCache.set('layout', fs.readFileSync(path.join(layoutsFolder, 'layout.html')))

const layouts = () => (page, site) => {
    if (page.extension !== '.html' || page.layout === undefined) return page
	if(!templateCache.has(page.layout)) {

		//Load not cached template.
		const template = fs.readFileSync(path.join(layoutsFolder, `${page.layout}.html`))
		templateCache.set(page.layout, template)
	}

	//First use the template then apply the general layout.
	const template = templateCache.get(page.layout)
    page.content = eval(`html\`${template}\``)
	const layout = templateCache.get('layout')
	page.content = eval(`html\`${layout}\``)

    return page
}

module.exports = layouts
