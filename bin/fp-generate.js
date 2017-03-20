#!/usr/bin/env node

const path = require('path')
const cli = require('commander')
const packageInfo = require('./../package.json')
const settings = require('../lib/settings')
const logger = require('./logger')

cli
	.version(packageInfo.version)
	.usage('[options]')
	.description('Create static files.')
	.option('-f, --frame <Frame>', 'Specifiy installed Frame other than settings or local file to use.')
	.parse(process.argv)

//Require frame specified by option or settings.
let frame
if(cli.frame) {
	try {
		frame = require(path.join(process.cwd(), cli.frame))
	} catch (e) {
		frameCatch(e, cli.frame)
	}
} else {
	const frameName = (settings.frame !== undefined && settings.frame !== 'default') ? settings.frame : './defaultFrame'
	try {
		frame = require(frameName)
	} catch (e) {
		frameCatch(e, frameName)
	}

}

/**
 *   Handling errors while trying to load a frame.
 *   @param  {Error} e
 *   @param  {String} frameName
 */
function frameCatch(e, frameName) {
	console.log(e);
	if(e.code === 'MODULE_NOT_FOUND') {
		logger.log(`The frame you tried to use (${frameName}) could not be found. Please make sure it is installed.`)
	} else {
		logger.error(e, {context: 'loading a frame.'})
	}
	process.exit(1)
}

frame()
