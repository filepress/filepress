/**
 *   Simple logging tool.
 *
 *   Yeah it should have more and probably use winston to log all the stuff.
 *   But honestly who has the time for that and this works for now.
 *   Once we figure out what information would be nice for debugging we should
 *   set it up to be able to produce detailed logs we can use to help users with
 *   their issues.
 *
 *   For now this logs errors to a file and tells uses to provide that and
 *   where to do so. Nice to have a central point for a help URL.
 */

const path = require('path')
const packageInfo = require('./../package.json')
const fs = require('fs')

const errorLogPath = path.resolve(path.join(process.cwd(), 'error.log'))

const logger = {
	errorLogPath
}

logger.log = (msg, data) => {
	console.log(msg, (data !== undefined && Object.keys(data).length > 0) ? JSON.stringify(data, null, 2) : '')
}

logger.error = (msg, data = {}) => {
	const helpMSG = msg + '\nYou might find help at https://github.com/filepress/filepress/issues\nPlease include the "error.log" file in any requests.'
	logger.log(helpMSG, data)
	data.version = packageInfo.version
	data.msg = msg
	fs.appendFile(errorLogPath, JSON.stringify(data) + '\n', 'utf-8', (err) => {
		if(err) throw err

		//End once an error was received.
		process.exit(1)
	})
}

module.exports = logger
