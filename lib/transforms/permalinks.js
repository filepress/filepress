const logger = require('../util/logger')

const permalinks = () => {

	let warnedPosts = false

    return (page, site) => {
        if (page.layout !== undefined && page.layout === 'post') {
            const reg = /:(\w+)/g
            if (site.postLinks !== undefined) {
                page.path = site.postLinks.replace(reg, (match, submatch) => {
                    if (page[submatch] === undefined) {

                        //Template string wants to use an attribute that is not present.
						if(!warnedPosts) {
							logger.warn(`Permalinks tried to use an attribute post did not posses (${submatch}).`)
							warnedPosts = true
						}
                        return submatch
                    } else {
                        return page[submatch]
                    }
                })
                page.path += `/index`
            }
            return page
        } else {
            return page
        }
    }
}

module.exports = permalinks
