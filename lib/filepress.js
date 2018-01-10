//Let's do some statistics.
const start = Date.now()
process.on('exit', function logTime() {
    const end = Date.now()
    let dur = (end - start) / 1000
    console.log('Ran for:', dur)
})

process.on('uncaughtException', function (err) {
    console.log(err);
})

//Require a few things we need.
const _ = require('highland')
const Stream = require('stream')
const path = require('path')
const fs = require('fs-extra')
const settings = require('./settings')

let transformsToUser = []
const files = []

const filepress = {
    use: transform => {
        transformsToUser.push(transform)
        return filepress
    },
    start: (sourceFolder) => {
        const transforms = _.seq(...transformsToUser)
        const sourcePath = path.resolve(sourceFolder)
        startStream(sourcePath)
            .map(filePath => ({
                sourcePath: filePath,

                //Path to file without extension, at first same as link.
                path: path.relative(sourcePath, filePath).replace(/\..*$/, ''),
                link: path.relative(sourcePath, filePath).replace(/\..*$/, ''),
                extension: path.parse(filePath).ext
            }))
            .flatMap(file => addMarkdown(file))
            .through(transforms)
            .done(() => {
                //TODO do something here
            })
    }
}

module.exports = filepress

function startStream(root) {
    return _(function (push, next) {
        walk(root, push, () => {
            push(null, _.nil)
        })
    })
}

/**
 *   Walks a filestructure starting from a given root and pushes all found
 *   files onto a given stream.
 *   @param  {String}   dir    - Root directory
 *   @param  {Function} push   - Push function for a highland stream
 *   @param  {Function} done   - Callback will be called with (err, foundFiles)
 */
function walk(dir, push, done) {
    fs.readdir(dir, function (err, list) {
        if (err) return done(err)
        var pending = list.length
        list.forEach(function (file) {
            file = path.resolve(dir, file)
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, push, function () {
                        if (!--pending) done()
                    })
                } else {
                    push(null, file)
                    if (!--pending) done()
                }
            })
        })
    })
}

/**
 *   Reads a given markdwon file and emits it's content in an event.
 *   @param  {String} filePath - Path to markdwon file to read
 *   @return {Stream}          - A stream with the read file
 */
function readMarkdown(filePath) {
    return _(function (push, next) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            push(err, data)
            push(null, _.nil)
        });
    });
};

/**
 *   Adds config and body of the markdwon file to mdInfos object.
 *   @param {mdInfos} obj - The Infos to work on
 */
function addMarkdownOld(obj) {
    if (obj.extension !== '.md') return obj
    return _(function (push, next) {
        readMarkdown(obj.sourcePath)
            .toCallback((err, result) => {
                obj.content = result
                push(err, obj)
                push(null, _.nil)
            })
    })
}

function addMarkdown(obj) {
    if (obj.extension !== '.md') return obj
    return new Promise((resolve, reject) => {
        fs.readFile(obj.sourcePath, 'utf8', function (err, data) {
            if (err) reject(err)
            obj.content = data
            resolve(obj)
        });
    })
}

//Export submodules that are part of the core.
//Needs to be down here so that the main export doesn't overwrite them, I think.
module.exports.buildIndex = require('./arrayTransforms/buildIndex')
module.exports.buildArchive = require('./arrayTransforms/buildArchive')
module.exports.prevNextPost = require('./arrayTransforms/prevNextPost')
module.exports.frontmatter = require('./transforms/frontmatter')
//module.exports.themes = require('./transforms/themes')
module.exports.markdown = require('./transforms/markdown')
module.exports.write = require('./transforms/write')
module.exports.permalinks = require('./transforms/permalinks')
module.exports.excerpt = require('./transforms/excerpt')
module.exports.settings = settings