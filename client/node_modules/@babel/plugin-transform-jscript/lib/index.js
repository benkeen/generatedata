"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _core = require("@babel/core");

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-jscript",
    visitor: {
      FunctionExpression: {
        exit(path) {
          const {
            node
          } = path;
          if (!node.id) return;
          path.replaceWith(_core.types.callExpression(_core.types.functionExpression(null, [], _core.types.blockStatement([_core.types.toStatement(node), _core.types.returnStatement(_core.types.cloneNode(node.id))])), []));
        }

      }
    }
  };
});

exports.default = _default;