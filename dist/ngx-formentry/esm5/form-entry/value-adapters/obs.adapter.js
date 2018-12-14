/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import 'rxjs';
import * as _ from 'lodash';
import { LeafNode, GroupNode } from '../form-factory/form-node';
import { ObsAdapterHelper } from './obs-adapter-helper';
var ObsValueAdapter = /** @class */ (function () {
    function ObsValueAdapter(helper) {
        this.helper = helper;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    ObsValueAdapter.prototype.generateFormPayload = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        return this.helper.getObsNodePayload(form.rootNode);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Get obs Payload
        // return this.getObsPayload(questionNodes);
    };
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.populateForm = /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    function (form, payload) {
        this.helper.setNodeValue(form.rootNode, payload);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Extract set obs
        // this.setValues(questionNodes, payload);
    };
    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable
    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable
    /**
     * @param {?} nodes
     * @param {?=} payload
     * @param {?=} forcegroup
     * @return {?}
     */
    ObsValueAdapter.prototype.setValues = 
    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable
    /**
     * @param {?} nodes
     * @param {?=} payload
     * @param {?=} forcegroup
     * @return {?}
     */
    function (nodes, payload, forcegroup) {
        var e_1, _a;
        if (nodes) {
            var _loop_1 = function (node) {
                if (node instanceof LeafNode) {
                    this_1.setObsValue(node, payload);
                    if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
                        node.question.setHistoricalValue(false);
                    }
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'group' || forcegroup) {
                    /** @type {?} */
                    var groupObs = _.find(payload, function (o) {
                        return o.concept.uuid === node.question.extras.questionOptions.concept && o.groupMembers;
                    });
                    if (groupObs) {
                        if (node.node) {
                            node.node['initialValue'] = groupObs;
                        }
                        this_1.setValues(node.groupMembers, groupObs.groupMembers);
                    }
                    if (forcegroup && node.payload) {
                        this_1.setValues(node.groupMembers, node.payload.groupMembers);
                    }
                }
                else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
                    this_1.setComplexObsValue(node, payload);
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'repeating' && !forcegroup) {
                    this_1.setRepeatingGroupValues(node, payload);
                    node.node.control.updateValueAndValidity();
                }
                else {
                    throw new Error('not implemented');
                }
            };
            var this_1 = this;
            try {
                for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    _loop_1(node);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.setObsValue = /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    function (node, payload) {
        if (node.question && node.question.extras &&
            (node.question.extras.type === 'obs' ||
                (node.question.extras.type === 'complex-obs-child' &&
                    node.question.extras.questionOptions.obsField === 'value')) &&
            node.question.extras.questionOptions.rendering !== 'multiCheckbox' ||
            node.question.extras.questionOptions.rendering !== 'checkbox') {
            /** @type {?} */
            var obs = _.find(payload, function (o) {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (obs) {
                if (obs.value instanceof Object) {
                    node.control.setValue(obs.value.uuid);
                    node.control.updateValueAndValidity();
                }
                else {
                    node.control.setValue(obs.value);
                    node.control.updateValueAndValidity();
                }
                node['initialValue'] = { obsUuid: obs.uuid, value: obs.value };
            }
        }
        else {
            /** @type {?} */
            var multiObs = _.filter(payload, function (o) {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (multiObs && multiObs.length > 0) {
                node.control.setValue(this.getMultiselectValues(multiObs));
                node.control.updateValueAndValidity();
                node['initialValue'] = multiObs;
            }
        }
    };
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.setComplexObsValue = /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    function (node, payload) {
        /** @type {?} */
        var valueField;
        /** @type {?} */
        var dateField;
        // tslint:disable-next-line:forin
        for (var o in node.children) {
            if (((/** @type {?} */ (node.children[o]))).question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }
            if (((/** @type {?} */ (node.children[o]))).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        // set the usual obs value
        this.setObsValue(valueField, payload);
        // set the obs date
        /** @type {?} */
        var obs = _.find(payload, function (o) {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        });
        if (obs) {
            dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
            ((/** @type {?} */ (dateField))).control.setValue(obs.obsDatetime);
            ((/** @type {?} */ (dateField))).control.updateValueAndValidity();
        }
    };
    /**
     * @param {?} multiObs
     * @return {?}
     */
    ObsValueAdapter.prototype.getMultiselectValues = /**
     * @param {?} multiObs
     * @return {?}
     */
    function (multiObs) {
        var e_2, _a;
        /** @type {?} */
        var values = [];
        try {
            for (var multiObs_1 = tslib_1.__values(multiObs), multiObs_1_1 = multiObs_1.next(); !multiObs_1_1.done; multiObs_1_1 = multiObs_1.next()) {
                var m = multiObs_1_1.value;
                values.push(m.value.uuid);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (multiObs_1_1 && !multiObs_1_1.done && (_a = multiObs_1.return)) _a.call(multiObs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return values;
    };
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.setRepeatingGroupValues = /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    function (node, payload) {
        var e_3, _a;
        /** @type {?} */
        var groupRepeatingObs = _.filter(payload, function (o) {
            /** @type {?} */
            var found = o.concept.uuid === node.question.extras.questionOptions.concept;
            /** @type {?} */
            var intersect = false;
            if (found && o.groupMembers) {
                /** @type {?} */
                var obs = o.groupMembers.map(function (a) {
                    return a.concept.uuid;
                });
                /** @type {?} */
                var schemaQuestions = node.question.questions.map(function (a) {
                    return a.extras.questionOptions.concept;
                });
                intersect = (_.intersection(obs, schemaQuestions).length > 0);
            }
            return found && intersect;
        });
        if (groupRepeatingObs.length > 0) {
            node.node['initialValue'] = groupRepeatingObs;
            for (var i = 0; i < groupRepeatingObs.length; i++) {
                node.node.createChildNode();
            }
        }
        /** @type {?} */
        var groups = [];
        /** @type {?} */
        var index = 0;
        var _loop_2 = function (child) {
            /** @type {?} */
            var children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            /** @type {?} */
            var groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        };
        try {
            for (var _b = tslib_1.__values(node.node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                _loop_2(child);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.setValues(groups, groupRepeatingObs, true);
    };
    /**
     * @param {?} pages
     * @return {?}
     */
    ObsValueAdapter.prototype.getQuestionNodes = /**
     * @param {?} pages
     * @return {?}
     */
    function (pages) {
        var e_4, _a, e_5, _b;
        /** @type {?} */
        var merged = [];
        /** @type {?} */
        var arrays = [];
        try {
            for (var pages_1 = tslib_1.__values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                var page = pages_1_1.value;
                try {
                    for (var _c = tslib_1.__values(page.page), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var section = _d.value;
                        arrays.push(section.section);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (pages_1_1 && !pages_1_1.done && (_a = pages_1.return)) _a.call(pages_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return merged.concat.apply([], arrays);
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    ObsValueAdapter.prototype.repeatingGroup = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        var e_6, _a;
        /** @type {?} */
        var toReturn = [];
        try {
            for (var nodes_2 = tslib_1.__values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
                var node = nodes_2_1.value;
                toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (nodes_2_1 && !nodes_2_1.done && (_a = nodes_2.return)) _a.call(nodes_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return toReturn;
    };
    /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processGroup = /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    function (obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
            /** @type {?} */
            var members = _.filter(this.getObsPayload(obs.groupMembers), function (o) {
                return o.value !== '';
            });
            /** @type {?} */
            var mappedMembers = members.map(function (a) {
                return a.voided;
            });
            if (members.length > 0 && mappedMembers.every(Boolean)) {
                obsPayload.push({
                    uuid: obs.node.initialValue.uuid,
                    voided: true
                });
            }
            else if (members.length > 0) {
                if (obs.node.initialValue) {
                    obsPayload.push({
                        uuid: obs.node.initialValue.uuid,
                        groupMembers: members
                    });
                }
                else {
                    obsPayload.push({
                        concept: obs.question.extras.questionOptions.concept,
                        groupMembers: members
                    });
                }
            }
        }
    };
    /**
     * @param {?} group
     * @return {?}
     */
    ObsValueAdapter.prototype.mapInitialGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        var e_7, _a;
        /** @type {?} */
        var current = {};
        try {
            for (var _b = tslib_1.__values(group.groupMembers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var member = _c.value;
                /** @type {?} */
                var value = '';
                if (member.value instanceof Object) {
                    value = member.value.uuid;
                }
                else if (member.value) {
                    value = member.value;
                }
                else if (member.groupMembers && member.groupMembers.length > 0) {
                    current = this.mapInitialGroup(group);
                }
                current[member.concept.uuid + ':' + value] = value;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return current;
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    ObsValueAdapter.prototype.mapModelGroup = /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    function (node, value) {
        /** @type {?} */
        var current = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                /** @type {?} */
                var groupQuestion = _.find(node.question.questions, { key: key });
                /** @type {?} */
                var modelValue = value[key];
                if (modelValue instanceof Object) {
                }
                else if (modelValue !== '') {
                    current[groupQuestion.extras.questionOptions.concept + ':'
                        + modelValue] = modelValue;
                }
            }
        }
        return current;
    };
    /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processRepeatingGroups = /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    function (node, obsPayload) {
        var e_8, _a, e_9, _b, e_10, _c, e_11, _d;
        /** @type {?} */
        var initialValues = [];
        if (node.node.initialValue) {
            try {
                for (var _e = tslib_1.__values(node.node.initialValue), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var group = _f.value;
                    initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        /** @type {?} */
        var repeatingModel = [];
        try {
            for (var _g = tslib_1.__values(node.node.control.value), _h = _g.next(); !_h.done; _h = _g.next()) {
                var value = _h.value;
                repeatingModel.push({ value: this.mapModelGroup(node, value) });
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
            }
            finally { if (e_9) throw e_9.error; }
        }
        /** @type {?} */
        var deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        /** @type {?} */
        var newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        /** @type {?} */
        var groupConcept = node.question.extras.questionOptions.concept;
        /** @type {?} */
        var newObsPayload = [];
        if (deleted.length > 0) {
            /** @type {?} */
            var deletedObs = this.createGroupDeletedObs(deleted);
            try {
                for (var deletedObs_1 = tslib_1.__values(deletedObs), deletedObs_1_1 = deletedObs_1.next(); !deletedObs_1_1.done; deletedObs_1_1 = deletedObs_1.next()) {
                    var d = deletedObs_1_1.value;
                    obsPayload.push(d);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (deletedObs_1_1 && !deletedObs_1_1.done && (_c = deletedObs_1.return)) _c.call(deletedObs_1);
                }
                finally { if (e_10) throw e_10.error; }
            }
            if (newObs.length > 0) {
                newObsPayload = this.createGroupNewObs(newObs, groupConcept);
            }
        }
        else {
            newObsPayload = this.createGroupNewObs(newObs, groupConcept);
        }
        if (newObsPayload.length > 0) {
            try {
                for (var newObsPayload_1 = tslib_1.__values(newObsPayload), newObsPayload_1_1 = newObsPayload_1.next(); !newObsPayload_1_1.done; newObsPayload_1_1 = newObsPayload_1.next()) {
                    var p = newObsPayload_1_1.value;
                    obsPayload.push(p);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (newObsPayload_1_1 && !newObsPayload_1_1.done && (_d = newObsPayload_1.return)) _d.call(newObsPayload_1);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    ObsValueAdapter.prototype.leftOuterJoinArrays = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        /** @type {?} */
        var unique = first.filter(function (obj) {
            return !second.some(function (obj2) {
                return _.isEqual(obj.value, obj2.value);
            });
        });
        return unique;
    };
    /**
     * @param {?} payload
     * @param {?} groupConcept
     * @return {?}
     */
    ObsValueAdapter.prototype.createGroupNewObs = /**
     * @param {?} payload
     * @param {?} groupConcept
     * @return {?}
     */
    function (payload, groupConcept) {
        var e_12, _a;
        /** @type {?} */
        var newPayload = [];
        try {
            for (var payload_1 = tslib_1.__values(payload), payload_1_1 = payload_1.next(); !payload_1_1.done; payload_1_1 = payload_1.next()) {
                var obs = payload_1_1.value;
                /** @type {?} */
                var groupPayload = [];
                /* tslint:disable */
                for (var key in obs.value) {
                    /** @type {?} */
                    var concept = key.split(':')[0];
                    /** @type {?} */
                    var value = key.split(':')[1];
                    groupPayload.push({ concept: concept, value: value });
                }
                newPayload.push({ concept: groupConcept, groupMembers: groupPayload });
                /* tslint:enable */
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (payload_1_1 && !payload_1_1.done && (_a = payload_1.return)) _a.call(payload_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return newPayload;
    };
    /**
     * @param {?} payload
     * @return {?}
     */
    ObsValueAdapter.prototype.createGroupDeletedObs = /**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        var e_13, _a;
        /** @type {?} */
        var deletedObs = [];
        try {
            for (var payload_2 = tslib_1.__values(payload), payload_2_1 = payload_2.next(); !payload_2_1.done; payload_2_1 = payload_2.next()) {
                var d = payload_2_1.value;
                deletedObs.push({ uuid: d.uuid, voided: true });
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (payload_2_1 && !payload_2_1.done && (_a = payload_2.return)) _a.call(payload_2);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return deletedObs;
    };
    /**
     * @param {?} datetime
     * @return {?}
     */
    ObsValueAdapter.prototype.getExactTime = /**
     * @param {?} datetime
     * @return {?}
     */
    function (datetime) {
        return datetime.substring(0, 19).replace('T', ' ');
    };
    /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processObs = /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    function (obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            /** @type {?} */
            var obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: (obs.question.extras.questionOptions.rendering === 'date' && !this.isEmpty(obs.control.value)) ?
                    this.getExactTime(obs.control.value) : obs.control.value
            };
            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                obs.question.extras.questionOptions.rendering === 'checkbox') {
                /** @type {?} */
                var multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    /** @type {?} */
                    var mappedInitial = obs.initialValue.map(function (a) {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    });
                    /** @type {?} */
                    var mappedCurrent = multis.map(function (a) {
                        return { value: a };
                    });
                    /** @type {?} */
                    var deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                    /** @type {?} */
                    var newObs = this.leftOuterJoinArrays(mappedCurrent, mappedInitial);
                    this.processDeletedMultiSelectObs(deletedObs, obsPayload);
                    this.processNewMultiSelectObs(newObs, obsPayload);
                }
                else {
                    this.processNewMultiSelectObs(multis, obsPayload);
                }
            }
            else {
                if (obs.initialValue && obs.initialValue.value && obsValue) {
                    this.updateOrVoidObs(obsValue, obs.initialValue, obsPayload);
                }
                else if (obsValue.value !== '' && obsValue.value !== null) {
                    obsPayload.push(obsValue);
                }
            }
        }
    };
    /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processComplexObs = /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    function (node, obsPayload) {
        /** @type {?} */
        var valueField;
        /** @type {?} */
        var dateField;
        // tslint:disable-next-line:forin
        for (var o in node.children) {
            if (((/** @type {?} */ (node.children[o]))).question.extras.questionOptions.obsField === 'value') {
                valueField = node.children[o];
            }
            if (((/** @type {?} */ (node.children[o]))).question.extras.questionOptions.obsField === 'obsDatetime') {
                dateField = node.children[o];
            }
        }
        if (valueField) {
            // process obs as usual
            this.processObs(valueField, obsPayload);
            // obtain the last inserted obs and set the obsDatetime
            /** @type {?} */
            var createdPayload = obsPayload.length > 0 ? obsPayload[obsPayload.length - 1] : undefined;
            if (createdPayload &&
                ((createdPayload.concept && createdPayload.concept === node.question.extras.questionOptions.concept) ||
                    (valueField.initialValue && createdPayload.uuid === valueField.initialValue.obsUuid))) {
                if (dateField.initialValue && dateField.control.value !== dateField.initialValue.value) {
                    createdPayload.obsDatetime = dateField.control.value;
                }
            }
        }
    };
    /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processDeletedMultiSelectObs = /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    function (values, obsPayload) {
        var e_14, _a;
        try {
            for (var values_1 = tslib_1.__values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                var value = values_1_1.value;
                obsPayload.push({ uuid: value.uuid, voided: true });
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
            }
            finally { if (e_14) throw e_14.error; }
        }
    };
    /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.processNewMultiSelectObs = /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    function (values, obsPayload) {
        var e_15, _a;
        try {
            for (var values_2 = tslib_1.__values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                var multi = values_2_1.value;
                if (multi.value instanceof Object) {
                    obsPayload.push(multi.value);
                }
                else {
                    obsPayload.push(multi);
                }
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (values_2_1 && !values_2_1.done && (_a = values_2.return)) _a.call(values_2);
            }
            finally { if (e_15) throw e_15.error; }
        }
    };
    /**
     * @param {?} obsValue
     * @param {?} initialValue
     * @param {?} obsPayload
     * @return {?}
     */
    ObsValueAdapter.prototype.updateOrVoidObs = /**
     * @param {?} obsValue
     * @param {?} initialValue
     * @param {?} obsPayload
     * @return {?}
     */
    function (obsValue, initialValue, obsPayload) {
        if (this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
        }
        else if (!this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ObsValueAdapter.prototype.isEmpty = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === '' ||
            value === null ||
            value === undefined
        // || value === [] ||
        // value === {}
        ) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    ObsValueAdapter.prototype.traverse = /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    function (o, type) {
        /** @type {?} */
        var questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                /** @type {?} */
                var returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (var key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                /** @type {?} */
                                var page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                /** @type {?} */
                                var section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                /** @type {?} */
                                var qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                /** @type {?} */
                                var rep = this.repeatingGroup(o.children[key].children);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: rep });
                                break;
                            default:
                                questions.push(o.children[key]);
                                break;
                        }
                    }
                }
            }
        }
        return questions;
    };
    /**
     * @param {?} concept
     * @param {?} values
     * @return {?}
     */
    ObsValueAdapter.prototype.processMultiSelect = /**
     * @param {?} concept
     * @param {?} values
     * @return {?}
     */
    function (concept, values) {
        var e_16, _a;
        /** @type {?} */
        var multiSelectObs = [];
        if (values && values !== null) {
            try {
                for (var values_3 = tslib_1.__values(values), values_3_1 = values_3.next(); !values_3_1.done; values_3_1 = values_3.next()) {
                    var value = values_3_1.value;
                    /** @type {?} */
                    var obs = {
                        concept: concept,
                        value: value
                    };
                    multiSelectObs.push(obs);
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (values_3_1 && !values_3_1.done && (_a = values_3.return)) _a.call(values_3);
                }
                finally { if (e_16) throw e_16.error; }
            }
        }
        return multiSelectObs;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ObsValueAdapter.prototype.isObs = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    ObsValueAdapter.prototype.getObsPayload = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        var e_17, _a;
        /** @type {?} */
        var obsPayload = [];
        try {
            for (var nodes_3 = tslib_1.__values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
                var node = nodes_3_1.value;
                if (this.isObs(node)) {
                    if (node.groupMembers, node.question.extras.questionOptions.rendering === 'group') {
                        this.processGroup(node, obsPayload);
                    }
                    else if (node.groupMembers, node.question.extras.questionOptions.rendering === 'repeating') {
                        this.processRepeatingGroups(node, obsPayload);
                    }
                    else if (node instanceof GroupNode && ((/** @type {?} */ (node))).question.extras.type === 'complex-obs') {
                        this.processComplexObs(node, obsPayload);
                    }
                    else {
                        this.processObs(node, obsPayload);
                    }
                }
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (nodes_3_1 && !nodes_3_1.done && (_a = nodes_3.return)) _a.call(nodes_3);
            }
            finally { if (e_17) throw e_17.error; }
        }
        return obsPayload;
    };
    ObsValueAdapter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ObsValueAdapter.ctorParameters = function () { return [
        { type: ObsAdapterHelper }
    ]; };
    return ObsValueAdapter;
}());
export { ObsValueAdapter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ObsValueAdapter.prototype.helper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLE1BQU0sQ0FBQztBQUVkLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7SUFHSSx5QkFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBSSxDQUFDOzs7OztJQUVqRCw2Q0FBbUI7Ozs7SUFBbkIsVUFBb0IsSUFBVTtRQUMxQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELGdFQUFnRTtRQUNoRSxnQ0FBZ0M7UUFDaEMsNENBQTRDO1FBQzVDLG1DQUFtQztRQUNuQyxvREFBb0Q7UUFDcEQscUJBQXFCO1FBQ3JCLDRDQUE0QztJQUNoRCxDQUFDOzs7Ozs7SUFFRCxzQ0FBWTs7Ozs7SUFBWixVQUFhLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsMENBQTBDO0lBQzlDLENBQUM7SUFFRCxzRUFBc0U7SUFDdEUsNEJBQTRCOzs7Ozs7Ozs7SUFFNUIsbUNBQVM7Ozs7Ozs7OztJQUFU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QUM7cUJBRXZDO3lCQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxLQUFLLFdBQVcsRUFBRTt3QkFDMUYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztxQkFDakQ7eUJBQU0sSUFBSSxJQUFJLFlBQVksU0FBUyxJQUFJLENBQUMsbUJBQUEsSUFBSSxFQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7d0JBQ2hHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7cUJBQzVDO3lCQUFNO3dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3FCQUNyQztpQkFDSjthQUNKOzs7Ozs7Ozs7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDOztnQkF6ZkosVUFBVTs7OztnQkFGRixnQkFBZ0I7O0lBNGZ6QixzQkFBQztDQUFBLEFBMWZELElBMGZDO1NBemZZLGVBQWU7Ozs7OztJQUVaLGlDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAncnhqcyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgTGVhZk5vZGUsIEdyb3VwTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IFZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUuYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNBZGFwdGVySGVscGVyIH0gZnJvbSAnLi9vYnMtYWRhcHRlci1oZWxwZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2JzVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaGVscGVyOiBPYnNBZGFwdGVySGVscGVyKSB7IH1cblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWxwZXIuZ2V0T2JzTm9kZVBheWxvYWQoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIC8vIFRPRE86IEdldCByaWQgb2YgdGhlIHNlY3Rpb24gYmVsb3cgd2hlbiB0aGUgaGVscGVyIGlzIHN0YWJsZS5cbiAgICAgICAgLy8gLy8gVHJhdmVyc2UgIHRvIGdldCBhbGwgbm9kZXNcbiAgICAgICAgLy8gbGV0IHBhZ2VzID0gdGhpcy50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgLy8gLy8gRXh0cmFjdCBhY3R1YWwgcXVlc3Rpb24gbm9kZXNcbiAgICAgICAgLy8gbGV0IHF1ZXN0aW9uTm9kZXMgPSB0aGlzLmdldFF1ZXN0aW9uTm9kZXMocGFnZXMpO1xuICAgICAgICAvLyAvLyBHZXQgb2JzIFBheWxvYWRcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuZ2V0T2JzUGF5bG9hZChxdWVzdGlvbk5vZGVzKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICB0aGlzLmhlbHBlci5zZXROb2RlVmFsdWUoZm9ybS5yb290Tm9kZSwgcGF5bG9hZCk7XG5cbiAgICAgICAgLy8gVE9ETzogR2V0IHJpZCBvZiB0aGUgc2VjdGlvbiBiZWxvdyB3aGVuIHRoZSBoZWxwZXIgaXMgc3RhYmxlLlxuICAgICAgICAvLyAvLyBUcmF2ZXJzZSAgdG8gZ2V0IGFsbCBub2Rlc1xuICAgICAgICAvLyBsZXQgcGFnZXMgPSB0aGlzLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICAvLyAvLyBFeHRyYWN0IGFjdHVhbCBxdWVzdGlvbiBub2Rlc1xuICAgICAgICAvLyBsZXQgcXVlc3Rpb25Ob2RlcyA9IHRoaXMuZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcyk7XG4gICAgICAgIC8vIC8vIEV4dHJhY3Qgc2V0IG9ic1xuICAgICAgICAvLyB0aGlzLnNldFZhbHVlcyhxdWVzdGlvbk5vZGVzLCBwYXlsb2FkKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBHZXQgcmlkIG9mIGFsbCB0aGUgZnVuY3Rpb25zIGJlbG93IGFzIHRoZXkgd2lsbCBub3QgYmUgbmVlZGVkXG4gICAgLy8gb25jZSB0aGUgaGVscGVyIGlzIHN0YWJsZVxuXG4gICAgc2V0VmFsdWVzKG5vZGVzLCBwYXlsb2FkPywgZm9yY2Vncm91cD8pIHtcbiAgICAgICAgaWYgKG5vZGVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIExlYWZOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T2JzVmFsdWUobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiBub2RlLmluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLnNldEhpc3RvcmljYWxWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcgfHwgZm9yY2Vncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cE9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICYmIG8uZ3JvdXBNZW1iZXJzO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwT2JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ub2RlWydpbml0aWFsVmFsdWUnXSA9IGdyb3VwT2JzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlcyhub2RlLmdyb3VwTWVtYmVycywgZ3JvdXBPYnMuZ3JvdXBNZW1iZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2Vncm91cCAmJiBub2RlLnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVzKG5vZGUuZ3JvdXBNZW1iZXJzLCBub2RlLnBheWxvYWQuZ3JvdXBNZW1iZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbXBsZXhPYnNWYWx1ZShub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncmVwZWF0aW5nJyAmJiAhZm9yY2Vncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJlcGVhdGluZ0dyb3VwVmFsdWVzKG5vZGUsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRPYnNWYWx1ZShub2RlLCBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29icycgfHxcbiAgICAgICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMtY2hpbGQnICYmXG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpKSAmJlxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyAhPT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nICE9PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICBjb25zdCBvYnMgPSBfLmZpbmQocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChvYnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShvYnMudmFsdWUudXVpZCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG9icy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0geyBvYnNVdWlkOiBvYnMudXVpZCwgdmFsdWU6IG9icy52YWx1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbXVsdGlPYnMgPSBfLmZpbHRlcihwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG11bHRpT2JzICYmIG11bHRpT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5nZXRNdWx0aXNlbGVjdFZhbHVlcyhtdWx0aU9icykpO1xuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSBtdWx0aU9icztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENvbXBsZXhPYnNWYWx1ZShub2RlLCBwYXlsb2FkKSB7XG4gICAgICAgIGxldCB2YWx1ZUZpZWxkOiBhbnk7XG4gICAgICAgIGxldCBkYXRlRmllbGQ6IGFueTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBvIGluIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHZhbHVlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICdvYnNEYXRldGltZScpIHtcbiAgICAgICAgICAgICAgICBkYXRlRmllbGQgPSBub2RlLmNoaWxkcmVuW29dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHNldCB0aGUgdXN1YWwgb2JzIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0T2JzVmFsdWUodmFsdWVGaWVsZCwgcGF5bG9hZCk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBvYnMgZGF0ZVxuICAgICAgICBjb25zdCBvYnMgPSBfLmZpbmQocGF5bG9hZCwgKG86IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG9icykge1xuICAgICAgICAgICAgZGF0ZUZpZWxkWydpbml0aWFsVmFsdWUnXSA9IHsgb2JzVXVpZDogb2JzLnV1aWQsIHZhbHVlOiBvYnMub2JzRGF0ZXRpbWUgfTtcbiAgICAgICAgICAgIChkYXRlRmllbGQgYXMgTGVhZk5vZGUpLmNvbnRyb2wuc2V0VmFsdWUob2JzLm9ic0RhdGV0aW1lKTtcbiAgICAgICAgICAgIChkYXRlRmllbGQgYXMgTGVhZk5vZGUpLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TXVsdGlzZWxlY3RWYWx1ZXMobXVsdGlPYnMpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbSBvZiBtdWx0aU9icykge1xuICAgICAgICAgICAgdmFsdWVzLnB1c2gobS52YWx1ZS51dWlkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHNldFJlcGVhdGluZ0dyb3VwVmFsdWVzKG5vZGUsIHBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBSZXBlYXRpbmdPYnMgPSBfLmZpbHRlcihwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb3VuZCA9IG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgIGxldCBpbnRlcnNlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChmb3VuZCAmJiBvLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9icyA9IG8uZ3JvdXBNZW1iZXJzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5jb25jZXB0LnV1aWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWFRdWVzdGlvbnMgPSBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucy5tYXAoKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEuZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0ID0gKF8uaW50ZXJzZWN0aW9uKG9icywgc2NoZW1hUXVlc3Rpb25zKS5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3VuZCAmJiBpbnRlcnNlY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZ3JvdXBSZXBlYXRpbmdPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbm9kZS5ub2RlWydpbml0aWFsVmFsdWUnXSA9IGdyb3VwUmVwZWF0aW5nT2JzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cFJlcGVhdGluZ09icy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG5vZGUubm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gT2JqZWN0LmtleXMoY2hpbGQuY2hpbGRyZW4pLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBjaGlsZC5jaGlsZHJlbltrZXldOyB9KTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwUGF5bG9hZCA9IGdyb3VwUmVwZWF0aW5nT2JzW2luZGV4XTtcbiAgICAgICAgICAgIGdyb3Vwcy5wdXNoKHsgcXVlc3Rpb246IG5vZGUucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogY2hpbGRyZW4sIHBheWxvYWQ6IGdyb3VwUGF5bG9hZCB9KTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRWYWx1ZXMoZ3JvdXBzLCBncm91cFJlcGVhdGluZ09icywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcykge1xuICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgY29uc3QgYXJyYXlzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHBhZ2UucGFnZSkge1xuICAgICAgICAgICAgICAgIGFycmF5cy5wdXNoKHNlY3Rpb24uc2VjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lcmdlZC5jb25jYXQuYXBwbHkoW10sIGFycmF5cyk7XG4gICAgfVxuXG4gICAgcmVwZWF0aW5nR3JvdXAobm9kZXMpIHtcbiAgICAgICAgY29uc3QgdG9SZXR1cm4gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICB0b1JldHVybi5wdXNoKHsgcXVlc3Rpb246IG5vZGUucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogdGhpcy50cmF2ZXJzZShub2RlKSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgfVxuXG4gICAgcHJvY2Vzc0dyb3VwKG9icywgb2JzUGF5bG9hZCkge1xuICAgICAgICBpZiAob2JzLnF1ZXN0aW9uICYmIG9icy5xdWVzdGlvbi5leHRyYXMgJiYgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICBjb25zdCBtZW1iZXJzID0gXy5maWx0ZXIodGhpcy5nZXRPYnNQYXlsb2FkKG9icy5ncm91cE1lbWJlcnMpLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8udmFsdWUgIT09ICcnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hcHBlZE1lbWJlcnMgPSBtZW1iZXJzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnZvaWRlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1lbWJlcnMubGVuZ3RoID4gMCAmJiBtYXBwZWRNZW1iZXJzLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogb2JzLm5vZGUuaW5pdGlhbFZhbHVlLnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIHZvaWRlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZW1iZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYnMubm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWVtYmVyczogbWVtYmVyc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWVtYmVyczogbWVtYmVyc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXBJbml0aWFsR3JvdXAoZ3JvdXApIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBtZW1iZXIgb2YgZ3JvdXAuZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9ICcnO1xuICAgICAgICAgICAgaWYgKG1lbWJlci52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbWVtYmVyLnZhbHVlLnV1aWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lbWJlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbWVtYmVyLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZW1iZXIuZ3JvdXBNZW1iZXJzICYmIG1lbWJlci5ncm91cE1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLm1hcEluaXRpYWxHcm91cChncm91cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50W21lbWJlci5jb25jZXB0LnV1aWQgKyAnOicgKyB2YWx1ZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG5cbiAgICBtYXBNb2RlbEdyb3VwKG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBRdWVzdGlvbjogYW55ID0gXy5maW5kKG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zLCB7IGtleToga2V5IH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb2RlbFZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50W2dyb3VwUXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ICsgJzonXG4gICAgICAgICAgICAgICAgICAgICAgICArIG1vZGVsVmFsdWVdID0gbW9kZWxWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG5cbiAgICBwcm9jZXNzUmVwZWF0aW5nR3JvdXBzKG5vZGUsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbFZhbHVlcyA9IFtdO1xuICAgICAgICBpZiAobm9kZS5ub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBub2RlLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlcy5wdXNoKHsgdXVpZDogZ3JvdXAudXVpZCwgdmFsdWU6IHRoaXMubWFwSW5pdGlhbEdyb3VwKGdyb3VwKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXBlYXRpbmdNb2RlbCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIG5vZGUubm9kZS5jb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICByZXBlYXRpbmdNb2RlbC5wdXNoKHsgdmFsdWU6IHRoaXMubWFwTW9kZWxHcm91cChub2RlLCB2YWx1ZSkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVsZXRlZCA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhpbml0aWFsVmFsdWVzLCByZXBlYXRpbmdNb2RlbCk7XG4gICAgICAgIGNvbnN0IG5ld09icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhyZXBlYXRpbmdNb2RlbCwgaW5pdGlhbFZhbHVlcyk7XG4gICAgICAgIGNvbnN0IGdyb3VwQ29uY2VwdCA9IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICBsZXQgbmV3T2JzUGF5bG9hZCA9IFtdO1xuICAgICAgICBpZiAoZGVsZXRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVkT2JzID0gdGhpcy5jcmVhdGVHcm91cERlbGV0ZWRPYnMoZGVsZXRlZCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGQgb2YgZGVsZXRlZE9icykge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG5ld09ic1BheWxvYWQgPSB0aGlzLmNyZWF0ZUdyb3VwTmV3T2JzKG5ld09icywgZ3JvdXBDb25jZXB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld09ic1BheWxvYWQgPSB0aGlzLmNyZWF0ZUdyb3VwTmV3T2JzKG5ld09icywgZ3JvdXBDb25jZXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdPYnNQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcCBvZiBuZXdPYnNQYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGVmdE91dGVySm9pbkFycmF5cyhmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIGNvbnN0IHVuaXF1ZSA9IGZpcnN0LmZpbHRlcihmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gIXNlY29uZC5zb21lKGZ1bmN0aW9uIChvYmoyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNFcXVhbChvYmoudmFsdWUsIG9iajIudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdW5pcXVlO1xuICAgIH1cblxuICAgIGNyZWF0ZUdyb3VwTmV3T2JzKHBheWxvYWQsIGdyb3VwQ29uY2VwdCkge1xuICAgICAgICBjb25zdCBuZXdQYXlsb2FkID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgb2JzIG9mIHBheWxvYWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwUGF5bG9hZCA9IFtdO1xuICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBvYnMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY2VwdCA9IGtleS5zcGxpdCgnOicpWzBdO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGtleS5zcGxpdCgnOicpWzFdO1xuICAgICAgICAgICAgICAgIGdyb3VwUGF5bG9hZC5wdXNoKHsgY29uY2VwdDogY29uY2VwdCwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3UGF5bG9hZC5wdXNoKHsgY29uY2VwdDogZ3JvdXBDb25jZXB0LCBncm91cE1lbWJlcnM6IGdyb3VwUGF5bG9hZCB9KVxuICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdQYXlsb2FkO1xuICAgIH1cblxuICAgIGNyZWF0ZUdyb3VwRGVsZXRlZE9icyhwYXlsb2FkKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBkIG9mIHBheWxvYWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZWRPYnMucHVzaCh7IHV1aWQ6IGQudXVpZCwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWxldGVkT2JzO1xuICAgIH1cblxuICAgIGdldEV4YWN0VGltZShkYXRldGltZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBkYXRldGltZS5zdWJzdHJpbmcoMCwgMTkpLnJlcGxhY2UoJ1QnLCAnICcpO1xuICAgIH1cblxuICAgIHByb2Nlc3NPYnMob2JzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGlmIChvYnMuY29udHJvbCAmJiBvYnMucXVlc3Rpb24uZXh0cmFzKSB7XG4gICAgICAgICAgICBjb25zdCBvYnNWYWx1ZSA9IHtcbiAgICAgICAgICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiAob2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZGF0ZScgJiYgIXRoaXMuaXNFbXB0eShvYnMuY29udHJvbC52YWx1ZSkpID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFeGFjdFRpbWUob2JzLmNvbnRyb2wudmFsdWUpIDogb2JzLmNvbnRyb2wudmFsdWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdtdWx0aUNoZWNrYm94JyB8fFxuICAgICAgICAgICAgb2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbXVsdGlzID0gdGhpcy5wcm9jZXNzTXVsdGlTZWxlY3Qob2JzLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCwgb2JzLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChvYnMuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEluaXRpYWwgPSBvYnMuaW5pdGlhbFZhbHVlLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdXVpZDogYS51dWlkLCB2YWx1ZTogeyBjb25jZXB0OiBhLmNvbmNlcHQudXVpZCwgdmFsdWU6IGEudmFsdWUudXVpZCB9IH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRDdXJyZW50ID0gbXVsdGlzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGEgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSB0aGlzLmxlZnRPdXRlckpvaW5BcnJheXMobWFwcGVkSW5pdGlhbCwgbWFwcGVkQ3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld09icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhtYXBwZWRDdXJyZW50LCBtYXBwZWRJbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGVsZXRlZE11bHRpU2VsZWN0T2JzKGRlbGV0ZWRPYnMsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyhuZXdPYnMsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ld011bHRpU2VsZWN0T2JzKG11bHRpcywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzLmluaXRpYWxWYWx1ZSAmJiBvYnMuaW5pdGlhbFZhbHVlLnZhbHVlICYmIG9ic1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlT3JWb2lkT2JzKG9ic1ZhbHVlLCBvYnMuaW5pdGlhbFZhbHVlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9ic1ZhbHVlLnZhbHVlICE9PSAnJyAmJiBvYnNWYWx1ZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gob2JzVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NDb21wbGV4T2JzKG5vZGUsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgbGV0IHZhbHVlRmllbGQ6IGFueTtcbiAgICAgICAgbGV0IGRhdGVGaWVsZDogYW55O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVGaWVsZCkge1xuICAgICAgICAgICAgLy8gcHJvY2VzcyBvYnMgYXMgdXN1YWxcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc09icyh2YWx1ZUZpZWxkLCBvYnNQYXlsb2FkKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIHRoZSBsYXN0IGluc2VydGVkIG9icyBhbmQgc2V0IHRoZSBvYnNEYXRldGltZVxuICAgICAgICAgICAgY29uc3QgY3JlYXRlZFBheWxvYWQgPSBvYnNQYXlsb2FkLmxlbmd0aCA+IDAgPyBvYnNQYXlsb2FkW29ic1BheWxvYWQubGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoY3JlYXRlZFBheWxvYWQgJiZcbiAgICAgICAgICAgICAgICAoKGNyZWF0ZWRQYXlsb2FkLmNvbmNlcHQgJiYgY3JlYXRlZFBheWxvYWQuY29uY2VwdCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQpIHx8XG4gICAgICAgICAgICAgICAgICAgICh2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZSAmJiBjcmVhdGVkUGF5bG9hZC51dWlkID09PSB2YWx1ZUZpZWxkLmluaXRpYWxWYWx1ZS5vYnNVdWlkKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZUZpZWxkLmluaXRpYWxWYWx1ZSAmJiBkYXRlRmllbGQuY29udHJvbC52YWx1ZSAhPT0gZGF0ZUZpZWxkLmluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkUGF5bG9hZC5vYnNEYXRldGltZSA9IGRhdGVGaWVsZC5jb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnModmFsdWVzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goeyB1dWlkOiB2YWx1ZS51dWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnModmFsdWVzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGZvciAoY29uc3QgbXVsdGkgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAobXVsdGkudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gobXVsdGkudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gobXVsdGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlT3JWb2lkT2JzKG9ic1ZhbHVlLCBpbml0aWFsVmFsdWUsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eShvYnNWYWx1ZS52YWx1ZSkgJiYgaW5pdGlhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goeyB1dWlkOiBpbml0aWFsVmFsdWUub2JzVXVpZCwgdm9pZGVkOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW1wdHkob2JzVmFsdWUudmFsdWUpICYmIGluaXRpYWxWYWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHsgdXVpZDogaW5pdGlhbFZhbHVlLm9ic1V1aWQsIHZhbHVlOiBvYnNWYWx1ZS52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW1wdHkodmFsdWUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fFxuICAgICAgICAgICAgdmFsdWUgPT09IG51bGwgfHxcbiAgICAgICAgICAgIHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgIC8vIHx8IHZhbHVlID09PSBbXSB8fFxuICAgICAgICAgICAgLy8gdmFsdWUgPT09IHt9XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRyYXZlcnNlKG8sIHR5cGU/KSB7XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoby5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVybmVkID0gdGhpcy5yZXBlYXRpbmdHcm91cChvLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHBhZ2U6IHBhZ2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy50cmF2ZXJzZShvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh7IHNlY3Rpb246IHNlY3Rpb24gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHFzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXAgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW5ba2V5XS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgbm9kZTogby5jaGlsZHJlbltrZXldLCBxdWVzdGlvbjogby5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLCBncm91cE1lbWJlcnM6IHJlcCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxuXG4gICAgcHJvY2Vzc011bHRpU2VsZWN0KGNvbmNlcHQsIHZhbHVlcykge1xuICAgICAgICBjb25zdCBtdWx0aVNlbGVjdE9icyA9IFtdO1xuICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNlcHQ6IGNvbmNlcHQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbXVsdGlTZWxlY3RPYnMucHVzaChvYnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtdWx0aVNlbGVjdE9icztcbiAgICB9XG5cblxuICAgIGlzT2JzKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzJyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ29ic0dyb3VwJyB8fFxuICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJyk7XG4gICAgfVxuXG4gICAgZ2V0T2JzUGF5bG9hZChub2Rlcykge1xuICAgICAgICBjb25zdCBvYnNQYXlsb2FkID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNPYnMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdncm91cCcpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NHcm91cChub2RlLCBvYnNQYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1JlcGVhdGluZ0dyb3Vwcyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUgJiYgKG5vZGUgYXMgR3JvdXBOb2RlKS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2NvbXBsZXgtb2JzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NDb21wbGV4T2JzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc09icyhub2RlLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic1BheWxvYWQ7XG4gICAgfVxufVxuIl19