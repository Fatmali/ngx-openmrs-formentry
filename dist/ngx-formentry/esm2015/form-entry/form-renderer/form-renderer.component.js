/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Inject } from '@angular/core';
import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/common';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
export class FormRendererComponent {
    /**
     * @param {?} validationFactory
     * @param {?} dataSources
     * @param {?} formErrorsService
     * @param {?} document
     */
    constructor(validationFactory, dataSources, formErrorsService, document) {
        this.validationFactory = validationFactory;
        this.dataSources = dataSources;
        this.formErrorsService = formErrorsService;
        this.document = document;
        this.childComponents = [];
        this.isCollapsed = false;
        this.activeTab = 0;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    set name(name) {
        this._name = name;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    set parentComponent(parent) {
        this._parentComponent = parent;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            const /** @type {?} */ tab = this.node.form.valueProcessingInfo.lastFormTab;
            if (tab && tab !== this.activeTab) {
                this.activeTab = tab;
            }
        }
        if (this.node && this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe((error) => {
                this.scrollToControl(error);
            });
        }
        if (this.node && this.node.question.renderingType === 'section') {
            this.isCollapsed = !(/** @type {?} */ (this.node.question)).isExpanded;
        }
    }
    /**
     * @param {?} child
     * @return {?}
     */
    addChildComponent(child) {
        this.childComponents.push(child);
    }
    /**
     * @return {?}
     */
    setUpRemoteSelect() {
        if (this.node && this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    }
    /**
     * @return {?}
     */
    setUpFileUpload() {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            console.log('Key', this.node.question);
            console.log('Data source', this.dataSource);
        }
    }
    /**
     * @param {?} tabNumber
     * @return {?}
     */
    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }
    /**
     * @return {?}
     */
    loadPreviousTab() {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    }
    /**
     * @return {?}
     */
    isCurrentTabFirst() {
        return this.activeTab === 0;
    }
    /**
     * @return {?}
     */
    isCurrentTabLast() {
        return this.activeTab === this.node.question['questions'].length - 1;
    }
    /**
     * @return {?}
     */
    loadNextTab() {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    tabSelected($event) {
        this.activeTab = $event.index;
        this.setPreviousTab();
    }
    /**
     * @return {?}
     */
    setPreviousTab() {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    }
    /**
     * @return {?}
     */
    hasErrors() {
        return this.node.control.touched && !this.node.control.valid;
    }
    /**
     * @return {?}
     */
    errors() {
        return this.getErrors(this.node);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    scrollToControl(error) {
        const /** @type {?} */ tab = +error.split(',')[0];
        const /** @type {?} */ elSelector = error.split(',')[1] + 'id';
        // the tab components
        const /** @type {?} */ tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(() => {
            // expand all sections
            tabComponent.childComponents.forEach((section) => {
                section.isCollapsed = false;
                setTimeout(() => {
                    const /** @type {?} */ element = this.document.getElementById(elSelector);
                    element.focus();
                }, 200);
            });
        }, 200);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    onDateChanged(node) {
        this.node = node;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    upload(event) {
        console.log('Event', event);
        console.log('Data', this.dataSource);
    }
    /**
     * @param {?} infoId
     * @return {?}
     */
    toggleInformation(infoId) {
        const /** @type {?} */ e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getErrors(node) {
        const /** @type {?} */ errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
}
FormRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'form-renderer',
                template: `<!--CONTAINERS-->
<div *ngIf="node.question.renderingType === 'form'">
  <div class="dropdown dropdown-tabs forms-dropdown">
    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
      <i class="fa fa-angle-double-down"></i>
    </a>
    <ul class="dropdown-menu dropdown-menu-right forms-dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
      <li *ngFor="let question of node.question.questions; let i = index;" (click)="clickTab(i)" >
        {{question.label}}
      </li>
    </ul>
  </div>
  <mat-tab-group (selectChange)='tabSelected($event)' [selectedIndex]='activeTab'>
    <mat-tab [label]='question.label' *ngFor="let question of node.question.questions; let i = index;">
      <ng-template matTabContent>
        <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>
          <form-renderer [name]="question.label" [node]="node.children[question.key]" [parentComponent]="this" [parentGroup]="node.control"></form-renderer>
        </div>
      </ng-template>
    </mat-tab>
  </mat-tab-group>

  <div style="text-align: center;">
    <button type="button" class="btn btn-default" (click)="loadPreviousTab()" [ngClass]="{disabled: isCurrentTabFirst()}">&lt;&lt;</button>
    <button type="button" class="btn btn-default" (click)="loadNextTab()" [ngClass]="{disabled: isCurrentTabLast()}">
      &gt;&gt;</button>
  </div>
</div>
<div *ngIf="node.question.renderingType === 'page'">
  <!--<h2>{{node.question.label}}</h2>-->
  <form-renderer *ngFor="let question of node.question.questions" [parentComponent]="this" [node]="node.children[question.key]"
    [parentGroup]="parentGroup" [name]="node.question.label"></form-renderer>
</div>
<div *ngIf="node.question.renderingType === 'section'">
  <div class="panel  panel-primary">
    <div class="panel-heading">
      <button type="button" class="btn btn-primary pull-right" (click)="isCollapsed = !isCollapsed">
        {{isCollapsed ? 'Show' : 'Hide'}}
      </button> {{node.question.label}}
    </div>
    <div class="panel-body" [collapse]="isCollapsed">
      <form-renderer *ngFor="let question of node.question.questions" [parentComponent]="this" [node]="node.children[question.key]"
        [parentGroup]="parentGroup" [name]="node.question.label + ' section'"></form-renderer>
    </div>
  </div>
</div>

<!-- MESSAGES -->
<div *ngIf="node.control && node.control.alert && node.control.alert !== ''" class="alert alert-warning">
  <a href="#" class="close" data-dismiss="alert">&times;</a> {{node.control.alert}}
</div>

<!--CONTROLS-->

<div *ngIf="node.question.controlType === 0" class="form-group" [formGroup]="parentGroup" [hidden]="node.control.hidden"
  [ngClass]="{disabled: node.control.disabled}">
  <!--LEAF CONTROL-->
  <div class="question-area">
    <a class="form-tooltip pull-right" (click)="toggleInformation(node.question.extras.id)" data-placement="right" *ngIf="node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '">
      <i class="glyphicon glyphicon-question-sign" aria-hidden="true"></i>
    </a>

    <label *ngIf="node.question.label" [style.color]="hasErrors()? 'red' :''" class="control-label" [attr.for]="node.question.key">
      {{node.question.required === true ? '*':''}} {{node.question.label}}
    </label>
    <div [ngSwitch]="node.question.renderingType">
      <select class="form-control" *ngSwitchCase="'select'" [formControlName]="node.question.key" [id]="node.question.key + 'id'">
        <option *ngFor="let o of node.question.options" [ngValue]="o.value">{{o.label}}
        </option>
      </select>
      <remote-file-upload *ngSwitchCase="'file'" [dataSource]="dataSource" [formControlName]="node.question.key" [id]="node.question.key + 'id'"
        (fileChanged)="upload($event)">
      </remote-file-upload>
      <textarea [placeholder]="node.question.placeholder" [rows]="node.question.rows" class="form-control" *ngSwitchCase="'textarea'"
        [formControlName]="node.question.key" [id]="node.question.key + 'id'">
      </textarea>
      <remote-select *ngSwitchCase="'remote-select'" [placeholder]="node.question.placeholder" tabindex="0" [dataSource]="dataSource"
        [componentID]="node.question.key + 'id'" [formControlName]="node.question.key" [id]="node.question.key + 'id'"></remote-select>
        
    <!--
      <date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" tabindex="0" [weeks]='node.question.extras.questionOptions.weeksList'
        (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"></date-time-picker>
    -->
    
      <ngx-date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" [id]="node.question.key + 'id'" [formControlName]="node.question.key"
            (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" ></ngx-date-time-picker>

      <ng-select *ngSwitchCase="'multi-select'" [noFilter]="50" [style.height]='auto' tabindex="0" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'" [options]="node.question.options" [multiple]="true">
      </ng-select>
      <input class="form-control" *ngSwitchCase="'number'" [formControlName]="node.question.key " [attr.placeholder]="node.question.placeholder "
        [type]="'number'" [id]="node.question.key + 'id' " [step]="'any'" [min]="node.question.extras.questionOptions.min"
        [max]="node.question.extras.questionOptions.max">
      <input class="form-control" *ngSwitchDefault [formControlName]="node.question.key " [attr.placeholder]="node.question.placeholder "
        [type]="node.question.renderingType" [id]="node.question.key + 'id' ">

      <div *ngSwitchCase="'radio'">
        <div *ngFor="let o of node.question.options">
          <label class="form-control no-border">
            <input type="radio" [formControlName]="node.question.key" [id]="node.question.key + 'id'" [value]="o.value"> {{ o.label }}
          </label>
        </div>
      </div>

      <div *ngSwitchCase="'checkbox'">
        <checkbox [id]="node.question.key + 'id'" [formControlName]="node.question.key" [options]="node.question.options"></checkbox>
      </div>

      <div *ngIf="node.question.enableHistoricalValue && node.question.historicalDisplay">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-9">
              <span class="text-warning">Previous Value: </span>
              <strong>{{node.question.historicalDisplay?.text}}</strong>
              <span *ngIf="node.question.showHistoricalValueDate">
                <span> | </span>
                <strong class="text-primary">{{node.question.historicalDisplay?._date}}</strong>
              </span>

            </div>
            <button type="button" [node]="node" [name]="'historyValue'" class="btn btn-primary btn-small col-xs-3">Use Value
            </button>
          </div>
        </div>
      </div>
      <appointments-overview [node]="node"></appointments-overview>
      <div *ngIf="hasErrors() ">
        <p *ngFor="let e of errors() ">
          <span class="text-danger ">{{e}}</span>
        </p>
      </div>
    </div>

    <div class="question-info col-md-12 col-lg-12 col-sm-12" id="{{node.question.extras.id}}" *ngIf="node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '">
      {{node.question.extras.questionInfo}}
    </div>

  </div>
</div>
<div *ngIf="node.question.controlType === 1" [hidden]="node.control.hidden" [ngClass]="{disabled: node.control.disabled}">


  <!--ARRAY CONTROL-->
  <div [ngSwitch]="node.question.renderingType ">
    <div class='well' style="padding: 2px; " *ngSwitchCase=" 'repeating' ">
      <h4 style="margin: 2px; font-weight: bold;">{{node.question.label}}</h4>
      <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;" />
      <div [ngSwitch]="node.question.extras.type">
        <div *ngSwitchCase="'testOrder'">
          <div *ngFor="let child of node.children; let i=index ">
            <form-renderer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
            " [parentGroup]="child.control "></form-renderer>
            <div>{{child.orderNumber}}</div>
            <button type="button " class='btn btn-sm btn-danger' (click)="node.removeAt(i) ">Remove</button>
            <br/>
            <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;" />
          </div>
        </div>

        <div *ngSwitchCase="'obsGroup'" style="margin-bottom:20px;">
          <div *ngFor="let child of node.children; let i=index ">
            <form-renderer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
            " [parentGroup]="child.control "></form-renderer>
            <button type="button " class='btn btn-sm btn-danger' (click)="node.removeAt(i) ">Remove</button>
            <br/>
            <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;" />
          </div>
        </div>
      </div>
      <button type="button " class='btn btn-primary' (click)="node.createChildNode() ">Add</button>
    </div>
  </div>

</div>
<div *ngIf="node.question.controlType === 2" [hidden]="node.control.hidden" [ngClass]="{disabled: node.control.disabled}">

  <!--GROUP-->
  <div [ngSwitch]="node.question.renderingType ">
    <div *ngSwitchCase=" 'group' ">
      <form-renderer *ngFor="let question of node.question.questions " [parentComponent]="this" [node]="node.children[question.key]
            " [parentGroup]="node.control "></form-renderer>
    </div>
    <div *ngSwitchCase=" 'field-set' " style="border: 1px solid #eeeeee; padding: 2px; margin: 2px;">
      <form-renderer *ngFor="let question of node.question.questions " [parentComponent]="this" [node]="node.children[question.key]
            " [parentGroup]="node.control "></form-renderer>
    </div>
  </div>

</div>
`,
                styles: ['../../style/app.css', DEFAULT_STYLES]
            },] },
];
/** @nocollapse */
FormRendererComponent.ctorParameters = () => [
    { type: ValidationFactory, },
    { type: DataSources, },
    { type: FormErrorsService, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
FormRendererComponent.propDecorators = {
    "node": [{ type: Input },],
    "parentGroup": [{ type: Input },],
    "name": [{ type: Input },],
    "parentComponent": [{ type: Input },],
};
function FormRendererComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormRendererComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormRendererComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormRendererComponent.propDecorators;
    /** @type {?} */
    FormRendererComponent.prototype._parentComponent;
    /** @type {?} */
    FormRendererComponent.prototype._name;
    /** @type {?} */
    FormRendererComponent.prototype.node;
    /** @type {?} */
    FormRendererComponent.prototype.parentGroup;
    /** @type {?} */
    FormRendererComponent.prototype.childComponents;
    /** @type {?} */
    FormRendererComponent.prototype.showTime;
    /** @type {?} */
    FormRendererComponent.prototype.showWeeks;
    /** @type {?} */
    FormRendererComponent.prototype.activeTab;
    /** @type {?} */
    FormRendererComponent.prototype.dataSource;
    /** @type {?} */
    FormRendererComponent.prototype.isCollapsed;
    /** @type {?} */
    FormRendererComponent.prototype.auto;
    /** @type {?} */
    FormRendererComponent.prototype.validationFactory;
    /** @type {?} */
    FormRendererComponent.prototype.dataSources;
    /** @type {?} */
    FormRendererComponent.prototype.formErrorsService;
    /** @type {?} */
    FormRendererComponent.prototype.document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQXNNcEUsTUFBTTs7Ozs7OztJQW1CSixZQUNRLG1CQUNBLGFBQ0EsbUJBQ2tCO1FBSGxCLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsc0JBQWlCLEdBQWpCLGlCQUFpQjtRQUNDLGFBQVEsR0FBUixRQUFROytCQWxCZ0IsRUFBRTsyQkFXL0IsS0FBSztRQVF4QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUNwQjs7Ozs7UUFuQm1CLElBQUksQ0FBQyxJQUFZO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOzs7Ozs7UUFFQSxlQUFlLENBQUMsTUFBNkI7UUFDL0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0s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LE1BQU0sU0FBQyxRQUFROzs7cUJBcEJmLEtBQUs7NEJBQ0wsS0FBSztxQkFFTCxLQUFLO2dDQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnaGFtbWVyanMnO1xuaW1wb3J0IHsgREVGQVVMVF9TVFlMRVMgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm0tcmVuZGVyZXInLFxuICB0ZW1wbGF0ZTogYDwhLS1DT05UQUlORVJTLS0+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybSdcIj5cbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXRhYnMgZm9ybXMtZHJvcGRvd25cIj5cbiAgICA8YSBjbGFzcz1cImJ0biBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgaHJlZj1cIiNcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtZG91YmxlLWRvd25cIj48L2k+XG4gICAgPC9hPlxuICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodCBmb3Jtcy1kcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJkcm9wZG93bk1lbnVcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnM7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cImNsaWNrVGFiKGkpXCIgPlxuICAgICAgICB7e3F1ZXN0aW9uLmxhYmVsfX1cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG4gIDxtYXQtdGFiLWdyb3VwIChzZWxlY3RDaGFuZ2UpPSd0YWJTZWxlY3RlZCgkZXZlbnQpJyBbc2VsZWN0ZWRJbmRleF09J2FjdGl2ZVRhYic+XG4gICAgPG1hdC10YWIgW2xhYmVsXT0ncXVlc3Rpb24ubGFiZWwnICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBtYXRUYWJDb250ZW50PlxuICAgICAgICA8ZGl2IChzd2lwZUxlZnQpPSdsb2FkTmV4dFRhYigpJyAoc3dpcGVSaWdodCk9J2xvYWRQcmV2aW91c1RhYigpJz5cbiAgICAgICAgICA8Zm9ybS1yZW5kZXJlciBbbmFtZV09XCJxdWVzdGlvbi5sYWJlbFwiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtwYXJlbnRHcm91cF09XCJub2RlLmNvbnRyb2xcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L21hdC10YWI+XG4gIDwvbWF0LXRhYi1ncm91cD5cblxuICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cImxvYWRQcmV2aW91c1RhYigpXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBpc0N1cnJlbnRUYWJGaXJzdCgpfVwiPiZsdDsmbHQ7PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwibG9hZE5leHRUYWIoKVwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogaXNDdXJyZW50VGFiTGFzdCgpfVwiPlxuICAgICAgJmd0OyZndDs8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJ1wiPlxuICA8IS0tPGgyPnt7bm9kZS5xdWVzdGlvbi5sYWJlbH19PC9oMj4tLT5cbiAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIiBbbmFtZV09XCJub2RlLnF1ZXN0aW9uLmxhYmVsXCI+PC9mb3JtLXJlbmRlcmVyPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbidcIj5cbiAgPGRpdiBjbGFzcz1cInBhbmVsICBwYW5lbC1wcmltYXJ5XCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiAoY2xpY2spPVwiaXNDb2xsYXBzZWQgPSAhaXNDb2xsYXBzZWRcIj5cbiAgICAgICAge3tpc0NvbGxhcHNlZCA/ICdTaG93JyA6ICdIaWRlJ319XG4gICAgICA8L2J1dHRvbj4ge3tub2RlLnF1ZXN0aW9uLmxhYmVsfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIFtjb2xsYXBzZV09XCJpc0NvbGxhcHNlZFwiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCIgW25hbWVdPVwibm9kZS5xdWVzdGlvbi5sYWJlbCArICcgc2VjdGlvbidcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gTUVTU0FHRVMgLS0+XG48ZGl2ICpuZ0lmPVwibm9kZS5jb250cm9sICYmIG5vZGUuY29udHJvbC5hbGVydCAmJiBub2RlLmNvbnRyb2wuYWxlcnQgIT09ICcnXCIgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nXCI+XG4gIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCI+JnRpbWVzOzwvYT4ge3tub2RlLmNvbnRyb2wuYWxlcnR9fVxuPC9kaXY+XG5cbjwhLS1DT05UUk9MUy0tPlxuXG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMFwiIGNsYXNzPVwiZm9ybS1ncm91cFwiIFtmb3JtR3JvdXBdPVwicGFyZW50R3JvdXBcIiBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIlxuICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZH1cIj5cbiAgPCEtLUxFQUYgQ09OVFJPTC0tPlxuICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24tYXJlYVwiPlxuICAgIDxhIGNsYXNzPVwiZm9ybS10b29sdGlwIHB1bGwtcmlnaHRcIiAoY2xpY2spPVwidG9nZ2xlSW5mb3JtYXRpb24obm9kZS5xdWVzdGlvbi5leHRyYXMuaWQpXCIgZGF0YS1wbGFjZW1lbnQ9XCJyaWdodFwiICpuZ0lmPVwibm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJycgICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJyAnXCI+XG4gICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcXVlc3Rpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L2E+XG5cbiAgICA8bGFiZWwgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmxhYmVsXCIgW3N0eWxlLmNvbG9yXT1cImhhc0Vycm9ycygpPyAncmVkJyA6JydcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIiBbYXR0ci5mb3JdPVwibm9kZS5xdWVzdGlvbi5rZXlcIj5cbiAgICAgIHt7bm9kZS5xdWVzdGlvbi5yZXF1aXJlZCA9PT0gdHJ1ZSA/ICcqJzonJ319IHt7bm9kZS5xdWVzdGlvbi5sYWJlbH19XG4gICAgPC9sYWJlbD5cbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIj5cbiAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIG5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFtuZ1ZhbHVlXT1cIm8udmFsdWVcIj57e28ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgICAgPHJlbW90ZS1maWxlLXVwbG9hZCAqbmdTd2l0Y2hDYXNlPVwiJ2ZpbGUnXCIgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgKGZpbGVDaGFuZ2VkKT1cInVwbG9hZCgkZXZlbnQpXCI+XG4gICAgICA8L3JlbW90ZS1maWxlLXVwbG9hZD5cbiAgICAgIDx0ZXh0YXJlYSBbcGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlclwiIFtyb3dzXT1cIm5vZGUucXVlc3Rpb24ucm93c1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIlxuICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPlxuICAgICAgPC90ZXh0YXJlYT5cbiAgICAgIDxyZW1vdGUtc2VsZWN0ICpuZ1N3aXRjaENhc2U9XCIncmVtb3RlLXNlbGVjdCdcIiBbcGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlclwiIHRhYmluZGV4PVwiMFwiIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIlxuICAgICAgICBbY29tcG9uZW50SURdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj48L3JlbW90ZS1zZWxlY3Q+XG4gICAgICAgIFxuICAgIDwhLS1cbiAgICAgIDxkYXRlLXRpbWUtcGlja2VyICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIiBbc2hvd1RpbWVdPVwibm9kZS5xdWVzdGlvbi5zaG93VGltZVwiIHRhYmluZGV4PVwiMFwiIFt3ZWVrc109J25vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy53ZWVrc0xpc3QnXG4gICAgICAgIChvbkRhdGVDaGFuZ2UpPVwib25EYXRlQ2hhbmdlZChub2RlKVwiIFtzaG93V2Vla3NdPVwibm9kZS5xdWVzdGlvbi5zaG93V2Vla3NBZGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+PC9kYXRlLXRpbWUtcGlja2VyPlxuICAgIC0tPlxuICAgIFxuICAgICAgPG5neC1kYXRlLXRpbWUtcGlja2VyICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIiBbc2hvd1RpbWVdPVwibm9kZS5xdWVzdGlvbi5zaG93VGltZVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgICAgIChvbkRhdGVDaGFuZ2UpPVwib25EYXRlQ2hhbmdlZChub2RlKVwiIFtzaG93V2Vla3NdPVwibm9kZS5xdWVzdGlvbi5zaG93V2Vla3NBZGRlclwiID48L25neC1kYXRlLXRpbWUtcGlja2VyPlxuXG4gICAgICA8bmctc2VsZWN0ICpuZ1N3aXRjaENhc2U9XCInbXVsdGktc2VsZWN0J1wiIFtub0ZpbHRlcl09XCI1MFwiIFtzdHlsZS5oZWlnaHRdPSdhdXRvJyB0YWJpbmRleD1cIjBcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtvcHRpb25zXT1cIm5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFttdWx0aXBsZV09XCJ0cnVlXCI+XG4gICAgICA8L25nLXNlbGVjdD5cbiAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiICpuZ1N3aXRjaENhc2U9XCInbnVtYmVyJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXkgXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlciBcIlxuICAgICAgICBbdHlwZV09XCInbnVtYmVyJ1wiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCcgXCIgW3N0ZXBdPVwiJ2FueSdcIiBbbWluXT1cIm5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5taW5cIlxuICAgICAgICBbbWF4XT1cIm5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5tYXhcIj5cbiAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiICpuZ1N3aXRjaERlZmF1bHQgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleSBcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyIFwiXG4gICAgICAgIFt0eXBlXT1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCcgXCI+XG5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyYWRpbydcIj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgbyBvZiBub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbm8tYm9yZGVyXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbdmFsdWVdPVwiby52YWx1ZVwiPiB7eyBvLmxhYmVsIH19XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2NoZWNrYm94J1wiPlxuICAgICAgICA8Y2hlY2tib3ggW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbb3B0aW9uc109XCJub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIj48L2NoZWNrYm94PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiBub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTlcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIj5QcmV2aW91cyBWYWx1ZTogPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nPnt7bm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheT8udGV4dH19PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5zaG93SGlzdG9yaWNhbFZhbHVlRGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiB8IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwidGV4dC1wcmltYXJ5XCI+e3tub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5Py5fZGF0ZX19PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbbm9kZV09XCJub2RlXCIgW25hbWVdPVwiJ2hpc3RvcnlWYWx1ZSdcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tc21hbGwgY29sLXhzLTNcIj5Vc2UgVmFsdWVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGFwcG9pbnRtZW50cy1vdmVydmlldyBbbm9kZV09XCJub2RlXCI+PC9hcHBvaW50bWVudHMtb3ZlcnZpZXc+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaGFzRXJyb3JzKCkgXCI+XG4gICAgICAgIDxwICpuZ0Zvcj1cImxldCBlIG9mIGVycm9ycygpIFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXIgXCI+e3tlfX08L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uLWluZm8gY29sLW1kLTEyIGNvbC1sZy0xMiBjb2wtc20tMTJcIiBpZD1cInt7bm9kZS5xdWVzdGlvbi5leHRyYXMuaWR9fVwiICpuZ0lmPVwibm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJycgICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJyAnXCI+XG4gICAgICB7e25vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mb319XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAxXCIgW2hpZGRlbl09XCJub2RlLmNvbnRyb2wuaGlkZGVuXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBub2RlLmNvbnRyb2wuZGlzYWJsZWR9XCI+XG5cblxuICA8IS0tQVJSQVkgQ09OVFJPTC0tPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgXCI+XG4gICAgPGRpdiBjbGFzcz0nd2VsbCcgc3R5bGU9XCJwYWRkaW5nOiAycHg7IFwiICpuZ1N3aXRjaENhc2U9XCIgJ3JlcGVhdGluZycgXCI+XG4gICAgICA8aDQgc3R5bGU9XCJtYXJnaW46IDJweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+e3tub2RlLnF1ZXN0aW9uLmxhYmVsfX08L2g0PlxuICAgICAgPGhyIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTJweDsgbWFyZ2luLXJpZ2h0Oi0ycHg7IG1hcmdpbi1ib3R0b206NHB4OyBtYXJnaW4tdG9wOjhweDsgYm9yZGVyLXdpZHRoOjJweDtcIiAvPlxuICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwibm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZVwiPlxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGVzdE9yZGVyJ1wiPlxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxuICAgICAgICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgICAgICAgICA8ZGl2Pnt7Y2hpbGQub3JkZXJOdW1iZXJ9fTwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uIFwiIGNsYXNzPSdidG4gYnRuLXNtIGJ0bi1kYW5nZXInIChjbGljayk9XCJub2RlLnJlbW92ZUF0KGkpIFwiPlJlbW92ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxociBzdHlsZT1cIm1hcmdpbi1sZWZ0Oi0ycHg7IG1hcmdpbi1yaWdodDotMnB4OyBtYXJnaW4tYm90dG9tOjRweDsgbWFyZ2luLXRvcDo4cHg7IGJvcmRlci13aWR0aDoxcHg7XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ29ic0dyb3VwJ1wiIHN0eWxlPVwibWFyZ2luLWJvdHRvbToyMHB4O1wiPlxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxuICAgICAgICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b24gXCIgY2xhc3M9J2J0biBidG4tc20gYnRuLWRhbmdlcicgKGNsaWNrKT1cIm5vZGUucmVtb3ZlQXQoaSkgXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGhyIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTJweDsgbWFyZ2luLXJpZ2h0Oi0ycHg7IG1hcmdpbi1ib3R0b206NHB4OyBtYXJnaW4tdG9wOjhweDsgYm9yZGVyLXdpZHRoOjFweDtcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uIFwiIGNsYXNzPSdidG4gYnRuLXByaW1hcnknIChjbGljayk9XCJub2RlLmNyZWF0ZUNoaWxkTm9kZSgpIFwiPkFkZDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMlwiIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkfVwiPlxuXG4gIDwhLS1HUk9VUC0tPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgXCI+XG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdncm91cCcgXCI+XG4gICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2ZpZWxkLXNldCcgXCIgc3R5bGU9XCJib3JkZXI6IDFweCBzb2xpZCAjZWVlZWVlOyBwYWRkaW5nOiAycHg7IG1hcmdpbjogMnB4O1wiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogWycuLi8uLi9zdHlsZS9hcHAuY3NzJywgREVGQVVMVF9TVFlMRVNdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1SZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgX3BhcmVudENvbXBvbmVudDogRm9ybVJlbmRlcmVyQ29tcG9uZW50O1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBub2RlOiBOb2RlQmFzZTtcbiAgQElucHV0KCkgcHVibGljIHBhcmVudEdyb3VwOiBBZmVGb3JtR3JvdXA7XG4gIHB1YmxpYyBjaGlsZENvbXBvbmVudHM6IEZvcm1SZW5kZXJlckNvbXBvbmVudFtdID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgfVxuICBASW5wdXQoKSBwdWJsaWMgc2V0IHBhcmVudENvbXBvbmVudChwYXJlbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuX3BhcmVudENvbXBvbmVudCA9IHBhcmVudDtcbiAgfVxuICBwdWJsaWMgc2hvd1RpbWU6IGJvb2xlYW47XG4gIHB1YmxpYyBzaG93V2Vla3M6IGJvb2xlYW47XG4gIHB1YmxpYyBhY3RpdmVUYWI6IG51bWJlcjtcbiAgcHVibGljIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIHB1YmxpYyBpc0NvbGxhcHNlZCA9IGZhbHNlO1xuICBwdWJsaWMgYXV0bzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICBwcml2YXRlIHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXMsXG4gIHByaXZhdGUgZm9ybUVycm9yc1NlcnZpY2U6IEZvcm1FcnJvcnNTZXJ2aWNlLFxuICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IDA7XG4gIH1cbiBwdWJsaWMgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLnNldFVwUmVtb3RlU2VsZWN0KCk7XG4gICAgdGhpcy5zZXRVcEZpbGVVcGxvYWQoKTtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICBjb25zdCB0YWIgPSB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmxhc3RGb3JtVGFiO1xuICAgICAgaWYgKHRhYiAmJiB0YWIgIT09IHRoaXMuYWN0aXZlVGFiKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybScpIHtcbiAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkJC5zdWJzY3JpYmUoXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Db250cm9sKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICB0aGlzLmlzQ29sbGFwc2VkID0gISh0aGlzLm5vZGUucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cCkuaXNFeHBhbmRlZDtcbiAgICB9XG5cbiAgfVxuXG4gIHB1YmxpYyBhZGRDaGlsZENvbXBvbmVudChjaGlsZDogRm9ybVJlbmRlcmVyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5jaGlsZENvbXBvbmVudHMucHVzaChjaGlsZCk7XG4gIH1cblxuICBwdWJsaWMgc2V0VXBSZW1vdGVTZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YVNvdXJjZU9wdGlvbnMgPSB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFVwRmlsZVVwbG9hZCgpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICBjb25zb2xlLmxvZygnS2V5JywgdGhpcy5ub2RlLnF1ZXN0aW9uKTtcbiAgICAgIGNvbnNvbGUubG9nKCdEYXRhIHNvdXJjZScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gICAgfVxuXG4gIH1cblxuXG4gcHVibGljIGNsaWNrVGFiKHRhYk51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiTnVtYmVyO1xuICB9XG5cbiAgcHVibGljIGxvYWRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiRmlyc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiAtIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyAgaXNDdXJyZW50VGFiRmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSAwO1xuICB9XG5cbiAgcHVibGljICBpc0N1cnJlbnRUYWJMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYiA9PT0gdGhpcy5ub2RlLnF1ZXN0aW9uWydxdWVzdGlvbnMnXS5sZW5ndGggLSAxO1xuICB9XG5cbiAgcHVibGljICBsb2FkTmV4dFRhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiTGFzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiICsgMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG4gIHB1YmxpYyAgdGFiU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAkZXZlbnQuaW5kZXg7XG4gICAgdGhpcy5zZXRQcmV2aW91c1RhYigpO1xuICB9XG4gIHB1YmxpYyAgc2V0UHJldmlvdXNUYWIoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuZm9ybSkge1xuICAgICAgdGhpcy5ub2RlLmZvcm0udmFsdWVQcm9jZXNzaW5nSW5mb1snbGFzdEZvcm1UYWInXSA9IHRoaXMuYWN0aXZlVGFiO1xuICAgIH1cblxuICB9XG4gcHVibGljICAgaGFzRXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGUuY29udHJvbC50b3VjaGVkICYmICF0aGlzLm5vZGUuY29udHJvbC52YWxpZDtcbiAgfVxuXG4gIHB1YmxpYyAgZXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEVycm9ycyh0aGlzLm5vZGUpO1xuICB9XG5cblxuICBwdWJsaWMgc2Nyb2xsVG9Db250cm9sKGVycm9yOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0YWI6IG51bWJlciA9ICtlcnJvci5zcGxpdCgnLCcpWzBdO1xuICAgIGNvbnN0IGVsU2VsZWN0b3IgPSBlcnJvci5zcGxpdCgnLCcpWzFdICsgJ2lkJztcbiAgICAvLyB0aGUgdGFiIGNvbXBvbmVudHNcbiAgICBjb25zdCB0YWJDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCA9IHRoaXMuY2hpbGRDb21wb25lbnRzW3RhYl07XG5cbiAgICB0aGlzLmNsaWNrVGFiKHRhYik7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBleHBhbmQgYWxsIHNlY3Rpb25zXG4gICAgICB0YWJDb21wb25lbnQuY2hpbGRDb21wb25lbnRzLmZvckVhY2goKHNlY3Rpb24pID0+IHtcbiAgICAgICAgc2VjdGlvbi5pc0NvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50OiBhbnkgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsU2VsZWN0b3IpO1xuICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRhdGVDaGFuZ2VkKG5vZGU6IExlYWZOb2RlKSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnRXZlbnQnLCBldmVudCk7XG4gICAgY29uc29sZS5sb2coJ0RhdGEnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUluZm9ybWF0aW9uKGluZm9JZCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmZvSWQpO1xuXG4gICAgaWYgKGUuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgIH1cblxuXG4gICAgY29uc29sZS5sb2coJ0luZm9JZCcsIGluZm9JZCk7XG4gIH1cblxuXG4gICBwcml2YXRlIGdldEVycm9ycyhub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=