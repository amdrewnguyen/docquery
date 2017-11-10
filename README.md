# EssLine

EssLine is a DOM JavaScript DOM interaction library. EssLine provides an API that can:
  * Select DOM element(s)
  * Manipulate DOM element(s)
  * Create `DOMNodeCollection` objects from `HTMLElement` objects
  * Build DOM elements from HTML strings
  * Make HTTP requests that return `Promise` objects

Check out the demo [here](https://amdrewnguyen.github.io/essline-demo)!

## Getting Started

To get started using EssLine, simply include `essline.js` in your source code.

```HTML
<script type="text/javascript" src="lib/essline.js"></script>
```

To compile from source, simply use the included configuration file to run [webpack](https://webpack.js.org/) bundler.

## API
  * [`_$`](#_$)
    * [`_$` function](#_$-function)
    * [`ajax`](#ajax)
  * [`DOMNodeCollection`](#domnodecollection-object)
    * [`constructor`](#constructor)
    * [DOM Selection](#dom-selection)
        * [`find`](#find)
        * [`parent`](#parent)
        * [`children`](#children)
    * [DOM Manipulation](#dom-manipulation)
        * [`html`](#html)
        * [`append`](#append)
        * [`empty`](#empty)
        * [`remove`](#remove)
        * [`val`](#val)
        * [`addClass`](#addclass)
        * [`removeClass`](#removeclass)
        * [`toggleClass`](#toggleclass)
        * [`attr`](#attr)
        * [`text`](#text)
    * [Event Listeners](#event-listeners)
        * [`on`](#on)
        * [`off`](#off)

### _$

#### `_$` function

When passed an HTML element or string containing HTML, returns a [DOMNodeCollection](#domnodecollection-object) object based on argument passed.

When passed a selector string, returns matching DOM Elements from the document.

When passed a function, sets the argument as a callback to be invoked on `DOMContentLoaded` event.

#### `ajax`

`_$.ajax(options)`

Creates an HTTP request with given options and returns a `Promise` object.

### `DOMNodeCollection` Object

#### `constructor`

`constructor(elements)`

Takes an array of HTML Elements and returns a `DOMNodeCollection` object.

#### DOM Selection

##### `find`

`find(arg)`

Takes a selector string and returns all matching elements as a `DOMNOdeCollection` object.

##### `parent`

`parent()`

Returns parents of all elements as a `DOMNodeCollection` object.

##### `children`

`children()`

Returns children of all elements as a `DOMNodeCollection` object.

#### DOM Manipulation

##### `html`

`html([arg])`

If passed an argument, sets inner HTML of all elements to argument.

If called without an argument, returns the inner HTML of the first element.

##### `append`

##### `empty`

##### `remove`

##### `val`

##### `addClass`

##### `removeClass`

##### `toggleClass`

##### `attr`

##### `text`

#### Event Listeners

##### `on`

##### `off`
