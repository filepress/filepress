/**
 *   Transform to convert markdown into html.
 *
 *   @module filepress/markdown
 */

const hljs = require('highlight.js')

//Configure Markdown-it
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>'
            } catch (__) {}
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
})
md.use(require('markdown-it-emoji'))
	.use(require('markdown-it-sub'))
	.use(require('markdown-it-sup'))
	.use(require('markdown-it-footnote'))

/**
 *   Transform to convert markdown to html.
 *   @return {[type]} Stream object
 */
const markdown = () => (obj) => {
	if(!obj.extension === '.md') return obj
    const markdown = obj.content
    obj.content = md.render(markdown)
    obj.extension = '.html'
    return obj
}

module.exports = markdown
