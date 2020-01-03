// ==UserScript==
// @name        better-parsely
// @namespace   arnorie.github.io
// @description Improvements for parsely.io
// @version     2020-01-03T20:27:20.954Z
// @downloadURL https://arnorie.github.io/better-parsely.user.js
// @updateURL   https://arnorie.github.io/better-parsely.user.js
// @require     https://unpkg.com/react@16/umd/react.production.min.js
// @require     https://unpkg.com/react-dom@16/umd/react-dom.production.min.js
// @include     *://parsely.io/parser/view/*
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LocalStorageAbilityManager {
    constructor() {
        this.urlChangeListenerMap = new Map();
        this.layoutChangeListenerMap = new Map();
        this.triggerChangeListenerMap = new Map();
        this.storage = window.localStorage;
    }
    getUrl(abilityName) {
        return this.config[abilityName] ? this.config[abilityName].url : undefined;
    }
    setUrl(abilityName, url) {
        this.editAbility(abilityName, config => config.url = url);
        if (this.urlChangeListenerMap.has(abilityName)) {
            const callbacks = this.urlChangeListenerMap.get(abilityName);
            callbacks.forEach(callback => callback(url));
        }
    }
    isGcdFree(abilityName) {
        return this.getValue(abilityName, 'gcdFree', false);
    }
    setGcdFree(abilityName, gcdFree) {
        this.editAbility(abilityName, config => config.gcdFree = gcdFree);
        this.notifyLayoutChange(abilityName);
    }
    startsSection(abilityName) {
        return this.getValue(abilityName, 'sectionStart', false);
    }
    setSectionStart(abilityName, sectionStart) {
        this.editAbility(abilityName, config => config.sectionStart = sectionStart);
        this.notifyLayoutChange(abilityName);
    }
    notifyLayoutChange(abilityName) {
        if (this.layoutChangeListenerMap.has(abilityName)) {
            this.layoutChangeListenerMap.get(abilityName).forEach(c => c());
        }
    }
    isLongChannel(abilityName) {
        return this.getValue(abilityName, 'longChannel', false);
    }
    setLongChannel(abilityName, longChannel) {
        this.editAbility(abilityName, config => config.longChannel = longChannel);
        this.notifyLayoutChange(abilityName);
    }
    onUrlChange(abilityName, callback) {
        if (!this.urlChangeListenerMap.has(abilityName)) {
            this.urlChangeListenerMap.set(abilityName, []);
        }
        this.urlChangeListenerMap.get(abilityName).push(callback);
    }
    onLayoutChange(abilityName, callback) {
        if (!this.layoutChangeListenerMap.has(abilityName)) {
            this.layoutChangeListenerMap.set(abilityName, []);
        }
        this.layoutChangeListenerMap.get(abilityName).push(callback);
    }
    onTriggerChange(abilityName, callback) {
        if (!this.triggerChangeListenerMap.has(abilityName)) {
            this.triggerChangeListenerMap.set(abilityName, []);
        }
        this.triggerChangeListenerMap.get(abilityName).push(callback);
    }
    getHitsPerActivation(abilityName) {
        return this.getValue(abilityName, 'hitsPerActivation', 0);
    }
    setHitsPerActivation(abilityName, hitsPerActivation) {
        this.editAbility(abilityName, config => config.hitsPerActivation = hitsPerActivation);
    }
    getTriggers(abilityName) {
        return this.getValue(abilityName, 'triggers', []);
    }
    setTriggers(abilityName, triggers) {
        this.editAbility(abilityName, config => config.triggers = triggers);
        if (this.triggerChangeListenerMap.has(abilityName)) {
            this.triggerChangeListenerMap.get(abilityName).forEach(c => c());
        }
    }
    editConfig(editor) {
        const config = this.config;
        editor(config);
        this.config = config;
    }
    editAbility(abilityName, editor) {
        const config = this.config;
        if (!config.hasOwnProperty(abilityName)) {
            config[abilityName] = {};
        }
        const abilityConfig = config[abilityName];
        editor(abilityConfig);
        this.config = config;
    }
    getValue(abilityName, property, defaultValue) {
        const config = this.config;
        if (config.hasOwnProperty(abilityName)) {
            const propertyValue = config[abilityName][property];
            return propertyValue || defaultValue;
        }
        else {
            return defaultValue;
        }
    }
    set config(config) {
        const configString = JSON.stringify(config);
        this.storage.setItem(LocalStorageAbilityManager.STORAGE_KEY, configString);
    }
    get config() {
        const configString = this.storage.getItem(LocalStorageAbilityManager.STORAGE_KEY);
        if (configString) {
            return JSON.parse(configString);
        }
        else {
            return {};
        }
    }
}
LocalStorageAbilityManager.STORAGE_KEY = "ability-config";
exports.AbilityManager = new LocalStorageAbilityManager();
unsafeWindow.AbilityManager = exports.AbilityManager;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ability_stats_1 = __webpack_require__(12);
var Column;
(function (Column) {
    Column[Column["Percent"] = 0] = "Percent";
    Column[Column["Hits"] = 1] = "Hits";
    Column[Column["Action"] = 2] = "Action";
    Column[Column["Type"] = 3] = "Type";
    Column[Column["Damage"] = 4] = "Damage";
    Column[Column["DPS"] = 5] = "DPS";
    Column[Column["AvgHit"] = 6] = "AvgHit";
    Column[Column["AvgCrit"] = 7] = "AvgCrit";
    Column[Column["MinHit"] = 8] = "MinHit";
    Column[Column["MaxHit"] = 9] = "MaxHit";
    Column[Column["Crits"] = 10] = "Crits";
    Column[Column["CritPercent"] = 11] = "CritPercent";
    Column[Column["MissPercent"] = 12] = "MissPercent";
})(Column || (Column = {}));
class ParseInformation {
    static get damageDoneTable() {
        return document.querySelector("#damage-done > div:nth-child(4) > table:nth-child(1)");
    }
    static get abilityRows() {
        return Array.from(ParseInformation.damageDoneTable.querySelectorAll("tbody > tr"))
            .filter(row => !row.children[2].classList.contains("sub-instance"));
    }
    countAbility(abilityName) {
        return exports.Parse.rotation.filter(name => name === abilityName).length;
    }
    rowToAbilityStats(row) {
        const name = ParseInformation.getColumn(row, Column.Action);
        const activations = this.countAbility(name);
        return new ability_stats_1.AbilityStats(parseFloat(ParseInformation.getColumn(row, Column.Percent)), +ParseInformation.getColumn(row, Column.Hits), ParseInformation.getColumn(row, Column.Action), ParseInformation.getColumn(row, Column.Type), +ParseInformation.getColumn(row, Column.Damage), +ParseInformation.getColumn(row, Column.DPS), +ParseInformation.getColumn(row, Column.AvgHit), +ParseInformation.getColumn(row, Column.AvgCrit), +ParseInformation.getColumn(row, Column.MinHit), +ParseInformation.getColumn(row, Column.MaxHit), +ParseInformation.getColumn(row, Column.Crits), parseFloat(ParseInformation.getColumn(row, Column.CritPercent)), parseFloat(ParseInformation.getColumn(row, Column.MissPercent)), activations);
    }
    findAbilityStats(name) {
        return this.abilityStats.find(stats => stats.abilityName === name);
    }
    get abilityStats() {
        const rows = ParseInformation.abilityRows;
        return rows.map(row => this.rowToAbilityStats(row));
    }
    get rotation() {
        const actionCells = Array.from(document.querySelectorAll("#rotation tbody > tr > td:last-child"));
        return actionCells.map(cell => cell.textContent);
    }
    getRow(abilityName) {
        return ParseInformation.abilityRows.find(row => row.children[Column.Action].textContent === abilityName);
    }
    static getColumn(row, column) {
        return row.children[column].textContent;
    }
    getHits(abilityName) {
        const row = this.getRow(abilityName);
        const content = ParseInformation.getColumn(row, Column.Hits);
        return +content;
    }
    getTotalDamage(abilityName) {
        const row = this.getRow(abilityName);
        const content = ParseInformation.getColumn(row, Column.Damage);
        return +content;
    }
    getDmgPerHit(abilityName) {
        return this.getTotalDamage(abilityName) / this.getHits(abilityName);
    }
}
exports.Parse = new ParseInformation();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(1);
const ability_loader_1 = __webpack_require__(11);
const ability_manager_1 = __webpack_require__(0);
const ReactDOM = __webpack_require__(2);
class AbilityConfigurator extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.onTriggerNameChange = this.onTriggerNameChange.bind(this);
        this.onTriggerCountChange = this.onTriggerCountChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.openCustomUrlPrompt = this.openCustomUrlPrompt.bind(this);
        this.state = {
            hide: false,
            imageUrls: []
        };
        props.imageUrls.then(urls => this.setState({ imageUrls: urls }));
    }
    onImageClick(url, target) {
        ability_manager_1.AbilityManager.setUrl(this.props.abilityName, url);
        target.classList.add("highlighted-ability");
    }
    close() {
        this.setState({ hide: true });
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, true);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, true);
    }
    handleClickOutside(event) {
        const node = ReactDOM.findDOMNode(this);
        if (node && !node.contains(event.target)) {
            this.close();
        }
    }
    onSectionStartChange(sectionStart) {
        ability_manager_1.AbilityManager.setSectionStart(this.props.abilityName, sectionStart);
        this.forceUpdate();
    }
    onGcdChange(gcdFree) {
        ability_manager_1.AbilityManager.setGcdFree(this.props.abilityName, gcdFree);
        this.forceUpdate();
    }
    onLongChannelChange(longChannel) {
        ability_manager_1.AbilityManager.setLongChannel(this.props.abilityName, longChannel);
        this.forceUpdate();
    }
    onTriggerNameChange(event) {
        const i = +event.target.name;
        const triggers = this.triggers;
        if (triggers[i] === undefined) {
            triggers[i] = {
                abilityName: "",
                hits: 0
            };
        }
        triggers[i].abilityName = event.target.value;
        this.updateTriggers(triggers);
    }
    onTriggerCountChange(event) {
        const i = +event.target.name;
        const triggers = this.triggers;
        if (triggers[i] === undefined) {
            triggers[i] = {
                abilityName: "",
                hits: 0
            };
        }
        triggers[i].hits = +event.target.value;
        this.updateTriggers(triggers);
    }
    get triggers() {
        return ability_manager_1.AbilityManager.getTriggers(this.props.abilityName);
    }
    updateTriggers(triggers) {
        const filtered = triggers.filter(trigger => trigger.abilityName.length > 0 || trigger.hits > 0);
        ability_manager_1.AbilityManager.setTriggers(this.props.abilityName, filtered);
        this.forceUpdate();
    }
    get containerStyle() {
        return {
            display: this.state.hide ? 'none' : 'initial'
        };
    }
    openCustomUrlPrompt() {
        let url = prompt(`Custom Icon URL for ${this.props.abilityName}`);
        if (url) {
            ability_manager_1.AbilityManager.setUrl(this.props.abilityName, url);
        }
    }
    render() {
        const images = this.state.imageUrls.map(url => {
            let className = "hover-highlight ability";
            if (ability_manager_1.AbilityManager.getUrl(this.props.abilityName) === url) {
                className += " highlighted-ability";
            }
            return React.createElement("img", { key: url, src: url, onClick: e => this.onImageClick(url, e.target), className: className, onError: e => e.currentTarget.style.display = 'none', alt: "" });
        });
        images.push(React.createElement("button", { style: { width: '32px', height: '32px' }, onClick: this.openCustomUrlPrompt }, "+"));
        const triggers = this.triggers;
        triggers.push({ abilityName: "", hits: 0 });
        const triggerInputs = triggers.map((trigger, index) => {
            return (React.createElement("div", null,
                React.createElement("input", { name: index + "", type: "number", value: trigger.hits, onChange: this.onTriggerCountChange, style: { width: "50px" }, step: "0.1" }),
                React.createElement("input", { name: index + "", value: trigger.abilityName, onChange: this.onTriggerNameChange })));
        });
        const triggerStyle = this.props.rotation ? { display: 'none' } : {};
        const rotationStyle = this.props.rotation ? {} : { display: 'none' };
        return (React.createElement("div", { className: "dialog-container", style: this.containerStyle },
            React.createElement("div", { className: "dialog", style: this.props.style },
                React.createElement("button", { style: { float: 'right' }, onClick: this.close }, "Close"),
                React.createElement("h4", { style: { marginTop: '5px' } }, this.props.abilityName),
                React.createElement("div", { className: "form-group", style: rotationStyle },
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: ability_manager_1.AbilityManager.startsSection(this.props.abilityName), onChange: e => this.onSectionStartChange(e.target.checked) }),
                        " Section Start")),
                React.createElement("div", { className: "form-group", style: rotationStyle },
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: ability_manager_1.AbilityManager.isGcdFree(this.props.abilityName), onChange: e => this.onGcdChange(e.target.checked) }),
                        " Gcd Free")),
                React.createElement("div", { className: "form-group", style: rotationStyle },
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: ability_manager_1.AbilityManager.isLongChannel(this.props.abilityName), onChange: e => this.onLongChannelChange(e.target.checked) }),
                        " Long Channel")),
                React.createElement("div", { className: "form-group", style: rotationStyle },
                    React.createElement("label", null, "Image"),
                    React.createElement("div", { className: "form-control-static", style: { height: '32px' } }, images)),
                React.createElement("div", { className: "form-group", style: triggerStyle },
                    React.createElement("label", null, "Triggers"),
                    triggerInputs))));
    }
    static showRotationConfigurator(abilityName, top, left) {
        return __awaiter(this, void 0, void 0, function* () {
            this.showConfigurator(abilityName, top, left, true);
        });
    }
    static showTriggerConfigurator(abilityName, top, left) {
        return __awaiter(this, void 0, void 0, function* () {
            this.showConfigurator(abilityName, top, left, false);
        });
    }
    static showConfigurator(abilityName, top, left, rotation) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlPromise = ability_loader_1.AbilityLoader.loadAbilities(abilityName)
                .then(result => result.map(data => data.url));
            const style = {
                width: '300px',
                top: top + 'px',
                left: left + 'px'
            };
            const configurator = React.createElement(AbilityConfigurator, { abilityName: abilityName, rotation: rotation, imageUrls: urlPromise, style: style });
            ReactDOM.unmountComponentAtNode(this.popupMount);
            ReactDOM.render(configurator, this.popupMount);
        });
    }
}
AbilityConfigurator.popupMount = document.body.appendChild(document.createElement("div"));
exports.AbilityConfigurator = AbilityConfigurator;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(1);
const ReactDOM = __webpack_require__(2);
const ability_configurator_1 = __webpack_require__(4);
const ability_manager_1 = __webpack_require__(0);
class DamageDone extends React.Component {
    keys() {
        return [
            "damageShare",
            "hitCount",
            "abilityName",
            "damageType",
            "totalDamage",
            "damagePerSecond",
            "activations",
            "dmgPerActivation",
            "dmgPerHit",
            "dmgPerNonCrit",
            "dmgPerCrit",
            "minHit",
            "maxHit",
            "critPercentage",
            "missPercentage"
        ];
    }
    header(key) {
        switch (key) {
            case "damageShare": return "%";
            case "hitCount": return "Hits";
            case "abilityName": return "Name";
            case "damageType": return "Type";
            case "totalDamage": return "Total";
            case "damagePerSecond": return "DPS";
            case "activations": return "Activations";
            case "dmgPerActivation": return "Avg Activation";
            case "dmgPerHit": return "Avg Hit";
            case "dmgPerNonCrit": return "Avg Non Crit";
            case "dmgPerCrit": return "Avg Crit";
            case "minHit": return "Min Hit";
            case "maxHit": return "Max Hit";
            case "critPercentage": return "Crit%";
            case "missPercentage": return "Miss%";
            default: return "N/A";
        }
    }
    value(key, abilityStats) {
        switch (key) {
            case "damageShare":
            case "critPercentage":
            case "missPercentage":
                return abilityStats[key] + "%";
            case "dmgPerActivation":
                if (!isFinite(abilityStats.dmgPerActivation)) {
                    return "-";
                }
            case "dmgPerHit":
                return +abilityStats[key].toFixed(2) + "";
            default:
                if (abilityStats[key] === 0) {
                    return "-";
                }
                return abilityStats[key] + "";
        }
    }
    keyToTd(key, ability) {
        if (key === "dmgPerActivation") {
            let title = ability.triggeredAbilities
                .map(trigger => `${trigger.hits}x ${trigger.abilityName}: ${ability.dmgPerActivationOfTrigger(trigger).toFixed(2)}`).join("<br>");
            if (title.length > 0) {
                title = `Self: ${+ability.dmgPerActivationSelf.toFixed(2)}<br>` + title;
            }
            return (React.createElement("td", { "data-toggle": "tooltip", "data-html": "true", "data-container": "body", "data-placement": "left", "data-title": title, onClick: e => this.onConfigClick(e, ability.abilityName) }, this.value(key, ability)));
        }
        return (React.createElement("td", null, this.value(key, ability)));
    }
    onConfigClick(e, abilityName) {
        return __awaiter(this, void 0, void 0, function* () {
            const top = e.pageY;
            const left = e.pageX;
            yield ability_configurator_1.AbilityConfigurator.showTriggerConfigurator(abilityName, top, left);
        });
    }
    render() {
        const headers = this.keys().map(key => React.createElement("th", null, this.header(key)));
        const dataRows = this.props.abilityStats
            .map(ability => this.keys().map(key => this.keyToTd(key, ability)))
            .map(tdArray => React.createElement("tr", null, tdArray));
        return (React.createElement("table", { className: "table table-striped" },
            React.createElement("thead", null,
                React.createElement("tr", null, headers)),
            React.createElement("tbody", null, dataRows)));
    }
    componentDidUpdate() {
        const me = ReactDOM.findDOMNode(this);
        const $me = $(me);
        $me.find('[data-toggle="tooltip"]').tooltip();
    }
    componentDidMount() {
        const me = ReactDOM.findDOMNode(this);
        const $me = $(me);
        $me.tablesorter();
        $me.find('[data-toggle="tooltip"]').tooltip();
        this.props.abilityStats.forEach(stats => {
            ability_manager_1.AbilityManager.onTriggerChange(stats.abilityName, () => this.forceUpdate());
        });
    }
}
exports.DamageDone = DamageDone;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(1);
const ability_comp_1 = __webpack_require__(8);
const ability_layouter_1 = __webpack_require__(10);
const ability_manager_1 = __webpack_require__(0);
class VisualRotation extends React.Component {
    constructor() {
        super(...arguments);
        this.layouter = new ability_layouter_1.AbilityLayouter();
    }
    componentWillMount() {
        function unique(value, index, self) {
            return self.indexOf(value) === index;
        }
        this.props.abilityList.filter(unique).forEach(abilityName => {
            ability_manager_1.AbilityManager.onLayoutChange(abilityName, () => this.forceUpdate());
        });
    }
    render() {
        const rotation = this.layouter.layout(this.props.abilityList);
        const abilityComponents = [];
        let row = 0;
        let column;
        for (const section of rotation) {
            row += section.height;
            column = 1;
            for (const gcdWindow of section.gcdWindows) {
                for (const [index, offGcdAbl] of gcdWindow.offGcdAbilities.entries()) {
                    const offGcdRow = row - (gcdWindow.offGcdAbilities.length - index);
                    abilityComponents.push((React.createElement(ability_comp_1.AbilityComp, { name: offGcdAbl.name, key: offGcdAbl.index, row: offGcdRow, column: column })));
                }
                abilityComponents.push((React.createElement(ability_comp_1.AbilityComp, { name: gcdWindow.mainAbility.name, key: gcdWindow.mainAbility.index, row: row, column: column })));
                column++;
            }
        }
        // const abilities = this.props.abilityList.map((ability, index) => <AbilityComp name={ability} key={index} popupMount={this.props.popupMount} />);
        return (React.createElement("div", { className: "ability-grid" }, abilityComponents));
    }
}
exports.VisualRotation = VisualRotation;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(1);
const ReactDOM = __webpack_require__(2);
const ability_manager_1 = __webpack_require__(0);
const ability_configurator_1 = __webpack_require__(4);
class AbilityComp extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            url: ability_manager_1.AbilityManager.getUrl(this.props.name)
        };
        ability_manager_1.AbilityManager.onUrlChange(this.props.name, url => this.setState({ url: url }));
    }
    componentDidMount() {
        const me = ReactDOM.findDOMNode(this);
        $(me).tooltip();
    }
    get style() {
        const style = {};
        if (this.state.url) {
            style.backgroundImage = `url(${this.state.url})`;
        }
        else {
            style.backgroundColor = 'black';
        }
        style.gridColumn = this.props.column;
        style.gridRow = this.props.row;
        return style;
    }
    onClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const top = e.pageY;
            const left = e.pageX;
            yield ability_configurator_1.AbilityConfigurator.showRotationConfigurator(this.props.name, top, left);
        });
    }
    render() {
        return (React.createElement("div", { className: "ability", "data-toggle": "tooltip", "data-placement": "top", "data-original-title": this.props.name, style: this.style, onClick: this.onClick }));
    }
}
exports.AbilityComp = AbilityComp;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(7);
const React = __webpack_require__(1);
const ReactDOM = __webpack_require__(2);
const visual_rotation_1 = __webpack_require__(6);
const parse_information_1 = __webpack_require__(3);
const damage_done_1 = __webpack_require__(5);
(() => {
    const rotationContainer = document.getElementById("rotation");
    const defaultRotaTable = rotationContainer.querySelector("div.table-responsive");
    const mountPoint = rotationContainer.appendChild(document.createElement("div"));
    [defaultRotaTable, mountPoint].forEach(e => e.classList.add("col-sm-6"));
    ReactDOM.render(React.createElement(visual_rotation_1.VisualRotation, { abilityList: parse_information_1.Parse.rotation }), mountPoint);
    const oldTable = document.querySelector("#damage-done > div:nth-child(4)");
    const damageDoneMount = document.createElement("div");
    damageDoneMount.classList.add("table-responsive");
    oldTable.insertAdjacentElement("afterend", damageDoneMount);
    ReactDOM.render(React.createElement(damage_done_1.DamageDone, { abilityStats: parse_information_1.Parse.abilityStats }), damageDoneMount);
})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ability_manager_1 = __webpack_require__(0);
class RotationSection {
    constructor(gcdWindows) {
        this.gcdWindows = gcdWindows;
    }
    get length() {
        return this.gcdWindows.length;
    }
    get height() {
        return this.gcdWindows.map(gcd => gcd.height).reduce((p, c) => Math.max(p, c), 0);
    }
    static height(sections) {
        return sections.map(section => section.height).reduce((p, c) => p + c, 0);
    }
    static maxLength(sections) {
        return sections.map(section => section.length).reduce((p, c) => Math.max(p, c), 0);
    }
}
exports.RotationSection = RotationSection;
class GcdWindow {
    constructor(offGcdAbilities, mainAbility) {
        this.offGcdAbilities = offGcdAbilities;
        this.mainAbility = mainAbility;
    }
    get height() {
        return this.offGcdAbilities.length + 1;
    }
}
class Ability {
    constructor(name, index) {
        this.name = name;
        this.index = index;
    }
}
class AbilityLayouter {
    layout(abilityList) {
        const rotation = [];
        let currentSection = [];
        let currentOffGcds = [];
        for (const [index, ability] of abilityList.entries()) {
            if (ability_manager_1.AbilityManager.startsSection(ability)) {
                rotation.push(new RotationSection(currentSection));
                currentSection = [];
            }
            if (ability_manager_1.AbilityManager.isGcdFree(ability)) {
                currentOffGcds.push(new Ability(ability, index));
            }
            else {
                currentSection.push(new GcdWindow(currentOffGcds, new Ability(ability, index)));
                currentOffGcds = [];
                if (ability_manager_1.AbilityManager.isLongChannel(ability)) {
                    currentSection.push(new GcdWindow([], new Ability(ability, index)));
                }
            }
        }
        rotation.push(new RotationSection(currentSection));
        return rotation;
    }
}
exports.AbilityLayouter = AbilityLayouter;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AbilityLoader {
    static urlForName(ability, page) {
        return `https://torcommunity.com/database/search/ability?name=${ability}&page=${page}`;
    }
    static promisifiedXhr(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    url: url,
                    method: 'GET',
                    onload: resolve,
                    onerror: reject
                });
            });
        });
    }
    static loadAbilities(abilityName) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = 1;
            let abilityData;
            do {
                abilityData = yield AbilityLoader.loadAbilityPage(abilityName, page);
                abilityData = abilityData.filter(data => data.name === abilityName);
                abilityData = AbilityLoader.filterDuplicateUrls(abilityData);
            } while (abilityData.length === 0 && ++page < 10);
            return abilityData;
        });
    }
    static filterDuplicateUrls(abilityData) {
        const seen = {};
        return abilityData.filter(data => seen.hasOwnProperty(data.url) ? false : (seen[data.url] = true));
    }
    static loadAbilityPage(ability, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield AbilityLoader.promisifiedXhr(this.urlForName(ability, page));
            const jediDoc = response.responseText;
            const parser = new DOMParser();
            const doc = parser.parseFromString(jediDoc, "text/html");
            const rows = Array.from(doc.querySelectorAll(".db_table > tbody > tr"));
            return rows.filter(tr => tr.querySelector("img") !== null)
                .map(tr => {
                return {
                    name: tr.querySelector(".torctip_name").textContent,
                    url: tr.querySelector("img").src
                };
            });
        });
    }
}
exports.AbilityLoader = AbilityLoader;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_information_1 = __webpack_require__(3);
const ability_manager_1 = __webpack_require__(0);
class AbilityStats {
    constructor(damageShare, hitCount, abilityName, damageType, totalDamage, damagePerSecond, dmgPerNonCrit, dmgPerCrit, minHit, maxHit, critCount, critPercentage, missPercentage, activations) {
        this.damageShare = damageShare;
        this.hitCount = hitCount;
        this.abilityName = abilityName;
        this.damageType = damageType;
        this.totalDamage = totalDamage;
        this.damagePerSecond = damagePerSecond;
        this.dmgPerNonCrit = dmgPerNonCrit;
        this.dmgPerCrit = dmgPerCrit;
        this.minHit = minHit;
        this.maxHit = maxHit;
        this.critCount = critCount;
        this.critPercentage = critPercentage;
        this.missPercentage = missPercentage;
        this.activations = activations;
    }
    get dmgPerActivationSelf() {
        return this.totalDamage / this.activations;
    }
    get triggeredAbilities() {
        return ability_manager_1.AbilityManager.getTriggers(this.abilityName);
    }
    get dmgPerActivationTriggered() {
        return this.triggeredAbilities
            .map(trigger => this.dmgPerActivationOfTrigger(trigger))
            .reduce((a, b) => a + b, 0);
    }
    get dmgPerActivation() {
        return this.dmgPerActivationSelf + this.dmgPerActivationTriggered;
    }
    get dmgPerHit() {
        return this.totalDamage / this.hitCount;
    }
    dmgPerActivationOfTrigger(trigger) {
        const stats = parse_information_1.Parse.findAbilityStats(trigger.abilityName);
        if (stats) {
            return stats.dmgPerHit * trigger.hits;
        }
        else {
            return Infinity;
        }
    }
}
exports.AbilityStats = AbilityStats;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(false);
// imports


// module
exports.push([module.i, "/* Add custom CSS rules to be injected into pages here. */\n\n.ability {\n    width: 32px;\n    height: 32px;\n    background-position: center;\n    background-size: contain;\n}\n\n.hover-highlight {\n    margin-right: 4px;\n}\n\n.hover-highlight:hover {\n    box-shadow: 0 0 2px 2px yellow;\n}\n\n.highlighted-ability {\n    box-shadow: 0 0 2px 2px green;\n}\n\n.dialog-container {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    pointer-events: none;\n}\n\n.dialog {\n    position: absolute;\n    background: white;\n    border: 1px solid black;\n    padding: 10px;\n    pointer-events: initial;\n}\n\n.ability-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, 32px);\n    grid-template-rows: repeat(auto-fill, 32px);\n    grid-column-gap: 1px;\n    grid-row-gap: 1px;\n    overflow: hidden; \n}\n\n.ability-float {\n    float: left;\n}\n\n.glyphicon.spinning.glyphicon-refresh {\n    transform-origin: 48% 50%;\n    animation: spin 1s infinite linear;\n}\n\n@keyframes spin {\n    from { transform: scale(1) rotate(0deg); }\n    to { transform: scale(1) rotate(360deg); }\n}", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(16);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);