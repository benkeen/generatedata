"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var styles_1 = require("@material-ui/core/styles");
var react_transition_group_1 = require("react-transition-group");
var animationDuration = 350;
exports.useStyles = styles_1.makeStyles(function (theme) {
    var slideTransition = theme.transitions.create('transform', {
        duration: animationDuration,
        easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
    });
    return {
        transitionContainer: {
            display: 'block',
            position: 'relative',
            '& > *': {
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
            },
        },
        'slideEnter-left': {
            willChange: 'transform',
            transform: 'translate(100%)',
        },
        'slideEnter-right': {
            willChange: 'transform',
            transform: 'translate(-100%)',
        },
        slideEnterActive: {
            transform: 'translate(0%)',
            transition: slideTransition,
        },
        slideExit: {
            transform: 'translate(0%)',
        },
        'slideExitActiveLeft-left': {
            willChange: 'transform',
            transform: 'translate(-200%)',
            transition: slideTransition,
        },
        'slideExitActiveLeft-right': {
            willChange: 'transform',
            transform: 'translate(200%)',
            transition: slideTransition,
        },
    };
}, { name: 'MuiPickersSlideTransition' });
var SlideTransition = function (_a) {
    var children = _a.children, transKey = _a.transKey, slideDirection = _a.slideDirection, _b = _a.className, className = _b === void 0 ? null : _b;
    var classes = exports.useStyles();
    var transitionClasses = {
        exit: classes.slideExit,
        enterActive: classes.slideEnterActive,
        // @ts-ignore
        enter: classes['slideEnter-' + slideDirection],
        // @ts-ignore
        exitActive: classes['slideExitActiveLeft-' + slideDirection],
    };
    return (React.createElement(react_transition_group_1.TransitionGroup, { className: clsx_1.default(classes.transitionContainer, className), childFactory: function (element) {
            return React.cloneElement(element, {
                classNames: transitionClasses,
            });
        } },
        React.createElement(react_transition_group_1.CSSTransition, { mountOnEnter: true, unmountOnExit: true, key: transKey + slideDirection, timeout: animationDuration, classNames: transitionClasses, children: children })));
};
exports.default = SlideTransition;
