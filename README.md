# EssLine

EssLine is a JavaScript DOM interaction library. EssLine provides an API that can:
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

`append(arg)`

Appends an `HTMLElement` or `DOMNOdeCollection` object to list of children elements.

##### `empty`

`empty()`

Clears all child nodes.

##### `remove`

`remove()`

Clears all child nodes, and removes child elements.

##### `val`

`val([value])`

If present, sets the value of all elements to value argument. Otherwise, returns value of first child element.

##### `addClass`

`addClass(arg)`

Accepts a space delimited list of classes, and adds them to all elements' class lists.

##### `removeClass`

`removeClass(arg)`

Accepts a space delimited list of classes, and removes them from all elements' class lists.

##### `toggleClass`

`toggleClass(arg)`

Accepts a space delimited list of classes, and toggles them in all elements' class lists.

##### `attr`

`attr(atr, [val])`

If val argument present, sets named attribute of all elements to value. Otherwise, returns the first element's value of named attribute.

##### `text`

`text([val])`

If val argument present, sets text of all elements to value. Otherwise, returns the first element's text value.

#### Event Listeners

##### `on`

`on(listener, callback)`

Adds callback as an event handler for listener action on all elements.

##### `off`

`off(listener, callback)`

Removes callback as an event handler for listener action on all elements.
