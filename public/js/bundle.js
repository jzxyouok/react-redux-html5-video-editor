(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addCut = addCut;
exports.deleteCut = deleteCut;
exports.setTags = setTags;
exports.setPlayIndex = setPlayIndex;
exports.setSearchFilter = setSearchFilter;

// actions goes here

function addCut(data) {
	return {
		type: "ADD_CUT",
		data: data
	};
}

function deleteCut(index) {
	return {
		type: "DELETE_CUT",
		index: index
	};
}

function setTags(index, tags) {
	return {
		type: "SET_TAGS",
		index: index,
		tags: tags
	};
}

function setPlayIndex(index) {
	return {
		type: "SET_PLAY_INDEX",
		index: index
	};
}

function setSearchFilter(filter) {
	return {
		type: "SET_SEARCH_FILTER",
		filter: filter
	};
}

},{}],2:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//components
var url = "http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4";

// define the provider/router


// store


// Provider

// react
var provider = _react2.default.createElement(
	_reactRedux.Provider,
	{ store: _store2.default },
	_react2.default.createElement(_App2.default, { url: url })
);

// render
(0, _reactDom.render)(provider, document.getElementById('root'));

},{"./components/App":3,"./store":14,"react":"react","react-dom":"react-dom","react-redux":"react-redux"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actionCreators = require('../actions/actionCreators');

var actionCreators = _interopRequireWildcard(_actionCreators);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function mapStateToProps(state) {
	return {
		cuts: state.cuts,
		playIndex: state.playIndex,
		filter: state.filter
	};
}

function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)(actionCreators, dispatch);
}

var App = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Main2.default);
exports.default = App;

},{"../actions/actionCreators":1,"./Main":7,"react-redux":"react-redux","redux":"redux"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TagInput = require("./TagInput");

var _TagInput2 = _interopRequireDefault(_TagInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cut = function (_React$Component) {
    _inherits(Cut, _React$Component);

    function Cut(props) {
        _classCallCheck(this, Cut);

        var _this = _possibleConstructorReturn(this, (Cut.__proto__ || Object.getPrototypeOf(Cut)).call(this, props));

        _this.playing = false;
        _this.tooglePlay = _this.tooglePlay.bind(_this);
        _this.trash = _this.trash.bind(_this);
        _this.updateTags = _this.updateTags.bind(_this);
        return _this;
    }

    _createClass(Cut, [{
        key: "tooglePlay",
        value: function tooglePlay() {
            if (this.playing) {
                this.playing = false;
            } else {
                this.playing = true;
            }
            this.props.setPlayIndex(this.props.cutId);
        }
    }, {
        key: "trash",
        value: function trash() {
            this.props.deleteCut(this.props.cutId);
        }
    }, {
        key: "updateTags",
        value: function updateTags(tags) {
            this.props.setTags(this.props.cutId, tags);
        }
    }, {
        key: "render",
        value: function render() {

            var icon = this.props.playIndex == this.props.cutId ? "fa fa-pause" : "fa fa-play";
            var name = this.props.item.title ? this.props.item.title : "Cut " + (this.props.cutId + 1);
            var tags = this.props.item.tags.length > 0 ? this.props.item.tags : [];
            var start = this.props.item.start.toFixed(2);
            var end = this.props.item.end.toFixed(2);
            var duration = (end - start).toFixed(2);

            return _react2.default.createElement(
                "div",
                { className: "video-cut-wrapper container-fluid" },
                _react2.default.createElement(
                    "div",
                    { className: "video-cut clearfix" },
                    _react2.default.createElement(
                        "div",
                        { className: "pull-left" },
                        _react2.default.createElement(
                            "button",
                            {
                                onClick: this.tooglePlay,
                                type: "button",
                                className: "btn btn-circle"
                            },
                            _react2.default.createElement("i", { className: icon, "aria-hidden": "true" })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "pull-left" },
                        _react2.default.createElement(
                            "h4",
                            null,
                            name
                        ),
                        _react2.default.createElement(
                            "small",
                            null,
                            duration,
                            "s | ",
                            start,
                            "s - ",
                            end,
                            "s"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "pull-right action" },
                        _react2.default.createElement(
                            "button",
                            {
                                onClick: this.trash,
                                type: "button",
                                className: "btn btn-circle btn-trash"
                            },
                            _react2.default.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" })
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "video-tags clearfix" },
                    _react2.default.createElement(_TagInput2.default, { tags: tags, onUpdate: this.updateTags, placeholder: "Add tags" })
                )
            );
        }
    }]);

    return Cut;
}(_react2.default.Component);

exports.default = Cut;

},{"./TagInput":9,"react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var _ReactCSSTransitionGroup2 = _interopRequireDefault(_ReactCSSTransitionGroup);

var _Cut = require('./Cut');

var _Cut2 = _interopRequireDefault(_Cut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cuts = function (_React$Component) {
    _inherits(Cuts, _React$Component);

    function Cuts(props) {
        _classCallCheck(this, Cuts);

        return _possibleConstructorReturn(this, (Cuts.__proto__ || Object.getPrototypeOf(Cuts)).call(this, props));
    }

    _createClass(Cuts, [{
        key: 'hasTag',
        value: function hasTag(tags, filter) {
            if (tags.length > 0) {
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].indexOf(filter) !== -1) return true;
                };
            }
            return false;
        }
    }, {
        key: 'render',
        value: function render() {

            var filter = this.props.filter;
            var rows = [];
            if (this.props.cuts.length > 0) {
                for (var i = this.props.cuts.length - 1; i > -1; i--) {
                    if (filter.length > 0) {
                        if (!this.hasTag(this.props.cuts[i].tags, filter)) continue;
                    }
                    var key = this.props.cuts[i].start + "_" + this.props.cuts[i].end;
                    rows.push(_react2.default.createElement(_Cut2.default, {
                        key: key,
                        id: i,
                        cutId: i,
                        item: this.props.cuts[i],
                        playIndex: this.props.playIndex,
                        setPlayIndex: this.props.setPlayIndex,
                        deleteCut: this.props.deleteCut,
                        setTags: this.props.setTags }));
                };
            }

            return _react2.default.createElement(
                'div',
                { className: 'video-cuts' },
                _react2.default.createElement(
                    _ReactCSSTransitionGroup2.default,
                    {
                        transitionName: 'fade',
                        transitionEnterTimeout: 500,
                        transitionLeaveTimeout: 300,
                        transitionAppear: true,
                        transitionAppearTimeout: 500
                    },
                    rows
                )
            );
        }
    }]);

    return Cuts;
}(_react2.default.Component);

exports.default = Cuts;

},{"./Cut":4,"react":"react","react/lib/ReactCSSTransitionGroup":"react/lib/ReactCSSTransitionGroup"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this.state = {
      playing: false,
      recording: false,
      looping: false,
      cut: { start: -1, end: -1 }
    };

    _this.video = false;
    _this.playIndex = -1;

    _this.getVideoElement = _this.getVideoElement.bind(_this);
    _this.play = _this.play.bind(_this);
    _this.pause = _this.pause.bind(_this);
    _this.record = _this.record.bind(_this);
    _this.addCut = _this.addCut.bind(_this);
    _this.resetRecording = _this.resetRecording.bind(_this);
    _this.onTimeUpdate = _this.onTimeUpdate.bind(_this);
    _this.onPlaying = _this.onPlaying.bind(_this);
    _this.onPause = _this.onPause.bind(_this);
    _this.onEnded = _this.onEnded.bind(_this);
    _this.onEnded = _this.onEnded.bind(_this);
    _this.tooglePlay = _this.tooglePlay.bind(_this);
    _this.toogleRecord = _this.toogleRecord.bind(_this);

    return _this;
  }

  _createClass(Editor, [{
    key: 'getVideoElement',
    value: function getVideoElement() {
      if (this.video === false) {
        var wraper = _reactDom2.default.findDOMNode(this);
        this.video = _reactDom2.default.findDOMNode(this.refs.video);
      }
      return this.video;
    }
  }, {
    key: 'tooglePlay',
    value: function tooglePlay() {
      this.state.playing ? this.pause() : this.play();
    }
  }, {
    key: 'toogleRecord',
    value: function toogleRecord() {
      this.state.recording ? this.pause() : this.record();
    }
  }, {
    key: 'play',
    value: function play() {
      // play the video
      var video = this.getVideoElement();
      if (video.paused) {
        video.play();
        this.setState({ playing: true });
      } else {
        // no need to do anything.
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      // pause the video
      var video = this.getVideoElement();
      if (video.paused) {
        // no need to do anything.
      } else {
        this.setState({ playing: false, looping: false });
        video.pause();
        if (this.state.recording) {
          this.setState({ recording: false });
          this.state.cut.end = video.currentTime;
          this.addCut();
        }
      }
    }
  }, {
    key: 'record',
    value: function record() {
      var video = this.getVideoElement();
      this.state.playing ? "" : this.play();
      // set the recording
      this.setState({ recording: true, cut: { start: video.currentTime, end: -1 } });
    }
  }, {
    key: 'addCut',
    value: function addCut() {
      if (this.state.cut.start != -1 && this.state.cut.end != -1) {
        // add the new cut
        this.props.addCut(this.state.cut);
        // reset the state
        this.resetRecording();
      }
    }
  }, {
    key: 'resetRecording',
    value: function resetRecording() {
      this.setState({ recording: false, cut: { start: -1, end: -1 } });
    }
  }, {
    key: 'onTimeUpdate',
    value: function onTimeUpdate(event) {
      // console.log('onTimeUpdate', event.nativeEvent.target.currentTime);
    }
  }, {
    key: 'onPlaying',
    value: function onPlaying(event) {
      this.setState({ playing: true });
      // console.log('playing', event.nativeEvent.target.currentTime);
    }
  }, {
    key: 'onPause',
    value: function onPause(event) {
      this.setState({ playing: false });
      if (this.state.looping) this.loadNext();
      // console.log('onPause', event.nativeEvent.target.currentTime);
    }
  }, {
    key: 'onEnded',
    value: function onEnded(event) {

      if (this.state.recording) {

        this.setState({ recording: false });
        var video = this.getVideoElement();
        this.state.cut.end = video.currentTime;
        this.addCut();

        this.pause();
        this.setState({ looping: false });
      } else {
        // move to the next clip if we have one.
        this.loadNext();
      }
      console.log('onEnded', event.nativeEvent.target.currentTime);
    }
  }, {
    key: 'loadNext',
    value: function loadNext() {}
    // const index = this.currentCut + 1;
    // this.loadSource(index);


    //   loadSource(index) {
    //   	if (this.props.cuts.length > 0 && index < this.props.cuts.length) {

    // 	this.currentCut = index;
    // 	this.setState({looping:true});
    // 	// make sure the current/end time is set
    // 	var video = this.getVideoElement();
    // 	video.load();

    // 	this.play();
    // 	// video.currentTime = this.props.cuts[index].start;
    // }
    //   }


  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      // console.log(nextProps, nextState);
      var index = nextProps.playIndex;
      if (this.playIndex != index) {
        this.playIndex = index;
        var video = this.getVideoElement();
        video.load();
        this.play();
      }
    }
  }, {
    key: 'getSources',
    value: function getSources() {

      var index = this.playIndex;

      var url = this.props.url;
      var type = this.props.type || 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"';

      if (index > -1) {
        url = url + "#t=" + this.props.cuts[index].start + "," + this.props.cuts[index].end;
      }

      var sources = [];
      sources.push(_react2.default.createElement('source', { src: url, type: type, key: 'video-src' }));
      return sources;
    }
  }, {
    key: 'getController',
    value: function getController() {

      var play = this.state.playing ? "fa fa-pause" : "fa fa-play";
      var rec = this.state.playing && this.state.recording ? "fa fa-pause" : "fa fa-circle";

      return _react2.default.createElement(
        'div',
        { className: 'video-controller center' },
        _react2.default.createElement(
          'button',
          {
            onClick: this.tooglePlay,
            type: 'button',
            className: 'btn btn-circle btn-lg'
          },
          _react2.default.createElement('i', { className: play, 'aria-hidden': 'true' })
        ),
        _react2.default.createElement(
          'button',
          {
            onClick: this.toogleRecord,
            type: 'button',
            className: 'btn btn-circle btn-record btn-lg'
          },
          _react2.default.createElement('i', { className: rec, 'aria-hidden': 'true' })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {

      var sources = this.getSources();
      var controller = this.getController();

      /* media events
      onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting
      	controls autoPlay
      */

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'video',
          {
            className: 'video-player',
            ref: 'video',
            onPlay: this.onPlaying,
            onTimeUpdate: this.onTimeUpdate,
            onPause: this.onPause,
            onEnded: this.onEnded
          },
          sources
        ),
        controller
      );
    }
  }]);

  return Editor;
}(_react2.default.Component);

exports.default = Editor;

},{"react":"react","react-dom":"react-dom"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Editor = require("./Editor");

var _Editor2 = _interopRequireDefault(_Editor);

var _Cuts = require("./Cuts");

var _Cuts2 = _interopRequireDefault(_Cuts);

var _Search = require("./Search");

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = _react2.default.createClass({
	displayName: "Main",
	render: function render() {
		return _react2.default.createElement(
			"div",
			{ className: "video-editor" },
			_react2.default.createElement(_Editor2.default, this.props),
			_react2.default.createElement(_Cuts2.default, this.props),
			_react2.default.createElement(_Search2.default, this.props)
		);
	}
});

exports.default = Main;

},{"./Cuts":5,"./Editor":6,"./Search":8,"react":"react"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(Search, [{
    key: "_onChange",
    value: function _onChange(event) {
      var val = event.target.value;
      this.props.setSearchFilter(val);
    }
  }, {
    key: "render",
    value: function render() {

      if (this.props.cuts.length > 0) {

        return _react2.default.createElement(
          "div",
          { className: "container search" },
          _react2.default.createElement(
            "div",
            null,
            "Filter by:"
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement("input", {
              type: "text",
              className: "form-control",
              placeholder: "Search",
              onChange: this._onChange })
          )
        );
      } else {
        return _react2.default.createElement("div", null);
      }
    }
  }]);

  return Search;
}(_react2.default.Component);

exports.default = Search;

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var _ReactCSSTransitionGroup2 = _interopRequireDefault(_ReactCSSTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TagInput object
 * import TagInput from "./TagInput";
 *
 * basic use
 * render( 
 * 	<TagInput />,
 * 	document.getElementById('exp') 
 * 	);
 *
 * set the input type id or class
 * render( 
 * 	<TagInput type="email" id="email" _class="some-class" />,
 * 	document.getElementById('exp') 
 * 	);
 *
 * set your tags on load	
 * const tags = ["one", "two", "three", "four"]
 *
 * render( 
 * 	<TagInput tags={tags} />,
 * 	document.getElementById('exp') 
 * 	);
 *
 *
 * listen when updates are made.
 * function onUpdate(tags) {
 * 	console.log('onUpdate', tags);
 * }
 *
 * render( 
 * 	<TagInput onUpdate={onUpdate} />,
 * 	document.getElementById('exp') 
 * 	);
 * 	
 */
var TagInput = function (_React$Component) {
	_inherits(TagInput, _React$Component);

	function TagInput() {
		_classCallCheck(this, TagInput);

		var _this = _possibleConstructorReturn(this, (TagInput.__proto__ || Object.getPrototypeOf(TagInput)).call(this));

		_this.state = {
			type: "text",
			focus: false,
			tags: [],
			text: ''
		};

		_this._getInput = _this._getInput.bind(_this);
		_this._onChange = _this._onChange.bind(_this);
		_this._catchEnter = _this._catchEnter.bind(_this);
		_this._onFocus = _this._onFocus.bind(_this);
		_this._onBlur = _this._onBlur.bind(_this);
		_this._getTags = _this._getTags.bind(_this);
		_this._addTag = _this._addTag.bind(_this);
		_this._removeTag = _this._removeTag.bind(_this);
		_this._removeTagByIndex = _this._removeTagByIndex.bind(_this);
		_this._isTag = _this._isTag.bind(_this);
		_this._validateEmail = _this._validateEmail.bind(_this);

		return _this;
	}

	_createClass(TagInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.tags) this.setState({ tags: this.props.tags });
		}
	}, {
		key: '_update',
		value: function _update() {
			var tags = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			if (this.props.onUpdate) {
				var t = tags != false ? tags : this.state.tags;
				this.props.onUpdate(t);
			}
		}
	}, {
		key: '_isTag',
		value: function _isTag(val) {
			for (var i = 0; i < this.state.tags.length; i++) {
				if (this.state.tags[i].toLowerCase() === val.toLowerCase()) return true;
			};
			return false;
		}
	}, {
		key: '_getIndex',
		value: function _getIndex(val) {
			for (var i = 0; i < this.state.tags.length; i++) {
				if (this.state.tags[i].toLowerCase() === val.toLowerCase()) return i;
			};
			return -1;
		}
	}, {
		key: '_addTag',
		value: function _addTag(val) {
			if (!this._isTag(val)) {

				if (this.props.type && this.props.type === 'email') {
					if (!this._validateEmail(val)) return false;
				}

				var tags = [].concat(_toConsumableArray(this.state.tags));
				tags = tags.concat([val]);
				this.setState({ tags: tags });
				this._update(tags);
			}
		}
	}, {
		key: '_removeTag',
		value: function _removeTag(val) {
			var index = this._getIndex(val);
			if (index > -1) this._removeTagByIndex(index);
		}
	}, {
		key: '_removeTagByIndex',
		value: function _removeTagByIndex(index) {
			var tags = [].concat(_toConsumableArray(this.state.tags.slice(0, index)), _toConsumableArray(this.state.tags.slice(index + 1)));
			this.setState({ tags: tags });
			this._update(tags);
		}
	}, {
		key: '_validateEmail',
		value: function _validateEmail(val) {
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return filter.test(val);
		}
	}, {
		key: '_getInput',
		value: function _getInput() {

			var _class = this.props._class ? this.props._class : "";
			var _type = this.props.type ? this.props.type : this.state.type;
			var _id = this.props.id ? this.props.id : "";
			var _placeholder = this.props.placeholder ? this.props.placeholder : "";

			return _react2.default.createElement('input', {
				value: this.state.text,
				type: _type,
				className: _class,
				id: _id,
				placeholder: _placeholder,
				onChange: this._onChange,
				onKeyDown: this._catchEnter,
				onFocus: this._onFocus,
				onBlur: this._onBlur });
		}
	}, {
		key: '_getTags',
		value: function _getTags() {
			var _this2 = this;

			var rows = [];
			if (this.state.tags) {
				this.state.tags.map(function (item, index) {
					rows.push(_react2.default.createElement(
						'span',
						{
							className: 'tag',
							key: index
						},
						item,
						_react2.default.createElement(
							'button',
							{
								className: 'remove',
								onClick: _this2._removeTagByIndex.bind(_this2, index)
							},
							'×'
						)
					));
				});
			}

			if (rows.length > 0) {
				return _react2.default.createElement(
					'div',
					{ className: 'messages-list' },
					_react2.default.createElement(
						_ReactCSSTransitionGroup2.default,
						{
							transitionName: 'fade',
							transitionEnterTimeout: 500,
							transitionLeaveTimeout: 300,
							transitionAppear: true,
							transitionAppearTimeout: 500
						},
						rows
					)
				);
			}

			return "";
		}
	}, {
		key: '_onChange',
		value: function _onChange(event) {
			this.setState({ text: event.target.value });
		}
	}, {
		key: '_catchEnter',
		value: function _catchEnter(event) {
			var val = event.target.value;
			if (event.keyCode === 13 && val.length > 0) {
				this._addTag(val);
				this.setState({ text: "" });
			}
		}
	}, {
		key: '_onFocus',
		value: function _onFocus(event) {
			this.setState({ focus: true });
		}
	}, {
		key: '_onBlur',
		value: function _onBlur(event) {
			this.setState({ focus: false });
		}
	}, {
		key: 'render',
		value: function render() {

			var tags = this._getTags();
			var input = this._getInput();

			var c = "react-tag-input";
			if (this.state.focus == true) c += " focus";

			return _react2.default.createElement(
				'div',
				{ className: c },
				tags,
				input
			);
		}
	}]);

	return TagInput;
}(_react2.default.Component);

exports.default = TagInput;

},{"react":"react","react/lib/ReactCSSTransitionGroup":"react/lib/ReactCSSTransitionGroup"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function cuts() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'ADD_CUT':
			return [].concat(_toConsumableArray(state), [{
				start: action.data.start,
				end: action.data.end,
				title: "",
				tags: []
			}]);
		case 'DELETE_CUT':
			var index = action.index;
			return [].concat(_toConsumableArray(state.slice(0, index)), _toConsumableArray(state.slice(index + 1)));
		case 'SET_TAGS':
			// console.log(state, action);
			var index = action.index;
			var tags = action.tags;
			var o = Object.assign({}, state[index]);
			o.tags = tags;
			return [].concat(_toConsumableArray(state.slice(0, index)), [o], _toConsumableArray(state.slice(index + 1)));
		default:
			return state;
	}
	return state;
}

exports.default = cuts;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function filter() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'SET_SEARCH_FILTER':
			// console.log('SET_PLAY_INDEX', state, action);
			return action.filter;
		// return state;
		default:
			return state;
	}
	return state;
}

exports.default = filter;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _cuts = require('./cuts');

var _cuts2 = _interopRequireDefault(_cuts);

var _playIndex = require('./playIndex');

var _playIndex2 = _interopRequireDefault(_playIndex);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
	cuts: _cuts2.default,
	playIndex: _playIndex2.default,
	filter: _filter2.default
	// routing: routerReducer
});
// import { routerReducer } from 'react-router-redux';

// combine all your reducers into one root reducer
exports.default = rootReducer;

},{"./cuts":10,"./filter":11,"./playIndex":13,"redux":"redux"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function playIndex() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'SET_PLAY_INDEX':
			// console.log('SET_PLAY_INDEX', state, action);
			return action.index;
		// return state;
		default:
			return state;
	}
	return state;
}

exports.default = playIndex;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _index = require('./reducers/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load external data if needed
// import data from "./data/data";

// defualt data goes here..
var defaultState = {
	cuts: [],
	playIndex: -1,
	filter: ""
};

// enable redux dev tools


// get the global reducer
var enhancers = (0, _redux.compose)(window.devToolsExtension ? window.devToolsExtension() : function (f) {
	return f;
});

// create the store
var store = (0, _redux.createStore)(_index2.default, defaultState, enhancers);

// auto refresh our module.
if (module.hot) {
	module.hot.accept('./reducers', function () {
		var nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	});
}

exports.default = store;

},{"./reducers/index":12,"react-router-redux":"react-router-redux","redux":"redux"}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYWN0aW9ucy9hY3Rpb25DcmVhdG9ycy5qcyIsInNyYy9qcy9hcHAuanMiLCJzcmMvanMvY29tcG9uZW50cy9BcHAuanMiLCJzcmMvanMvY29tcG9uZW50cy9DdXQuanMiLCJzcmMvanMvY29tcG9uZW50cy9DdXRzLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvRWRpdG9yLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvTWFpbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL1NlYXJjaC5qcyIsInNyYy9qcy9jb21wb25lbnRzL1RhZ0lucHV0LmpzIiwic3JjL2pzL3JlZHVjZXJzL2N1dHMuanMiLCJzcmMvanMvcmVkdWNlcnMvZmlsdGVyLmpzIiwic3JjL2pzL3JlZHVjZXJzL2luZGV4LmpzIiwic3JjL2pzL3JlZHVjZXJzL3BsYXlJbmRleC5qcyIsInNyYy9qcy9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDR2dCLE0sR0FBQSxNO1FBT0EsUyxHQUFBLFM7UUFPQSxPLEdBQUEsTztRQVFBLFksR0FBQSxZO1FBT0EsZSxHQUFBLGU7O0FBL0JoQjs7QUFFTyxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFDNUIsUUFBTztBQUNOLFFBQU8sU0FERDtBQUVOO0FBRk0sRUFBUDtBQUlBOztBQUVNLFNBQVMsU0FBVCxDQUFtQixLQUFuQixFQUEwQjtBQUNoQyxRQUFPO0FBQ04sUUFBTyxZQUREO0FBRU47QUFGTSxFQUFQO0FBSUE7O0FBRU0sU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLElBQXhCLEVBQThCO0FBQ3BDLFFBQU87QUFDTixRQUFPLFVBREQ7QUFFTixjQUZNO0FBR047QUFITSxFQUFQO0FBS0E7O0FBRU0sU0FBUyxZQUFULENBQXNCLEtBQXRCLEVBQTZCO0FBQ25DLFFBQU87QUFDTixRQUFPLGdCQUREO0FBRU47QUFGTSxFQUFQO0FB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b3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8vIGFjdGlvbnMgZ29lcyBoZXJlXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDdXQoZGF0YSkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGUgOiBcIkFERF9DVVRcIixcblx0XHRkYXRhXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUN1dChpbmRleCkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGUgOiBcIkRFTEVURV9DVVRcIixcblx0XHRpbmRleFxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUYWdzKGluZGV4LCB0YWdzKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZSA6IFwiU0VUX1RBR1NcIixcblx0XHRpbmRleCxcblx0XHR0YWdzXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXlJbmRleChpbmRleCkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGUgOiBcIlNFVF9QTEFZX0lOREVYXCIsXG5cdFx0aW5kZXhcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U2VhcmNoRmlsdGVyKGZpbHRlcikge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGUgOiBcIlNFVF9TRUFSQ0hfRklMVEVSXCIsXG5cdFx0ZmlsdGVyXG5cdH1cbn1cblxuIiwiXG4vLyByZWFjdFxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbi8vIFByb3ZpZGVyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuLy9jb21wb25lbnRzXG5pbXBvcnQgQXBwIGZyb20gXCIuL2NvbXBvbmVudHMvQXBwXCI7XG5cbi8vIHN0b3JlXG5pbXBvcnQgc3RvcmUgZnJvbSBcIi4vc3RvcmVcIjtcblxuY29uc3QgdXJsID0gXCJodHRwOi8vZ3JvY2h0ZHJlaXMuZGUvZnVlci1qc2ZpZGRsZS92aWRlby9zaW50ZWxfdHJhaWxlci00ODAubXA0XCI7XG5cbi8vIGRlZmluZSB0aGUgcHJvdmlkZXIvcm91dGVyXG5jb25zdCBwcm92aWRlciA9IChcblx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG5cdFx0PEFwcCB1cmw9e3VybH0gLz5cblx0PC9Qcm92aWRlcj5cbik7XG5cblxuLy8gcmVuZGVyXG5yZW5kZXIocHJvdmlkZXIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuIiwiaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCAqIGFzIGFjdGlvbkNyZWF0b3JzIGZyb20gXCIuLi9hY3Rpb25zL2FjdGlvbkNyZWF0b3JzXCI7XG5pbXBvcnQgTWFpbiBmcm9tIFwiLi9NYWluXCI7XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkge1xuXHRyZXR1cm4ge1xuXHRcdGN1dHM6IHN0YXRlLmN1dHMsXG5cdFx0cGxheUluZGV4IDogc3RhdGUucGxheUluZGV4LFxuXHRcdGZpbHRlciA6IHN0YXRlLmZpbHRlclxuXHR9XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuXHRyZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG59XG5cbmNvbnN0IEFwcCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE1haW4pO1xuZXhwb3J0IGRlZmF1bHQgQXBwOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVGFnSW5wdXQgZnJvbSBcIi4vVGFnSW5wdXRcIjtcblxuY2xhc3MgQ3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMucGxheWluZyAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvb2dsZVBsYXkgPSB0aGlzLnRvb2dsZVBsYXkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy50cmFzaCAgICAgID0gdGhpcy50cmFzaC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRhZ3MgPSB0aGlzLnVwZGF0ZVRhZ3MuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICB0b29nbGVQbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxheWluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5zZXRQbGF5SW5kZXgodGhpcy5wcm9wcy5jdXRJZCk7XG4gICAgfVxuXG4gICAgdHJhc2goKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGVsZXRlQ3V0KHRoaXMucHJvcHMuY3V0SWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRhZ3ModGFncykge1xuICAgICAgICB0aGlzLnByb3BzLnNldFRhZ3ModGhpcy5wcm9wcy5jdXRJZCwgdGFncyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGNvbnN0IGljb24gICAgID0gdGhpcy5wcm9wcy5wbGF5SW5kZXggPT0gdGhpcy5wcm9wcy5jdXRJZCA/IFwiZmEgZmEtcGF1c2VcIiA6IFwiZmEgZmEtcGxheVwiO1xuICAgICAgICBjb25zdCBuYW1lICAgICA9IHRoaXMucHJvcHMuaXRlbS50aXRsZSA/IHRoaXMucHJvcHMuaXRlbS50aXRsZSA6IFwiQ3V0IFwiICsgKHRoaXMucHJvcHMuY3V0SWQgKyAxKTtcbiAgICAgICAgY29uc3QgdGFncyAgICAgPSB0aGlzLnByb3BzLml0ZW0udGFncy5sZW5ndGggPiAwID8gdGhpcy5wcm9wcy5pdGVtLnRhZ3MgOiBbXTtcbiAgICAgICAgY29uc3Qgc3RhcnQgICAgPSB0aGlzLnByb3BzLml0ZW0uc3RhcnQudG9GaXhlZCgyKTtcbiAgICAgICAgY29uc3QgZW5kICAgICAgPSB0aGlzLnByb3BzLml0ZW0uZW5kLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gKGVuZCAtIHN0YXJ0KS50b0ZpeGVkKDIpO1xuXG4gICAgXHRyZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlkZW8tY3V0LXdyYXBwZXIgY29udGFpbmVyLWZsdWlkXCIgPlxuICAgICAgICAgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwidmlkZW8tY3V0IGNsZWFyZml4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB1bGwtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrICAgPSB7dGhpcy50b29nbGVQbGF5fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgICAgICA9IFwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1jaXJjbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9e2ljb259IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdWxsLWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PntuYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIFx0XHRcdDxzbWFsbD57ZHVyYXRpb259cyB8IHtzdGFydH1zIC0ge2VuZH1zPC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVsbC1yaWdodCBhY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljayAgID0ge3RoaXMudHJhc2h9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgID0gXCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJidG4gYnRuLWNpcmNsZSBidG4tdHJhc2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS10cmFzaFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXHRcdDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlkZW8tdGFncyBjbGVhcmZpeFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhZ0lucHV0IHRhZ3M9e3RhZ3N9IG9uVXBkYXRlPXt0aGlzLnVwZGF0ZVRhZ3N9IHBsYWNlaG9sZGVyPVwiQWRkIHRhZ3NcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuXG4gICAgXHQpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEN1dDsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwIGZyb20gJ3JlYWN0L2xpYi9SZWFjdENTU1RyYW5zaXRpb25Hcm91cCc7XG5pbXBvcnQgQ3V0IGZyb20gXCIuL0N1dFwiO1xuXG5cbmNsYXNzIEN1dHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdCBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgaGFzVGFnKHRhZ3MsIGZpbHRlcikge1xuICAgICAgICBpZiAodGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGFnc1tpXS5pbmRleE9mKGZpbHRlcikgIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLnByb3BzLmZpbHRlcjtcbiAgICBcdGNvbnN0IHJvd3MgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY3V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5wcm9wcy5jdXRzLmxlbmd0aC0xOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzVGFnKHRoaXMucHJvcHMuY3V0c1tpXS50YWdzLCBmaWx0ZXIpKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLnByb3BzLmN1dHNbaV0uc3RhcnQgKyBcIl9cIiArIHRoaXMucHJvcHMuY3V0c1tpXS5lbmQ7XG4gICAgICAgIFx0XHRyb3dzLnB1c2goPEN1dCBcbiAgICAgICAgICAgICAgICAgICAga2V5ICAgICAgICAgID0ge2tleX0gXG4gICAgICAgICAgICAgICAgICAgIGlkICAgICAgICAgICA9IHtpfVxuICAgICAgICAgICAgICAgICAgICBjdXRJZCAgICAgICAgPSB7aX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbSAgICAgICAgID0ge3RoaXMucHJvcHMuY3V0c1tpXX1cbiAgICAgICAgICAgICAgICAgICAgcGxheUluZGV4ICAgID0ge3RoaXMucHJvcHMucGxheUluZGV4fVxuICAgICAgICAgICAgICAgICAgICBzZXRQbGF5SW5kZXggPSB7dGhpcy5wcm9wcy5zZXRQbGF5SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUN1dCAgICA9IHt0aGlzLnByb3BzLmRlbGV0ZUN1dH1cbiAgICAgICAgICAgICAgICAgICAgc2V0VGFncyAgICAgID0ge3RoaXMucHJvcHMuc2V0VGFnc30gLz4pXG4gICAgICAgIFx0fTtcbiAgICAgICAgfVxuXG4gICAgXHRyZXR1cm4gKFxuICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInZpZGVvLWN1dHNcIj5cbiAgICBcdFx0XHQ8UmVhY3RDU1NUcmFuc2l0aW9uR3JvdXAgXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZSAgICAgICAgICA9XCJmYWRlXCIgXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0ICA9ezUwMH0gXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0ICA9ezMwMH1cblx0XHRcdFx0XHRcdHRyYW5zaXRpb25BcHBlYXIgICAgICAgID17dHJ1ZX0gXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uQXBwZWFyVGltZW91dCA9ezUwMH1cblx0XHRcdCAgICAgICAgPlxuXHRcdFx0XHRcdHtyb3dzfVxuXHRcdFx0XHQ8L1JlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwPlxuICAgIFx0XHQ8L2Rpdj5cbiAgICBcdCk7XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3V0czsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmNsYXNzIEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBcdHBsYXlpbmcgOiBmYWxzZSxcbiAgICAgICAgXHRyZWNvcmRpbmcgOiBmYWxzZSxcbiAgICAgICAgXHRsb29waW5nIDogZmFsc2UsXG4gICAgICAgIFx0Y3V0Onsgc3RhcnQ6LTEsIGVuZDotMSB9XG4gICAgICAgIH1cblxuXHRcdHRoaXMudmlkZW8gICAgICA9IGZhbHNlO1xuXHRcdHRoaXMucGxheUluZGV4ICA9IC0xO1xuXG5cdFx0dGhpcy5nZXRWaWRlb0VsZW1lbnQgPSB0aGlzLmdldFZpZGVvRWxlbWVudC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucGxheSAgICAgICAgICAgID0gdGhpcy5wbGF5LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5wYXVzZSAgICAgICAgICAgPSB0aGlzLnBhdXNlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZWNvcmQgICAgICAgICAgPSB0aGlzLnJlY29yZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRkQ3V0ICAgICAgICAgID0gdGhpcy5hZGRDdXQuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJlc2V0UmVjb3JkaW5nICA9IHRoaXMucmVzZXRSZWNvcmRpbmcuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uVGltZVVwZGF0ZSAgICA9IHRoaXMub25UaW1lVXBkYXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vblBsYXlpbmcgICAgICAgPSB0aGlzLm9uUGxheWluZy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25QYXVzZSAgICAgICAgID0gdGhpcy5vblBhdXNlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vbkVuZGVkICAgICAgICAgPSB0aGlzLm9uRW5kZWQuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uRW5kZWQgICAgICAgICA9IHRoaXMub25FbmRlZC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudG9vZ2xlUGxheSAgICAgID0gdGhpcy50b29nbGVQbGF5LmJpbmQodGhpcyk7XG5cdFx0dGhpcy50b29nbGVSZWNvcmQgICAgPSB0aGlzLnRvb2dsZVJlY29yZC5iaW5kKHRoaXMpO1xuXG4gICAgfVxuXG4gICAgZ2V0VmlkZW9FbGVtZW50KCkge1xuICAgIFx0aWYgKHRoaXMudmlkZW8gPT09IGZhbHNlKSB7XG5cdFx0XHR2YXIgd3JhcGVyID0gUmVhY3RET00uZmluZERPTU5vZGUoIHRoaXMgKTtcblx0XHRcdHRoaXMudmlkZW8gPSBSZWFjdERPTS5maW5kRE9NTm9kZSggdGhpcy5yZWZzLnZpZGVvICk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnZpZGVvO1xuICAgIH1cblxuICAgIHRvb2dsZVBsYXkoKSB7XG4gICAgXHQodGhpcy5zdGF0ZS5wbGF5aW5nKSA/IHRoaXMucGF1c2UoKSA6IHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIHRvb2dsZVJlY29yZCgpIHtcbiAgICBcdCh0aGlzLnN0YXRlLnJlY29yZGluZykgPyB0aGlzLnBhdXNlKCkgOiB0aGlzLnJlY29yZCgpO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgXHQvLyBwbGF5IHRoZSB2aWRlb1xuICAgIFx0Y29uc3QgdmlkZW8gPSB0aGlzLmdldFZpZGVvRWxlbWVudCgpO1xuICAgIFx0aWYgKHZpZGVvLnBhdXNlZCkge1xuICAgIFx0XHR2aWRlby5wbGF5KCk7XG4gICAgXHRcdHRoaXMuc2V0U3RhdGUoe3BsYXlpbmc6dHJ1ZX0pO1xuICAgIFx0fSBlbHNlIHtcbiAgICBcdFx0Ly8gbm8gbmVlZCB0byBkbyBhbnl0aGluZy5cbiAgICBcdH1cbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICBcdC8vIHBhdXNlIHRoZSB2aWRlb1xuICAgIFx0Y29uc3QgdmlkZW8gPSB0aGlzLmdldFZpZGVvRWxlbWVudCgpO1xuICAgIFx0aWYgKHZpZGVvLnBhdXNlZCkge1xuICAgIFx0XHQvLyBubyBuZWVkIHRvIGRvIGFueXRoaW5nLlxuICAgIFx0fSBlbHNlIHtcbiAgICBcdFx0dGhpcy5zZXRTdGF0ZSh7cGxheWluZzpmYWxzZSwgbG9vcGluZzpmYWxzZX0pO1xuICAgIFx0XHR2aWRlby5wYXVzZSgpO1xuICAgIFx0XHRpZiAodGhpcy5zdGF0ZS5yZWNvcmRpbmcpIHtcbiAgICBcdFx0XHR0aGlzLnNldFN0YXRlKHtyZWNvcmRpbmc6ZmFsc2V9KTtcbiAgICBcdFx0XHR0aGlzLnN0YXRlLmN1dC5lbmQgPSB2aWRlby5jdXJyZW50VGltZTtcbiAgICBcdFx0XHR0aGlzLmFkZEN1dCgpO1xuICAgIFx0XHR9XG4gICAgXHR9XG4gICAgfVxuXG4gICAgcmVjb3JkKCkge1xuICAgIFx0Y29uc3QgdmlkZW8gPSB0aGlzLmdldFZpZGVvRWxlbWVudCgpO1xuICAgIFx0KHRoaXMuc3RhdGUucGxheWluZykgPyBcIlwiIDogdGhpcy5wbGF5KCk7XG4gICAgXHQvLyBzZXQgdGhlIHJlY29yZGluZ1xuICAgIFx0dGhpcy5zZXRTdGF0ZSh7IHJlY29yZGluZzp0cnVlLCBjdXQ6eyBzdGFydDp2aWRlby5jdXJyZW50VGltZSwgZW5kOi0xIH0gfSk7XG4gICAgfVxuXG4gICAgYWRkQ3V0KCkge1xuICAgIFx0aWYgKHRoaXMuc3RhdGUuY3V0LnN0YXJ0ICE9IC0xICYmIHRoaXMuc3RhdGUuY3V0LmVuZCAhPSAtMSkge1xuICAgIFx0XHQvLyBhZGQgdGhlIG5ldyBjdXRcbiAgICBcdFx0dGhpcy5wcm9wcy5hZGRDdXQodGhpcy5zdGF0ZS5jdXQpO1xuICAgIFx0XHQvLyByZXNldCB0aGUgc3RhdGVcbiAgICBcdFx0dGhpcy5yZXNldFJlY29yZGluZygpO1xuICAgIFx0fVxuICAgIH1cblxuICAgIHJlc2V0UmVjb3JkaW5nKCkge1xuICAgIFx0dGhpcy5zZXRTdGF0ZSh7cmVjb3JkaW5nOmZhbHNlLCBjdXQ6eyBzdGFydDotMSwgZW5kOi0xIH0gfSk7XG4gICAgfVxuXG4gICAgb25UaW1lVXBkYXRlKGV2ZW50KSB7XG4gICAgXHQvLyBjb25zb2xlLmxvZygnb25UaW1lVXBkYXRlJywgZXZlbnQubmF0aXZlRXZlbnQudGFyZ2V0LmN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBvblBsYXlpbmcoZXZlbnQpIHtcbiAgICBcdHRoaXMuc2V0U3RhdGUoe3BsYXlpbmc6dHJ1ZX0pXG4gICAgXHQvLyBjb25zb2xlLmxvZygncGxheWluZycsIGV2ZW50Lm5hdGl2ZUV2ZW50LnRhcmdldC5jdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgb25QYXVzZShldmVudCkge1xuICAgIFx0dGhpcy5zZXRTdGF0ZSh7cGxheWluZzpmYWxzZX0pO1xuICAgIFx0aWYgKHRoaXMuc3RhdGUubG9vcGluZylcbiAgICBcdFx0dGhpcy5sb2FkTmV4dCgpO1xuICAgIFx0Ly8gY29uc29sZS5sb2coJ29uUGF1c2UnLCBldmVudC5uYXRpdmVFdmVudC50YXJnZXQuY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIG9uRW5kZWQoZXZlbnQpIHtcblxuICAgIFx0aWYgKHRoaXMuc3RhdGUucmVjb3JkaW5nKSB7XG4gICAgXHRcdFxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmVjb3JkaW5nOmZhbHNlfSk7XG5cdFx0XHRjb25zdCB2aWRlbyA9IHRoaXMuZ2V0VmlkZW9FbGVtZW50KCk7XG5cdFx0XHR0aGlzLnN0YXRlLmN1dC5lbmQgPSB2aWRlby5jdXJyZW50VGltZTtcblx0XHRcdHRoaXMuYWRkQ3V0KCk7XG4gICAgXHRcdFxuICAgIFx0XHR0aGlzLnBhdXNlKCk7XG4gICAgXHRcdHRoaXMuc2V0U3RhdGUoe2xvb3Bpbmc6ZmFsc2V9KVxuICAgIFx0fSBlbHNlIHtcbiAgICBcdFx0Ly8gbW92ZSB0byB0aGUgbmV4dCBjbGlwIGlmIHdlIGhhdmUgb25lLlxuICAgIFx0XHR0aGlzLmxvYWROZXh0KCk7XG4gICAgXHR9XG4gICAgXHRjb25zb2xlLmxvZygnb25FbmRlZCcsIGV2ZW50Lm5hdGl2ZUV2ZW50LnRhcmdldC5jdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgbG9hZE5leHQoKSB7XG4gICAgXHQvLyBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVudEN1dCArIDE7XG4gICAgXHQvLyB0aGlzLmxvYWRTb3VyY2UoaW5kZXgpO1xuICAgIH1cblxuICAvLyAgIGxvYWRTb3VyY2UoaW5kZXgpIHtcbiAgLy8gICBcdGlmICh0aGlzLnByb3BzLmN1dHMubGVuZ3RoID4gMCAmJiBpbmRleCA8IHRoaXMucHJvcHMuY3V0cy5sZW5ndGgpIHtcblx0XHRcdFxuXHRcdC8vIFx0dGhpcy5jdXJyZW50Q3V0ID0gaW5kZXg7XG5cdFx0Ly8gXHR0aGlzLnNldFN0YXRlKHtsb29waW5nOnRydWV9KTtcblx0XHQvLyBcdC8vIG1ha2Ugc3VyZSB0aGUgY3VycmVudC9lbmQgdGltZSBpcyBzZXRcblx0XHQvLyBcdHZhciB2aWRlbyA9IHRoaXMuZ2V0VmlkZW9FbGVtZW50KCk7XG5cdFx0Ly8gXHR2aWRlby5sb2FkKCk7XG5cblx0XHQvLyBcdHRoaXMucGxheSgpO1xuXHRcdC8vIFx0Ly8gdmlkZW8uY3VycmVudFRpbWUgPSB0aGlzLnByb3BzLmN1dHNbaW5kZXhdLnN0YXJ0O1xuXHRcdC8vIH1cbiAgLy8gICB9XG5cblxuXHRjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG5cdFx0Ly8gY29uc29sZS5sb2cobmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuXHRcdHZhciBpbmRleCA9IG5leHRQcm9wcy5wbGF5SW5kZXg7XG4gICAgXHRpZiAodGhpcy5wbGF5SW5kZXggIT0gaW5kZXgpIHtcblx0XHRcdHRoaXMucGxheUluZGV4ID0gaW5kZXg7XHRcblx0XHRcdHZhciB2aWRlbyAgICAgID0gdGhpcy5nZXRWaWRlb0VsZW1lbnQoKTtcblx0XHRcdHZpZGVvLmxvYWQoKTtcblx0XHRcdHRoaXMucGxheSgpO1xuICAgIFx0fVxuXHR9XG5cblxuICAgIGdldFNvdXJjZXMoKSB7XG5cbiAgICBcdHZhciBpbmRleCA9IHRoaXMucGxheUluZGV4XG5cbiAgICBcdHZhciB1cmwgID0gdGhpcy5wcm9wcy51cmw7XG5cdFx0dmFyIHR5cGUgPSB0aGlzLnByb3BzLnR5cGUgfHwgJ3ZpZGVvL21wNDtjb2RlY3M9XCJhdmMxLjQyRTAxRSwgbXA0YS40MC4yXCInO1xuXG5cdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdHVybCA9IHVybCArIFwiI3Q9XCIgKyB0aGlzLnByb3BzLmN1dHNbaW5kZXhdLnN0YXJ0ICsgXCIsXCIgKyB0aGlzLnByb3BzLmN1dHNbaW5kZXhdLmVuZDtcblx0XHR9XG5cbiAgICBcdGNvbnN0IHNvdXJjZXMgPSBbXTtcbiAgICBcdHNvdXJjZXMucHVzaCggPHNvdXJjZSBzcmM9e3VybH0gdHlwZT17dHlwZX0ga2V5PVwidmlkZW8tc3JjXCIgLz4gKTtcbiAgICBcdHJldHVybiBzb3VyY2VzO1xuICAgIH1cblxuICAgIGdldENvbnRyb2xsZXIoKSB7XG5cblx0XHRjb25zdCBwbGF5ID0gdGhpcy5zdGF0ZS5wbGF5aW5nID8gXCJmYSBmYS1wYXVzZVwiIDogXCJmYSBmYS1wbGF5XCI7XG5cdFx0Y29uc3QgcmVjICA9IHRoaXMuc3RhdGUucGxheWluZyAmJiB0aGlzLnN0YXRlLnJlY29yZGluZyA/IFwiZmEgZmEtcGF1c2VcIiA6IFwiZmEgZmEtY2lyY2xlXCI7XG5cbiAgICBcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInZpZGVvLWNvbnRyb2xsZXIgY2VudGVyXCIgPlxuXHRcdFx0XHQ8YnV0dG9uIFxuXHRcdFx0XHRcdG9uQ2xpY2sgICA9IHt0aGlzLnRvb2dsZVBsYXl9XG5cdFx0XHRcdFx0dHlwZSAgICAgID0gXCJidXR0b25cIiBcblx0XHRcdFx0XHRjbGFzc05hbWUgPSBcImJ0biBidG4tY2lyY2xlIGJ0bi1sZ1wiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9e3BsYXl9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRvbkNsaWNrICAgPSB7dGhpcy50b29nbGVSZWNvcmR9IFxuXHRcdFx0XHRcdHR5cGUgICAgICA9IFwiYnV0dG9uXCJcblx0XHRcdFx0XHRjbGFzc05hbWUgPSBcImJ0biBidG4tY2lyY2xlIGJ0bi1yZWNvcmQgYnRuLWxnXCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxpIGNsYXNzTmFtZT17cmVjfSBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIFxuXHRcdGNvbnN0IHNvdXJjZXMgICAgPSB0aGlzLmdldFNvdXJjZXMoKTtcblx0XHRjb25zdCBjb250cm9sbGVyID0gdGhpcy5nZXRDb250cm9sbGVyKCk7XG5cbiAgICBcdC8qIG1lZGlhIGV2ZW50c1xuICAgIFx0b25BYm9ydCBvbkNhblBsYXkgb25DYW5QbGF5VGhyb3VnaCBvbkR1cmF0aW9uQ2hhbmdlIG9uRW1wdGllZCBvbkVuY3J5cHRlZCBvbkVuZGVkIG9uRXJyb3Igb25Mb2FkZWREYXRhIG9uTG9hZGVkTWV0YWRhdGEgb25Mb2FkU3RhcnQgb25QYXVzZSBvblBsYXkgb25QbGF5aW5nIG9uUHJvZ3Jlc3Mgb25SYXRlQ2hhbmdlIG9uU2Vla2VkIG9uU2Vla2luZyBvblN0YWxsZWQgb25TdXNwZW5kIG9uVGltZVVwZGF0ZSBvblZvbHVtZUNoYW5nZSBvbldhaXRpbmdcblxuICAgIFx0Y29udHJvbHMgYXV0b1BsYXlcbiAgICBcdCovXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgXHQ8ZGl2PlxuXHQgICAgICAgIFx0PHZpZGVvIFxuXHQgICAgICAgIFx0XHRjbGFzc05hbWUgICAgPSBcInZpZGVvLXBsYXllclwiXG5cdFx0XHRcdFx0cmVmICAgICAgICAgID0gXCJ2aWRlb1wiXG5cdFx0XHRcdFx0b25QbGF5ICAgICAgID0ge3RoaXMub25QbGF5aW5nfVxuXHRcdFx0XHRcdG9uVGltZVVwZGF0ZSA9IHt0aGlzLm9uVGltZVVwZGF0ZX1cblx0XHRcdFx0XHRvblBhdXNlICAgICAgPSB7dGhpcy5vblBhdXNlfVxuXHRcdFx0XHRcdG9uRW5kZWQgICAgICA9IHt0aGlzLm9uRW5kZWR9XG5cdCAgICAgICAgXHQ+XG5cdFx0XHRcdCAge3NvdXJjZXN9XG5cdFx0XHRcdDwvdmlkZW8+XG5cdFx0XHRcdHtjb250cm9sbGVyfVxuXHRcdFx0PC9kaXY+XG4gICAgXHQpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRvcjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRWRpdG9yIGZyb20gXCIuL0VkaXRvclwiO1xuaW1wb3J0IEN1dHMgZnJvbSBcIi4vQ3V0c1wiO1xuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9TZWFyY2hcIjtcblxuY29uc3QgTWFpbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInZpZGVvLWVkaXRvclwiPlxuXHRcdFx0XHQ8RWRpdG9yIHsuLi50aGlzLnByb3BzfSAvPlxuXHRcdFx0XHQ8Q3V0cyB7Li4udGhpcy5wcm9wc30gLz5cblx0XHRcdFx0PFNlYXJjaCB7Li4udGhpcy5wcm9wc30gLz5cdFx0XHRcblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNYWluOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuX29uQ2hhbmdlICAgPSB0aGlzLl9vbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIF9vbkNoYW5nZShldmVudCkge1xuICAgIFx0dmFyIHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBcdHRoaXMucHJvcHMuc2V0U2VhcmNoRmlsdGVyKHZhbCk7XG5cdH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgIFx0aWYgKHRoaXMucHJvcHMuY3V0cy5sZW5ndGggPiAwKSB7XG5cbiAgICBcdFx0cmV0dXJuKFxuICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzZWFyY2hcIj5cbiAgICBcdFx0XHQ8ZGl2PkZpbHRlciBieTo8L2Rpdj5cbiAgICBcdFx0XHQ8ZGl2PlxuICAgIFx0XHRcdDxpbnB1dCBcblx0XHRcdFx0XHR0eXBlICAgICAgICA9IFwidGV4dFwiIFxuXHRcdFx0XHRcdGNsYXNzTmFtZSAgID0gXCJmb3JtLWNvbnRyb2xcIiBcblx0XHRcdFx0XHRwbGFjZWhvbGRlciA9IFwiU2VhcmNoXCIgXG5cdFx0XHRcdFx0b25DaGFuZ2UgICAgPSB7dGhpcy5fb25DaGFuZ2V9IC8+XG5cdFx0XHRcdDwvZGl2PlxuICAgIFx0XHQ8L2Rpdj5cbiAgICBcdFx0KTtcblxuICAgIFx0fSBlbHNlIHtcbiAgICBcdFx0cmV0dXJuICg8ZGl2PjwvZGl2Pik7XG4gICAgXHR9XG5cbiAgICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2g7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdENTU1RyYW5zaXRpb25Hcm91cCBmcm9tICdyZWFjdC9saWIvUmVhY3RDU1NUcmFuc2l0aW9uR3JvdXAnO1xuXG4vKipcbiAqIFRhZ0lucHV0IG9iamVjdFxuICogaW1wb3J0IFRhZ0lucHV0IGZyb20gXCIuL1RhZ0lucHV0XCI7XG4gKlxuICogYmFzaWMgdXNlXG4gKiByZW5kZXIoIFxuICogXHQ8VGFnSW5wdXQgLz4sXG4gKiBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHAnKSBcbiAqIFx0KTtcbiAqXG4gKiBzZXQgdGhlIGlucHV0IHR5cGUgaWQgb3IgY2xhc3NcbiAqIHJlbmRlciggXG4gKiBcdDxUYWdJbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImVtYWlsXCIgX2NsYXNzPVwic29tZS1jbGFzc1wiIC8+LFxuICogXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwJykgXG4gKiBcdCk7XG4gKlxuICogc2V0IHlvdXIgdGFncyBvbiBsb2FkXHRcbiAqIGNvbnN0IHRhZ3MgPSBbXCJvbmVcIiwgXCJ0d29cIiwgXCJ0aHJlZVwiLCBcImZvdXJcIl1cbiAqXG4gKiByZW5kZXIoIFxuICogXHQ8VGFnSW5wdXQgdGFncz17dGFnc30gLz4sXG4gKiBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHAnKSBcbiAqIFx0KTtcbiAqXG4gKlxuICogbGlzdGVuIHdoZW4gdXBkYXRlcyBhcmUgbWFkZS5cbiAqIGZ1bmN0aW9uIG9uVXBkYXRlKHRhZ3MpIHtcbiAqIFx0Y29uc29sZS5sb2coJ29uVXBkYXRlJywgdGFncyk7XG4gKiB9XG4gKlxuICogcmVuZGVyKCBcbiAqIFx0PFRhZ0lucHV0IG9uVXBkYXRlPXtvblVwZGF0ZX0gLz4sXG4gKiBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHAnKSBcbiAqIFx0KTtcbiAqIFx0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhZ0lucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdHR5cGUgIDogXCJ0ZXh0XCIsXG5cdFx0XHRmb2N1cyA6IGZhbHNlLFxuXHRcdFx0dGFncyAgOiBbXSxcblx0XHRcdHRleHQgIDogJydcblx0XHR9O1xuXHRcdFxuXHRcdHRoaXMuX2dldElucHV0ICAgICAgICAgPSB0aGlzLl9nZXRJbnB1dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX29uQ2hhbmdlICAgICAgICAgPSB0aGlzLl9vbkNoYW5nZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX2NhdGNoRW50ZXIgICAgICAgPSB0aGlzLl9jYXRjaEVudGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fb25Gb2N1cyAgICAgICAgICA9IHRoaXMuX29uRm9jdXMuYmluZCh0aGlzKTtcblx0XHR0aGlzLl9vbkJsdXIgICAgICAgICAgID0gdGhpcy5fb25CbHVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fZ2V0VGFncyAgICAgICAgICA9IHRoaXMuX2dldFRhZ3MuYmluZCh0aGlzKTtcblx0XHR0aGlzLl9hZGRUYWcgICAgICAgICAgID0gdGhpcy5fYWRkVGFnLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fcmVtb3ZlVGFnICAgICAgICA9IHRoaXMuX3JlbW92ZVRhZy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX3JlbW92ZVRhZ0J5SW5kZXggPSB0aGlzLl9yZW1vdmVUYWdCeUluZGV4LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5faXNUYWcgICAgICAgICAgICA9IHRoaXMuX2lzVGFnLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fdmFsaWRhdGVFbWFpbCAgICA9IHRoaXMuX3ZhbGlkYXRlRW1haWwuYmluZCh0aGlzKTtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50YWdzKVxuICAgICAgICBcdHRoaXMuc2V0U3RhdGUoe3RhZ3M6dGhpcy5wcm9wcy50YWdzfSk7XG4gICAgfVxuXG5cbiAgICBfdXBkYXRlKHRhZ3MgPSBmYWxzZSkge1xuICAgIFx0aWYgKHRoaXMucHJvcHMub25VcGRhdGUpIHtcbiAgICBcdFx0Y29uc3QgdCA9IHRhZ3MgIT0gZmFsc2UgPyB0YWdzIDogdGhpcy5zdGF0ZS50YWdzO1xuICAgIFx0XHR0aGlzLnByb3BzLm9uVXBkYXRlKHQpO1xuICAgIFx0fVxuICAgIH1cblxuICAgIF9pc1RhZyh2YWwpIHtcbiAgICBcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS50YWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgXHRcdGlmICh0aGlzLnN0YXRlLnRhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gdmFsLnRvTG93ZXJDYXNlKCkpXG4gICAgXHRcdFx0cmV0dXJuIHRydWU7XG4gICAgXHR9O1xuICAgIFx0cmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIF9nZXRJbmRleCh2YWwpIHtcbiAgICBcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS50YWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgXHRcdGlmICh0aGlzLnN0YXRlLnRhZ3NbaV0udG9Mb3dlckNhc2UoKSA9PT0gdmFsLnRvTG93ZXJDYXNlKCkpXG4gICAgXHRcdFx0cmV0dXJuIGk7XG4gICAgXHR9O1xuICAgIFx0cmV0dXJuIC0xO1xuICAgIH1cblxuICAgIF9hZGRUYWcodmFsKSB7XG5cdFx0aWYgKCF0aGlzLl9pc1RhZyh2YWwpKSB7XG5cblx0XHRcdGlmICh0aGlzLnByb3BzLnR5cGUgJiYgdGhpcy5wcm9wcy50eXBlID09PSAnZW1haWwnKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fdmFsaWRhdGVFbWFpbCh2YWwpKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHRhZ3MgPSBbLi4udGhpcy5zdGF0ZS50YWdzXTtcblx0XHRcdHRhZ3MgPSB0YWdzLmNvbmNhdChbdmFsXSk7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0YWdzOnRhZ3N9KTtcblx0XHRcdHRoaXMuX3VwZGF0ZSh0YWdzKTtcblx0XHR9XG4gICAgfVxuXG4gICAgX3JlbW92ZVRhZyh2YWwpIHtcbiAgICBcdHZhciBpbmRleCA9IHRoaXMuX2dldEluZGV4KHZhbCk7XG4gICAgXHRpZiAoaW5kZXggPiAtMSkgXG4gICAgXHRcdHRoaXMuX3JlbW92ZVRhZ0J5SW5kZXgoaW5kZXgpO1xuICAgIH1cblxuICAgIF9yZW1vdmVUYWdCeUluZGV4KGluZGV4KSB7XG4gICAgXHR2YXIgdGFncyA9IFtcbiAgICBcdFx0Li4udGhpcy5zdGF0ZS50YWdzLnNsaWNlKDAsIGluZGV4KSxcbiAgICBcdFx0Li4udGhpcy5zdGF0ZS50YWdzLnNsaWNlKGluZGV4ICsgMSksXG4gICAgXHRdO1xuICAgXHRcdHRoaXMuc2V0U3RhdGUoe3RhZ3M6dGFnc30pO1xuICAgXHRcdHRoaXMuX3VwZGF0ZSh0YWdzKTtcbiAgICB9XG5cbiAgICBfdmFsaWRhdGVFbWFpbCh2YWwpIHtcbiAgICBcdHZhciBmaWx0ZXIgPSAvXihbYS16QS1aMC05X1xcLlxcLV0pK1xcQCgoW2EtekEtWjAtOVxcLV0pK1xcLikrKFthLXpBLVowLTldezIsNH0pKyQvO1xuXHRcdHJldHVybiBmaWx0ZXIudGVzdCh2YWwpO1xuICAgIH1cblxuICAgIF9nZXRJbnB1dCgpIHtcblxuXHRcdGxldCBfY2xhc3MgICAgICAgPSB0aGlzLnByb3BzLl9jbGFzcyAgPyB0aGlzLnByb3BzLl9jbGFzcyA6IFwiXCI7IFxuXHRcdGxldCBfdHlwZSAgICAgICAgPSB0aGlzLnByb3BzLnR5cGUgPyB0aGlzLnByb3BzLnR5cGUgOiB0aGlzLnN0YXRlLnR5cGU7IFxuXHRcdGxldCBfaWQgICAgICAgICAgPSB0aGlzLnByb3BzLmlkID8gdGhpcy5wcm9wcy5pZCA6IFwiXCI7IFxuXHRcdGxldCBfcGxhY2Vob2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyID8gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciA6IFwiXCI7IFxuXG4gICAgXHRyZXR1cm4gKFxuXHRcdFx0IDxpbnB1dCBcblx0XHRcdFx0dmFsdWUgICAgICAgPSB7dGhpcy5zdGF0ZS50ZXh0fSBcblx0XHRcdFx0dHlwZSAgICAgICAgPSB7X3R5cGV9IFxuXHRcdFx0XHRjbGFzc05hbWUgICA9IHtfY2xhc3N9IFxuXHRcdFx0XHRpZCAgICAgICAgICA9IHtfaWR9XG5cdFx0XHRcdHBsYWNlaG9sZGVyID0ge19wbGFjZWhvbGRlcn0gXG5cdFx0XHRcdG9uQ2hhbmdlICAgID0ge3RoaXMuX29uQ2hhbmdlfVxuXHRcdFx0XHRvbktleURvd24gICA9IHt0aGlzLl9jYXRjaEVudGVyfVxuXHRcdFx0XHRvbkZvY3VzICAgICA9IHt0aGlzLl9vbkZvY3VzfVxuXHRcdFx0XHRvbkJsdXIgICAgICA9IHt0aGlzLl9vbkJsdXJ9IC8+XG5cdFx0KTtcblxuICAgIH1cblxuICAgIF9nZXRUYWdzKCkge1xuXG4gICAgXHRsZXQgcm93cyA9IFtdO1xuXHRcdGlmICh0aGlzLnN0YXRlLnRhZ3MpIHtcblx0XHRcdHRoaXMuc3RhdGUudGFncy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG5cdFx0XHRcdHJvd3MucHVzaCg8c3BhbiBcblx0XHRcdFx0XHRjbGFzc05hbWUgPSBcInRhZ1wiXG5cdFx0XHRcdFx0a2V5ICAgICAgID0ge2luZGV4fVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdHtpdGVtfVxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lID0gXCJyZW1vdmVcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrICAgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVtb3ZlVGFnQnlJbmRleC5iaW5kKHRoaXMsIGluZGV4KVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdD4mdGltZXM7XG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L3NwYW4+KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChyb3dzLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVzc2FnZXMtbGlzdFwiPlxuXHRcdFx0XHRcdDxSZWFjdENTU1RyYW5zaXRpb25Hcm91cCBcblx0XHRcdFx0XHRcdHRyYW5zaXRpb25OYW1lICAgICAgICAgID0gXCJmYWRlXCIgXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0ICA9IHs1MDB9IFxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbkxlYXZlVGltZW91dCAgPSB7MzAwfVxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbkFwcGVhciAgICAgICAgPSB7dHJ1ZX0gXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uQXBwZWFyVGltZW91dCA9IHs1MDB9XG5cdFx0XHQgICAgICAgID5cblx0XHRcdFx0XHR7cm93c31cblx0XHRcdFx0XHQ8L1JlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgX29uQ2hhbmdlKGV2ZW50KSB7XG4gICAgXHR0aGlzLnNldFN0YXRlKHt0ZXh0OiBldmVudC50YXJnZXQudmFsdWV9KTtcblx0fVxuXG5cdF9jYXRjaEVudGVyKGV2ZW50KSB7XG5cdFx0dmFyIHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgdmFsLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX2FkZFRhZyh2YWwpO1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dGV4dDogXCJcIn0pO1xuXHRcdH1cblx0fVxuXG5cdF9vbkZvY3VzKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGZvY3VzOiB0cnVlIH0pO1xuXHR9XG5cblx0X29uQmx1cihldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBmb2N1czogZmFsc2UgfSk7XG5cdH1cblxuICAgIHJlbmRlcigpIHtcblxuXHRcdHZhciB0YWdzICA9IHRoaXMuX2dldFRhZ3MoKTtcblx0XHR2YXIgaW5wdXQgPSB0aGlzLl9nZXRJbnB1dCgpO1xuXG4gICAgXHR2YXIgYyA9IFwicmVhY3QtdGFnLWlucHV0XCI7XG4gICAgXHRpZiAodGhpcy5zdGF0ZS5mb2N1cyA9PSB0cnVlKVxuICAgIFx0XHRjICs9IFwiIGZvY3VzXCI7XG5cbiAgICBcdHJldHVybihcbiAgICBcdFx0PGRpdiBjbGFzc05hbWU9e2N9PlxuXHQgICAgXHRcdHt0YWdzfXtpbnB1dH1cbiAgICBcdFx0PC9kaXY+XG4gICAgXHQpO1xuICAgIH1cblxufSIsIlxuZnVuY3Rpb24gY3V0cyhzdGF0ZT1bXSwgYWN0aW9uKSB7XG5cdHN3aXRjaChhY3Rpb24udHlwZSkge1xuXHRcdGNhc2UgJ0FERF9DVVQnOlxuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzdGFydDogYWN0aW9uLmRhdGEuc3RhcnQsXG5cdFx0XHRcdFx0ZW5kOiBhY3Rpb24uZGF0YS5lbmQsXG5cdFx0XHRcdFx0dGl0bGU6IFwiXCIsXG5cdFx0XHRcdFx0dGFnczogW11cblx0XHRcdFx0fVxuXHRcdFx0XTtcblx0XHRjYXNlICdERUxFVEVfQ1VUJzpcblx0XHRcdHZhciBpbmRleCA9IGFjdGlvbi5pbmRleDtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdC4uLnN0YXRlLnNsaWNlKDAsIGluZGV4KSxcblx0XHRcdFx0Li4uc3RhdGUuc2xpY2UoaW5kZXggKyAxKVxuXHRcdFx0XTtcblx0XHRjYXNlICdTRVRfVEFHUyc6XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhzdGF0ZSwgYWN0aW9uKTtcblx0XHRcdHZhciBpbmRleCA9IGFjdGlvbi5pbmRleDtcblx0XHRcdHZhciB0YWdzICA9IGFjdGlvbi50YWdzO1xuXHRcdFx0dmFyIG8gPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZVtpbmRleF0pO1xuXHRcdFx0by50YWdzID0gdGFncztcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdC4uLnN0YXRlLnNsaWNlKDAsIGluZGV4KSxcblx0XHRcdFx0byxcblx0XHRcdFx0Li4uc3RhdGUuc2xpY2UoaW5kZXggKyAxKVxuXHRcdFx0XTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3V0czsiLCJcbmZ1bmN0aW9uIGZpbHRlcihzdGF0ZT1bXSwgYWN0aW9uKSB7XG5cdHN3aXRjaChhY3Rpb24udHlwZSkge1xuXHRcdGNhc2UgJ1NFVF9TRUFSQ0hfRklMVEVSJzpcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdTRVRfUExBWV9JTkRFWCcsIHN0YXRlLCBhY3Rpb24pO1xuXHRcdFx0cmV0dXJuIGFjdGlvbi5maWx0ZXI7XG5cdFx0XHQvLyByZXR1cm4gc3RhdGU7XG5cdFx0ZGVmYXVsdCA6XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblx0cmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmaWx0ZXI7IiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuLy8gaW1wb3J0IHsgcm91dGVyUmVkdWNlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XG5cbi8vIGNvbWJpbmUgYWxsIHlvdXIgcmVkdWNlcnMgaW50byBvbmUgcm9vdCByZWR1Y2VyXG5pbXBvcnQgY3V0cyBmcm9tICcuL2N1dHMnO1xuaW1wb3J0IHBsYXlJbmRleCBmcm9tICcuL3BsYXlJbmRleCc7XG5pbXBvcnQgZmlsdGVyIGZyb20gJy4vZmlsdGVyJztcblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuXHRjdXRzLFxuXHRwbGF5SW5kZXgsXG5cdGZpbHRlclxuXHQvLyByb3V0aW5nOiByb3V0ZXJSZWR1Y2VyXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXI7IiwiXG5mdW5jdGlvbiBwbGF5SW5kZXgoc3RhdGU9W10sIGFjdGlvbikge1xuXHRzd2l0Y2goYWN0aW9uLnR5cGUpIHtcblx0XHRjYXNlICdTRVRfUExBWV9JTkRFWCc6XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnU0VUX1BMQVlfSU5ERVgnLCBzdGF0ZSwgYWN0aW9uKTtcblx0XHRcdHJldHVybiBhY3Rpb24uaW5kZXg7XG5cdFx0XHQvLyByZXR1cm4gc3RhdGU7XG5cdFx0ZGVmYXVsdCA6XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblx0cmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5SW5kZXg7IiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGNvbXBvc2UgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBzeW5jSGlzdG9yeVdpdGhTdG9yZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XG5cbi8vIGdldCB0aGUgZ2xvYmFsIHJlZHVjZXJcbmltcG9ydCByb290UmVkdWNlciBmcm9tICcuL3JlZHVjZXJzL2luZGV4JztcblxuLy8gbG9hZCBleHRlcm5hbCBkYXRhIGlmIG5lZWRlZFxuLy8gaW1wb3J0IGRhdGEgZnJvbSBcIi4vZGF0YS9kYXRhXCI7XG5cbi8vIGRlZnVhbHQgZGF0YSBnb2VzIGhlcmUuLlxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuXHRjdXRzIDogW10sXG5cdHBsYXlJbmRleCA6IC0xLFxuXHRmaWx0ZXIgOiBcIlwiXG59O1xuXG4vLyBlbmFibGUgcmVkdXggZGV2IHRvb2xzXG5jb25zdCBlbmhhbmNlcnMgPSBjb21wb3NlKFxuXHR3aW5kb3cuZGV2VG9vbHNFeHRlbnNpb24gPyB3aW5kb3cuZGV2VG9vbHNFeHRlbnNpb24oKSA6IGYgPT4gZlxuKTtcblxuLy8gY3JlYXRlIHRoZSBzdG9yZVxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyb290UmVkdWNlciwgZGVmYXVsdFN0YXRlLCBlbmhhbmNlcnMpO1xuXG4vLyBhdXRvIHJlZnJlc2ggb3VyIG1vZHVsZS5cbmlmIChtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KCcuL3JlZHVjZXJzJywgKCkgPT4ge1xuXHRcdGNvbnN0IG5leHRSb290UmVkdWNlciA9IHJlcXVpcmUoJy4vcmVkdWNlcnMvaW5kZXgnKS5kZWZhdWx0O1xuXHRcdHN0b3JlLnJlcGxhY2VSZWR1Y2VyKG5leHRSb290UmVkdWNlcilcblx0fSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlOyJdfQ==
