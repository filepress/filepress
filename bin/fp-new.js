#!/usr/bin/env node

const cli = require('commander')
const path = require('path')
const packageInfo = require('./../package.json')
const settings = require('../lib/settings')
const fs = require('fs-extra')

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
	fs.outputFile(filePath, data, 'utf-8', (err) => {
		//TODO errorhandling
		if(err) throw err
		console.log(`Successfully created "${name}"`)
	})
}
