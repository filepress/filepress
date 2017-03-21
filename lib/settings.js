/*
	Module to load the settings.
 */

const path = require('path')
const YAML = require('yamljs')
const fs = require('fs')

let jsonSettings = {}
const jsonSettingsPath = path.join(process.cwd(), 'filepress.json')
try {
	jsonSettings = require(jsonSettingsPath)
} catch (e) {

}

let ymlSettings = {}
const ymlSettingsPath = path.join(process.cwd(), 'filepress.yml')
try {
	const rawYML = fs.readFileSync(ymlSettingsPath, 'utf-8')
	ymlSettings = YAML.parse(rawYML)
} catch (e) {

}

//Some things we should make usre exist.
const defaultSettings = {
	frame: 'default',
	sourceFolder: 'source',
	destinationFolder: 'dist',
	draftFolder: 'draft',
	defaultLayout: 'post',
	templatesFolder: 'templates'
}

const settings = Object.assign(defaultSettings, jsonSettings, ymlSettings)

module.exports = settings
