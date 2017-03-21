const path = require('path')
const settings = require('../settings')
const chokidar = require('chokidar')
const logger = require('./logger')

const defaultFramePath = path.resolve(path.join(__dirname, 'defaultFrame'))
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
		frame = require(frameName)
		logger.debug(`Requireing frame: ${frameName}`)
	} catch (e) {
		frameCatch(e, frameName)

		//Exit when this failes.
		process.exit(1)
	} finally {

	}

	//Execute the frame and if we want to watch call it for all changes.
	frame()
	if(watch) {
		chokidar.watch('.', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
	  		frame()
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
}
