"use strict";

var _events = _interopRequireDefault(require("dom-helpers/events"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Modal = _interopRequireDefault(require("../src/Modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

describe('<Modal>', function () {
  afterEach(function () {
    // make sure the dangling portal elements get cleaned up
    document.body.innerHTML = '';
  });
  it('Should render the modal content', function () {
    var noOp = function noOp() {};

    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      onHide: noOp,
      animation: false
    }, _react.default.createElement("strong", null, "Message"))).find('strong').text().should.equal('Message');
  });
  it('Should close the modal when the modal dialog is clicked', function (done) {
    var doneOp = function doneOp() {
      done();
    };

    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      onHide: doneOp
    }, _react.default.createElement("strong", null, "Message"))).find('div.modal') // the modal-dialog element is pointer-events: none;
    .simulate('click');
  });
  it('Should not close the modal when the "static" dialog is clicked', function () {
    var onHideSpy = sinon.spy();
    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      onHide: onHideSpy,
      backdrop: "static"
    }, _react.default.createElement("strong", null, "Message"))).find('ModalDialog').simulate('click');
    expect(onHideSpy).to.not.have.been.called;
  });
  it('Should close the modal when the modal close button is clicked', function (done) {
    var doneOp = function doneOp() {
      done();
    };

    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      onHide: doneOp
    }, _react.default.createElement(_Modal.default.Header, {
      closeButton: true
    }), _react.default.createElement("strong", null, "Message"))).find('.close').simulate('click');
  });
  it('Should pass className to the dialog', function () {
    var noOp = function noOp() {};

    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      className: "mymodal",
      onHide: noOp
    }, _react.default.createElement("strong", null, "Message"))).assertSingle('div.modal.mymodal');
  });
  it('Should use backdropClassName to add classes to the backdrop', function () {
    var noOp = function noOp() {};

    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      backdropClassName: "my-modal-backdrop",
      onHide: noOp
    }, _react.default.createElement("strong", null, "Message"))).find('.modal-backdrop.my-modal-backdrop');
  });
  it('Should pass size to the dialog', function () {
    var noOp = function noOp() {};

    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      size: "sm",
      onHide: noOp
    }, _react.default.createElement("strong", null, "Message"))).find('.modal-dialog.modal-sm');
  });
  it('Should pass dialog style to the dialog', function () {
    var noOp = function noOp() {};

    var dialog = (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      style: {
        color: 'red'
      },
      onHide: noOp
    }, _react.default.createElement("strong", null, "Message"))).find('div.modal').getDOMNode();
    assert.ok(dialog.style.color === 'red');
  });
  it('Should pass dialogClassName to the dialog', function () {
    var noOp = function noOp() {};

    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      dialogClassName: "my-dialog",
      onHide: noOp
    }, _react.default.createElement("strong", null, "Message"))).assertSingle('.modal-dialog.my-dialog');
  });
  it('Should use dialogAs', function () {
    var noOp = function noOp() {};

    function CustomDialog() {
      return _react.default.createElement("div", {
        className: "custom-dialog",
        tabIndex: "-1"
      });
    }

    (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      dialogAs: CustomDialog,
      onHide: noOp
    }, _react.default.createElement("strong", null, "Message"))).assertSingle('.custom-dialog');
  });
  it('Should pass transition callbacks to Transition', function (done) {
    var count = 0;

    var increment = function increment() {
      ++count;
    };

    var instance = (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
      show: true,
      onHide: function onHide() {},
      onExit: increment,
      onExiting: increment,
      onExited: function onExited() {
        increment();
        expect(count).to.equal(6);
        done();
      },
      onEnter: increment,
      onEntering: increment,
      onEntered: function onEntered() {
        increment();
        instance.setProps({
          show: false
        });
      }
    }, _react.default.createElement("strong", null, "Message")));
  });
  describe('cleanup', function () {
    var offSpy;
    beforeEach(function () {
      offSpy = sinon.spy(_events.default, 'off');
    });
    afterEach(function () {
      _events.default.off.restore();
    });
    it('should remove resize listener when unmounted', function () {
      var Component =
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(Component, _React$Component);

        function Component(props, context) {
          var _this;

          _classCallCheck(this, Component);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, props, context));
          _this.state = {
            show: true
          };
          return _this;
        }

        _createClass(Component, [{
          key: "render",
          value: function render() {
            if (!this.state.show) {
              return null;
            }

            return _react.default.createElement(_Modal.default, {
              show: true
            }, "Foo");
          }
        }]);

        return Component;
      }(_react.default.Component);

      var instance = (0, _enzyme.mount)(_react.default.createElement(Component, null));
      instance.setState({
        show: false
      });
      expect(offSpy).to.have.been.calledWith(window, 'resize');
    });
  });
});

//# sourceMappingURL=ModalSpec.js.map