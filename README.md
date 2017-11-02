# postcss-circle

<img align="right" width="135" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/logo-leftp.png">

[![NPM version](http://img.shields.io/npm/v/postcss-circle.svg?style=flat)](https://www.npmjs.org/package/postcss-circle)
[![npm license](http://img.shields.io/npm/l/postcss-circle.svg?style=flat-square)](https://www.npmjs.org/package/postcss-circle)
[![Travis Build Status](https://img.shields.io/travis/jedmao/postcss-circle.svg)](https://travis-ci.org/jedmao/postcss-circle)
[![codecov](https://codecov.io/gh/jedmao/postcss-circle/branch/master/graph/badge.svg)](https://codecov.io/gh/jedmao/postcss-circle)
[![Dependency Status](https://gemnasium.com/badges/github.com/jedmao/postcss-circle.svg)](https://gemnasium.com/github.com/jedmao/postcss-circle)

[![npm](https://nodei.co/npm/postcss-circle.svg?downloads=true)](https://nodei.co/npm/postcss-circle/)

[PostCSS](https://github.com/postcss/postcss) plugin to insert a circle with color.

## Introduction

Creating a circle in CSS [isn't terribly difficult](http://davidwalsh.name/css-circles); however, it could be easier and more expressive:

```css
.circle {
	circle: <diameter> [color];
}
```

The `diameter` is required and the `color` is optional. You don't have to remember the order, because you can swap their positions.

Let's create a `red` circle with a `100px` diameter:

```css
.circle {
	circle: 100px red;
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
postcss([ require('postcss-circle') ]);
```

### TypeScript

```ts
import * as postcssCircle from 'postcss-circle';

postcss([ postcssCircle ]);
```

## Options

None at this time.

## Testing

Run the following command:

```
$ npm test
```

This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.

### Watching

For much faster development cycles, run the following commands in 2 separate processes:

```
$ npm run build:watch
```

Compiles TypeScript source into the `./dist` folder and watches for changes.

```
$ npm run watch
```

Runs the tests in the `./dist` folder and watches for changes.
