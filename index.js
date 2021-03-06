// Generated by CoffeeScript 1.4.0
(function() {
  var DIST, SIDE, height, svg, vis, width;

  SIDE = 10;

  DIST = 19;

  svg = d3.select('svg');

  width = svg.node().getBoundingClientRect().width;

  height = svg.node().getBoundingClientRect().height;

  vis = svg.append('g').attr({
    transform: "translate(" + (width / 2) + ", " + (height - 5) + ")"
  });

  d3.json('miserables.json', function(data) {
    var PAD, cells, cellsize, cursor_x, cursor_x2, cursor_xcurve, cursor_y, cursor_y2, cursor_ycurve, icells, interactive_cells, labels_a, labels_b, length;
    length = data.nodes.length;
    cellsize = d3.scale.sqrt().domain([
      0, d3.max(data.links, function(d) {
        return d.value;
      })
    ]).range([0, SIDE / 1]);
    data.links.forEach(function(l) {
      l.source = data.nodes[l.source];
      return l.target = data.nodes[l.target];
    });
    data.nodes.forEach(function(d, i) {
      return d.i = i;
    });
    cursor_x = vis.append('line').style({
      display: 'none'
    }).attr({
      "class": 'cursor x',
      transform: 'rotate(-45)'
    });
    cursor_x2 = vis.append('line').style({
      display: 'none'
    }).attr({
      "class": 'cursor x',
      transform: 'rotate(-45)'
    });
    cursor_xcurve = vis.append('path').style({
      display: 'none'
    }).attr({
      "class": 'cursor x',
      d: "M0 " + (-SIDE / 2) + " C0 " + (-SIDE / 6) + " " + (SIDE / 6) + " 0 " + (SIDE / 2) + " 0"
    });
    cursor_y = vis.append('line').style({
      display: 'none'
    }).attr({
      "class": 'cursor y',
      transform: 'rotate(-45)'
    });
    cursor_y2 = vis.append('line').style({
      display: 'none'
    }).attr({
      "class": 'cursor y',
      transform: 'rotate(-45)'
    });
    cursor_ycurve = vis.append('path').style({
      display: 'none'
    }).attr({
      "class": 'cursor y',
      d: "M0 " + (-SIDE / 2) + " C0 " + (-SIDE / 6) + " " + (SIDE / 6) + " 0 " + (SIDE / 2) + " 0"
    });
    cells = vis.selectAll('.cell').data(data.links);
    cells.enter().append('circle').attr({
      "class": 'cell',
      r: function(d) {
        return cellsize(d.value);
      },
      transform: function(d) {
        return "rotate(-45) translate(" + ((d.source.i - length / 2) * DIST) + "," + ((d.target.i - length / 2) * DIST) + ")";
      }
    });
    PAD = 4;
    labels_a = vis.selectAll('.label_a').data(data.nodes.slice(1));
    labels_a.enter().append('text').each(function(d) {
      return d.label_a = d3.select(this);
    }).text(function(d) {
      return d.name;
    }).attr({
      "class": 'label label_a',
      dy: '0.35em',
      transform: function(d) {
        return "rotate(45) translate(" + (-length / 2 * DIST - PAD - DIST / 2) + "," + ((-d.i + length / 2) * DIST) + ")";
      }
    }).on('mouseenter', function(d) {
      if (d.label_a != null) {
        d.label_a.classed('highlighted_x', true);
      }
      if (d.label_b != null) {
        d.label_b.classed('highlighted_x', true);
      }
      cursor_x.style({
        display: 'inline'
      }).attr({
        x1: (d.i - length / 2) * DIST,
        x2: (d.i - length / 2) * DIST,
        y1: (-length / 2 - 0.5) * DIST,
        y2: (d.i - length / 2 - 0.5) * DIST
      });
      cursor_x2.style({
        display: 'inline'
      }).attr({
        x1: (d.i - length / 2 + 0.5) * DIST,
        x2: (+length / 2 - 0.5) * DIST,
        y1: (d.i - length / 2) * DIST,
        y2: (d.i - length / 2) * DIST
      });
      if (d.label_b != null) {
        return cursor_xcurve.style({
          display: 'inline'
        }).attr({
          transform: "rotate(-45) translate(" + ((d.i - length / 2) * DIST) + ", " + ((d.i - length / 2) * DIST) + ")"
        });
      }
    }).on('mouseleave', function(d) {
      if (d.label_a != null) {
        d.label_a.classed('highlighted_x', false);
      }
      if (d.label_b != null) {
        d.label_b.classed('highlighted_x', false);
      }
      cursor_x.style({
        display: 'none'
      });
      cursor_x2.style({
        display: 'none'
      });
      return cursor_xcurve.style({
        display: 'none'
      });
    });
    labels_b = vis.selectAll('.label_b').data(data.nodes.slice(0, -1));
    labels_b.enter().append('text').each(function(d) {
      return d.label_b = d3.select(this);
    }).text(function(d) {
      return d.name;
    }).attr({
      "class": 'label label_b',
      dy: '0.35em',
      transform: function(d) {
        return "rotate(-45) translate(" + (length / 2 * DIST + PAD - DIST / 2) + "," + ((d.i - length / 2) * DIST) + ")";
      }
    }).on('mouseenter', function(d) {
      if (d.label_a != null) {
        d.label_a.classed('highlighted_y', true);
      }
      if (d.label_b != null) {
        d.label_b.classed('highlighted_y', true);
      }
      cursor_y.style({
        display: 'inline'
      }).attr({
        x1: (d.i - length / 2 + 0.5) * DIST,
        x2: (+length / 2 - 0.5) * DIST,
        y1: (d.i - length / 2) * DIST,
        y2: (d.i - length / 2) * DIST
      });
      cursor_y2.style({
        display: 'inline'
      }).attr({
        x1: (d.i - length / 2) * DIST,
        x2: (d.i - length / 2) * DIST,
        y1: (-length / 2 - 0.5) * DIST,
        y2: (d.i - length / 2 - 0.5) * DIST
      });
      if (d.label_a != null) {
        return cursor_ycurve.style({
          display: 'inline'
        }).attr({
          transform: "rotate(-45) translate(" + ((d.i - length / 2) * DIST) + ", " + ((d.i - length / 2) * DIST) + ")"
        });
      }
    }).on('mouseleave', function(d) {
      if (d.label_a != null) {
        d.label_a.classed('highlighted_y', false);
      }
      if (d.label_b != null) {
        d.label_b.classed('highlighted_y', false);
      }
      cursor_y.style({
        display: 'none'
      });
      cursor_y2.style({
        display: 'none'
      });
      return cursor_ycurve.style({
        display: 'none'
      });
    });
    icells = [];
    d3.range(0, length).forEach(function(y) {
      return d3.range(y + 1, length).forEach(function(x) {
        return icells.push({
          x: x,
          y: y,
          source: data.nodes[x],
          target: data.nodes[y]
        });
      });
    });
    interactive_cells = vis.selectAll('.interactive_cell').data(icells);
    return interactive_cells.enter().append('rect').attr({
      "class": 'interactive_cell',
      x: -DIST / 2,
      y: -DIST / 2,
      width: DIST,
      height: DIST,
      transform: function(d) {
        return "rotate(-45) translate(" + ((d.x - length / 2) * DIST) + "," + ((d.y - length / 2) * DIST) + ")";
      }
    }).on('mouseenter', function(d) {
      if (d.source.label_a != null) {
        d.source.label_a.classed('highlighted_x', true);
      }
      if (d.target.label_a != null) {
        d.target.label_a.classed('highlighted_y', true);
      }
      if (d.source.label_b != null) {
        d.source.label_b.classed('highlighted_x', true);
      }
      if (d.target.label_b != null) {
        d.target.label_b.classed('highlighted_y', true);
      }
      cursor_x.style({
        display: 'inline'
      }).attr({
        x1: (d.x - length / 2) * DIST,
        x2: (d.x - length / 2) * DIST,
        y1: (-length / 2 - 0.5) * DIST,
        y2: (d.x - length / 2 - 0.5) * DIST
      });
      cursor_x2.style({
        display: 'inline'
      }).attr({
        x1: (d.x - length / 2 + 0.5) * DIST,
        x2: (+length / 2 - 0.5) * DIST,
        y1: (d.x - length / 2) * DIST,
        y2: (d.x - length / 2) * DIST
      });
      cursor_y.style({
        display: 'inline'
      }).attr({
        x1: (d.y - length / 2 + 0.5) * DIST,
        x2: (+length / 2 - 0.5) * DIST,
        y1: (d.y - length / 2) * DIST,
        y2: (d.y - length / 2) * DIST
      });
      cursor_y2.style({
        display: 'inline'
      }).attr({
        x1: (d.y - length / 2) * DIST,
        x2: (d.y - length / 2) * DIST,
        y1: (-length / 2 - 0.5) * DIST,
        y2: (d.y - length / 2 - 0.5) * DIST
      });
      if (d.source.label_b != null) {
        cursor_xcurve.style({
          display: 'inline'
        }).attr({
          transform: "rotate(-45) translate(" + ((d.x - length / 2) * DIST) + ", " + ((d.x - length / 2) * DIST) + ")"
        });
      }
      if (d.target.label_a != null) {
        return cursor_ycurve.style({
          display: 'inline'
        }).attr({
          transform: "rotate(-45) translate(" + ((d.y - length / 2) * DIST) + ", " + ((d.y - length / 2) * DIST) + ")"
        });
      }
    }).on('mouseleave', function(d) {
      if (d.source.label_a != null) {
        d.source.label_a.classed('highlighted_x', false);
      }
      if (d.target.label_a != null) {
        d.target.label_a.classed('highlighted_y', false);
      }
      if (d.source.label_b != null) {
        d.source.label_b.classed('highlighted_x', false);
      }
      if (d.target.label_b != null) {
        d.target.label_b.classed('highlighted_y', false);
      }
      cursor_x.style({
        display: 'none'
      });
      cursor_x2.style({
        display: 'none'
      });
      cursor_xcurve.style({
        display: 'none'
      });
      cursor_y.style({
        display: 'none'
      });
      cursor_y2.style({
        display: 'none'
      });
      return cursor_ycurve.style({
        display: 'none'
      });
    });
  });

}).call(this);
