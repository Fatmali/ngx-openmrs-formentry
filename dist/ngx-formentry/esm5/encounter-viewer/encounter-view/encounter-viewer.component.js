/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { EncounterViewerService } from '../encounter-viewer.service';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources/data-sources';
var EncounterViewerComponent = /** @class */ (function () {
    function EncounterViewerComponent(encounterViewerService, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.dataSources = dataSources;
    }
    Object.defineProperty(EncounterViewerComponent.prototype, "node", {
        set: /**
         * @param {?} rootNode
         * @return {?}
         */
        function (rootNode) {
            this.rootNode = rootNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "schema", {
        set: /**
         * @param {?} schema
         * @return {?}
         */
        function (schema) {
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "encounter", {
        set: /**
         * @param {?} enc
         * @return {?}
         */
        function (enc) {
            this.enc = enc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterViewerComponent.prototype, "form", {
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            this.rootNode = form.rootNode;
            this._schema = form.schema;
            console.log(this.rootNode);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    EncounterViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'file') {
            this.fileDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'remote-select') {
            this.remoteDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        }
        else {
            this.customDataSource = this.encounterViewerService;
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    EncounterViewerComponent.prototype.questionsAnswered = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    EncounterViewerComponent.prototype.questionAnswered = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var answered = this.encounterViewerService.hasAnswer(node);
        return answered;
    };
    /**
     * @param {?} questionLabel
     * @return {?}
     */
    EncounterViewerComponent.prototype.checkForColon = /**
     * @param {?} questionLabel
     * @return {?}
     */
    function (questionLabel) {
        if (questionLabel.indexOf(':') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    EncounterViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'encounter-viewer',
                    template: "<div class=\"viewer\">\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'form'\" class=\"form\">\n    <div *ngFor=\"let question of rootNode.question.questions; let i = index;\">\n      <div *ngIf=\"questionsAnswered(rootNode.children[question.key])\">\n        <div [attr.id]=\"'page'+i\" class=\"panel panel-default\">\n          <p class=\"page-label panel-heading text-primary\">{{question.label}}</p>\n          <div class=\"panel-body\">\n            <encounter-viewer [node]=\"rootNode.children[question.key]\" [schema]=\"_schema\" [parentComponent]=\"this\" [parentGroup]=\"rootNode.control\"></encounter-viewer>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.renderingType === 'page'\" class=\"page\">\n    <encounter-viewer *ngFor=\"let question of rootNode.question.questions\" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\"\n      [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n  </div>\n\n\n  <div *ngIf=\"rootNode.question.renderingType === 'section'&& questionsAnswered(rootNode)\"\n    class=\"section\">\n    <div class=\"panel panel-primary\">\n      <p class=\"panel-heading section-label\">{{ rootNode.question.label }}</p>\n    </div>\n    <div *ngFor=\"let question of rootNode.question.questions\">\n      <encounter-viewer [node]=\"rootNode.children[question.key]\" [parentComponent]=\"this\" [schema]=\"_schema\" [parentGroup]=\"parentGroup\"></encounter-viewer>\n    </div>\n  </div>\n\n  <!--Leaf Controls-->\n  <div style=\"margin-left:10px;\">\n  <form *ngIf=\"rootNode.question.controlType === 0\" [formGroup]=\"parentGroup\">\n    <div *ngIf=\"rootNode.control.value\">\n    <div class=\"question-answer\">\n      <label *ngIf=\"rootNode.question.label\" [attr.for]=\"rootNode.question.key\" style=\"font-weight:400;\">\n          {{ rootNode.question.label }}\n      </label>\n      <span *ngIf=\"checkForColon(rootNode.question.label)\">:</span>\n      <div [ngSwitch]=\"rootNode.question.renderingType\" style=\"display:inline-block; font-weight:bold;\">\n          <div *ngSwitchCase=\" 'file' \">\n            <file-preview [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"fileDataSource\"></file-preview>\n          </div>\n          <div *ngSwitchCase=\"'remote-select'\">\n            <remote-answer [formControlName]=\"rootNode.question.key\" [id]=\"rootNode.question.key + 'id'\" [dataSource]=\"remoteDataSource\"></remote-answer>\n          </div>\n          <div *ngSwitchDefault style=\"display:inline-block\">\n              <question-control [schema]=\"_schema\" [value]=\"rootNode.control.value\" [dataSource]=\"customDataSource\"></question-control>\n            </div>\n      </div>\n     \n    </div>\n    </div>\n  </form>\n</div>\n\n  <!--Array Controls-->\n  <div *ngIf=\"rootNode.question.controlType === 1 && questionsAnswered(rootNode)\">\n    <div [ngSwitch]=\"rootNode.question.renderingType\">\n      <div *ngSwitchCase=\" 'repeating' \">\n        <div [ngSwitch]=\"rootNode.question.extras.type\">\n          <div *ngSwitchCase=\"'testOrder'\">\n            <label>{{rootNode.question.label}}:</label>\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n          \n          <div *ngSwitchCase=\"'obsGroup'\">\n            <div *ngFor=\"let child of rootNode.children; let i=index \">\n              <encounter-viewer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n                \" [parentGroup]=\"child.control \" [schema]=\"_schema\"></encounter-viewer>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"rootNode.question.controlType === 2\">\n\n    <!--GROUP-->\n    <div [ngSwitch]=\"rootNode.question.renderingType \">\n      <div *ngSwitchCase=\" 'group' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n      <div *ngSwitchCase=\" 'field-set' \">\n        <encounter-viewer *ngFor=\"let question of rootNode.question.questions \" [parentComponent]=\"this\" [node]=\"rootNode.children[question.key]\n                  \" [parentGroup]=\"rootNode.control \" [schema]=\"_schema\"></encounter-viewer>\n      </div>\n    </div>\n  </div>\n\n\n\n  </div>\n",
                    styles: [".page-label{font-size:20px;font-weight:700}.section-label{font-size:18px;font-weight:500}.panel-primary{border:none!important}.question-answer{font-size:16px}.panel{margin-bottom:5px}div.section{margin-bottom:15px!important}.line-breaker{white-space:pre-line}hr{margin:10px}"]
                }] }
    ];
    /** @nocollapse */
    EncounterViewerComponent.ctorParameters = function () { return [
        { type: EncounterViewerService },
        { type: DataSources }
    ]; };
    EncounterViewerComponent.propDecorators = {
        parentGroup: [{ type: Input }],
        parentComponent: [{ type: Input }],
        node: [{ type: Input }],
        schema: [{ type: Input }],
        encounter: [{ type: Input }],
        form: [{ type: Input }]
    };
    return EncounterViewerComponent;
}());
export { EncounterViewerComponent };
if (false) {
    /** @type {?} */
    EncounterViewerComponent.prototype.rootNode;
    /** @type {?} */
    EncounterViewerComponent.prototype.enc;
    /** @type {?} */
    EncounterViewerComponent.prototype.fileDataSource;
    /** @type {?} */
    EncounterViewerComponent.prototype.remoteDataSource;
    /** @type {?} */
    EncounterViewerComponent.prototype.customDataSource;
    /** @type {?} */
    EncounterViewerComponent.prototype._schema;
    /** @type {?} */
    EncounterViewerComponent.prototype.parentGroup;
    /** @type {?} */
    EncounterViewerComponent.prototype.parentComponent;
    /**
     * @type {?}
     * @private
     */
    EncounterViewerComponent.prototype.encounterViewerService;
    /**
     * @type {?}
     * @private
     */
    EncounterViewerComponent.prototype.dataSources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3L2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLHlDQUF5QyxDQUFDO0FBR3hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHekU7SUErQkksa0NBQW9CLHNCQUE4QyxFQUMvQyxXQUF3QjtRQUR2QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQy9DLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQzNDLENBQUM7SUFuQkQsc0JBQWEsMENBQUk7Ozs7O1FBQWpCLFVBQWtCLFFBQWtCO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQW9CLDRDQUFNOzs7OztRQUExQixVQUEyQixNQUFXO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQW9CLCtDQUFTOzs7OztRQUE3QixVQUE4QixHQUFRO1lBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBQ0Esc0JBQWEsMENBQUk7Ozs7O1FBQWpCLFVBQWtCLElBQVM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTs7OztJQU1NLDJDQUFROzs7SUFBZjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNO2VBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxNQUFNLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGNBQWM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZFO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU07ZUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLGVBQWUsRUFBRTtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCO2dCQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNuRTthQUFNO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztTQUN2RDtJQUNULENBQUM7Ozs7O0lBRU0sb0RBQWlCOzs7O0lBQXhCLFVBQXlCLElBQVM7O1lBQ3hCLFNBQVMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBQ3JFLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU0sbURBQWdCOzs7O0lBQXZCLFVBQXdCLElBQWM7O1lBQzVCLFFBQVEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUM1RCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVNLGdEQUFhOzs7O0lBQXBCLFVBQXFCLGFBQXFCO1FBQ3RDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7YUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1NBQUU7SUFDbEYsQ0FBQzs7Z0JBN0RKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixtdkpBQWdEOztpQkFFbkQ7Ozs7Z0JBVFEsc0JBQXNCO2dCQUV0QixXQUFXOzs7OEJBZWYsS0FBSztrQ0FDTCxLQUFLO3VCQUNMLEtBQUs7eUJBSUwsS0FBSzs0QkFJTCxLQUFLO3VCQUdKLEtBQUs7O0lBc0NYLCtCQUFDO0NBQUEsQUEvREQsSUErREM7U0ExRFksd0JBQXdCOzs7SUFDakMsNENBQTBCOztJQUMxQix1Q0FBZ0I7O0lBQ2hCLGtEQUFrQzs7SUFDbEMsb0RBQW9DOztJQUNwQyxvREFBb0M7O0lBQ3BDLDJDQUFlOztJQUNmLCtDQUEwQzs7SUFDMUMsbURBQTBEOzs7OztJQWtCOUMsMERBQXNEOzs7OztJQUN2RCwrQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgTGVhZk5vZGUgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtZm9ybS1ncm91cCc7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZW5jb3VudGVyLXZpZXdlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2VuY291bnRlci12aWV3ZXIuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyByb290Tm9kZTogTm9kZUJhc2U7XG4gICAgcHVibGljIGVuYzogYW55O1xuICAgIHB1YmxpYyBmaWxlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBwdWJsaWMgcmVtb3RlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBwdWJsaWMgY3VzdG9tRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgICBwdWJsaWMgX3NjaGVtYTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFyZW50Q29tcG9uZW50OiBFbmNvdW50ZXJWaWV3ZXJDb21wb25lbnQ7XG4gICAgQElucHV0KCkgc2V0IG5vZGUocm9vdE5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIHRoaXMucm9vdE5vZGUgPSByb290Tm9kZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IHNjaGVtYShzY2hlbWE6IGFueSkge1xuICAgICAgICB0aGlzLl9zY2hlbWEgPSBzY2hlbWE7XG4gICAgfVxuXG4gICAgQElucHV0KCkgcHVibGljIHNldCBlbmNvdW50ZXIoZW5jOiBhbnkpIHtcbiAgICAgICAgdGhpcy5lbmMgPSBlbmM7XG4gICAgfVxuICAgICBASW5wdXQoKSBzZXQgZm9ybShmb3JtOiBhbnkpIHtcbiAgICAgICAgIHRoaXMucm9vdE5vZGUgPSBmb3JtLnJvb3ROb2RlO1xuICAgICAgICAgdGhpcy5fc2NoZW1hID0gZm9ybS5zY2hlbWE7XG4gICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVuY291bnRlclZpZXdlclNlcnZpY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2UsXG4gICAgICAgICAgICAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlcykge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucm9vdE5vZGUgJiYgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5leHRyYXNcbiAgICAgICAgICAgICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlRGF0YVNvdXJjZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLnJvb3ROb2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucm9vdE5vZGUgJiYgdGhpcy5yb290Tm9kZS5xdWVzdGlvbi5leHRyYXNcbiAgICAgICAgICAgICYmIHRoaXMucm9vdE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW3RoaXMucm9vdE5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YVNvdXJjZSA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZTtcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlc3Rpb25zQW5zd2VyZWQobm9kZTogYW55KSB7XG4gICAgICAgIGNvbnN0ICRhbnN3ZXJlZCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5xdWVzdGlvbnNBbnN3ZXJlZChub2RlKTtcbiAgICAgICAgcmV0dXJuICRhbnN3ZXJlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlc3Rpb25BbnN3ZXJlZChub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBjb25zdCBhbnN3ZXJlZCA9IHRoaXMuZW5jb3VudGVyVmlld2VyU2VydmljZS5oYXNBbnN3ZXIobm9kZSk7XG4gICAgICAgIHJldHVybiBhbnN3ZXJlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tGb3JDb2xvbihxdWVzdGlvbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uTGFiZWwuaW5kZXhPZignOicpID09PSAtMSkgeyByZXR1cm4gdHJ1ZTsgfSBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfVxuXG59XG4iXX0=