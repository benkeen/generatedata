/*!
 * Spinners 3.0.0
 * (c) 2010-2012 Nick Stakenburg - http://www.nickstakenburg.com
 *
 * Spinners is freely distributable under the terms of an MIT-style license.
 *
 * GitHub: http://github.com/staaky/spinners
 */

// TODO: Add background option that creates a ring, disabled by default:
//       background: { color: '#fff', opacity: .5, padding: 3 }
// TODO: Only draw at 60fps for a more accurate rotation time, in some 
//       cases frames should be skipped.
// TODO: Add support for simple and complex gradients to the color option:
//       color: ['#ff000', '#00ff00', '#0000ff']
//       color: [
//         { position: .0,  color: '#ff0000', opacity: 1 },
//         { position: .75, color: '#00ff00', opacity: .5 },
//         { position: 1,   color: '#0000ff', opacity: 0 }
//       ]

;var Spinners = {
  version: '3.0.0'
};

(function($) {
// Helpers
var _ = {
  scroll: function(array, distance) {
    if (!distance) return array;
    var first = array.slice(0, distance),
        last  = array.slice(distance, array.length);
    return last.concat(first);
  },
  
  isElement: function(object) {
    return object && object.nodeType == 1;
  },

  element: {
    isAttached: (function() {
      function findTopAncestor(element) {
        var ancestor = element;
        while(ancestor && ancestor.parentNode) {
          ancestor = ancestor.parentNode;
        }
        return ancestor;
      }
      
      return function(element) {
        var topAncestor = findTopAncestor(element);
        return !!(topAncestor && topAncestor.body);
      };
    })()
  }
};

function getOpacityArray(dashes, fadeOutSpeed) {
  var step = 1 / dashes, array = [];
  for (var i = 0; i<dashes;i++) {
    array.push((i + fadeOutSpeed) * step);
  }
  return array;
}

/*
 * Math
 */
function pyth(a,b) { return Math.sqrt(a*a + b*b); }
function degrees(radian) { return (radian*180) / Math.PI; }
function radian(degrees) { return (degrees*Math.PI) / 180; }

/*
 * Canvas
 */
var Canvas = {
  drawRoundedRectangle: function(ctx) {
    var options = $.extend({
      top:    0,
      left:   0,
      width:  0,
      height: 0,
      radius: 0
    }, arguments[1] || {});

    var o      = options,
        left   = o.left,
        top    = o.top,
        width  = o.width,
        height = o.height,
        radius = o.radius;

    ctx.beginPath();

    ctx.moveTo(left + radius, top);
    ctx.arc(left + width - radius, top + radius, radius, radian(-90), radian(0), false);
    ctx.arc(left + width - radius, top + height - radius, radius, radian(0), radian(90), false);
    ctx.arc(left + radius, top + height - radius, radius, radian(90), radian(180), false);
    ctx.arc(left + radius, top + radius, radius, radian(-180), radian(-90), false);

    ctx.closePath();

    ctx.fill();
  }
};

/*
 * Color
 */
var Color = (function() {
  var hexNumber = '0123456789abcdef',
      hexRegExp = new RegExp('[' + hexNumber + ']', 'g');

  function returnRGB(rgb) {
    var result = rgb;
    result.red = rgb[0];
    result.green = rgb[1];
    result.blue = rgb[2];
    return result;
  }

  function h2d(h) { return parseInt(h,16); }

  function hex2rgb(hex) {
    var rgb = [];

    if (hex.indexOf('#') == 0) hex = hex.substring(1);
    hex = hex.toLowerCase();

    if (hex.replace(hexRegExp, '') != '')
    return null;

    if (hex.length == 3) {
      rgb[0] = hex.charAt(0) + hex.charAt(0);
      rgb[1] = hex.charAt(1) + hex.charAt(1);
      rgb[2] = hex.charAt(2) + hex.charAt(2);
    } else {
      rgb[0] = hex.substring(0, 2);
      rgb[1] = hex.substring(2, 4);
      rgb[2] = hex.substring(4);
    }
    for(var i = 0; i < rgb.length; i++)
      rgb[i] = h2d(rgb[i]);

    return returnRGB(rgb);
  }

  function hex2rgba(hex, opacity) {
    var rgba = hex2rgb(hex);
    rgba[3] = opacity;
    rgba.opacity = opacity;
    return rgba;
  }

  function hex2fill(hex, opacity) {
    if (typeof opacity == 'undefined') opacity = 1;
    return "rgba(" + hex2rgba(hex, opacity).join() + ")";
  }

  var rgb2hex = (function() {
    function toPaddedString(string, length, radix) {
      string = (string).toString(radix || 10);
      return (new Array(length - string.length).join('0')) + string;
    }

    return function(red, green, blue) {
      return '#' + toPaddedString(red, 2, 16) +
                   toPaddedString(green, 2, 16) +
                   toPaddedString(blue, 2, 16);
    };
  })();

  return {
    hex2rgb:  hex2rgb,
    hex2fill: hex2fill,
    rgb2hex:  rgb2hex
  };
})();


/*
 * Spinners
 */
$.extend(Spinners, {
  enabled: false,

  support: {
    canvas: (function() {
      var canvas = $('<canvas>')[0];
      return !!(canvas.getContext && canvas.getContext('2d'));
    })()
  },

  init: function() {
    // require (ex)canvas
    if (!(this.support.canvas ||
          (!!window.G_vmlCanvasManager && 
           !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)))) {
      return;
    }

    // make sure excanvas is initialized
    (window.G_vmlCanvasManager && window.G_vmlCanvasManager.init_(document));

    this.enabled = true;
  },

  create: function(element, options) {
    Collection.create(element, options);
    return this.get(element);
  },

  get: function(element) { return new Collection(element); },

  play: function(element)   { this.get(element).play(); return this; },
  pause: function(element)  { this.get(element).pause(); return this; },
  toggle: function(element) { this.get(element).toggle(); return this; },
  stop: function(element)   { this.get(element).stop(); return this; },

  remove: function(element) { this.get(element).remove(); return this; },

  removeDetached: function(element) {
    All.removeDetached();
    return this;
  },

  center: function(element) { this.get(element).center(); return this; },

  setOptions: function(element, options) {
    this.get(element).setOptions(options);
    return this;
  },
  
  getDimensions: function(element) {
    var spinner   = All.get(element)[0],
        diameter  = spinner.getLayout().workspace.radius * 2;

    return { width: diameter, height: diameter };
  }
});


// We keep track spinners so things can be cleanup up when elements leave the DOM
var All = {
  spinners: [],

  get: function(element) {
    if (!element) return;
    var matched = [];
    $.each(this.spinners, function(i, spinner) {
      if (spinner &&
        (_.isElement(element) ? spinner.element == element : // element
        $(spinner.element).is(element) // selector
      )) {
        matched.push(spinner);
      }
    });
    return matched;
  },

  add: function(spinner) { this.spinners.push(spinner); },

  remove: function(element) {
    $($.map(this.spinners, function(spinner, i) {
      if (_.isElement(element) ? spinner.element == element :
        $(spinner.element).is(element))
        return spinner.element;
    })).each($.proxy(function(i, e) {
      this.removeByElement(e);
    }, this));
  },

  removeByElement: function(element) {
    var spinner = this.get(element)[0];
    if (spinner) {
      spinner.remove();
      this.spinners = $.grep(this.spinners, function(s) {
        return s.element != element;
      });
    }
  },

  //remove all spinners that are not attached to the DOM
  removeDetached: function() {
    $.each(this.spinners, $.proxy(function(i, spinner) {
      if (spinner && spinner.element && !_.element.isAttached(spinner.element))
        this.remove(spinner.element);
    }, this));
  }
};


/*
 * Collection
 */
function Collection(element) { this.element = element; };

$.extend(Collection, {
  create: function(element) {
    if (!element) return;
    var options = arguments[1] || {},
        spinners = [];
  
    if (_.isElement(element)) {
      spinners.push(new Spinner(element, options));
    }
    else {
      // if it's not an element, assume selector
      $(element).each(function(i, el) {
        spinners.push(new Spinner(el, options));
      });
    }

    return spinners;
  }
});

$.extend(Collection.prototype, {
  items: function() {
    return All.get(this.element);
  },

  play: function() {
    $.each(this.items(), function(i, s) { s.play(); });
    return this;
  },

  stop: function() {
    $.each(this.items(), function(i, s) { s.stop(); });
    return this;
  },

  pause: function() {
    $.each(this.items(), function(i, s) { s.pause(); });
    return this;
  },
  
  toggle: function() {
    $.each(this.items(), function(i, s) { s.toggle(); });
    return this;
  },
  
  center: function() {
    $.each(this.items(), function(i, s) { s.center(); });
    return this;
  },
  
  setOptions: function(options) {
    $.each(this.items(), function(i, s) { s.setOptions(options); });
    return this;
  },

  remove: function() {
    All.remove(this.element);
    return this;
  }
});


/*
 * Spinner
 */
function Spinner(element) {
  if (!element) return;

  this.element = element;

  All.remove(element);
  All.removeDetached();

  this._position = 0;
  this._state = 'stopped';

  this.setOptions($.extend({
    color: '#000',
    dashes:  12,
    radius: 5,
    height: 5,
    width: 1.8,
    opacity: 1,
    padding: 3,
    fadeOutSpeed: 0,
    pauseColor: '#000',
    pauseOpacity: 0.3,
    rotation: 700
  }, arguments[1] || {}));

  this.drawPosition(0);

  All.add(this);
}

$.extend(Spinner.prototype, {
  setOptions: function(options) {
    this.options = $.extend({}, this.options, options || {});

    // backwards compatibility with 2.0
    if (this.options.radii) {
      var radii = this.options.radii;
      this.options.radius = Math.min(radii[0], radii[1]);
      this.options.height = Math.max(radii[0], radii[1]) - this.options.radius;
    }
    if (this.options.dashWidth) {
      this.options.width = this.options.dashWidth;
    }
    if (this.options.speed) {
      this.options.duration = this.options.speed * 1000;
    }

    // make it safe to change options during play
    var state = this._state,
        position = this._position;

    // clear layout cache
    this._layout = null;

    // rebuild
    this.build();

    if (position && position >= this.options.dashes -1) {
      this._position = this.options.dashes - 1;
    }

    switch (state) {
      case 'playing':
        this.play();
        break;
      case 'paused':
      case 'stopped':
        this.drawPosition(this._position);
        break;
    }

    if (this._centered) this.center();
    if (this._state == "paused") this._renderPause();
  },

  remove: function() {
    if (!this.canvas) return;

    this.pause(); // doesn't destroy position

    $(this.canvas).remove();

    this.canvas = null;
    this.ctx = null;
  },

  build: function() {
    this.remove();

    var radius = this.getLayout().workspace.radius;

    // IE bug: append canvas to the body before getting context
    $(document.body).append(this.canvas = $('<canvas>')
      .attr({ width: radius * 2, height: radius * 2 })
      .css({ zoom: 1 })
    );

    // init canvas
    if (window.G_vmlCanvasManager)
      G_vmlCanvasManager.initElement(this.canvas[0]);

    this.ctx = this.canvas[0].getContext('2d');
    this.ctx.globalAlpha = this.options.opacity;

    // IE: append to element after getting context
    $(this.element).append(this.canvas);

    this.ctx.translate(radius, radius);
    return this;
  },

  /*
   * Draw
   */
  drawPosition: function(position) {
    var workspace = this.getLayout().workspace,
        opacities = _.scroll(workspace.opacities, position * -1),
        radius    = workspace.radius,
        dashes    = this.options.dashes,
        rotation  = radian(360 / dashes);

    this.ctx.clearRect(radius * -1, radius * -1, radius * 2, radius * 2);

    for (var i = 0, len = dashes; i < len; i++) {
      this.drawDash(opacities[i], this.options.color);
      this.ctx.rotate(rotation);
    }
  },

  drawDash: function(opacity, color) {
    this.ctx.fillStyle = Color.hex2fill(color, opacity);

    var layout          = this.getLayout(),
        workspaceRadius = layout.workspace.radius,
        dashPosition    = layout.dash.position,
        dashDimensions  = layout.dash.dimensions;

    Canvas.drawRoundedRectangle(this.ctx, {
      top:    dashPosition.top - workspaceRadius,
      left:   dashPosition.left - workspaceRadius,
      width:  dashDimensions.width,
      height: dashDimensions.height,
      radius: Math.min(dashDimensions.height, dashDimensions.width) / 2
    });
  },
  
  _nextPosition: function() {
    var ms = this.options.rotation / this.options.dashes;
    this.nextPosition();
    this._playTimer = window.setTimeout($.proxy(this._nextPosition, this), ms);
  },

  nextPosition: function() {
    if (this._position == this.options.dashes - 1)
      this._position = -1;
    this._position++;
    this.drawPosition(this._position);
  },

  /*
   * Controls
   */
  play: function() {
    if (this._state == 'playing') return;

    this._state = 'playing';

    var ms = this.options.rotation / this.options.dashes;
    this._playTimer = window.setTimeout($.proxy(this._nextPosition, this), ms);
    return this;
  },

  pause: function() {
    if (this._state == 'paused') return;
    this._pause();

    if (this._layout !== null) this._renderPause();

    this._state = 'paused';
    return this;
  },

  _pause: function() {
    if (!this._playTimer) return;
    window.clearTimeout(this._playTimer);
    this._playTimer = null;
  },

  stop: function() {
    if (this._state == 'stopped') return;

    this._pause();

    this._position = 0;
    this.drawPosition(0);

    this._state = 'stopped';
    return this;
  },

  toggle: function() {
    this[this._state == 'playing' ? 'pause' : 'play']();
    return this;
  },


  /*
   * Layout
   */
  getLayout: function() {
    if (this._layout) return this._layout;

    var options   = this.options,
        dashes    = options.dashes,
        width     = options.width,
        minRadius = options.radius,
        maxRadius = options.radius + options.height,

        maxWorkspaceRadius = Math.max(width, maxRadius),
        radius = Math.ceil(Math.max(
          maxWorkspaceRadius,
          // the angle created by width could give a bigger radius
          pyth(maxRadius, width/2)
        ));

    radius += options.padding;

    var layout = {
      workspace: {
        radius: radius,
        opacities: getOpacityArray(dashes, this.options.fadeOutSpeed)
      },
      dash: {
        position: {
          top:  radius - maxRadius,
          left: radius - width / 2
        },
        dimensions: {
          width: width,
          height: maxRadius - minRadius
        }
      }
    };

    // cache
    this._layout = layout;

    return layout;
  },
  
  // center the element using absolute positioning and negative margins
  center: function() {
    var diameter = this.getLayout().workspace.radius * 2;

    // the parent needs relative positioning for this to work
    // TODO: store original css so it can be restored on remove()
    $(this.element.parentNode).css({ position: 'relative' });

    $(this.element).css({
      position: 'absolute',
      height: diameter + 'px',
      width: diameter + 'px',
      top: '50%',
      left: '50%',
      marginLeft: -.5 * diameter + 'px',
      marginTop: -.5 * diameter + 'px'
    });

    this._centered = true;
  },

  _renderPause: function() {
    var radius    = this.getLayout().workspace.radius,
        dashes    = this.options.dashes,
        rotation  = radian(360 / dashes);

    this.ctx.clearRect(radius * -1, radius * -1, radius * 2, radius * 2);

    for (var i = 0, len = dashes; i < len; i++) {
      this.drawDash(this.options.pauseOpacity, this.options.pauseColor);
      this.ctx.rotate(rotation);
    }
  }
});

// start
Spinners.init();

// if there's no support for Canvas/VML, make sure everything dies silently
if (!Spinners.enabled) {
  Collection.create = function() { return []; };
}
})(jQuery);