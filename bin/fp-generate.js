#!/usr/bin/env node

const path = require('path')
const cli = require('commander')
const packageInfo = require('./../package.json')
const settings = require('../lib/settings')

cli
	.version(packageInfo.version)
	.usage('[options]')
	.description('Create static files.')
	.option('-m, --mode <mode>', 'Specifiy installed mode other than settings or local file to use.')
	.parse(process.argv)

//Require mode specified by option or settings.
let mode
if(cli.mode) {
	try {
		mode = require(path.join(process.cwd(), cli.mode))
	} catch (e) {
		modeCatch(e, cli.mode)
	}
} else {
	const modeName = (settings.mode !== undefined && settings.mode !== 'default') ? settings.mode : './defaultMode'
	try {
		mode = require(modeName)
	} catch (e) {
		modeCatch(e, modeName)
	}

}

/**
 *   Handling errors while trying to load a mode.
 *   @param  {Error} e
 *   @param  {String} modeName
 */
function modeCatch(e, modeName) {
	if(e.code === 'MODULE_NOT_FOUND') {
		console.log(`The mode you tried to use (${modeName}) could not be found. Please make sure it is installed.`)
	} else {
		console.log('An unhandled error occured.\nYou might find help at https://github.com/filepress/filepress/issues')
		console.log(e)
	}
	process.exit(1)
}

mode()
