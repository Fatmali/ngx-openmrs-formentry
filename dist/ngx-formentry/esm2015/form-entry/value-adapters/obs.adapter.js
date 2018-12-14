/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import 'rxjs';
import * as _ from 'lodash';
import { LeafNode, GroupNode } from '../form-factory/form-node';
import { ObsAdapterHelper } from './obs-adapter-helper';
export class ObsValueAdapter {
    /**
     * @param {?} helper
     */
    constructor(helper) {
        this.helper = helper;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generateFormPayload(form) {
        return this.helper.getObsNodePayload(form.rootNode);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Get obs Payload
        // return this.getObsPayload(questionNodes);
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    populateForm(form, payload) {
        this.helper.setNodeValue(form.rootNode, payload);
        // TODO: Get rid of the section below when the helper is stable.
        // // Traverse  to get all nodes
        // let pages = this.traverse(form.rootNode);
        // // Extract actual question nodes
        // let questionNodes = this.getQuestionNodes(pages);
        // // Extract set obs
        // this.setValues(questionNodes, payload);
    }
    // TODO: Get rid of all the functions below as they will not be needed
    // once the helper is stable
    /**
     * @param {?} nodes
     * @param {?=} payload
     * @param {?=} forcegroup
     * @return {?}
     */
    setValues(nodes, payload, forcegroup) {
        if (nodes) {
            for (const node of nodes) {
                if (node instanceof LeafNode) {
                    this.setObsValue(node, payload);
                    if (node.question.enableHistoricalValue && node.initialValue !== undefined) {
                        node.question.setHistoricalValue(false);
                    }
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'group' || forcegroup) {
                    /** @type {?} */
                    const groupObs = _.find(payload, (o) => {
                        return o.concept.uuid === node.question.extras.questionOptions.concept && o.groupMembers;
                    });
                    if (groupObs) {
                        if (node.node) {
                            node.node['initialValue'] = groupObs;
                        }
                        this.setValues(node.groupMembers, groupObs.groupMembers);
                    }
                    if (forcegroup && node.payload) {
                        this.setValues(node.groupMembers, node.payload.groupMembers);
                    }
                }
                else if (node instanceof GroupNode && node.question.extras.type === 'complex-obs') {
                    this.setComplexObsValue(node, payload);
                }
                else if (node.question && node.question.extras && node.question.renderingType === 'repeating' && !forcegroup) {
                    this.setRepeatingGroupValues(node, payload);
                    node.node.control.updateValueAndValidity();
                }
                else {
                    throw new Error('not implemented');
                }
            }
        }
    }
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    setObsValue(node, payload) {
        if (node.question && node.question.extras &&
            (node.question.extras.type === 'obs' ||
                (node.question.extras.type === 'complex-obs-child' &&
                    node.question.extras.questionOptions.obsField === 'value')) &&
            node.question.extras.questionOptions.rendering !== 'multiCheckbox' ||
            node.question.extras.questionOptions.rendering !== 'checkbox') {
            /** @type {?} */
            const obs = _.find(payload, (o) => {
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
            const multiObs = _.filter(payload, (o) => {
                return o.concept.uuid === node.question.extras.questionOptions.concept;
            });
            if (multiObs && multiObs.length > 0) {
                node.control.setValue(this.getMultiselectValues(multiObs));
                node.control.updateValueAndValidity();
                node['initialValue'] = multiObs;
            }
        }
    }
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    setComplexObsValue(node, payload) {
        /** @type {?} */
        let valueField;
        /** @type {?} */
        let dateField;
        // tslint:disable-next-line:forin
        for (const o in node.children) {
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
        const obs = _.find(payload, (o) => {
            return o.concept.uuid === node.question.extras.questionOptions.concept;
        });
        if (obs) {
            dateField['initialValue'] = { obsUuid: obs.uuid, value: obs.obsDatetime };
            ((/** @type {?} */ (dateField))).control.setValue(obs.obsDatetime);
            ((/** @type {?} */ (dateField))).control.updateValueAndValidity();
        }
    }
    /**
     * @param {?} multiObs
     * @return {?}
     */
    getMultiselectValues(multiObs) {
        /** @type {?} */
        const values = [];
        for (const m of multiObs) {
            values.push(m.value.uuid);
        }
        return values;
    }
    /**
     * @param {?} node
     * @param {?} payload
     * @return {?}
     */
    setRepeatingGroupValues(node, payload) {
        /** @type {?} */
        const groupRepeatingObs = _.filter(payload, (o) => {
            /** @type {?} */
            const found = o.concept.uuid === node.question.extras.questionOptions.concept;
            /** @type {?} */
            let intersect = false;
            if (found && o.groupMembers) {
                /** @type {?} */
                const obs = o.groupMembers.map((a) => {
                    return a.concept.uuid;
                });
                /** @type {?} */
                const schemaQuestions = node.question.questions.map((a) => {
                    return a.extras.questionOptions.concept;
                });
                intersect = (_.intersection(obs, schemaQuestions).length > 0);
            }
            return found && intersect;
        });
        if (groupRepeatingObs.length > 0) {
            node.node['initialValue'] = groupRepeatingObs;
            for (let i = 0; i < groupRepeatingObs.length; i++) {
                node.node.createChildNode();
            }
        }
        /** @type {?} */
        const groups = [];
        /** @type {?} */
        let index = 0;
        for (const child of node.node.children) {
            /** @type {?} */
            const children = Object.keys(child.children).map(function (key) { return child.children[key]; });
            /** @type {?} */
            const groupPayload = groupRepeatingObs[index];
            groups.push({ question: node.question, groupMembers: children, payload: groupPayload });
            index++;
        }
        this.setValues(groups, groupRepeatingObs, true);
    }
    /**
     * @param {?} pages
     * @return {?}
     */
    getQuestionNodes(pages) {
        /** @type {?} */
        const merged = [];
        /** @type {?} */
        const arrays = [];
        for (const page of pages) {
            for (const section of page.page) {
                arrays.push(section.section);
            }
        }
        return merged.concat.apply([], arrays);
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    repeatingGroup(nodes) {
        /** @type {?} */
        const toReturn = [];
        for (const node of nodes) {
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    }
    /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    processGroup(obs, obsPayload) {
        if (obs.question && obs.question.extras && obs.question.extras.questionOptions.rendering === 'group') {
            /** @type {?} */
            const members = _.filter(this.getObsPayload(obs.groupMembers), (o) => {
                return o.value !== '';
            });
            /** @type {?} */
            const mappedMembers = members.map((a) => {
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
    }
    /**
     * @param {?} group
     * @return {?}
     */
    mapInitialGroup(group) {
        /** @type {?} */
        let current = {};
        for (const member of group.groupMembers) {
            /** @type {?} */
            let value = '';
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
        return current;
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    mapModelGroup(node, value) {
        /** @type {?} */
        const current = {};
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                /** @type {?} */
                const groupQuestion = _.find(node.question.questions, { key: key });
                /** @type {?} */
                const modelValue = value[key];
                if (modelValue instanceof Object) {
                }
                else if (modelValue !== '') {
                    current[groupQuestion.extras.questionOptions.concept + ':'
                        + modelValue] = modelValue;
                }
            }
        }
        return current;
    }
    /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    processRepeatingGroups(node, obsPayload) {
        /** @type {?} */
        const initialValues = [];
        if (node.node.initialValue) {
            for (const group of node.node.initialValue) {
                initialValues.push({ uuid: group.uuid, value: this.mapInitialGroup(group) });
            }
        }
        /** @type {?} */
        const repeatingModel = [];
        for (const value of node.node.control.value) {
            repeatingModel.push({ value: this.mapModelGroup(node, value) });
        }
        /** @type {?} */
        const deleted = this.leftOuterJoinArrays(initialValues, repeatingModel);
        /** @type {?} */
        const newObs = this.leftOuterJoinArrays(repeatingModel, initialValues);
        /** @type {?} */
        const groupConcept = node.question.extras.questionOptions.concept;
        /** @type {?} */
        let newObsPayload = [];
        if (deleted.length > 0) {
            /** @type {?} */
            const deletedObs = this.createGroupDeletedObs(deleted);
            for (const d of deletedObs) {
                obsPayload.push(d);
            }
            if (newObs.length > 0) {
                newObsPayload = this.createGroupNewObs(newObs, groupConcept);
            }
        }
        else {
            newObsPayload = this.createGroupNewObs(newObs, groupConcept);
        }
        if (newObsPayload.length > 0) {
            for (const p of newObsPayload) {
                obsPayload.push(p);
            }
        }
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    leftOuterJoinArrays(first, second) {
        /** @type {?} */
        const unique = first.filter(function (obj) {
            return !second.some(function (obj2) {
                return _.isEqual(obj.value, obj2.value);
            });
        });
        return unique;
    }
    /**
     * @param {?} payload
     * @param {?} groupConcept
     * @return {?}
     */
    createGroupNewObs(payload, groupConcept) {
        /** @type {?} */
        const newPayload = [];
        for (const obs of payload) {
            /** @type {?} */
            const groupPayload = [];
            /* tslint:disable */
            for (let key in obs.value) {
                /** @type {?} */
                let concept = key.split(':')[0];
                /** @type {?} */
                let value = key.split(':')[1];
                groupPayload.push({ concept: concept, value: value });
            }
            newPayload.push({ concept: groupConcept, groupMembers: groupPayload });
            /* tslint:enable */
        }
        return newPayload;
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    createGroupDeletedObs(payload) {
        /** @type {?} */
        const deletedObs = [];
        for (const d of payload) {
            deletedObs.push({ uuid: d.uuid, voided: true });
        }
        return deletedObs;
    }
    /**
     * @param {?} datetime
     * @return {?}
     */
    getExactTime(datetime) {
        return datetime.substring(0, 19).replace('T', ' ');
    }
    /**
     * @param {?} obs
     * @param {?} obsPayload
     * @return {?}
     */
    processObs(obs, obsPayload) {
        if (obs.control && obs.question.extras) {
            /** @type {?} */
            const obsValue = {
                concept: obs.question.extras.questionOptions.concept,
                value: (obs.question.extras.questionOptions.rendering === 'date' && !this.isEmpty(obs.control.value)) ?
                    this.getExactTime(obs.control.value) : obs.control.value
            };
            if (obs.question.extras.questionOptions.rendering === 'multiCheckbox' ||
                obs.question.extras.questionOptions.rendering === 'checkbox') {
                /** @type {?} */
                const multis = this.processMultiSelect(obs.question.extras.questionOptions.concept, obs.control.value);
                if (obs.initialValue) {
                    /** @type {?} */
                    const mappedInitial = obs.initialValue.map((a) => {
                        return { uuid: a.uuid, value: { concept: a.concept.uuid, value: a.value.uuid } };
                    });
                    /** @type {?} */
                    const mappedCurrent = multis.map((a) => {
                        return { value: a };
                    });
                    /** @type {?} */
                    const deletedObs = this.leftOuterJoinArrays(mappedInitial, mappedCurrent);
                    /** @type {?} */
                    const newObs = this.leftOuterJoinArrays(mappedCurrent, mappedInitial);
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
    }
    /**
     * @param {?} node
     * @param {?} obsPayload
     * @return {?}
     */
    processComplexObs(node, obsPayload) {
        /** @type {?} */
        let valueField;
        /** @type {?} */
        let dateField;
        // tslint:disable-next-line:forin
        for (const o in node.children) {
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
            const createdPayload = obsPayload.length > 0 ? obsPayload[obsPayload.length - 1] : undefined;
            if (createdPayload &&
                ((createdPayload.concept && createdPayload.concept === node.question.extras.questionOptions.concept) ||
                    (valueField.initialValue && createdPayload.uuid === valueField.initialValue.obsUuid))) {
                if (dateField.initialValue && dateField.control.value !== dateField.initialValue.value) {
                    createdPayload.obsDatetime = dateField.control.value;
                }
            }
        }
    }
    /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    processDeletedMultiSelectObs(values, obsPayload) {
        for (const value of values) {
            obsPayload.push({ uuid: value.uuid, voided: true });
        }
    }
    /**
     * @param {?} values
     * @param {?} obsPayload
     * @return {?}
     */
    processNewMultiSelectObs(values, obsPayload) {
        for (const multi of values) {
            if (multi.value instanceof Object) {
                obsPayload.push(multi.value);
            }
            else {
                obsPayload.push(multi);
            }
        }
    }
    /**
     * @param {?} obsValue
     * @param {?} initialValue
     * @param {?} obsPayload
     * @return {?}
     */
    updateOrVoidObs(obsValue, initialValue, obsPayload) {
        if (this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, voided: true });
        }
        else if (!this.isEmpty(obsValue.value) && initialValue.value) {
            obsPayload.push({ uuid: initialValue.obsUuid, value: obsValue.value });
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isEmpty(value) {
        if (value === '' ||
            value === null ||
            value === undefined
        // || value === [] ||
        // value === {}
        ) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} o
     * @param {?=} type
     * @return {?}
     */
    traverse(o, type) {
        /** @type {?} */
        const questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                /** @type {?} */
                const returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (const key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                /** @type {?} */
                                const page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                /** @type {?} */
                                const section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                /** @type {?} */
                                const qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                /** @type {?} */
                                const rep = this.repeatingGroup(o.children[key].children);
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
    }
    /**
     * @param {?} concept
     * @param {?} values
     * @return {?}
     */
    processMultiSelect(concept, values) {
        /** @type {?} */
        const multiSelectObs = [];
        if (values && values !== null) {
            for (const value of values) {
                /** @type {?} */
                const obs = {
                    concept: concept,
                    value: value
                };
                multiSelectObs.push(obs);
            }
        }
        return multiSelectObs;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isObs(node) {
        return (node.question.extras.type === 'obs' ||
            node.question.extras.type === 'obsGroup' ||
            node.question.extras.type === 'complex-obs');
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    getObsPayload(nodes) {
        /** @type {?} */
        const obsPayload = [];
        for (const node of nodes) {
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
        return obsPayload;
    }
}
ObsValueAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ObsValueAdapter.ctorParameters = () => [
    { type: ObsAdapterHelper }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ObsValueAdapter.prototype.helper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sTUFBTSxDQUFDO0FBRWQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxNQUFNLE9BQU8sZUFBZTs7OztJQUV4QixZQUFvQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFJLENBQUM7Ozs7O0lBRWpELG1CQUFtQixDQUFDLElBQVU7UUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxnRUFBZ0U7UUFDaEUsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUM1QyxtQ0FBbUM7UUFDbkMsb0RBQW9EO1FBQ3BELHFCQUFxQjtRQUNyQiw0Q0FBNEM7SUFDaEQsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVUsRUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakQsZ0VBQWdFO1FBQ2hFLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFDNUMsbUNBQW1DO1FBQ25DLG9EQUFvRDtRQUNwRCxxQkFBcUI7UUFDckIsMENBQTBDO0lBQzlDLENBQUM7Ozs7Ozs7OztJQUtELFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBUSxFQUFFLFVBQVc7UUFDbEMsSUFBSSxL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RixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNqRDtxQkFBTSxJQUFJLElBQUksWUFBWSxTQUFTLElBQUksQ0FBQyxtQkFBQSxJQUFJLEVBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtvQkFDaEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7OztZQXpmSixVQUFVOzs7O1lBRkYsZ0JBQWdCOzs7Ozs7O0lBS1QsaUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdyeGpzJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBMZWFmTm9kZSwgR3JvdXBOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS5hZGFwdGVyJztcbmltcG9ydCB7IE9ic0FkYXB0ZXJIZWxwZXIgfSBmcm9tICcuL29icy1hZGFwdGVyLWhlbHBlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPYnNWYWx1ZUFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWxwZXI6IE9ic0FkYXB0ZXJIZWxwZXIpIHsgfVxuXG4gICAgZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtOiBGb3JtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlbHBlci5nZXRPYnNOb2RlUGF5bG9hZChmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgLy8gVE9ETzogR2V0IHJpZCBvZiB0aGUgc2VjdGlvbiBiZWxvdyB3aGVuIHRoZSBoZWxwZXIgaXMgc3RhYmxlLlxuICAgICAgICAvLyAvLyBUcmF2ZXJzZSAgdG8gZ2V0IGFsbCBub2Rlc1xuICAgICAgICAvLyBsZXQgcGFnZXMgPSB0aGlzLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICAvLyAvLyBFeHRyYWN0IGFjdHVhbCBxdWVzdGlvbiBub2Rlc1xuICAgICAgICAvLyBsZXQgcXVlc3Rpb25Ob2RlcyA9IHRoaXMuZ2V0UXVlc3Rpb25Ob2RlcyhwYWdlcyk7XG4gICAgICAgIC8vIC8vIEdldCBvYnMgUGF5bG9hZFxuICAgICAgICAvLyByZXR1cm4gdGhpcy5nZXRPYnNQYXlsb2FkKHF1ZXN0aW9uTm9kZXMpO1xuICAgIH1cblxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMuaGVscGVyLnNldE5vZGVWYWx1ZShmb3JtLnJvb3ROb2RlLCBwYXlsb2FkKTtcblxuICAgICAgICAvLyBUT0RPOiBHZXQgcmlkIG9mIHRoZSBzZWN0aW9uIGJlbG93IHdoZW4gdGhlIGhlbHBlciBpcyBzdGFibGUuXG4gICAgICAgIC8vIC8vIFRyYXZlcnNlICB0byBnZXQgYWxsIG5vZGVzXG4gICAgICAgIC8vIGxldCBwYWdlcyA9IHRoaXMudHJhdmVyc2UoZm9ybS5yb290Tm9kZSk7XG4gICAgICAgIC8vIC8vIEV4dHJhY3QgYWN0dWFsIHF1ZXN0aW9uIG5vZGVzXG4gICAgICAgIC8vIGxldCBxdWVzdGlvbk5vZGVzID0gdGhpcy5nZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKTtcbiAgICAgICAgLy8gLy8gRXh0cmFjdCBzZXQgb2JzXG4gICAgICAgIC8vIHRoaXMuc2V0VmFsdWVzKHF1ZXN0aW9uTm9kZXMsIHBheWxvYWQpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IEdldCByaWQgb2YgYWxsIHRoZSBmdW5jdGlvbnMgYmVsb3cgYXMgdGhleSB3aWxsIG5vdCBiZSBuZWVkZWRcbiAgICAvLyBvbmNlIHRoZSBoZWxwZXIgaXMgc3RhYmxlXG5cbiAgICBzZXRWYWx1ZXMobm9kZXMsIHBheWxvYWQ/LCBmb3JjZWdyb3VwPykge1xuICAgICAgICBpZiAobm9kZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgTGVhZk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRPYnNWYWx1ZShub2RlLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmIG5vZGUuaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLnF1ZXN0aW9uICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzICYmIG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2dyb3VwJyB8fCBmb3JjZWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwT2JzID0gXy5maW5kKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvLmNvbmNlcHQudXVpZCA9PT0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgJiYgby5ncm91cE1lbWJlcnM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBPYnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVbJ2luaXRpYWxWYWx1ZSddID0gZ3JvdXBPYnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVzKG5vZGUuZ3JvdXBNZW1iZXJzLCBncm91cE9icy5ncm91cE1lbWJlcnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZWdyb3VwICYmIG5vZGUucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMobm9kZS5ncm91cE1lbWJlcnMsIG5vZGUucGF5bG9hZC5ncm91cE1lbWJlcnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29tcGxleE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJiBub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZXBlYXRpbmcnICYmICFmb3JjZWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVwZWF0aW5nR3JvdXBWYWx1ZXMobm9kZSwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgICAgICAgIChub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzJyB8fFxuICAgICAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdjb21wbGV4LW9icy1jaGlsZCcgJiZcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ3ZhbHVlJykpICYmXG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nICE9PSAnbXVsdGlDaGVja2JveCcgfHxcbiAgICAgICAgICAgIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgIT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8uY29uY2VwdC51dWlkID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG9icykge1xuICAgICAgICAgICAgICAgIGlmIChvYnMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG9icy52YWx1ZS51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUob2JzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZVsnaW5pdGlhbFZhbHVlJ10gPSB7IG9ic1V1aWQ6IG9icy51dWlkLCB2YWx1ZTogb2JzLnZhbHVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtdWx0aU9icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobXVsdGlPYnMgJiYgbXVsdGlPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZSh0aGlzLmdldE11bHRpc2VsZWN0VmFsdWVzKG11bHRpT2JzKSk7XG4gICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICBub2RlWydpbml0aWFsVmFsdWUnXSA9IG11bHRpT2JzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29tcGxleE9ic1ZhbHVlKG5vZGUsIHBheWxvYWQpIHtcbiAgICAgICAgbGV0IHZhbHVlRmllbGQ6IGFueTtcbiAgICAgICAgbGV0IGRhdGVGaWVsZDogYW55O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgobm9kZS5jaGlsZHJlbltvXSBhcyBMZWFmTm9kZSkucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9PT0gJ29ic0RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgIGRhdGVGaWVsZCA9IG5vZGUuY2hpbGRyZW5bb107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IHRoZSB1c3VhbCBvYnMgdmFsdWVcbiAgICAgICAgdGhpcy5zZXRPYnNWYWx1ZSh2YWx1ZUZpZWxkLCBwYXlsb2FkKTtcblxuICAgICAgICAvLyBzZXQgdGhlIG9icyBkYXRlXG4gICAgICAgIGNvbnN0IG9icyA9IF8uZmluZChwYXlsb2FkLCAobzogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAob2JzKSB7XG4gICAgICAgICAgICBkYXRlRmllbGRbJ2luaXRpYWxWYWx1ZSddID0geyBvYnNVdWlkOiBvYnMudXVpZCwgdmFsdWU6IG9icy5vYnNEYXRldGltZSB9O1xuICAgICAgICAgICAgKGRhdGVGaWVsZCBhcyBMZWFmTm9kZSkuY29udHJvbC5zZXRWYWx1ZShvYnMub2JzRGF0ZXRpbWUpO1xuICAgICAgICAgICAgKGRhdGVGaWVsZCBhcyBMZWFmTm9kZSkuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNdWx0aXNlbGVjdFZhbHVlcyhtdWx0aU9icykge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIG11bHRpT2JzKSB7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChtLnZhbHVlLnV1aWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgc2V0UmVwZWF0aW5nR3JvdXBWYWx1ZXMobm9kZSwgcGF5bG9hZCkge1xuICAgICAgICBjb25zdCBncm91cFJlcGVhdGluZ09icyA9IF8uZmlsdGVyKHBheWxvYWQsIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gby5jb25jZXB0LnV1aWQgPT09IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgICAgICAgICAgbGV0IGludGVyc2VjdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGZvdW5kICYmIG8uZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzID0gby5ncm91cE1lbWJlcnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmNvbmNlcHQudXVpZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYVF1ZXN0aW9ucyA9IG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zLm1hcCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpbnRlcnNlY3QgPSAoXy5pbnRlcnNlY3Rpb24ob2JzLCBzY2hlbWFRdWVzdGlvbnMpLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kICYmIGludGVyc2VjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChncm91cFJlcGVhdGluZ09icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBub2RlLm5vZGVbJ2luaXRpYWxWYWx1ZSddID0gZ3JvdXBSZXBlYXRpbmdPYnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwUmVwZWF0aW5nT2JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlLmNyZWF0ZUNoaWxkTm9kZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFtdO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUubm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBPYmplY3Qua2V5cyhjaGlsZC5jaGlsZHJlbikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNoaWxkLmNoaWxkcmVuW2tleV07IH0pO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkID0gZ3JvdXBSZXBlYXRpbmdPYnNbaW5kZXhdO1xuICAgICAgICAgICAgZ3JvdXBzLnB1c2goeyBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiBjaGlsZHJlbiwgcGF5bG9hZDogZ3JvdXBQYXlsb2FkIH0pO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFZhbHVlcyhncm91cHMsIGdyb3VwUmVwZWF0aW5nT2JzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRRdWVzdGlvbk5vZGVzKHBhZ2VzKSB7XG4gICAgICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgICAgICBjb25zdCBhcnJheXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgcGFnZS5wYWdlKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlzLnB1c2goc2VjdGlvbi5zZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbiAgICB9XG5cbiAgICByZXBlYXRpbmdHcm91cChub2Rlcykge1xuICAgICAgICBjb25zdCB0b1JldHVybiA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuLnB1c2goeyBxdWVzdGlvbjogbm9kZS5xdWVzdGlvbiwgZ3JvdXBNZW1iZXJzOiB0aGlzLnRyYXZlcnNlKG5vZGUpIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICB9XG5cbiAgICBwcm9jZXNzR3JvdXAob2JzLCBvYnNQYXlsb2FkKSB7XG4gICAgICAgIGlmIChvYnMucXVlc3Rpb24gJiYgb2JzLnF1ZXN0aW9uLmV4dHJhcyAmJiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdncm91cCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlcnMgPSBfLmZpbHRlcih0aGlzLmdldE9ic1BheWxvYWQob2JzLmdyb3VwTWVtYmVycyksIChvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby52YWx1ZSAhPT0gJyc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWFwcGVkTWVtYmVycyA9IG1lbWJlcnMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudm9pZGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobWVtYmVycy5sZW5ndGggPiAwICYmIG1hcHBlZE1lbWJlcnMuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiBvYnMubm9kZS5pbml0aWFsVmFsdWUudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChvYnMubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IG9icy5ub2RlLmluaXRpYWxWYWx1ZS51dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBtZW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jZXB0OiBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzOiBtZW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcEluaXRpYWxHcm91cChncm91cCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IG1lbWJlciBvZiBncm91cC5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gJyc7XG4gICAgICAgICAgICBpZiAobWVtYmVyLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtZW1iZXIudmFsdWUudXVpZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtYmVyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtZW1iZXIudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lbWJlci5ncm91cE1lbWJlcnMgJiYgbWVtYmVyLmdyb3VwTWVtYmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHRoaXMubWFwSW5pdGlhbEdyb3VwKGdyb3VwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRbbWVtYmVyLmNvbmNlcHQudXVpZCArICc6JyArIHZhbHVlXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cblxuICAgIG1hcE1vZGVsR3JvdXAobm9kZSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cFF1ZXN0aW9uOiBhbnkgPSBfLmZpbmQobm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMsIHsga2V5OiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWxWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsVmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbZ3JvdXBRdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgKyAnOidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgbW9kZWxWYWx1ZV0gPSBtb2RlbFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cblxuICAgIHByb2Nlc3NSZXBlYXRpbmdHcm91cHMobm9kZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBjb25zdCBpbml0aWFsVmFsdWVzID0gW107XG4gICAgICAgIGlmIChub2RlLm5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIG5vZGUubm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWVzLnB1c2goeyB1dWlkOiBncm91cC51dWlkLCB2YWx1ZTogdGhpcy5tYXBJbml0aWFsR3JvdXAoZ3JvdXApIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcGVhdGluZ01vZGVsID0gW107XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygbm9kZS5ub2RlLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIHJlcGVhdGluZ01vZGVsLnB1c2goeyB2YWx1ZTogdGhpcy5tYXBNb2RlbEdyb3VwKG5vZGUsIHZhbHVlKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZWxldGVkID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKGluaXRpYWxWYWx1ZXMsIHJlcGVhdGluZ01vZGVsKTtcbiAgICAgICAgY29uc3QgbmV3T2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKHJlcGVhdGluZ01vZGVsLCBpbml0aWFsVmFsdWVzKTtcbiAgICAgICAgY29uc3QgZ3JvdXBDb25jZXB0ID0gbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgICAgIGxldCBuZXdPYnNQYXlsb2FkID0gW107XG4gICAgICAgIGlmIChkZWxldGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZWRPYnMgPSB0aGlzLmNyZWF0ZUdyb3VwRGVsZXRlZE9icyhkZWxldGVkKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZCBvZiBkZWxldGVkT2JzKSB7XG4gICAgICAgICAgICAgICAgb2JzUGF5bG9hZC5wdXNoKGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld09icy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmV3T2JzUGF5bG9hZCA9IHRoaXMuY3JlYXRlR3JvdXBOZXdPYnMobmV3T2JzLCBncm91cENvbmNlcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3T2JzUGF5bG9hZCA9IHRoaXMuY3JlYXRlR3JvdXBOZXdPYnMobmV3T2JzLCBncm91cENvbmNlcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld09ic1BheWxvYWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwIG9mIG5ld09ic1BheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2gocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZWZ0T3V0ZXJKb2luQXJyYXlzKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgY29uc3QgdW5pcXVlID0gZmlyc3QuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiAhc2Vjb25kLnNvbWUoZnVuY3Rpb24gKG9iajIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc0VxdWFsKG9iai52YWx1ZSwgb2JqMi52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1bmlxdWU7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXBOZXdPYnMocGF5bG9hZCwgZ3JvdXBDb25jZXB0KSB7XG4gICAgICAgIGNvbnN0IG5ld1BheWxvYWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBvYnMgb2YgcGF5bG9hZCkge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBQYXlsb2FkID0gW107XG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIG9icy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBjb25jZXB0ID0ga2V5LnNwbGl0KCc6JylbMF07XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ga2V5LnNwbGl0KCc6JylbMV07XG4gICAgICAgICAgICAgICAgZ3JvdXBQYXlsb2FkLnB1c2goeyBjb25jZXB0OiBjb25jZXB0LCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdQYXlsb2FkLnB1c2goeyBjb25jZXB0OiBncm91cENvbmNlcHQsIGdyb3VwTWVtYmVyczogZ3JvdXBQYXlsb2FkIH0pXG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1BheWxvYWQ7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXBEZWxldGVkT2JzKHBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlZE9icyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGQgb2YgcGF5bG9hZCkge1xuICAgICAgICAgICAgZGVsZXRlZE9icy5wdXNoKHsgdXVpZDogZC51dWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlbGV0ZWRPYnM7XG4gICAgfVxuXG4gICAgZ2V0RXhhY3RUaW1lKGRhdGV0aW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRhdGV0aW1lLnN1YnN0cmluZygwLCAxOSkucmVwbGFjZSgnVCcsICcgJyk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc09icyhvYnMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgaWYgKG9icy5jb250cm9sICYmIG9icy5xdWVzdGlvbi5leHRyYXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9ic1ZhbHVlID0ge1xuICAgICAgICAgICAgICAgIGNvbmNlcHQ6IG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IChvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdkYXRlJyAmJiAhdGhpcy5pc0VtcHR5KG9icy5jb250cm9sLnZhbHVlKSkgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEV4YWN0VGltZShvYnMuY29udHJvbC52YWx1ZSkgOiBvYnMuY29udHJvbC52YWx1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKG9icy5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ211bHRpQ2hlY2tib3gnIHx8XG4gICAgICAgICAgICBvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXMgPSB0aGlzLnByb2Nlc3NNdWx0aVNlbGVjdChvYnMucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0LCBvYnMuY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9icy5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkSW5pdGlhbCA9IG9icy5pbml0aWFsVmFsdWUubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB1dWlkOiBhLnV1aWQsIHZhbHVlOiB7IGNvbmNlcHQ6IGEuY29uY2VwdC51dWlkLCB2YWx1ZTogYS52YWx1ZS51dWlkIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEN1cnJlbnQgPSBtdWx0aXMubWFwKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogYSB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlZE9icyA9IHRoaXMubGVmdE91dGVySm9pbkFycmF5cyhtYXBwZWRJbml0aWFsLCBtYXBwZWRDdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3T2JzID0gdGhpcy5sZWZ0T3V0ZXJKb2luQXJyYXlzKG1hcHBlZEN1cnJlbnQsIG1hcHBlZEluaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NEZWxldGVkTXVsdGlTZWxlY3RPYnMoZGVsZXRlZE9icywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc05ld011bHRpU2VsZWN0T2JzKG5ld09icywgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTmV3TXVsdGlTZWxlY3RPYnMobXVsdGlzLCBvYnNQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvYnMuaW5pdGlhbFZhbHVlICYmIG9icy5pbml0aWFsVmFsdWUudmFsdWUgJiYgb2JzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIG9icy5pbml0aWFsVmFsdWUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JzVmFsdWUudmFsdWUgIT09ICcnICYmIG9ic1ZhbHVlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChvYnNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NvbXBsZXhPYnMobm9kZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBsZXQgdmFsdWVGaWVsZDogYW55O1xuICAgICAgICBsZXQgZGF0ZUZpZWxkOiBhbnk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoKG5vZGUuY2hpbGRyZW5bb10gYXMgTGVhZk5vZGUpLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChub2RlLmNoaWxkcmVuW29dIGFzIExlYWZOb2RlKS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID09PSAnb2JzRGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgZGF0ZUZpZWxkID0gbm9kZS5jaGlsZHJlbltvXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZUZpZWxkKSB7XG4gICAgICAgICAgICAvLyBwcm9jZXNzIG9icyBhcyB1c3VhbFxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzT2JzKHZhbHVlRmllbGQsIG9ic1BheWxvYWQpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gdGhlIGxhc3QgaW5zZXJ0ZWQgb2JzIGFuZCBzZXQgdGhlIG9ic0RhdGV0aW1lXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkUGF5bG9hZCA9IG9ic1BheWxvYWQubGVuZ3RoID4gMCA/IG9ic1BheWxvYWRbb2JzUGF5bG9hZC5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChjcmVhdGVkUGF5bG9hZCAmJlxuICAgICAgICAgICAgICAgICgoY3JlYXRlZFBheWxvYWQuY29uY2VwdCAmJiBjcmVhdGVkUGF5bG9hZC5jb25jZXB0ID09PSBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlICYmIGNyZWF0ZWRQYXlsb2FkLnV1aWQgPT09IHZhbHVlRmllbGQuaW5pdGlhbFZhbHVlLm9ic1V1aWQpKSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlRmllbGQuaW5pdGlhbFZhbHVlICYmIGRhdGVGaWVsZC5jb250cm9sLnZhbHVlICE9PSBkYXRlRmllbGQuaW5pdGlhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRQYXlsb2FkLm9ic0RhdGV0aW1lID0gZGF0ZUZpZWxkLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0RlbGV0ZWRNdWx0aVNlbGVjdE9icyh2YWx1ZXMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IHZhbHVlLnV1aWQsIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NOZXdNdWx0aVNlbGVjdE9icyh2YWx1ZXMsIG9ic1BheWxvYWQpIHtcbiAgICAgICAgZm9yIChjb25zdCBtdWx0aSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChtdWx0aS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChtdWx0aS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaChtdWx0aSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVPclZvaWRPYnMob2JzVmFsdWUsIGluaXRpYWxWYWx1ZSwgb2JzUGF5bG9hZCkge1xuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KG9ic1ZhbHVlLnZhbHVlKSAmJiBpbml0aWFsVmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgIG9ic1BheWxvYWQucHVzaCh7IHV1aWQ6IGluaXRpYWxWYWx1ZS5vYnNVdWlkLCB2b2lkZWQ6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNFbXB0eShvYnNWYWx1ZS52YWx1ZSkgJiYgaW5pdGlhbFZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICBvYnNQYXlsb2FkLnB1c2goeyB1dWlkOiBpbml0aWFsVmFsdWUub2JzVXVpZCwgdmFsdWU6IG9ic1ZhbHVlLnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbXB0eSh2YWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8XG4gICAgICAgICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgLy8gfHwgdmFsdWUgPT09IFtdIHx8XG4gICAgICAgICAgICAvLyB2YWx1ZSA9PT0ge31cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdHJhdmVyc2UobywgdHlwZT8pIHtcbiAgICAgICAgY29uc3QgcXVlc3Rpb25zID0gW107XG4gICAgICAgIGlmIChvLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuZWQgPSB0aGlzLnJlcGVhdGluZ0dyb3VwKG8uY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvLmNoaWxkcmVuIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gby5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5jaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG8uY2hpbGRyZW5ba2V5XS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgcGFnZTogcGFnZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLnRyYXZlcnNlKG8uY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHsgc2VjdGlvbjogc2VjdGlvbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxcyA9IHRoaXMudHJhdmVyc2Uoby5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBub2RlOiBvLmNoaWxkcmVuW2tleV0sIHF1ZXN0aW9uOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogcXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcCA9IHRoaXMucmVwZWF0aW5nR3JvdXAoby5jaGlsZHJlbltrZXldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goeyBub2RlOiBvLmNoaWxkcmVuW2tleV0sIHF1ZXN0aW9uOiBvLmNoaWxkcmVuW2tleV0ucXVlc3Rpb24sIGdyb3VwTWVtYmVyczogcmVwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaChvLmNoaWxkcmVuW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgICB9XG5cbiAgICBwcm9jZXNzTXVsdGlTZWxlY3QoY29uY2VwdCwgdmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IG11bHRpU2VsZWN0T2JzID0gW107XG4gICAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9icyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogY29uY2VwdCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdE9icy5wdXNoKG9icyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG11bHRpU2VsZWN0T2JzO1xuICAgIH1cblxuXG4gICAgaXNPYnMobm9kZSkge1xuICAgICAgICByZXR1cm4gKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdvYnMnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnb2JzR3JvdXAnIHx8XG4gICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKTtcbiAgICB9XG5cbiAgICBnZXRPYnNQYXlsb2FkKG5vZGVzKSB7XG4gICAgICAgIGNvbnN0IG9ic1BheWxvYWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc09icyhub2RlKSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycywgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ2dyb3VwJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0dyb3VwKG5vZGUsIG9ic1BheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLmdyb3VwTWVtYmVycywgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ3JlcGVhdGluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmVwZWF0aW5nR3JvdXBzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSAmJiAobm9kZSBhcyBHcm91cE5vZGUpLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnY29tcGxleC1vYnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0NvbXBsZXhPYnMobm9kZSwgb2JzUGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzT2JzKG5vZGUsIG9ic1BheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JzUGF5bG9hZDtcbiAgICB9XG59XG4iXX0=