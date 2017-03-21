#!/usr/bin/env node

const cli = require('commander')
const path = require('path')
const packageInfo = require('./../package.json')
const settings = require('../lib/settings')
const fs = require('fs-extra')
const logger = require('../lib/util//logger')

cli
    .version(packageInfo.version)
    .usage('[layout] <name> [options]')
    .description('Create a new source file.')
    .option('-d, --draft', 'Mark as a draft and move into appropriate folder.')
	.action((layout, name) => {
        if(typeof name !== 'string') {
			name = layout
			layout = settings.defaultLayout
		}
		createNewSourceFile(layout, name)
    })
	.on('--help', () => {
		console.log(`Run "fp new title" to create a new ${settings.defaultLayout} named "title".`)
		console.log(`For longer names with spaces in them make sure to surround the title with "s.`)
	})
    .parse(process.argv)

/**
 *   Create a new source file with given name and layout.
 *   @param  {String} layout The layout to use
 *   @param  {String} name   Name for new file.
 *   @return {[type]}        [description]
 */
function createNewSourceFile(layout, name) {
	const data = `---
layout: ${layout}
title: ${name}
---

`
	const filePath = path.join(process.cwd(), cli.draft ? settings.draftFolder : settings.sourceFolder, (layout === 'page') ? '.' : layout + 's', name + '.md')
	logger.debug(`Creating a new markdown file`, {
		layout,
		name,
		filePath
	})
	fs.outputFile(filePath, data, 'utf-8', (err) => {
		if(err) logger.error(err, {context: 'creating a new source file.'})
		console.log(`Successfully created "${name}"`)
	})
}
