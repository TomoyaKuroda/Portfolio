"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _events = _interopRequireDefault(require("dom-helpers/events"));

var _ownerDocument = _interopRequireDefault(require("dom-helpers/ownerDocument"));

var _inDOM = _interopRequireDefault(require("dom-helpers/util/inDOM"));

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/util/scrollbarSize"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Modal = _interopRequireDefault(require("react-overlays/Modal"));

var _propTypesExtra = require("prop-types-extra");

var _Fade = _interopRequireDefault(require("./Fade"));

var _ModalBody = _interopRequireDefault(require("./ModalBody"));

var _ModalDialog = _interopRequireDefault(require("./ModalDialog"));

var _ModalFooter = _interopRequireDefault(require("./ModalFooter"));

var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));

var _ModalTitle = _interopRequireDefault(require("./ModalTitle"));

var _BootstrapModalManager = _interopRequireDefault(require("./utils/BootstrapModalManager"));

var _ThemeProvider = require("./ThemeProvider");

var _ModalContext = _interopRequireDefault(require("./ModalContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * Render a large or small modal.
   *
   * @type ('sm'|'lg')
   */
  size: _propTypes.default.string,

  /**
   * vertically center the Dialog in the window
   */
  centered: _propTypes.default.bool,

  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: _propTypes.default.oneOf(['static', true, false]),

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName: _propTypes.default.string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: _propTypes.default.bool,

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: _propTypes.default.bool,

  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: _propTypes.default.string,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogAs: _propTypesExtra.elementType,

  /**
   * When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: _propTypes.default.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: _propTypes.default.bool,

  /**
   * When `true` The modal will show itself.
   */
  show: _propTypes.default.bool,

  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: _propTypes.default.func,

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: _propTypes.default.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: _propTypes.default.func,

  /**
   * @private
   */
  container: _propTypes.default.any
};
var defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: _ModalDialog.default,
  manager: new _BootstrapModalManager.default()
};
/* eslint-disable no-use-before-define, react/no-multi-comp */

function DialogTransition(props) {
  return _react.default.createElement(_Fade.default, props);
}

function BackdropTransition(props) {
  return _react.default.createElement(_Fade.default, props);
}
/* eslint-enable no-use-before-define */


var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(_props, context) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this, _props, context));

    _defineProperty(_assertThisInitialized(_this), "setModalRef", function (ref) {
      _this._modal = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "handleDialogMouseDown", function () {
      _this._waitingForMouseUp = true;
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function (e) {
      if (_this._waitingForMouseUp && e.target === _this._modal.dialog) {
        _this._ignoreBackdropClick = true;
      }

      _this._waitingForMouseUp = false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      if (_this._ignoreBackdropClick || e.target !== e.currentTarget) {
        _this._ignoreBackdropClick = false;
        return;
      }

      _this.props.onHide();
    });

    _defineProperty(_assertThisInitialized(_this), "handleEnter", function (node) {
      var _this$props;

      if (node) {
        node.style.display = 'block';

        _this.updateDialogStyle(node);
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (_this.props.onEnter) (_this$props = _this.props).onEnter.apply(_this$props, [node].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this), "handleEntering", function (node) {
      var _this$props2;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (_this.props.onEntering) (_this$props2 = _this.props).onEntering.apply(_this$props2, [node].concat(args)); // FIXME: This should work even when animation is disabled.

      _events.default.on(window, 'resize', _this.handleWindowResize);
    });

    _defineProperty(_assertThisInitialized(_this), "handleExited", function (node) {
      var _this$props3;

      if (node) node.style.display = ''; // RHL removes it sometimes

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      if (_this.props.onExited) (_this$props3 = _this.props).onExited.apply(_this$props3, args); // FIXME: This should work even when animation is disabled.

      _events.default.off(window, 'resize', _this.handleWindowResize);
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowResize", function () {
      _this.updateDialogStyle(_this._modal.dialog);
    });

    _defineProperty(_assertThisInitialized(_this), "renderBackdrop", function (props) {
      var _this$props4 = _this.props,
          bsPrefix = _this$props4.bsPrefix,
          backdropClassName = _this$props4.backdropClassName;
      return _react.default.createElement("div", _extends({}, props, {
        className: (0, _classnames.default)("".concat(bsPrefix, "-backdrop"), backdropClassName)
      }));
    });

    _this.state = {
      style: {}
    };
    _this.modalContext = {
      onHide: function onHide() {
        return _this.props.onHide();
      }
    };
    return _this;
  }

  _createClass(Modal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Clean up the listener if we need to.
      _events.default.off(window, 'resize', this.handleWindowResize);
    }
  }, {
    key: "updateDialogStyle",
    value: function updateDialogStyle(node) {
      if (!_inDOM.default) return;
      var manager = this.props.manager;
      var containerIsOverflowing = manager.isContainerOverflowing(this._modal);
      var modalIsOverflowing = node.scrollHeight > (0, _ownerDocument.default)(node).documentElement.clientHeight;
      this.setState({
        style: {
          paddingRight: containerIsOverflowing && !modalIsOverflowing ? (0, _scrollbarSize.default)() : undefined,
          paddingLeft: !containerIsOverflowing && modalIsOverflowing ? (0, _scrollbarSize.default)() : undefined
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          bsPrefix = _this$props5.bsPrefix,
          className = _this$props5.className,
          style = _this$props5.style,
          dialogClassName = _this$props5.dialogClassName,
          children = _this$props5.children,
          Dialog = _this$props5.dialogAs,
          show = _this$props5.show,
          manager = _this$props5.manager,
          animation = _this$props5.animation,
          backdrop = _this$props5.backdrop,
          keyboard = _this$props5.keyboard,
          onEscapeKeyDown = _this$props5.onEscapeKeyDown,
          onShow = _this$props5.onShow,
          onHide = _this$props5.onHide,
          container = _this$props5.container,
          autoFocus = _this$props5.autoFocus,
          enforceFocus = _this$props5.enforceFocus,
          restoreFocus = _this$props5.restoreFocus,
          onEntered = _this$props5.onEntered,
          onExit = _this$props5.onExit,
          onExiting = _this$props5.onExiting,
          _ = _this$props5.onExited,
          _1 = _this$props5.onEntering,
          _6 = _this$props5.onEnter,
          _4 = _this$props5.onEntering,
          _2 = _this$props5.backdropClassName,
          _3 = _this$props5.backdropStyle,
          props = _objectWithoutProperties(_this$props5, ["bsPrefix", "className", "style", "dialogClassName", "children", "dialogAs", "show", "manager", "animation", "backdrop", "keyboard", "onEscapeKeyDown", "onShow", "onHide", "container", "autoFocus", "enforceFocus", "restoreFocus", "onEntered", "onExit", "onExiting", "onExited", "onEntering", "onEnter", "onEntering", "backdropClassName", "backdropStyle"]);

      var clickHandler = backdrop === true ? this.handleClick : null;
      return _react.default.createElement(_ModalContext.default.Provider, {
        value: this.modalContext
      }, _react.default.createElement(_Modal.default, {
        show: show,
        backdrop: backdrop,
        container: container,
        keyboard: keyboard,
        autoFocus: autoFocus,
        enforceFocus: enforceFocus,
        restoreFocus: restoreFocus,
        onEscapeKeyDown: onEscapeKeyDown,
        onShow: onShow,
        onHide: onHide,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        manager: manager,
        ref: this.setModalRef,
        style: _objectSpread({}, style, this.state.style),
        className: (0, _classnames.default)(className, bsPrefix),
        containerClassName: "".concat(bsPrefix, "-open"),
        transition: animation ? DialogTransition : undefined,
        backdropTransition: animation ? BackdropTransition : undefined,
        renderBackdrop: this.renderBackdrop,
        onClick: clickHandler,
        onMouseUp: this.handleMouseUp,
        onEnter: this.handleEnter,
        onEntering: this.handleEntering,
        onExited: this.handleExited
      }, _react.default.createElement(Dialog, _extends({}, props, {
        onMouseDown: this.handleDialogMouseDown,
        className: dialogClassName
      }), children)));
    }
  }]);

  return Modal;
}(_react.default.Component);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
var DecoratedModal = (0, _ThemeProvider.createBootstrapComponent)(Modal, 'modal');
DecoratedModal.Body = _ModalBody.default;
DecoratedModal.Header = _ModalHeader.default;
DecoratedModal.Title = _ModalTitle.default;
DecoratedModal.Footer = _ModalFooter.default;
DecoratedModal.Dialog = _ModalDialog.default;
DecoratedModal.TRANSITION_DURATION = 300;
DecoratedModal.BACKDROP_TRANSITION_DURATION = 150;
var _default = DecoratedModal;
exports.default = _default;

//# sourceMappingURL=Modal.js.map