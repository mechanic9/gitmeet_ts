/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var GITAPI = 'https://api.github.com/users';
// Presentation Components
var Title = function () {
    return React.createElement("div", { className: "title boxing" }, "Git Rekt");
};
var NotFound = function () {
    return (React.createElement("div", { className: "notfound" }, " Nah Brah"));
};
var Profile = function (props) {
    return (React.createElement("div", { className: "profile boxing" },
        React.createElement("img", { className: "avatar", src: props.avatar }),
        React.createElement("div", { className: "name" }, props.name || props.username),
        React.createElement("div", { className: "location" }, props.location || 'Homeless')));
};
var UserStats = function (props) {
    return (React.createElement("div", { className: "user-stats boxing" },
        React.createElement("div", { className: "sect" },
            React.createElement("p", { className: "num" }, props.following),
            "Following"),
        React.createElement("div", { className: "sect" },
            React.createElement("div", { className: "num" }, props.repos),
            "Repos"),
        React.createElement("div", { className: "sect" },
            React.createElement("div", { className: "num" }, props.followers),
            "Followers")));
};
var Search = (function (_super) {
    __extends(Search, _super);
    function Search() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Search.prototype.handle_form = function (event_) {
        event_.preventDefault();
        var username = this.refs.username; //Get value of username input field
        this.props.fetchProfile(username);
    };
    Search.prototype.render = function () {
        return (React.createElement("form", { className: "search-field", onChange: this.handle_form.bind(this), onSubmit: this.handle_form.bind(this) },
            React.createElement("input", { type: "search", ref: "username", placeholder: "Type Github Username" })));
    };
    return Search;
}(React.Component));
// Container Component
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.fetch_profile = _this.fetch_profile.bind(_this);
        _this.state = {
            username: 'mechanic9',
            name: '',
            avatar: '',
            location: '',
            repos: '',
            followers: '',
            following: '',
            home_url: '',
            not_found: ''
        };
        return _this;
    }
    App.prototype.fetch_profile = function (username) {
        var _this = this;
        var url = GITAPI + "/" + username;
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({
                username: data.login,
                name: data.name,
                home_url: data.html_url,
                avatar: data.avatar_url,
                location: data.location,
                repos: data.public_repos,
                followers: data.followers,
                following: data.following,
                not_found: data.message
            });
        })
            .catch(function (error) { return console.log('Problem with fetching github profile'); });
    };
    App.prototype.componentDidMount = function () {
        this.fetch_profile(this.state.username);
    };
    App.prototype.render = function () {
        var data = this.state;
        console.log(this.state);
        var notfound = this.state.not_found;
        var notfound_check = "Not Found";
        if (notfound === notfound_check)
            return (React.createElement("div", null,
                React.createElement(Title, null),
                React.createElement(Search, { fetchProfile: this.fetch_profile }),
                React.createElement(NotFound, null)));
        else
            return (React.createElement("div", null,
                React.createElement(Title, null),
                React.createElement(Search, { fetchProfile: this.fetch_profile }),
                React.createElement(Profile, { avatar: data.avatar, name: data.name, username: data.username, location: data.location }),
                React.createElement(UserStats, { repos: data.repos, following: data.following, followers: data.followers })));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map