/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const moment = moment_;
export class EncounterPdfViewerService {
    /**
     * @param {?} encounterViewerService
     * @param {?} obsValueAdapter
     * @param {?} dataSources
     */
    constructor(encounterViewerService, obsValueAdapter, dataSources) {
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
    getPages(pages, form, remoteSelectsOnly, remoteAns) {
        /** @type {?} */
        const content = [];
        /** @type {?} */
        let remoteQuestions = [];
        for (const page of pages) {
            if (remoteSelectsOnly) {
                remoteQuestions = remoteQuestions.concat(this.getSections(page.page, form, false, remoteAns));
            }
            else {
                for (const question of form.rootNode.question.questions) {
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
        }
        return remoteSelectsOnly ? remoteQuestions : content;
    }
    /**
     * @param {?} sections
     * @param {?} form
     * @param {?} resolve
     * @param {?} remoteAns
     * @return {?}
     */
    getSections(sections, form, resolve, remoteAns) {
        /** @type {?} */
        const content = [];
        /** @type {?} */
        const answeredSections = [];
        /** @type {?} */
        let questions = [];
        sections.map(s => {
            if (this.encounterViewerService.questionsAnswered(s.node)) {
                answeredSections.push(s);
            }
        });
        for (const section of answeredSections) {
            questions = questions.concat(this.getRemoteSectionData(section.section));
        }
        if (resolve && remoteAns) {
            for (const section of answeredSections) {
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
            return content;
        }
        else {
            return questions;
        }
    }
    /**
     * @param {?} resolvedAnswer
     * @param {?} questions
     * @param {?=} node
     * @return {?}
     */
    appendResolvedAnswer(resolvedAnswer, questions, node) {
        if (resolvedAnswer) {
            questions.stack.push({
                text: [
                    `${(node) ? node.question.label : 'Question label'}${(node) ? (node.question.label.indexOf(':') > 1 ? '' : ':') : ''} `,
                    { text: `${resolvedAnswer}`, bold: true }
                ], style: 'answers'
            });
        }
    }
    // get remote selects only
    /**
     * @param {?} section
     * @return {?}
     */
    getRemoteSectionData(section) {
        /** @type {?} */
        const questions = [];
        this.subscribedAnswers.questions.stack = [];
        for (const node of section) {
            if (node.question.renderingType === 'remote-select') {
                this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                if (node.control.value !== '') {
                    if (this.remoteDataSource) {
                        questions.push(this.remoteDataSource.resolveSelectedValue(node.control.value));
                    }
                }
            }
        }
        return questions;
    }
    // merge remote selects
    /**
     * @param {?} section
     * @param {?} remoteAns
     * @param {?} form
     * @return {?}
     */
    getSectionData(section, remoteAns, form) {
        /** @type {?} */
        const questions = {
            stack: []
        };
        /** @type {?} */
        let resolvedAnswer = '';
        for (const node of section) {
            switch (node.question.renderingType) {
                case 'group':
                    if (node.groupMembers) {
                        questions.stack.push(this.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'field-set':
                    if (node.children) {
                        /** @type {?} */
                        const groupMembers = [];
                        /** @type {?} */
                        const result = Object.keys(node.children).map((key) => node.children[key]);
                        if (result) {
                            groupMembers.push(result);
                            questions.stack.push(this.getSectionData(groupMembers[0], remoteAns, form));
                        }
                    }
                    break;
                case 'repeating':
                    if (node.groupMembers) {
                        questions.stack.push(this.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'remote-select':
                    this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                    for (const ans of remoteAns) {
                        if (ans.value === node.control.value) {
                            this.appendResolvedAnswer(ans.label, questions, node);
                        }
                    }
                    break;
                default:
                    /** @type {?} */
                    const answer = node.control.value;
                    resolvedAnswer = this.resolveValue(answer, form);
                    this.appendResolvedAnswer(resolvedAnswer, questions, node);
            }
        }
        return questions;
    }
    /**
     * @param {?} answer
     * @param {?} form
     * @param {?=} arrayElement
     * @return {?}
     */
    resolveValue(answer, form, arrayElement) {
        if (answer !== '') {
            if (this.isUuid(answer)) {
                /** @type {?} */
                const val = this.encounterViewerService.resolveSelectedValueFromSchema(answer, form.schema);
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
                const arr = [];
                _.forEach(answer, elem => {
                    arr.push(this.resolveValue(elem, form, true));
                });
                return arr.toString();
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
                const values = [];
                /** @type {?} */
                const result = Object.keys(answer).map((key) => [key, answer[key]]);
                values.push(result);
                return values;
            }
            else {
                return answer;
            }
        }
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generatePdfDefinition(form) {
        /** @type {?} */
        const docDefinition$ = new BehaviorSubject({});
        /** @type {?} */
        const remoteSelects = this.getPages((this.obsValueAdapter.traverse(form.rootNode)), form, true);
        combineLatest(remoteSelects).subscribe(remoteAns => {
            if (remoteAns) {
                /** @type {?} */
                const docDefinition = {
                    content: this.getPages(this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
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
    }
    /**
     * @param {?} form
     * @return {?}
     */
    displayPdf(form) {
        /** @type {?} */
        const pdf = pdfMake;
        /** @type {?} */
        let patient;
        pdf.vfs = pdfFonts.pdfMake.vfs;
        if (form.dataSourcesContainer.dataSources._dataSources) {
            patient = form.dataSourcesContainer.dataSources._dataSources['patientInfo'];
        }
        this.generatePdfDefinition(form).subscribe(docDefinition => {
            if (!(_.isEmpty(docDefinition))) {
                if (typeof patient !== 'undefined') {
                    /** @type {?} */
                    const banner = [];
                    if (patient.name) {
                        banner.push({
                            text: [
                                { text: 'Name: ', style: 'bannerLabel' },
                                { text: `${this.titleize(patient.name)}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.nid) {
                        banner.push({
                            text: [
                                { text: 'NID: ', style: 'bannerLabel' },
                                { text: `${patient.nid}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.mui) {
                        banner.push({
                            text: [
                                { text: 'MUI: ', style: 'bannerLabel' },
                                { text: `${patient.mui}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.birthdate) {
                        banner.push({
                            text: [
                                { text: 'YOB: ', style: 'bannerLabel' },
                                { text: `${moment(patient.birthdate).format('l')} (${patient.age} yo)` }
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
                docDefinition.footer = (currentPage, pageCount) => {
                    return {
                        columns: [
                            {
                                widths: ['*', '*', '*'],
                                stack: [
                                    {
                                        text: 
                                        // tslint:disable-next-line:max-line-length
                                        `Note: Confidentiality is one of the core duties of all medical practitioners. Patients' personal health information should be kept private.`,
                                        style: 'confidential'
                                    }, {
                                        text: currentPage.toString() + ' of ' + pageCount,
                                        style: 'pageNumber'
                                    }, {
                                        text: `Generated on ` + new Date(),
                                        style: 'timestamp'
                                    }
                                ]
                            }
                        ]
                    };
                };
                /** @type {?} */
                const win = window.open('', '_blank');
                pdf.createPdf(docDefinition).open({}, win);
            }
        }, (error) => {
            console.log('Error: ', error);
        });
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isDate(val) {
        return moment(val, moment.ISO_8601, true).isValid();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isUuid(value) {
        return (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    titleize(str) {
        return str.replace(/\w\S*/g, s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase());
    }
}
EncounterPdfViewerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
EncounterPdfViewerService.ctorParameters = () => [
    { type: EncounterViewerService },
    { type: ObsValueAdapter },
    { type: DataSources }
];
/** @nocollapse */ EncounterPdfViewerService.ngInjectableDef = i0.defineInjectable({ factory: function EncounterPdfViewerService_Factory() { return new EncounterPdfViewerService(i0.inject(i1.EncounterViewerService), i0.inject(i2.ObsValueAdapter), i0.inject(i3.DataSources)); }, token: EncounterPdfViewerService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBR3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3RELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEtBQUssUUFBUSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7TUFFOUMsTUFBTSxHQUFHLE9BQU87QUFNdEIsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7O0lBWXBDLFlBQ1Usc0JBQThDLEVBQzlDLGVBQWdDLEVBQ2hDLFdBQXdCO1FBRnhCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVjNCLHNCQUFpQixHQUFRO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsRUFBRTthQUNWO1lBQ0QsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO0lBTUMsQ0FBQzs7Ozs7Ozs7SUFFSixRQUFRLENBQUMsS0FBVSxFQUFFLElBQVUs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QztJQUN6RixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxHQUFHO1FBQ1YsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7OztZQTVaRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFqQlEsc0JBQXNCO1lBRHRCLGVBQWU7WUFFZixXQUFXOzs7Ozs7OztJQW1CbEIscURBQXFDOztJQUNyQywwQ0FBc0I7O0lBQ3RCLGlEQUE0Qjs7SUFDNUIsK0NBQTJCOztJQUMzQixzREFLRTs7Ozs7SUFHQSwyREFBc0Q7Ozs7O0lBQ3RELG9EQUF3Qzs7Ozs7SUFDeEMsZ0RBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBPYnNWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL29icy5hZGFwdGVyJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5cbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIHBkZk1ha2UgZnJvbSAncGRmbWFrZS9idWlsZC9wZGZtYWtlLmpzJztcbmltcG9ydCAncGRmbWFrZS9idWlsZC92ZnNfZm9udHMuanMnO1xuaW1wb3J0ICogYXMgcGRmRm9udHMgZnJvbSAncGRmbWFrZS9idWlsZC92ZnNfZm9udHMnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuZXhwb3J0IGNsYXNzIEVuY291bnRlclBkZlZpZXdlclNlcnZpY2Uge1xuICBwcml2YXRlIHJlbW90ZURhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIHB1YmxpYyBlcnJvcjogYm9vbGVhbjtcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBwdWJsaWMgc2hvd0xvYWRlcjogYm9vbGVhbjtcbiAgcHVibGljIHN1YnNjcmliZWRBbnN3ZXJzOiBhbnkgPSB7XG4gICAgcXVlc3Rpb25zOiB7XG4gICAgICBzdGFjazogW11cbiAgICB9LFxuICAgIGFuc3dlcnM6IFtdXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlOiBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgb2JzVmFsdWVBZGFwdGVyOiBPYnNWYWx1ZUFkYXB0ZXIsXG4gICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXNcbiAgKSB7fVxuXG4gIGdldFBhZ2VzKHBhZ2VzOiBhbnksIGZvcm06IEZvcm0sIHJlbW90ZVNlbGVjdHNPbmx5PzogYm9vbGVhbiwgcmVtb3RlQW5zPzogYW55KTogYW55W10ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBbXTtcbiAgICBsZXQgcmVtb3RlUXVlc3Rpb25zID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgIGlmIChyZW1vdGVTZWxlY3RzT25seSkge1xuICAgICAgICByZW1vdGVRdWVzdGlvbnMgPSByZW1vdGVRdWVzdGlvbnMuY29uY2F0KHRoaXMuZ2V0U2VjdGlvbnMocGFnZS5wYWdlLCBmb3JtLCBmYWxzZSwgcmVtb3RlQW5zKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHF1ZXN0aW9uIG9mIGZvcm0ucm9vdE5vZGUucXVlc3Rpb24ucXVlc3Rpb25zKSB7XG4gICAgICAgICAgaWYgKHBhZ2UubGFiZWwgPT09IGZvcm0ucm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XS5xdWVzdGlvbi5sYWJlbCAmJlxuICAgICAgICAgICAgdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnF1ZXN0aW9uc0Fuc3dlcmVkKGZvcm0ucm9vdE5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XSkpIHtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaCh7XG4gICAgICAgICAgICAgIHN0eWxlOiAndGFibGVFeGFtcGxlJyxcbiAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxuICAgICAgICAgICAgICAgIGhlYWRlclJvd3M6IDEsXG4gICAgICAgICAgICAgICAga2VlcFdpdGhIZWFkZXJSb3dzOiAxLFxuICAgICAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgICAgIFt7IHRleHQ6IHBhZ2UubGFiZWwsIHN0eWxlOiAndGFibGVIZWFkZXInIH1dLFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICd0YWJsZUV4YW1wbGUnLFxuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogdGhpcy5nZXRTZWN0aW9ucyhwYWdlLnBhZ2UsIGZvcm0sIHRydWUsIHJlbW90ZUFucylcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycycsXG4gICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgMCwgMF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgaExpbmVXaWR0aDogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGgpID8gMC41IDogMC41O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdkxpbmVXaWR0aDogZnVuY3Rpb24oaSwgbm9kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUud2lkdGhzLmxlbmd0aCkgPyAwLjUgOiAwLjU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoTGluZUNvbG9yOiBmdW5jdGlvbihpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS5ib2R5Lmxlbmd0aCkgPyAnI2RkZCcgOiAnI2RkZCc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2TGluZUNvbG9yOiBmdW5jdGlvbihpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS5ib2R5Lmxlbmd0aCkgPyAnI2RkZCcgOiAnI2RkZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbW90ZVNlbGVjdHNPbmx5ID8gcmVtb3RlUXVlc3Rpb25zIDogY29udGVudDtcbiAgfVxuXG4gIGdldFNlY3Rpb25zKHNlY3Rpb25zOiBhbnksIGZvcm06IEZvcm0sIHJlc29sdmU6IGFueSwgcmVtb3RlQW5zOiBhbnkpOiBhbnlbXSB7XG4gICAgY29uc3QgY29udGVudCA9IFtdO1xuICAgIGNvbnN0IGFuc3dlcmVkU2VjdGlvbnMgPSBbXTtcbiAgICBsZXQgcXVlc3Rpb25zOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG5cbiAgICBzZWN0aW9ucy5tYXAocyA9PiB7XG4gICAgICBpZiAodGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnF1ZXN0aW9uc0Fuc3dlcmVkKHMubm9kZSkpIHtcbiAgICAgICAgYW5zd2VyZWRTZWN0aW9ucy5wdXNoKHMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIGFuc3dlcmVkU2VjdGlvbnMpIHtcbiAgICAgIHF1ZXN0aW9ucyA9IHF1ZXN0aW9ucy5jb25jYXQodGhpcy5nZXRSZW1vdGVTZWN0aW9uRGF0YShzZWN0aW9uLnNlY3Rpb24pKTtcbiAgICB9XG5cbiAgICBpZiAocmVzb2x2ZSAmJiByZW1vdGVBbnMpIHtcbiAgICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiBhbnN3ZXJlZFNlY3Rpb25zKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgd2lkdGhzOiBbJyonXSxcbiAgICAgICAgICAgICAgYm9keTogW1xuICAgICAgICAgICAgICAgIFt7IHRleHQ6IHNlY3Rpb24ubGFiZWwsIHN0eWxlOiAndGFibGVTdWJoZWFkZXInIH1dLFxuICAgICAgICAgICAgICAgIFsgdGhpcy5nZXRTZWN0aW9uRGF0YShzZWN0aW9uLnNlY3Rpb24sIHJlbW90ZUFucywgZm9ybSkgXVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgICB9XG4gIH1cblxuICBhcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlcjogYW55LCBxdWVzdGlvbnM6IGFueSwgbm9kZT86IGFueSkge1xuICAgIGlmIChyZXNvbHZlZEFuc3dlcikge1xuICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2goe1xuICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgYCR7KG5vZGUpID8gbm9kZS5xdWVzdGlvbi5sYWJlbCA6ICdRdWVzdGlvbiBsYWJlbCcgfSR7XG4gICAgICAgICAgICAobm9kZSkgPyAobm9kZS5xdWVzdGlvbi5sYWJlbC5pbmRleE9mKCc6JykgPiAxID8gJycgOiAnOicpIDogJydcbiAgICAgICAgICB9IGAsXG4gICAgICAgICAgeyB0ZXh0OiBgJHtyZXNvbHZlZEFuc3dlcn1gLCBib2xkOiB0cnVlIH1cbiAgICAgICAgXSwgc3R5bGU6ICdhbnN3ZXJzJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZ2V0IHJlbW90ZSBzZWxlY3RzIG9ubHlcbiAgZ2V0UmVtb3RlU2VjdGlvbkRhdGEoc2VjdGlvbjogYW55KTogYW55IHtcbiAgICBjb25zdCBxdWVzdGlvbnM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcbiAgICB0aGlzLnN1YnNjcmliZWRBbnN3ZXJzLnF1ZXN0aW9ucy5zdGFjayA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHNlY3Rpb24pIHtcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgICB0aGlzLnJlbW90ZURhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW25vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKHRoaXMucmVtb3RlRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2godGhpcy5yZW1vdGVEYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKG5vZGUuY29udHJvbC52YWx1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgLy8gbWVyZ2UgcmVtb3RlIHNlbGVjdHNcbiAgZ2V0U2VjdGlvbkRhdGEoc2VjdGlvbjogYW55LCByZW1vdGVBbnM6IGFueVtdLCBmb3JtOiBGb3JtKTogYW55IHtcbiAgICBjb25zdCBxdWVzdGlvbnMgPSB7XG4gICAgICBzdGFjazogW11cbiAgICB9O1xuXG4gICAgbGV0IHJlc29sdmVkQW5zd2VyID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc2VjdGlvbikge1xuICAgICAgc3dpdGNoIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShub2RlLmdyb3VwTWVtYmVycywgcmVtb3RlQW5zLCBmb3JtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZpZWxkLXNldCc6XG4gICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTWVtYmVycyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikubWFwKChrZXkpID0+IG5vZGUuY2hpbGRyZW5ba2V5XSk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgZ3JvdXBNZW1iZXJzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShncm91cE1lbWJlcnNbMF0sIHJlbW90ZUFucywgZm9ybSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgIGlmIChub2RlLmdyb3VwTWVtYmVycykge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnN0YWNrLnB1c2godGhpcy5nZXRTZWN0aW9uRGF0YShub2RlLmdyb3VwTWVtYmVycywgcmVtb3RlQW5zLCBmb3JtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlbW90ZS1zZWxlY3QnOlxuICAgICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGFucyBvZiByZW1vdGVBbnMpIHtcbiAgICAgICAgICAgIGlmIChhbnMudmFsdWUgPT09IG5vZGUuY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFJlc29sdmVkQW5zd2VyKGFucy5sYWJlbCwgcXVlc3Rpb25zLCBub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zdCBhbnN3ZXIgPSBub2RlLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgcmVzb2x2ZWRBbnN3ZXIgPSB0aGlzLnJlc29sdmVWYWx1ZShhbnN3ZXIsIGZvcm0pO1xuICAgICAgICAgIHRoaXMuYXBwZW5kUmVzb2x2ZWRBbnN3ZXIocmVzb2x2ZWRBbnN3ZXIsIHF1ZXN0aW9ucywgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXN0aW9ucztcbiAgfVxuXG4gIHJlc29sdmVWYWx1ZShhbnN3ZXI6IGFueSwgZm9ybTogRm9ybSwgYXJyYXlFbGVtZW50PzogYm9vbGVhbik6IGFueSB7XG4gICAgaWYgKGFuc3dlciAhPT0gJycpIHtcbiAgICAgIGlmICh0aGlzLmlzVXVpZChhbnN3ZXIpKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyLCBmb3JtLnNjaGVtYSk7XG4gICAgICAgIGlmICghYXJyYXlFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShhbnN3ZXIpKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBfLmZvckVhY2goYW5zd2VyLCBlbGVtID0+IHtcbiAgICAgICAgICBhcnIucHVzaCh0aGlzLnJlc29sdmVWYWx1ZShlbGVtLCBmb3JtLCB0cnVlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlKGFuc3dlcikpIHtcbiAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmNvbnZlcnRUaW1lKGFuc3dlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5jb252ZXJ0VGltZShhbnN3ZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhbnN3ZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhhbnN3ZXIpLm1hcCgoa2V5KSA9PiBba2V5LCBhbnN3ZXJba2V5XV0pO1xuXG4gICAgICAgIHZhbHVlcy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm06IEZvcm0pOiBhbnkge1xuICAgIGNvbnN0IGRvY0RlZmluaXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHt9KTtcbiAgICBjb25zdCByZW1vdGVTZWxlY3RzID0gdGhpcy5nZXRQYWdlcygodGhpcy5vYnNWYWx1ZUFkYXB0ZXIudHJhdmVyc2UoZm9ybS5yb290Tm9kZSkpLCBmb3JtLCB0cnVlKTtcblxuICAgIGNvbWJpbmVMYXRlc3QocmVtb3RlU2VsZWN0cykuc3Vic2NyaWJlKHJlbW90ZUFucyA9PiB7XG4gICAgICBpZiAocmVtb3RlQW5zKSB7XG4gICAgICAgIGNvbnN0IGRvY0RlZmluaXRpb24gPSB7XG4gICAgICAgICAgY29udGVudDogdGhpcy5nZXRQYWdlcyh0aGlzLm9ic1ZhbHVlQWRhcHRlci50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKSwgZm9ybSwgZmFsc2UsIHJlbW90ZUFucyksXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBhbnN3ZXJzOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiA4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlkZW50aWFsOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAncmVkJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDgsXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzYwLCAwLCAwLCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICBmb250U2l6ZTogOSxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgNSwgNSwgNV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJsZUV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6IDEwLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCAwLCA1XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlSGVhZGVyOiB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogJyNmNWY1ZjUnLFxuICAgICAgICAgICAgICB3aWR0aDogWycxMDAlJ10sXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzMzMycsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCA1LCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlU3ViaGVhZGVyOiB7XG4gICAgICAgICAgICAgIGZpbGxDb2xvcjogJyMzMzdhYjcnLFxuICAgICAgICAgICAgICB3aWR0aDogWycxMDAlJ10sXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNSwgMCwgNSwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYW5uZXI6IHtcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiAnI2Q5ZWRmNycsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs0NSwgMjAsIDIwLCAyMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYW5uZXJMYWJlbDoge1xuICAgICAgICAgICAgICBjb2xvcjogJyNhOWE5YTknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFubmVySXRlbToge1xuICAgICAgICAgICAgICBtYXJnaW46IFsyMCwgMCwgMTAsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGltZXN0YW1wOiB7XG4gICAgICAgICAgICAgIGFsaWdubWVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiB7XG4gICAgICAgICAgICAgIGFsaWdubWVudDogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbMCwgMCwgNSwgNV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlZmF1bHRTdHlsZToge1xuICAgICAgICAgICAgZm9udFNpemU6IDdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY0RlZmluaXRpb24kLm5leHQoZG9jRGVmaW5pdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZG9jRGVmaW5pdGlvbiQ7XG4gIH1cblxuICBkaXNwbGF5UGRmKGZvcm0pIHtcbiAgICBjb25zdCBwZGYgPSBwZGZNYWtlO1xuICAgIGxldCBwYXRpZW50O1xuICAgIHBkZi52ZnMgPSBwZGZGb250cy5wZGZNYWtlLnZmcztcbiAgICBcbiAgICBpZiAoZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5fZGF0YVNvdXJjZXMpIHtcbiAgICAgIHBhdGllbnQgPSBmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLl9kYXRhU291cmNlc1sncGF0aWVudEluZm8nXTtcbiAgICB9XG5cbiAgICB0aGlzLmdlbmVyYXRlUGRmRGVmaW5pdGlvbihmb3JtKS5zdWJzY3JpYmUoZG9jRGVmaW5pdGlvbiA9PiB7XG4gICAgICBpZiAoIShfLmlzRW1wdHkoZG9jRGVmaW5pdGlvbikpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcGF0aWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zdCBiYW5uZXIgPSBbXTtcblxuICAgICAgICAgIGlmIChwYXRpZW50Lm5hbWUpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ05hbWU6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHt0aGlzLnRpdGxlaXplKHBhdGllbnQubmFtZSl9YCB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKHBhdGllbnQubmlkKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdOSUQ6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBgJHtwYXRpZW50Lm5pZH1gIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBpZiAocGF0aWVudC5tdWkpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ01VSTogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubXVpfWAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGlmIChwYXRpZW50LmJpcnRoZGF0ZSkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdZT0I6ICcsIHN0eWxlOiAnYmFubmVyTGFiZWwnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogYCR7bW9tZW50KHBhdGllbnQuYmlydGhkYXRlKS5mb3JtYXQoJ2wnKX0gKCR7cGF0aWVudC5hZ2V9IHlvKWAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgZG9jRGVmaW5pdGlvbi5oZWFkZXIgPSB7XG4gICAgICAgICAgICBzdHlsZTogJ2Jhbm5lcicsXG4gICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICBib2R5OiBbIGJhbm5lciBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBkb2NEZWZpbml0aW9uLmZvb3RlciA9IChjdXJyZW50UGFnZSwgcGFnZUNvdW50KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpZHRoczogWycqJywgJyonLCAnKiddLFxuICAgICAgICAgICAgICAgIHN0YWNrOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgIGBOb3RlOiBDb25maWRlbnRpYWxpdHkgaXMgb25lIG9mIHRoZSBjb3JlIGR1dGllcyBvZiBhbGwgbWVkaWNhbCBwcmFjdGl0aW9uZXJzLiBQYXRpZW50cycgcGVyc29uYWwgaGVhbHRoIGluZm9ybWF0aW9uIHNob3VsZCBiZSBrZXB0IHByaXZhdGUuYCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjb25maWRlbnRpYWwnXG4gICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGN1cnJlbnRQYWdlLnRvU3RyaW5nKCkgKyAnIG9mICcgKyBwYWdlQ291bnQsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAncGFnZU51bWJlcidcbiAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogYEdlbmVyYXRlZCBvbiBgICsgbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICd0aW1lc3RhbXAnXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB3aW4gPSB3aW5kb3cub3BlbignJywgJ19ibGFuaycpO1xuICAgICAgICBwZGYuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLm9wZW4oe30sIHdpbik7XG4gICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcsIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzRGF0ZSh2YWw6IGFueSkge1xuICAgIHJldHVybiBtb21lbnQodmFsLCBtb21lbnQuSVNPXzg2MDEsIHRydWUpLmlzVmFsaWQoKTtcbiAgfVxuXG4gIGlzVXVpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPT09IDM2ICYmIHZhbHVlLmluZGV4T2YoJyAnKSA9PT0gLTEgJiYgdmFsdWUuaW5kZXhPZignLicpID09PSAtMSk7XG4gIH1cblxuICB0aXRsZWl6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcd1xcUyovZywgcyA9PiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSk7XG4gIH1cbn1cbiJdfQ==