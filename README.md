# Vanilla JavaScript TreeView

[![Build Status](https://travis-ci.org/justinchmura/js-treeview.svg?branch=master)](https://travis-ci.org/justinchmura/js-treeview)[![npm version](https://badge.fury.io/js/js-treeview.svg)](https://badge.fury.io/js/js-treeview)

A stupid, simple tree view written with vanilla JS. I needed a lightweight control that just displayed data in a tree form and out popped this. I wrote a [post on my blog](http://justinchmura.com/2014/07/03/javascript-tree-view/) that goes into more depth.

## Dependencies

None. I built this using only plain JavaScript so there's no external dependencies. Other than the CSS required for styling.

## Example Usage

If used outside of NPM/require, it will attach a global `TreeVew` object to `window`. If done using NPM, then it can be included using `require` like everything else. To install it via NPM:

```bash
npm install js-treeview
```

### HTML

```html
<div id="tree"></div>
```

### JavaScript

```js

// NPM
var TreeView = require('js-treeview');

var tree = new TreeView([
    { name: 'Item 1', children: [] },
    { name: 'Item 2', expanded: true, children: [
            { name: 'Sub Item 1', children: [] },
            { name: 'Sub Item 2', children: [] }
        ]
    }
], 'tree');
```

## Options

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `array` | The array of items to populate the tree with. Each item is required to have a `name` and a `children` array. An optional `expanded` option allows you to default the child to be expanded when created. |
| `id` | `string|object` | ID of the DOM element, or the DOM element itself, to render the tree in. |

## Events

| Name  | Arguments | Description |
| ----- | --------- | ----------- |
| `expand` | `target` - The DOM node that initiated the expand<br>`leaves` - Array of leaf DOM nodes under the target | Fires when a leaf is expanded. |
| `expandAll` | No arguments | Fires after the `expandAll` method is called. |
| `collapse` | `target` - The DOM node that initiated the collapse<br>`leaves` - Array of leaf DOM nodes under the target | Fires when a leaf is collapsed. |
| `collapseAll` | No arguments | Fires after the `collapseAll` method is called. |
| `select` | `target` - The DOM node selected<br>`data` - Data node associated with the selected element | Fires when a outermost leaf is selected. Contains data item of the leaf selected. |

### Usage

```js
tree.on('select', function (e) {
    console.log(JSON.stringify(e));
});
```

[CodePen Example](http://codepen.io/justinchmura/pen/PZzBOP/)

## License

This plugin is available under [the MIT license](http://mths.be/mit).
