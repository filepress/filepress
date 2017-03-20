#!/usr/bin/env node

const cli = require('commander')
const packageInfo = require('./../package.json')

cli
	.version(packageInfo.version)
	.usage('[cmd] [options]')
	.description('Manage your markdown based blog or website.')
	.command('init [Frame]', 'initialize a new blog/website in the current folder.')
	.command('new [design] <title>', 'Create a new markdown file.')
	.command('serve [options]', 'Open generated website in default browser.')
	.command('generate', 'Create the static website.')
	.parse(process.argv)
