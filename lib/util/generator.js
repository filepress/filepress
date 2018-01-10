const path = require('path')
const settings = require('../settings')
const chokidar = require('chokidar')
const logger = require('./logger')

const defaultFramePath = path.resolve(path.join(__dirname, 'defaultFrame.js'))
const standardFrame =  (settings.frame !== undefined && settings.frame !== 'default') ? settings.frame : defaultFramePath

module.exports = (frameName = standardFrame, watch = false) => {

	//Help developers debug.
	logger.debug(`Generator started`, {
		frameName,
		watch
	})

	//Declare frame and try to assign it to catch uninstalled frames.
	let frame
	try {

		//Try to just require the frame.
		frame = require(frameName)
		logger.debug(`Requireing frame: ${frameName}`)
	} catch (e) {
		if(e.code === 'MODULE_NOT_FOUND') {

			//Try to require file in cwd
			frameName = path.join(frameName)
			logger.debug(`Trying to require local file`, {frameName})
			try {
				frame = require(frameName)
			} catch (e) {
				frameCatch(e, frameName)
			}
		} else {
			frameCatch(e, frameName)
		}
	} finally {

	}

	//Execute the frame and if we want to watch call it for all changes.
	frame()
	logger.log(`Ran frame`)
	if(watch) {
		logger.log(`Watching for changes...`)
		chokidar.watch(settings.sourceFolder, {ignored: /(^|[\/\\])\../}).on('change', (event, path) => {
	  		frame()
			logger.log(`Reran frame due to source file change`)
		})
	}

}
module.exports.standardFrame = standardFrame

/**
 *   Handling errors while trying to load a frame.
 *   @param  {Error} e
 *   @param  {String} frameName
 */
function frameCatch(e, frameName) {
	logger.debug(e);
	if(e.code === 'MODULE_NOT_FOUND') {
		logger.log(`The frame you tried to use (${frameName}) could not be found. Please make sure it is installed.`)
	} else {
		logger.error(e)
		logger.error('Error Infos', {context: 'loading a frame.', frameName})
	}

	//Exit when this failes.
	process.exit(1)
}
