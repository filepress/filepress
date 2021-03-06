# Documentation

This is to provide an entry into filepress development.

The name filepress references old time [letterpresses](https://en.wikipedia.org/wiki/Letterpress_printing). Before they were used to form letters into books. Now filepress is used to form files into blogs.

## Basics

filepress processes all markdown files in a given source folder and then does the following with these:

- create [blob]s for each markdown file
- pass them into a stream
- apply transformations to the [blob]s
- write new files

By passing the [blob]s throuch a stream we simply pick a way of thinking about the transformations happening to the [blob]s. This enable us a functional approach to organizing our code. We will have simple transformations which will receive and return a [blob], altering it in the process as well as a way to compose such transformations. To achieve this filepress provides:

- **use** a way to add a transformation.
- **collect** a way to pull all [blob]s into an array and work with that. This is necessary to create sites like indexes of blogs or category pages.
- **seperate** a way to spread the array out again.

There are also some build in transformations:

- **frontmatter** extracts YML formatted frontmatter.
- **markdown** parses markdown to html.
- **layouts** wraps things in a template.
- **write** write files to disc.
- **buildIndex** builds an index page for a blog.

[blob] objects will always have at leas the following attributes. Transforms may add more.

```javascript
//Example for a [blob] object in the stream.
{
  sourcePath,   //Where this file originally came from
  path,         //The path to save this file to (at first where it came from)
  extension,    //The extension of the current content
  content,      //Content of the file
  written       //If the file was already saved

  //There may be more attributes generated by transforms.
}
```

## Transformations

Transformations will likely want to be functions that take configuration parameters and return function. The function ultimately returned should accept a [blob] and return one. In between doing any transformation. This could for example be the extraction of frontmatter or the parsing of markdown content into html.

Transforms will receive each object on the stream in turn as well as an object containing information about the site that is being generated.
Transforms may return a single object or an array of objects which will be split into the contained objects for all following transforms.

A simple logger would look like this:

```javascript
const logger = () => (obj) => {

	//Log any object processed.
	console.log(obj)

	//Make sure to return the [blob] to keep running.
	return obj
}
```

Here is an example of a logger which takes a parameter to indent the logged object.

```javascript
const logger = (indents) => {

	//Return the real transformation.
	return (obj) => {

		//Log object nicely formatted with indents specified.
		console.log(JSON.stringify(obj, null, indents))
		return obj
	}
}
```

Ever since the glorious times of ES2015 we have an even shorter way of writing this.

```javascript
const logger = (indents) => (obj) => {
	console.log(JSON.stringify(obj, null, indents))
	return obj
}
```

## Frames and themes

*Frames* are what we call a using of filepress. An arranging of transforms if you so will.

Filepress provides a simple default Frame to generate a blog. Other Frames can be installed via npm. Frames are encouraged to be published as fp-Frame-[Frame name]. Frames should export any transforms they are using to the outside. (not yet sure about a best practice here)

Themes or templates are in a way just another transform but one that will be more present to our users. A Frame may provide a standard theme to go with it and usually a theme will have a specific Frame it is made for as data needed by the theme needs to be generated thus the right transforms need to be present. However it could be thinkable that a theme works for multiple Frames or that a Frame has multiple themes.

## Recommended reading

You should know about or check out:

- ES6 (ES2015)
- [JSDoc](http://usejsdoc.org/index.html)
- [Node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

It could help to know about:

- Functional programming
- [highlandJS](http://highlandjs.org/) or working with streams in general
- [CommanderJS](https://github.com/tj/commander.js/) or basis for the CLI
- [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

Or just work with us on filepress and expand your knowledge.

## Another site generator

This project was first started by [Hendrik](https://github.com/HoverBaum) and is greatly inspired by [hexo](https://hexo.io/) and [metalsmith](http://www.metalsmith.io/).

> Fully aware that many such generators exist I wanted one that runs on JS as that is what I am familiar with. I greatly like how hexo is easy to use with the CLI and how metalsmith can be configured programmatically. So I want to bring those two things together and then build even further. I also just like to build things myself ^^
