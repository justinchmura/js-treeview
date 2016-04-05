(function ($) {
  'use strict';

  var tree;
  var data = [
    { name: 'Vegetables', children: [] },
    { name: 'Fruits', expanded: true, children: [
        { name: 'Apple', children: [] },
        { name: 'Orange', children: [] },
        { name: 'Lemon', children: [] }
      ]
    },
    { name: 'Candy', expanded: true, children: [
        { name: 'Gummies', children: [] },
        { name: 'Chocolate', expanded: true, children: [
            { name: 'M & M\'s', children: [] },
            { name: 'Hershey Bar', children: [] }
          ]
        }
      ]
    },
    { name: 'Bread', children: [] }
  ];

  function setup() {
    tree = new TreeView(data, 'treeview');
  }

  module('init', { setup: setup });

  test('creates leaf for each item', function () {
    var leafCount = $('.tree-leaf-text').length;
    equal(leafCount, 11, 'Proper amount of leaves');
  });

  test('creates expando for each item with children', function () {
    var expandoCount = $('.tree-expando').not('.hidden').length;
    equal(expandoCount, 3, 'Proper amount of expandos');
  });

  module('events', { setup: setup });

  asyncTest('emits "expand" event when leaf is expanded', function () {
    var $expando = $('.tree-leaf-text:contains("Candy")').first().siblings('.tree-expando');
    $expando.click(); // Collapse it first
    tree.on('expand', function (e) {
      ok(true, 'Expand emitted');
      start();
    });
    $expando.click(); // Expand leaf
  });

  asyncTest('emits "collapse" event when leaf is collapsed', function () {
    var $expando = $('.tree-leaf-text:contains("Candy")').first().siblings('.tree-expando');
    tree.on('collapse', function (e) {
      ok(true, 'Collapse emitted');
      start();
    });
    $expando.click(); // Collapse leaf
  });

  asyncTest('emits "select" event when a leaf is clicked', function () {
    var $leaf = $('.tree-leaf-text:contains("Orange")');
    tree.on('select', function (e) {
      ok(true, 'Select emitted');
      equal(e.data.name, 'Orange', 'Proper leaf clicked');
      equal(e.data.children.length, 0, 'No children on leaf');
      start();
    });
    $leaf.click();
  });

  asyncTest('emits "expandAll" event when expandAll method is called', function () {
    tree.on('expandAll', function () {
      ok(true, 'expandAll emitted');
      start();
    });
    tree.expandAll();
  });

  asyncTest('emits "collapseAll" event when collapseAll method is called', function () {
    tree.on('collapseAll', function () {
      ok(true, 'collapseAll emitted');
      start();
    });
    tree.collapseAll();
  });

}(window.jQuery));
