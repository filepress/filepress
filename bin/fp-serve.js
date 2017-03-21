#!/usr/bin/env node

const cli = require('commander')
const packageInfo = require('../package.json')
const settings = require('../lib/settings')
const logger = require('../lib/util/logger')
const liveServer = require('live-server')
const generator = require('../lib/util/generator')

/*
Serve the content from the dist folder using live-reload on thsoe file
option to run generate using an observation on the source files
 */

 cli
 	.version(packageInfo.version)
 	.usage('[options]')
 	.description('Locally serve your generated website.')
	.option('-g, --generate', 'Generate static files again when source files change.')
	.option('-f, --frame <Frame>', 'Specifiy installed Frame other than settings or local file to use.')
 	.parse(process.argv)

if(cli.generate) {

	//Call generator with right frame and true to watch for changes.
	generator(cli.frame ? cli.frame : generator.standardFrame, true)
}

logger.log('Starting local server...')

liveServer.start({
	root: settings.destinationFolder
})
