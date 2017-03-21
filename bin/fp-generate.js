#!/usr/bin/env node

const path = require('path')
const cli = require('commander')
const packageInfo = require('./../package.json')
const logger = require('../lib/util/logger')
const generator = require('../lib/util/generator')

cli
	.version(packageInfo.version)
	.usage('[options]')
	.description('Create static files.')
	.option('-f, --frame <Frame>', 'Specifiy installed Frame other than settings or local file to use.')
	.option('-w, --watch', 'Watch source files for change and generate again.')
	.parse(process.argv)

const cliFrame = (cli.frame !== undefined) ? path.join(process.cwd(), cli.frame) : false

logger.log(`Starting generator...`)
logger.debug(`CLI provided generator settings:`, {
	frame: cli.frame,
	cliFrame,
	watch: cli.watch
})
generator(cliFrame ? cliFrame : generator.standardFrame, cli.watch)
