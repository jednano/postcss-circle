# postcss-circle

<img align="right" width="135" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/logo-leftp.png">

[![Travis Build Status](https://img.shields.io/travis/jedmao/postcss-circle.svg?label=unix%20build)](https://travis-ci.org/jedmao/postcss-circle)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/jedmao/postcss-circle.svg?label=windows%20build)](https://ci.appveyor.com/project/jedmao/postcss-circle)
[![npm version](https://badge.fury.io/js/postcss-circle.svg)](http://badge.fury.io/js/postcss-circle)
[![npm license](http://img.shields.io/npm/l/postcss-circle.svg?style=flat-square)](https://www.npmjs.org/package/postcss-circle)

[![Code Climate](https://codeclimate.com/github/jedmao/postcss-circle/badges/gpa.svg)](https://codeclimate.com/github/jedmao/postcss-circle)
[![Test Coverage](https://codeclimate.com/github/jedmao/postcss-circle/badges/coverage.svg)](https://codeclimate.com/github/jedmao/postcss-circle)

[![npm](https://nodei.co/npm/postcss-circle.svg?downloads=true)](https://nodei.co/npm/postcss-circle/)

[PostCSS](https://github.com/postcss/postcss) plugin to insert a circle with color.

## Introduction

Creating a circle in CSS [isn't terribly difficult](http://davidwalsh.name/css-circles); however, it could be easier and more expressive:

```css
.circle {
	@circle {
		diameter: 100px;
		color: red;
	}
}
```

This transpiles into:

```css
.circle {
	border-radius: 50%;
	width: 100px;
	height: 100px;
	background-color: red;
}
```

That's it, really.

## Installation

```
$ npm install postcss-circle
```

## Usage

### JavaScript

```js
postcss([
	require('postcss-circle'),
	// more plugins...
])
```

### TypeScript

```ts
///<reference path="node_modules/postcss-circle/.d.ts" />
import postcssCircle = require('postcss-circle');

postcss([
	postcssCircle,
	// more plugins...
])
```

## Options

None at this time.

## Testing

Run the following command:

```
$ ./scripts/test
```

This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.

### Watching

For much faster development cycles, run the following command:

```
$ ./scripts/watch
```

This will build scripts, run tests and watch for changes.
