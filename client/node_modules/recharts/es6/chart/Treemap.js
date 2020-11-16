import _get from "lodash/get";
import _omit from "lodash/omit";
import _isFunction from "lodash/isFunction";
import _isNaN from "lodash/isNaN";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/**
 * @fileOverview TreemapChart
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Smooth from 'react-smooth';
import classNames from 'classnames';
import Surface from '../container/Surface';
import Layer from '../container/Layer';
import Rectangle from '../shape/Rectangle';
import { findChildByType, getPresentationAttributes, filterSvgElements, validateWidthHeight, isSsr } from '../util/ReactUtils';
import Tooltip from '../component/Tooltip';
import Polygon from '../shape/Polygon';
import { getValueByDataKey } from '../util/ChartUtils';
import { COLOR_PANEL } from '../util/Constants';
import { getStringSize } from '../util/DOMUtils';
import { uniqueId } from '../util/DataUtils';

var computeNode = function computeNode(_ref) {
  var depth = _ref.depth,
      node = _ref.node,
      index = _ref.index,
      valueKey = _ref.valueKey;
  var children = node.children;
  var childDepth = depth + 1;
  var computedChildren = children && children.length ? children.map(function (child, i) {
    return computeNode({
      depth: childDepth,
      node: child,
      index: i,
      valueKey: valueKey
    });
  }) : null;
  var value;

  if (children && children.length) {
    value = computedChildren.reduce(function (result, child) {
      return result + child.value;
    }, 0);
  } else {
    value = _isNaN(node[valueKey]) || node[valueKey] <= 0 ? 0 : node[valueKey];
  }

  return _objectSpread({}, node, {
    children: computedChildren,
    value: value,
    depth: depth,
    index: index
  });
};

var filterRect = function filterRect(node) {
  return {
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height
  };
}; // Compute the area for each child based on value & scale.


var getAreaOfChildren = function getAreaOfChildren(children, areaValueRatio) {
  var ratio = areaValueRatio < 0 ? 0 : areaValueRatio;
  return children.map(function (child) {
    var area = child.value * ratio;
    return _objectSpread({}, child, {
      area: _isNaN(area) || area <= 0 ? 0 : area
    });
  });
}; // Computes the score for the specified row, as the worst aspect ratio.


var getWorstScore = function getWorstScore(row, parentSize, aspectRatio) {
  var parentArea = parentSize * parentSize;
  var rowArea = row.area * row.area;

  var _row$reduce = row.reduce(function (result, child) {
    return {
      min: Math.min(result.min, child.area),
      max: Math.max(result.max, child.area)
    };
  }, {
    min: Infinity,
    max: 0
  }),
      min = _row$reduce.min,
      max = _row$reduce.max;

  return rowArea ? Math.max(parentArea * max * aspectRatio / rowArea, rowArea / (parentArea * min * aspectRatio)) : Infinity;
};

var horizontalPosition = function horizontalPosition(row, parentSize, parentRect, isFlush) {
  var rowHeight = parentSize ? Math.round(row.area / parentSize) : 0;

  if (isFlush || rowHeight > parentRect.height) {
    rowHeight = parentRect.height;
  }

  var curX = parentRect.x;
  var child;

  for (var i = 0, len = row.length; i < len; i++) {
    child = row[i];
    child.x = curX;
    child.y = parentRect.y;
    child.height = rowHeight;
    child.width = Math.min(rowHeight ? Math.round(child.area / rowHeight) : 0, parentRect.x + parentRect.width - curX);
    curX += child.width;
  } // what's z


  child.z = true; // add the remain x to the last one of row

  child.width += parentRect.x + parentRect.width - curX;
  return _objectSpread({}, parentRect, {
    y: parentRect.y + rowHeight,
    height: parentRect.height - rowHeight
  });
};

var verticalPosition = function verticalPosition(row, parentSize, parentRect, isFlush) {
  var rowWidth = parentSize ? Math.round(row.area / parentSize) : 0;

  if (isFlush || rowWidth > parentRect.width) {
    rowWidth = parentRect.width;
  }

  var curY = parentRect.y;
  var child;

  for (var i = 0, len = row.length; i < len; i++) {
    child = row[i];
    child.x = parentRect.x;
    child.y = curY;
    child.width = rowWidth;
    child.height = Math.min(rowWidth ? Math.round(child.area / rowWidth) : 0, parentRect.y + parentRect.height - curY);
    curY += child.height;
  }

  child.z = false;
  child.height += parentRect.y + parentRect.height - curY;
  return _objectSpread({}, parentRect, {
    x: parentRect.x + rowWidth,
    width: parentRect.width - rowWidth
  });
};

var position = function position(row, parentSize, parentRect, isFlush) {
  if (parentSize === parentRect.width) {
    return horizontalPosition(row, parentSize, parentRect, isFlush);
  }

  return verticalPosition(row, parentSize, parentRect, isFlush);
}; // Recursively arranges the specified node's children into squarified rows.


var squarify = function squarify(node, aspectRatio) {
  var children = node.children;

  if (children && children.length) {
    var rect = filterRect(node);
    var row = [];
    var best = Infinity; // the best row score so far

    var child, score; // the current row score

    var size = Math.min(rect.width, rect.height); // initial orientation

    var scaleChildren = getAreaOfChildren(children, rect.width * rect.height / node.value);
    var tempChildren = scaleChildren.slice();
    row.area = 0;

    while (tempChildren.length > 0) {
      // row first
      // eslint-disable-next-line prefer-destructuring
      row.push(child = tempChildren[0]);
      row.area += child.area;
      score = getWorstScore(row, size, aspectRatio);

      if (score <= best) {
        // continue with this orientation
        tempChildren.shift();
        best = score;
      } else {
        // abort, and try a different orientation
        row.area -= row.pop().area;
        rect = position(row, size, rect, false);
        size = Math.min(rect.width, rect.height);
        row.length = row.area = 0;
        best = Infinity;
      }
    }

    if (row.length) {
      rect = position(row, size, rect, true);
      row.length = row.area = 0;
    }

    return _objectSpread({}, node, {
      children: scaleChildren.map(function (c) {
        return squarify(c, aspectRatio);
      })
    });
  }

  return node;
};

var Treemap =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Treemap, _PureComponent);

  function Treemap() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Treemap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Treemap)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = _this.constructor.createDefaultState();

    _this.handleAnimationEnd = function () {
      var onAnimationEnd = _this.props.onAnimationEnd;

      _this.setState({
        isAnimationFinished: true
      });

      if (_isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    };

    _this.handleAnimationStart = function () {
      var onAnimationStart = _this.props.onAnimationStart;

      _this.setState({
        isAnimationFinished: false
      });

      if (_isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    };

    return _this;
  }

  _createClass(Treemap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          type = _this$props.type,
          width = _this$props.width,
          height = _this$props.height,
          data = _this$props.data,
          dataKey = _this$props.dataKey,
          aspectRatio = _this$props.aspectRatio;

      var _this$computeRoot = this.computeRoot({
        type: type,
        width: width,
        height: height,
        data: data,
        dataKey: dataKey,
        aspectRatio: aspectRatio
      }),
          formatRoot = _this$computeRoot.formatRoot,
          currentRoot = _this$computeRoot.currentRoot,
          nestIndex = _this$computeRoot.nestIndex;

      this.setState({
        formatRoot: formatRoot,
        currentRoot: currentRoot,
        nestIndex: nestIndex
      });
    }
  }, {
    key: "computeRoot",
    value: function computeRoot(_ref2) {
      var type = _ref2.type,
          width = _ref2.width,
          height = _ref2.height,
          data = _ref2.data,
          dataKey = _ref2.dataKey,
          aspectRatio = _ref2.aspectRatio;
      var root = computeNode({
        depth: 0,
        node: {
          children: data,
          x: 0,
          y: 0,
          width: width,
          height: height
        },
        index: 0,
        valueKey: dataKey
      });
      var formatRoot = squarify(root, aspectRatio);
      var nestIndex = this.state.nestIndex;

      if (type === 'nest') {
        nestIndex.push(root);
      }

      return {
        formatRoot: formatRoot,
        currentRoot: root,
        nestIndex: nestIndex
      };
    } // eslint-disable-next-line camelcase

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var type = nextProps.type,
          width = nextProps.width,
          height = nextProps.height,
          data = nextProps.data,
          dataKey = nextProps.dataKey,
          aspectRatio = nextProps.aspectRatio;

      if (data !== this.props.data || type !== this.props.type || width !== this.props.width || height !== this.props.height || dataKey !== this.props.dataKey || aspectRatio !== this.props.aspectRatio) {
        var nextRoot = this.computeRoot({
          type: type,
          width: width,
          height: height,
          data: data,
          dataKey: dataKey,
          aspectRatio: aspectRatio
        });
        this.setState(_objectSpread({}, this.constructor.createDefaultState(), {}, nextRoot, {
          nestIndex: [nextRoot.currentRoot]
        }));
      }
    }
    /**
     * Returns default, reset state for the treemap chart.
     * @return {Object} Whole new state
     */

  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter(node, e) {
      var _this$props2 = this.props,
          onMouseEnter = _this$props2.onMouseEnter,
          children = _this$props2.children;
      var tooltipItem = findChildByType(children, Tooltip);

      if (tooltipItem) {
        this.setState({
          isTooltipActive: true,
          activeNode: node
        }, function () {
          if (onMouseEnter) {
            onMouseEnter(node, e);
          }
        });
      } else if (onMouseEnter) {
        onMouseEnter(node, e);
      }
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave(node, e) {
      var _this$props3 = this.props,
          onMouseLeave = _this$props3.onMouseLeave,
          children = _this$props3.children;
      var tooltipItem = findChildByType(children, Tooltip);

      if (tooltipItem) {
        this.setState({
          isTooltipActive: false,
          activeNode: null
        }, function () {
          if (onMouseLeave) {
            onMouseLeave(node, e);
          }
        });
      } else if (onMouseLeave) {
        onMouseLeave(node, e);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(node) {
      var _this$props4 = this.props,
          onClick = _this$props4.onClick,
          type = _this$props4.type;

      if (type === 'nest' && node.children) {
        var _this$props5 = this.props,
            width = _this$props5.width,
            height = _this$props5.height,
            dataKey = _this$props5.dataKey,
            aspectRatio = _this$props5.aspectRatio;
        var root = computeNode({
          depth: 0,
          node: _objectSpread({}, node, {
            x: 0,
            y: 0,
            width: width,
            height: height
          }),
          index: 0,
          valueKey: dataKey
        });
        var formatRoot = squarify(root, aspectRatio);
        var nestIndex = this.state.nestIndex;
        nestIndex.push(node);
        this.setState({
          formatRoot: formatRoot,
          currentRoot: root,
          nestIndex: nestIndex
        });
      }

      if (onClick) {
        onClick(node);
      }
    }
  }, {
    key: "handleNestIndex",
    value: function handleNestIndex(node, i) {
      var nestIndex = this.state.nestIndex;
      var _this$props6 = this.props,
          width = _this$props6.width,
          height = _this$props6.height,
          dataKey = _this$props6.dataKey,
          aspectRatio = _this$props6.aspectRatio;
      var root = computeNode({
        depth: 0,
        node: _objectSpread({}, node, {
          x: 0,
          y: 0,
          width: width,
          height: height
        }),
        index: 0,
        valueKey: dataKey
      });
      var formatRoot = squarify(root, aspectRatio);
      nestIndex = nestIndex.slice(0, i + 1);
      this.setState({
        formatRoot: formatRoot,
        currentRoot: node,
        nestIndex: nestIndex
      });
    }
  }, {
    key: "renderItem",
    value: function renderItem(content, nodeProps, isLeaf) {
      var _this2 = this;

      var _this$props7 = this.props,
          isAnimationActive = _this$props7.isAnimationActive,
          animationBegin = _this$props7.animationBegin,
          animationDuration = _this$props7.animationDuration,
          animationEasing = _this$props7.animationEasing,
          isUpdateAnimationActive = _this$props7.isUpdateAnimationActive,
          type = _this$props7.type,
          animationId = _this$props7.animationId,
          colorPanel = _this$props7.colorPanel;
      var isAnimationFinished = this.state.isAnimationFinished;
      var width = nodeProps.width,
          height = nodeProps.height,
          x = nodeProps.x,
          y = nodeProps.y,
          depth = nodeProps.depth;
      var translateX = parseInt((Math.random() * 2 - 1) * width, 10);
      var event = {};

      if (isLeaf || type === 'nest') {
        event = {
          onMouseEnter: this.handleMouseEnter.bind(this, nodeProps),
          onMouseLeave: this.handleMouseLeave.bind(this, nodeProps),
          onClick: this.handleClick.bind(this, nodeProps)
        };
      }

      if (!isAnimationActive) {
        return React.createElement(Layer, event, this.constructor.renderContentItem(content, _objectSpread({}, nodeProps, {
          isAnimationActive: false,
          isUpdateAnimationActive: false,
          width: width,
          height: height,
          x: x,
          y: y
        }), type, colorPanel));
      }

      return React.createElement(Smooth, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        key: "treemap-".concat(animationId),
        from: {
          x: x,
          y: y,
          width: width,
          height: height
        },
        to: {
          x: x,
          y: y,
          width: width,
          height: height
        },
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function (_ref3) {
        var currX = _ref3.x,
            currY = _ref3.y,
            currWidth = _ref3.width,
            currHeight = _ref3.height;
        return React.createElement(Smooth, {
          from: "translate(".concat(translateX, "px, ").concat(translateX, "px)"),
          to: "translate(0, 0)",
          attributeName: "transform",
          begin: animationBegin,
          easing: animationEasing,
          isActive: isAnimationActive,
          duration: animationDuration
        }, React.createElement(Layer, event, function () {
          // when animation Duration , only render depth=1 nodes
          if (depth > 2 && !isAnimationFinished) {
            return null;
          }

          return _this2.constructor.renderContentItem(content, _objectSpread({}, nodeProps, {
            isAnimationActive: isAnimationActive,
            isUpdateAnimationActive: !isUpdateAnimationActive,
            width: currWidth,
            height: currHeight,
            x: currX,
            y: currY
          }), type, colorPanel);
        }()));
      });
    }
  }, {
    key: "renderNode",
    value: function renderNode(root, node, i) {
      var _this3 = this;

      var _this$props8 = this.props,
          content = _this$props8.content,
          type = _this$props8.type;

      var nodeProps = _objectSpread({}, getPresentationAttributes(this.props), {}, node, {
        root: root
      });

      var isLeaf = !node.children || !node.children.length;
      var currentRoot = this.state.currentRoot;
      var isCurrentRootChild = (currentRoot.children || []).filter(function (item) {
        return item.depth === node.depth && item.name === node.name;
      });

      if (!isCurrentRootChild.length && root.depth && type === 'nest') {
        return null;
      }

      return (// eslint-disable-next-line react/no-array-index-key
        React.createElement(Layer, {
          key: "recharts-treemap-node-".concat(i),
          className: "recharts-treemap-depth-".concat(node.depth)
        }, this.renderItem(content, nodeProps, isLeaf), node.children && node.children.length ? node.children.map(function (child, index) {
          return _this3.renderNode(node, child, index);
        }) : null)
      );
    }
  }, {
    key: "renderAllNodes",
    value: function renderAllNodes() {
      var formatRoot = this.state.formatRoot;

      if (!formatRoot) {
        return null;
      }

      return this.renderNode(formatRoot, formatRoot, 0);
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      var _this$props9 = this.props,
          children = _this$props9.children,
          nameKey = _this$props9.nameKey;
      var tooltipItem = findChildByType(children, Tooltip);

      if (!tooltipItem) {
        return null;
      }

      var _this$props10 = this.props,
          width = _this$props10.width,
          height = _this$props10.height,
          dataKey = _this$props10.dataKey;
      var _this$state = this.state,
          isTooltipActive = _this$state.isTooltipActive,
          activeNode = _this$state.activeNode;
      var viewBox = {
        x: 0,
        y: 0,
        width: width,
        height: height
      };
      var coordinate = activeNode ? {
        x: activeNode.x + activeNode.width / 2,
        y: activeNode.y + activeNode.height / 2
      } : null;
      var payload = isTooltipActive && activeNode ? [{
        payload: activeNode,
        name: getValueByDataKey(activeNode, nameKey, ''),
        value: getValueByDataKey(activeNode, dataKey)
      }] : [];
      return React.cloneElement(tooltipItem, {
        viewBox: viewBox,
        active: isTooltipActive,
        coordinate: coordinate,
        label: '',
        payload: payload
      });
    } // render nest treemap

  }, {
    key: "renderNestIndex",
    value: function renderNestIndex() {
      var _this4 = this;

      var _this$props11 = this.props,
          nameKey = _this$props11.nameKey,
          nestIndexContent = _this$props11.nestIndexContent;
      var nestIndex = this.state.nestIndex;
      return React.createElement("div", {
        className: "recharts-treemap-nest-index-wrapper",
        style: {
          marginTop: '8px',
          textAlign: 'center'
        }
      }, nestIndex.map(function (item, i) {
        var name = _get(item, nameKey, 'root');

        var content = null;

        if (React.isValidElement(nestIndexContent)) {
          content = React.cloneElement(nestIndexContent, item, i);
        }

        if (_isFunction(nestIndexContent)) {
          content = nestIndexContent(item, i);
        } else {
          content = name;
        }

        return (// eslint-disable-next-line jsx-a11y/click-events-have-key-events
          React.createElement("div", {
            onClick: _this4.handleNestIndex.bind(_this4, item, i),
            key: "nest-index-".concat(uniqueId()),
            className: "recharts-treemap-nest-index-box",
            style: {
              cursor: 'pointer',
              display: 'inline-block',
              padding: '0 7px',
              background: '#000',
              color: '#fff',
              marginRight: '3px'
            }
          }, content)
        );
      }));
    }
  }, {
    key: "render",
    value: function render() {
      if (!validateWidthHeight(this)) {
        return null;
      }

      var _this$props12 = this.props,
          width = _this$props12.width,
          height = _this$props12.height,
          className = _this$props12.className,
          style = _this$props12.style,
          children = _this$props12.children,
          type = _this$props12.type,
          others = _objectWithoutProperties(_this$props12, ["width", "height", "className", "style", "children", "type"]);

      var attrs = getPresentationAttributes(others);
      return React.createElement("div", {
        className: classNames('recharts-wrapper', className),
        style: _objectSpread({}, style, {
          position: 'relative',
          cursor: 'default',
          width: width,
          height: height
        })
      }, React.createElement(Surface, _extends({}, attrs, {
        width: width,
        height: type === 'nest' ? height - 30 : height
      }), this.renderAllNodes(), filterSvgElements(children)), this.renderTooltip(), type === 'nest' && this.renderNestIndex());
    }
  }], [{
    key: "createDefaultState",
    value: function createDefaultState() {
      return {
        isTooltipActive: false,
        isAnimationFinished: false,
        activeNode: null,
        currentRoot: null,
        formatRoot: null,
        nestIndex: []
      };
    }
  }, {
    key: "renderContentItem",
    value: function renderContentItem(content, nodeProps, type, colorPanel) {
      if (React.isValidElement(content)) {
        return React.cloneElement(content, nodeProps);
      }

      if (_isFunction(content)) {
        return content(nodeProps);
      } // optimize default shape


      var x = nodeProps.x,
          y = nodeProps.y,
          width = nodeProps.width,
          height = nodeProps.height,
          index = nodeProps.index;
      var arrow = null;

      if (width > 10 && height > 10 && nodeProps.children && type === 'nest') {
        arrow = React.createElement(Polygon, {
          points: [{
            x: x + 2,
            y: y + height / 2
          }, {
            x: x + 6,
            y: y + height / 2 + 3
          }, {
            x: x + 2,
            y: y + height / 2 + 6
          }]
        });
      }

      var text = null;
      var nameSize = getStringSize(nodeProps.name);

      if (width > 20 && height > 20 && nameSize.width < width && nameSize.height < height) {
        text = React.createElement("text", {
          x: x + 8,
          y: y + height / 2 + 7,
          fontSize: 14
        }, nodeProps.name);
      }

      var colors = colorPanel || COLOR_PANEL;
      return React.createElement("g", null, React.createElement(Rectangle, _extends({
        fill: nodeProps.depth < 2 ? colors[index % colors.length] : 'rgba(255,255,255,0)',
        stroke: "#fff"
      }, _omit(nodeProps, 'children'))), arrow, text);
    }
  }]);

  return Treemap;
}(PureComponent);

Treemap.displayName = 'Treemap';
Treemap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  animationId: PropTypes.number,
  style: PropTypes.object,
  aspectRatio: PropTypes.number,
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  fill: PropTypes.string,
  stroke: PropTypes.string,
  className: PropTypes.string,
  nameKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  // optional values flat/nest, flat show whole treemap, nest only show depth=1 node
  type: PropTypes.oneOf(['flat', 'nest']),
  colorPanel: PropTypes.array,
  // customize nest index content
  nestIndexContent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onAnimationStart: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  isAnimationActive: PropTypes.bool,
  isUpdateAnimationActive: PropTypes.bool,
  animationBegin: PropTypes.number,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
};
Treemap.defaultProps = {
  dataKey: 'value',
  aspectRatio: 0.5 * (1 + Math.sqrt(5)),
  isAnimationActive: !isSsr(),
  isUpdateAnimationActive: !isSsr(),
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'linear',
  type: 'flat'
};
export default Treemap;