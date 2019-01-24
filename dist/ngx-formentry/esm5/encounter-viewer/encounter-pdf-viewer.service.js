/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ObsValueAdapter } from '../form-entry/value-adapters/obs.adapter';
import { EncounterViewerService } from './encounter-viewer.service';
import { DataSources } from '../form-entry/data-sources/data-sources';
import { combineLatest, BehaviorSubject } from 'rxjs';
import * as moment_ from 'moment';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as i0 from "@angular/core";
import * as i1 from "./encounter-viewer.service";
import * as i2 from "../form-entry/value-adapters/obs.adapter";
import * as i3 from "../form-entry/data-sources/data-sources";
/** @type {?} */
var moment = moment_;
var EncounterPdfViewerService = /** @class */ (function () {
    function EncounterPdfViewerService(encounterViewerService, obsValueAdapter, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.obsValueAdapter = obsValueAdapter;
        this.dataSources = dataSources;
        this.subscribedAnswers = {
            questions: {
                stack: []
            },
            answers: []
        };
    }
    /**
     * @param {?} pages
     * @param {?} form
     * @param {?=} remoteSelectsOnly
     * @param {?=} remoteAns
     * @return {?}
     */
    EncounterPdfViewerService.prototype.getPages = /**
     * @param {?} pages
     * @param {?} form
     * @param {?=} remoteSelectsOnly
     * @param {?=} remoteAns
     * @return {?}
     */
    function (pages, form, remoteSelectsOnly, remoteAns) {
        var e_1, _a, e_2, _b;
        /** @type {?} */
        var content = [];
        /** @type {?} */
        var remoteQuestions = [];
        try {
            for (var pages_1 = tslib_1.__values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                var page = pages_1_1.value;
                if (remoteSelectsOnly) {
                    remoteQuestions = remoteQuestions.concat(this.getSections(page.page, form, false, remoteAns));
                }
                else {
                    try {
                        for (var _c = tslib_1.__values(form.rootNode.question.questions), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var question = _d.value;
                            if (page.label === form.rootNode.children[question.key].question.label &&
                                this.encounterViewerService.questionsAnswered(form.rootNode.children[question.key])) {
                                content.push({
                                    style: 'tableExample',
                                    table: {
                                        widths: ['*'],
                                        headerRows: 1,
                                        keepWithHeaderRows: 1,
                                        body: [
                                            [{ text: page.label, style: 'tableHeader' }],
                                            [
                                                {
                                                    style: 'tableExample',
                                                    table: {
                                                        widths: ['*'],
                                                        body: this.getSections(page.page, form, true, remoteAns)
                                                    },
                                                    layout: 'noBorders',
                                                    margin: [5, 0, 0, 0]
                                                }
                                            ]
                                        ]
                                    },
                                    layout: {
                                        hLineWidth: function (i, node) {
                                            return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                                        },
                                        vLineWidth: function (i, node) {
                                            return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
                                        },
                                        hLineColor: function (i, node) {
                                            return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                                        },
                                        vLineColor: function (i, node) {
                                            return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                                        }
                                    }
                                });
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pages_1_1 && !pages_1_1.done && (_a = pages_1.return)) _a.call(pages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return remoteSelectsOnly ? remoteQuestions : content;
    };
    /**
     * @param {?} sections
     * @param {?} form
     * @param {?} resolve
     * @param {?} remoteAns
     * @return {?}
     */
    EncounterPdfViewerService.prototype.getSections = /**
     * @param {?} sections
     * @param {?} form
     * @param {?} resolve
     * @param {?} remoteAns
     * @return {?}
     */
    function (sections, form, resolve, remoteAns) {
        var _this = this;
        var e_3, _a, e_4, _b;
        /** @type {?} */
        var content = [];
        /** @type {?} */
        var answeredSections = [];
        /** @type {?} */
        var questions = [];
        sections.map(function (s) {
            if (_this.encounterViewerService.questionsAnswered(s.node)) {
                answeredSections.push(s);
            }
        });
        try {
            for (var answeredSections_1 = tslib_1.__values(answeredSections), answeredSections_1_1 = answeredSections_1.next(); !answeredSections_1_1.done; answeredSections_1_1 = answeredSections_1.next()) {
                var section = answeredSections_1_1.value;
                questions = questions.concat(this.getRemoteSectionData(section.section));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (answeredSections_1_1 && !answeredSections_1_1.done && (_a = answeredSections_1.return)) _a.call(answeredSections_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (resolve && remoteAns) {
            try {
                for (var answeredSections_2 = tslib_1.__values(answeredSections), answeredSections_2_1 = answeredSections_2.next(); !answeredSections_2_1.done; answeredSections_2_1 = answeredSections_2.next()) {
                    var section = answeredSections_2_1.value;
                    content.push([
                        {
                            table: {
                                widths: ['*'],
                                body: [
                                    [{ text: section.label, style: 'tableSubheader' }],
                                    [this.getSectionData(section.section, remoteAns, form)]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (answeredSections_2_1 && !answeredSections_2_1.done && (_b = answeredSections_2.return)) _b.call(answeredSections_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return content;
        }
        else {
            return questions;
        }
    };
    /**
     * @param {?} resolvedAnswer
     * @param {?} questions
     * @param {?=} node
     * @return {?}
     */
    EncounterPdfViewerService.prototype.appendResolvedAnswer = /**
     * @param {?} resolvedAnswer
     * @param {?} questions
     * @param {?=} node
     * @return {?}
     */
    function (resolvedAnswer, questions, node) {
        if (resolvedAnswer) {
            questions.stack.push({
                text: [
                    "" + ((node) ? node.question.label : 'Question label') + ((node) ? (node.question.label.indexOf(':') > 1 ? '' : ':') : '') + " ",
                    { text: "" + resolvedAnswer, bold: true }
                ], style: 'answers'
            });
        }
    };
    // get remote selects only
    // get remote selects only
    /**
     * @param {?} section
     * @return {?}
     */
    EncounterPdfViewerService.prototype.getRemoteSectionData = 
    // get remote selects only
    /**
     * @param {?} section
     * @return {?}
     */
    function (section) {
        var e_5, _a;
        /** @type {?} */
        var questions = [];
        this.subscribedAnswers.questions.stack = [];
        try {
            for (var section_1 = tslib_1.__values(section), section_1_1 = section_1.next(); !section_1_1.done; section_1_1 = section_1.next()) {
                var node = section_1_1.value;
                if (node.question.renderingType === 'remote-select') {
                    this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                    if (node.control.value !== '') {
                        if (this.remoteDataSource) {
                            questions.push(this.remoteDataSource.resolveSelectedValue(node.control.value));
                        }
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (section_1_1 && !section_1_1.done && (_a = section_1.return)) _a.call(section_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return questions;
    };
    // merge remote selects
    // merge remote selects
    /**
     * @param {?} section
     * @param {?} remoteAns
     * @param {?} form
     * @return {?}
     */
    EncounterPdfViewerService.prototype.getSectionData = 
    // merge remote selects
    /**
     * @param {?} section
     * @param {?} remoteAns
     * @param {?} form
     * @return {?}
     */
    function (section, remoteAns, form) {
        var e_6, _a;
        /** @type {?} */
        var questions = {
            stack: []
        };
        /** @type {?} */
        var resolvedAnswer = '';
        var _loop_1 = function (node) {
            var e_7, _a;
            switch (node.question.renderingType) {
                case 'group':
                    if (node.groupMembers) {
                        questions.stack.push(this_1.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'field-set':
                    if (node.children) {
                        /** @type {?} */
                        var groupMembers = [];
                        /** @type {?} */
                        var result = Object.keys(node.children).map(function (key) { return node.children[key]; });
                        if (result) {
                            groupMembers.push(result);
                            questions.stack.push(this_1.getSectionData(groupMembers[0], remoteAns, form));
                        }
                    }
                    break;
                case 'repeating':
                    if (node.groupMembers) {
                        questions.stack.push(this_1.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'remote-select':
                    this_1.remoteDataSource = this_1.dataSources.dataSources[node.question.dataSource];
                    try {
                        for (var remoteAns_1 = tslib_1.__values(remoteAns), remoteAns_1_1 = remoteAns_1.next(); !remoteAns_1_1.done; remoteAns_1_1 = remoteAns_1.next()) {
                            var ans = remoteAns_1_1.value;
                            if (ans.value === node.control.value) {
                                this_1.appendResolvedAnswer(ans.label, questions, node);
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (remoteAns_1_1 && !remoteAns_1_1.done && (_a = remoteAns_1.return)) _a.call(remoteAns_1);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    break;
                default:
                    /** @type {?} */
                    var answer = node.control.value;
                    resolvedAnswer = this_1.resolveValue(answer, form);
                    this_1.appendResolvedAnswer(resolvedAnswer, questions, node);
            }
        };
        var this_1 = this;
        try {
            for (var section_2 = tslib_1.__values(section), section_2_1 = section_2.next(); !section_2_1.done; section_2_1 = section_2.next()) {
                var node = section_2_1.value;
                _loop_1(node);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (section_2_1 && !section_2_1.done && (_a = section_2.return)) _a.call(section_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return questions;
    };
    /**
     * @param {?} answer
     * @param {?} form
     * @param {?=} arrayElement
     * @return {?}
     */
    EncounterPdfViewerService.prototype.resolveValue = /**
     * @param {?} answer
     * @param {?} form
     * @param {?=} arrayElement
     * @return {?}
     */
    function (answer, form, arrayElement) {
        var _this = this;
        if (answer !== '') {
            if (this.isUuid(answer)) {
                /** @type {?} */
                var val = this.encounterViewerService.resolveSelectedValueFromSchema(answer, form.schema);
                if (!arrayElement) {
                    if (val) {
                        return val.toUpperCase();
                    }
                    else {
                        return answer;
                    }
                }
                else {
                    return val;
                }
            }
            else if (_.isArray(answer)) {
                /** @type {?} */
                var arr_1 = [];
                _.forEach(answer, function (elem) {
                    arr_1.push(_this.resolveValue(elem, form, true));
                });
                return arr_1.toString();
            }
            else if (this.isDate(answer)) {
                if (!arrayElement) {
                    return this.encounterViewerService.convertTime(answer);
                }
                else {
                    return this.encounterViewerService.convertTime(answer);
                }
            }
            else if (typeof answer === 'object') {
                /** @type {?} */
                var values = [];
                /** @type {?} */
                var result = Object.keys(answer).map(function (key) { return [key, answer[key]]; });
                values.push(result);
                return values;
            }
            else {
                return answer;
            }
        }
    };
    /**
     * @param {?} form
     * @return {?}
     */
    EncounterPdfViewerService.prototype.generatePdfDefinition = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        /** @type {?} */
        var docDefinition$ = new BehaviorSubject({});
        /** @type {?} */
        var remoteSelects = this.getPages((this.obsValueAdapter.traverse(form.rootNode)), form, true);
        combineLatest(remoteSelects).subscribe(function (remoteAns) {
            if (remoteAns) {
                /** @type {?} */
                var docDefinition = {
                    content: _this.getPages(_this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
                    styles: {
                        answers: {
                            fontSize: 8
                        },
                        confidential: {
                            color: 'red',
                            fontSize: 8,
                            bold: true,
                            margin: [60, 0, 0, 0]
                        },
                        header: {
                            fontSize: 9,
                            bold: true,
                            margin: [5, 5, 5, 5]
                        },
                        tableExample: {
                            fontSize: 10,
                            margin: [5, 0, 0, 5]
                        },
                        tableHeader: {
                            fillColor: '#f5f5f5',
                            width: ['100%'],
                            borderColor: '#333',
                            fontSize: 9,
                            bold: true,
                            margin: [5, 0, 5, 0]
                        },
                        tableSubheader: {
                            fillColor: '#337ab7',
                            width: ['100%'],
                            fontSize: 9,
                            color: 'white',
                            margin: [5, 0, 5, 0]
                        },
                        banner: {
                            fillColor: '#d9edf7',
                            fontSize: 9,
                            bold: true,
                            margin: [45, 20, 20, 20]
                        },
                        bannerLabel: {
                            color: '#a9a9a9'
                        },
                        bannerItem: {
                            margin: [20, 0, 10, 0]
                        },
                        timestamp: {
                            alignment: 'center',
                            bold: true
                        },
                        pageNumber: {
                            alignment: 'right',
                            margin: [0, 0, 5, 5]
                        }
                    },
                    defaultStyle: {
                        fontSize: 7
                    }
                };
                docDefinition$.next(docDefinition);
            }
        });
        return docDefinition$;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    EncounterPdfViewerService.prototype.displayPdf = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        /** @type {?} */
        var pdf = pdfMake;
        /** @type {?} */
        var patient;
        pdf.vfs = pdfFonts.pdfMake.vfs;
        if (form.dataSourcesContainer.dataSources._dataSources) {
            patient = form.dataSourcesContainer.dataSources._dataSources['patientInfo'];
        }
        this.generatePdfDefinition(form).subscribe(function (docDefinition) {
            if (!(_.isEmpty(docDefinition))) {
                if (typeof patient !== 'undefined') {
                    /** @type {?} */
                    var banner = [];
                    if (patient.name) {
                        banner.push({
                            text: [
                                { text: 'Name: ', style: 'bannerLabel' },
                                { text: "" + _this.titleize(patient.name) }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.nid) {
                        banner.push({
                            text: [
                                { text: 'NID: ', style: 'bannerLabel' },
                                { text: "" + patient.nid }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.mui) {
                        banner.push({
                            text: [
                                { text: 'MUI: ', style: 'bannerLabel' },
                                { text: "" + patient.mui }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.birthdate) {
                        banner.push({
                            text: [
                                { text: 'YOB: ', style: 'bannerLabel' },
                                { text: moment(patient.birthdate).format('l') + " (" + patient.age + " yo)" }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    docDefinition.header = {
                        style: 'banner',
                        table: {
                            body: [banner]
                        },
                        layout: 'noBorders'
                    };
                }
                docDefinition.footer = function (currentPage, pageCount) {
                    return {
                        columns: [
                            {
                                widths: ['*', '*', '*'],
                                stack: [
                                    {
                                        text: 
                                        // tslint:disable-next-line:max-line-length
                                        "Note: Confidentiality is one of the core duties of all medical practitioners. Patients' personal health information should be kept private.",
                                        style: 'confidential'
                                    }, {
                                        text: currentPage.toString() + ' of ' + pageCount,
                                        style: 'pageNumber'
                                    }, {
                                        text: "Generated on " + new Date(),
                                        style: 'timestamp'
                                    }
                                ]
                            }
                        ]
                    };
                };
                /** @type {?} */
                var win = window.open('', '_blank');
                pdf.createPdf(docDefinition).open({}, win);
            }
        }, function (error) {
            console.log('Error: ', error);
        });
    };
    /**
     * @param {?} val
     * @return {?}
     */
    EncounterPdfViewerService.prototype.isDate = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return moment(val, moment.ISO_8601, true).isValid();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    EncounterPdfViewerService.prototype.isUuid = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1);
    };
    /**
     * @param {?} str
     * @return {?}
     */
    EncounterPdfViewerService.prototype.titleize = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/\w\S*/g, function (s) { return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase(); });
    };
    EncounterPdfViewerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    EncounterPdfViewerService.ctorParameters = function () { return [
        { type: EncounterViewerService },
        { type: ObsValueAdapter },
        { type: DataSources }
    ]; };
    /** @nocollapse */ EncounterPdfViewerService.ngInjectableDef = i0.defineInjectable({ factory: function EncounterPdfViewerService_Factory() { return new EncounterPdfViewerService(i0.inject(i1.EncounterViewerService), i0.inject(i2.ObsValueAdapter), i0.inject(i3.DataSources)); }, token: EncounterPdfViewerService, providedIn: "root" });
    return EncounterPdfViewerService;
}());
export { EncounterPdfViewerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    EncounterPdfViewerService.prototype.remoteDataSource;
    /** @type {?} */
    EncounterPdfViewerService.prototype.error;
    /** @type {?} */
    EncounterPdfViewerService.prototype.errorMessage;
    /** @type {?} */
    EncounterPdfViewerService.prototype.showLoader;
    /** @type {?} */
    EncounterPdfViewerService.prototype.subscribedAnswers;
    /**
     * @type {?}
     * @private
     */
    EncounterPdfViewerService.prototype.encounterViewerService;
    /**
     * @type {?}
     * @private
     */
    EncounterPdfViewerService.prototype.obsValueAdapter;
    /**
     * @type {?}
     * @private
     */
    EncounterPdfViewerService.prototype.dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUd0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd0RCxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssT0FBTyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxLQUFLLFFBQVEsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0lBRTlDLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBZ0JFLG1DQUNVLHNCQUE4QyxFQUM5QyxlQUFnQyxFQUNoQyxXQUF3QjtRQUZ4QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVYzQixzQkFBaUIsR0FBUTtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztJQU1DLENBQUM7Ozs7Ozs7O0lBRUosNENBQVE7Ozs7Ozs7SUFBUixVQUFTLEtBQVUsRUFBRSxJQUFVLEVBQUUsaUJB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Q3hDLGdEQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0nO1xuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS92YWx1ZS1hZGFwdGVycy9vYnMuYWRhcHRlcic7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBwZGZNYWtlIGZyb20gJ3BkZm1ha2UvYnVpbGQvcGRmbWFrZS5qcyc7XG5pbXBvcnQgJ3BkZm1ha2UvYnVpbGQvdmZzX2ZvbnRzLmpzJztcbmltcG9ydCAqIGFzIHBkZkZvbnRzIGZyb20gJ3BkZm1ha2UvYnVpbGQvdmZzX2ZvbnRzJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZW1vdGVEYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgZXJyb3I6IGJvb2xlYW47XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHNob3dMb2FkZXI6IGJvb2xlYW47XG4gIHB1YmxpYyBzdWJzY3JpYmVkQW5zd2VyczogYW55ID0ge1xuICAgIHF1ZXN0aW9uczoge1xuICAgICAgc3RhY2s6IFtdXG4gICAgfSxcbiAgICBhbnN3ZXJzOiBbXVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZW5jb3VudGVyVmlld2VyU2VydmljZTogRW5jb3VudGVyVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIG9ic1ZhbHVlQWRhcHRlcjogT2JzVmFsdWVBZGFwdGVyLFxuICAgIHByaXZhdGUgZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VzXG4gICkge31cblxuICBnZXRQYWdlcyhwYWdlczogYW55LCBmb3JtOiBGb3JtLCByZW1vdGVTZWxlY3RzT25seT86IGJvb2xlYW4sIHJlbW90ZUFucz86IGFueSk6IGFueVtdIHtcbiAgICBjb25zdCBjb250ZW50ID0gW107XG4gICAgbGV0IHJlbW90ZVF1ZXN0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICBpZiAocmVtb3RlU2VsZWN0c09ubHkpIHtcbiAgICAgICAgcmVtb3RlUXVlc3Rpb25zID0gcmVtb3RlUXVlc3Rpb25zLmNvbmNhdCh0aGlzLmdldFNlY3Rpb25zKHBhZ2UucGFnZSwgZm9ybSwgZmFsc2UsIHJlbW90ZUFucykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBxdWVzdGlvbiBvZiBmb3JtLnJvb3ROb2RlLnF1ZXN0aW9uLnF1ZXN0aW9ucykge1xuICAgICAgICAgIGlmIChwYWdlLmxhYmVsID09PSBmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0ucXVlc3Rpb24ubGFiZWwgJiZcbiAgICAgICAgICAgIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChmb3JtLnJvb3ROb2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV0pKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goe1xuICAgICAgICAgICAgICBzdHlsZTogJ3RhYmxlRXhhbXBsZScsXG4gICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxuICAgICAgICAgICAgICAgIGtlZXBXaXRoSGVhZGVyUm93czogMSxcbiAgICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgICBbeyB0ZXh0OiBwYWdlLmxhYmVsLCBzdHlsZTogJ3RhYmxlSGVhZGVyJyB9XSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGFibGVFeGFtcGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMuZ2V0U2VjdGlvbnMocGFnZS5wYWdlLCBmb3JtLCB0cnVlLCByZW1vdGVBbnMpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnLFxuICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDAsIDBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgIGhMaW5lV2lkdGg6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoKSA/IDAuNSA6IDAuNTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZMaW5lV2lkdGg6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLndpZHRocy5sZW5ndGgpID8gMC41IDogMC41O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaExpbmVDb2xvcjogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gJyNkZGQnIDogJyNkZGQnO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdkxpbmVDb2xvcjogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gJyNkZGQnIDogJyNkZGQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZW1vdGVTZWxlY3RzT25seSA/IHJlbW90ZVF1ZXN0aW9ucyA6IGNvbnRlbnQ7XG4gIH1cblxuICBnZXRTZWN0aW9ucyhzZWN0aW9uczogYW55LCBmb3JtOiBGb3JtLCByZXNvbHZlOiBhbnksIHJlbW90ZUFuczogYW55KTogYW55W10ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBbXTtcbiAgICBjb25zdCBhbnN3ZXJlZFNlY3Rpb25zID0gW107XG4gICAgbGV0IHF1ZXN0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuXG4gICAgc2VjdGlvbnMubWFwKHMgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChzLm5vZGUpKSB7XG4gICAgICAgIGFuc3dlcmVkU2VjdGlvbnMucHVzaChzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBhbnN3ZXJlZFNlY3Rpb25zKSB7XG4gICAgICBxdWVzdGlvbnMgPSBxdWVzdGlvbnMuY29uY2F0KHRoaXMuZ2V0UmVtb3RlU2VjdGlvbkRhdGEoc2VjdGlvbi5zZWN0aW9uKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc29sdmUgJiYgcmVtb3RlQW5zKSB7XG4gICAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgYW5zd2VyZWRTZWN0aW9ucykge1xuICAgICAgICBjb250ZW50LnB1c2goW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXG4gICAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgICBbeyB0ZXh0OiBzZWN0aW9uLmxhYmVsLCBzdHlsZTogJ3RhYmxlU3ViaGVhZGVyJyB9XSxcbiAgICAgICAgICAgICAgICBbIHRoaXMuZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbi5zZWN0aW9uLCByZW1vdGVBbnMsIGZvcm0pIF1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcbiAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxuICB9XG5cbiAgYXBwZW5kUmVzb2x2ZWRBbnN3ZXIocmVzb2x2ZWRBbnN3ZXI6IGFueSwgcXVlc3Rpb25zOiBhbnksIG5vZGU/OiBhbnkpIHtcbiAgICBpZiAocmVzb2x2ZWRBbnN3ZXIpIHtcbiAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHtcbiAgICAgICAgdGV4dDogW1xuICAgICAgICAgIGAkeyhub2RlKSA/IG5vZGUucXVlc3Rpb24ubGFiZWwgOiAnUXVlc3Rpb24gbGFiZWwnIH0ke1xuICAgICAgICAgICAgKG5vZGUpID8gKG5vZGUucXVlc3Rpb24ubGFiZWwuaW5kZXhPZignOicpID4gMSA/ICcnIDogJzonKSA6ICcnXG4gICAgICAgICAgfSBgLFxuICAgICAgICAgIHsgdGV4dDogYCR7cmVzb2x2ZWRBbnN3ZXJ9YCwgYm9sZDogdHJ1ZSB9XG4gICAgICAgIF0sIHN0eWxlOiAnYW5zd2VycydcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGdldCByZW1vdGUgc2VsZWN0cyBvbmx5XG4gIGdldFJlbW90ZVNlY3Rpb25EYXRhKHNlY3Rpb246IGFueSk6IGFueSB7XG4gICAgY29uc3QgcXVlc3Rpb25zOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG4gICAgdGhpcy5zdWJzY3JpYmVkQW5zd2Vycy5xdWVzdGlvbnMuc3RhY2sgPSBbXTtcblxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBzZWN0aW9uKSB7XG4gICAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncmVtb3RlLXNlbGVjdCcpIHtcbiAgICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1tub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgICBpZiAobm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgIGlmICh0aGlzLnJlbW90ZURhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHRoaXMucmVtb3RlRGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZShub2RlLmNvbnRyb2wudmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxuXG4gIC8vIG1lcmdlIHJlbW90ZSBzZWxlY3RzXG4gIGdldFNlY3Rpb25EYXRhKHNlY3Rpb246IGFueSwgcmVtb3RlQW5zOiBhbnlbXSwgZm9ybTogRm9ybSk6IGFueSB7XG4gICAgY29uc3QgcXVlc3Rpb25zID0ge1xuICAgICAgc3RhY2s6IFtdXG4gICAgfTtcblxuICAgIGxldCByZXNvbHZlZEFuc3dlciA9ICcnO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHNlY3Rpb24pIHtcbiAgICAgIHN3aXRjaCAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHRoaXMuZ2V0U2VjdGlvbkRhdGEobm9kZS5ncm91cE1lbWJlcnMsIHJlbW90ZUFucywgZm9ybSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmaWVsZC1zZXQnOlxuICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cE1lbWJlcnMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5rZXlzKG5vZGUuY2hpbGRyZW4pLm1hcCgoa2V5KSA9PiBub2RlLmNoaWxkcmVuW2tleV0pO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGdyb3VwTWVtYmVycy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHRoaXMuZ2V0U2VjdGlvbkRhdGEoZ3JvdXBNZW1iZXJzWzBdLCByZW1vdGVBbnMsIGZvcm0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgICBpZiAobm9kZS5ncm91cE1lbWJlcnMpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5zdGFjay5wdXNoKHRoaXMuZ2V0U2VjdGlvbkRhdGEobm9kZS5ncm91cE1lbWJlcnMsIHJlbW90ZUFucywgZm9ybSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZW1vdGUtc2VsZWN0JzpcbiAgICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW25vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAgICAgZm9yIChjb25zdCBhbnMgb2YgcmVtb3RlQW5zKSB7XG4gICAgICAgICAgICBpZiAoYW5zLnZhbHVlID09PSBub2RlLmNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5hcHBlbmRSZXNvbHZlZEFuc3dlcihhbnMubGFiZWwsIHF1ZXN0aW9ucywgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc3QgYW5zd2VyID0gbm9kZS5jb250cm9sLnZhbHVlO1xuICAgICAgICAgIHJlc29sdmVkQW5zd2VyID0gdGhpcy5yZXNvbHZlVmFsdWUoYW5zd2VyLCBmb3JtKTtcbiAgICAgICAgICB0aGlzLmFwcGVuZFJlc29sdmVkQW5zd2VyKHJlc29sdmVkQW5zd2VyLCBxdWVzdGlvbnMsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICByZXNvbHZlVmFsdWUoYW5zd2VyOiBhbnksIGZvcm06IEZvcm0sIGFycmF5RWxlbWVudD86IGJvb2xlYW4pOiBhbnkge1xuICAgIGlmIChhbnN3ZXIgIT09ICcnKSB7XG4gICAgICBpZiAodGhpcy5pc1V1aWQoYW5zd2VyKSkge1xuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlciwgZm9ybS5zY2hlbWEpO1xuICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xuICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoYW5zd2VyKSkge1xuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgXy5mb3JFYWNoKGFuc3dlciwgZWxlbSA9PiB7XG4gICAgICAgICAgYXJyLnB1c2godGhpcy5yZXNvbHZlVmFsdWUoZWxlbSwgZm9ybSwgdHJ1ZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFyci50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZShhbnN3ZXIpKSB7XG4gICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5jb252ZXJ0VGltZShhbnN3ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuY29udmVydFRpbWUoYW5zd2VyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYW5zd2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmtleXMoYW5zd2VyKS5tYXAoKGtleSkgPT4gW2tleSwgYW5zd2VyW2tleV1dKTtcblxuICAgICAgICB2YWx1ZXMucHVzaChyZXN1bHQpO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlUGRmRGVmaW5pdGlvbihmb3JtOiBGb3JtKTogYW55IHtcbiAgICBjb25zdCBkb2NEZWZpbml0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55Pih7fSk7XG4gICAgY29uc3QgcmVtb3RlU2VsZWN0cyA9IHRoaXMuZ2V0UGFnZXMoKHRoaXMub2JzVmFsdWVBZGFwdGVyLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpKSwgZm9ybSwgdHJ1ZSk7XG5cbiAgICBjb21iaW5lTGF0ZXN0KHJlbW90ZVNlbGVjdHMpLnN1YnNjcmliZShyZW1vdGVBbnMgPT4ge1xuICAgICAgaWYgKHJlbW90ZUFucykge1xuICAgICAgICBjb25zdCBkb2NEZWZpbml0aW9uID0ge1xuICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuZ2V0UGFnZXModGhpcy5vYnNWYWx1ZUFkYXB0ZXIudHJhdmVyc2UoZm9ybS5yb290Tm9kZSksIGZvcm0sIGZhbHNlLCByZW1vdGVBbnMpLFxuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYW5zd2Vyczoge1xuICAgICAgICAgICAgICBmb250U2l6ZTogOFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZGVudGlhbDoge1xuICAgICAgICAgICAgICBjb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs2MCwgMCwgMCwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDUsIDUsIDVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFibGVFeGFtcGxlOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAxMCxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgMCwgNV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZUhlYWRlcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjZjVmNWY1JyxcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyMzMzMnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgNSwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZVN1YmhlYWRlcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjMzM3YWI3JyxcbiAgICAgICAgICAgICAgd2lkdGg6IFsnMTAwJSddLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDUsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFubmVyOiB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogJyNkOWVkZjcnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNDUsIDIwLCAyMCwgMjBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFubmVyTGFiZWw6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjYTlhOWE5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhbm5lckl0ZW06IHtcbiAgICAgICAgICAgICAgbWFyZ2luOiBbMjAsIDAsIDEwLCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDoge1xuICAgICAgICAgICAgICBhbGlnbm1lbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBib2xkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnZU51bWJlcjoge1xuICAgICAgICAgICAgICBhbGlnbm1lbnQ6ICdyaWdodCcsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzAsIDAsIDUsIDVdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZWZhdWx0U3R5bGU6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiA3XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2NEZWZpbml0aW9uJC5uZXh0KGRvY0RlZmluaXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRvY0RlZmluaXRpb24kO1xuICB9XG5cbiAgZGlzcGxheVBkZihmb3JtKSB7XG4gICAgY29uc3QgcGRmID0gcGRmTWFrZTtcbiAgICBsZXQgcGF0aWVudDtcbiAgICBwZGYudmZzID0gcGRmRm9udHMucGRmTWFrZS52ZnM7XG4gICAgXG4gICAgaWYgKGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMuX2RhdGFTb3VyY2VzKSB7XG4gICAgICBwYXRpZW50ID0gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5fZGF0YVNvdXJjZXNbJ3BhdGllbnRJbmZvJ107XG4gICAgfVxuXG4gICAgdGhpcy5nZW5lcmF0ZVBkZkRlZmluaXRpb24oZm9ybSkuc3Vic2NyaWJlKGRvY0RlZmluaXRpb24gPT4ge1xuICAgICAgaWYgKCEoXy5pc0VtcHR5KGRvY0RlZmluaXRpb24pKSkge1xuICAgICAgICBpZiAodHlwZW9mIHBhdGllbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29uc3QgYmFubmVyID0gW107XG5cbiAgICAgICAgICBpZiAocGF0aWVudC5uYW1lKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdOYW1lOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7dGhpcy50aXRsZWl6ZShwYXRpZW50Lm5hbWUpfWAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGlmIChwYXRpZW50Lm5pZCkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTklEOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7cGF0aWVudC5uaWR9YCB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKHBhdGllbnQubXVpKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdNVUk6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm11aX1gIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBpZiAocGF0aWVudC5iaXJ0aGRhdGUpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnWU9COiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IGAke21vbWVudChwYXRpZW50LmJpcnRoZGF0ZSkuZm9ybWF0KCdsJyl9ICgke3BhdGllbnQuYWdlfSB5bylgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGRvY0RlZmluaXRpb24uaGVhZGVyID0ge1xuICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXInLFxuICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgYm9keTogWyBiYW5uZXIgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jRGVmaW5pdGlvbi5mb290ZXIgPSAoY3VycmVudFBhZ2UsIHBhZ2VDb3VudCkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aWR0aHM6IFsnKicsICcqJywgJyonXSxcbiAgICAgICAgICAgICAgICBzdGFjazogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICBgTm90ZTogQ29uZmlkZW50aWFsaXR5IGlzIG9uZSBvZiB0aGUgY29yZSBkdXRpZXMgb2YgYWxsIG1lZGljYWwgcHJhY3RpdGlvbmVycy4gUGF0aWVudHMnIHBlcnNvbmFsIGhlYWx0aCBpbmZvcm1hdGlvbiBzaG91bGQgYmUga2VwdCBwcml2YXRlLmAsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY29uZmlkZW50aWFsJ1xuICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjdXJyZW50UGFnZS50b1N0cmluZygpICsgJyBvZiAnICsgcGFnZUNvdW50LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3BhZ2VOdW1iZXInXG4gICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGBHZW5lcmF0ZWQgb24gYCArIG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGltZXN0YW1wJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgd2luID0gd2luZG93Lm9wZW4oJycsICdfYmxhbmsnKTtcbiAgICAgICAgcGRmLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKHt9LCB3aW4pO1xuICAgICAgfVxuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBpc0RhdGUodmFsOiBhbnkpIHtcbiAgICByZXR1cm4gbW9tZW50KHZhbCwgbW9tZW50LklTT184NjAxLCB0cnVlKS5pc1ZhbGlkKCk7XG4gIH1cblxuICBpc1V1aWQodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoID09PSAzNiAmJiB2YWx1ZS5pbmRleE9mKCcgJykgPT09IC0xICYmIHZhbHVlLmluZGV4T2YoJy4nKSA9PT0gLTEpO1xuICB9XG5cbiAgdGl0bGVpemUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHdcXFMqL2csIHMgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCkpO1xuICB9XG59XG4iXX0=