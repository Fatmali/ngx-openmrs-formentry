/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType } from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
export class FormControlService {
    /**
     * @param {?} validationFactory
     * @param {?} hidersDisablersFactory
     * @param {?} alertsFactory
     */
    constructor(validationFactory, hidersDisablersFactory, alertsFactory) {
        this.alertsFactory = alertsFactory;
        this.controls = [];
        this.validationFactory = validationFactory;
        this.hidersDisablersFactory = hidersDisablersFactory;
    }
    /**
     * @param {?} questionModel
     * @param {?} parentControl
     * @param {?} generateChildren
     * @param {?=} form
     * @return {?}
     */
    generateControlModel(questionModel, parentControl, generateChildren, form) {
        if (questionModel instanceof QuestionBase) {
            if (questionModel.controlType === AfeControlType.AfeFormArray) {
                return this.generateFormArray(questionModel, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormGroup) {
                return this.generateFormGroupModel(questionModel, generateChildren, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormControl) {
                return this.generateFormControl(questionModel, parentControl, form);
            }
        }
        return null;
    }
    /**
     * @param {?} question
     * @param {?} generateChildren
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormGroupModel(question, generateChildren, parentControl, form) {
        /** @type {?} */
        const formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, form);
        this.wireAlerts(question, formGroup, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }
        /** @type {?} */
        const asGroup = (/** @type {?} */ (question));
        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }
        return formGroup;
    }
    /**
     * @param {?} questions
     * @param {?} parentControl
     * @param {?=} form
     * @return {?}
     */
    _generateFormGroupChildrenModel(questions, parentControl, form) {
        if (questions.length > 0) {
            questions.forEach(element => {
                /** @type {?} */
                const generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    }
    /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormArray(question, parentControl, form) {
        /** @type {?} */
        const validators = this.validationFactory.getValidators(question, form);
        /** @type {?} */
        let formArray;
        if (validators && validators.length > 0) {
            formArray = new AfeFormArray([], validators[0]);
        }
        else {
            formArray = new AfeFormArray([]);
        }
        formArray.uuid = question.key;
        this.wireHidersDisablers(question, formArray, form);
        this.wireAlerts(question, formArray, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formArray);
        }
        return formArray;
    }
    /**
     * @param {?} question
     * @param {?=} parentControl
     * @param {?=} form
     * @return {?}
     */
    generateFormControl(question, parentControl, form) {
        /** @type {?} */
        const value = question.defaultValue || '';
        /** @type {?} */
        const validators = this.validationFactory.getValidators(question, form);
        /** @type {?} */
        const control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, form);
        this.wireAlerts(question, control, form);
        this.wireCalculator(question, control, (form ? form.dataSourcesContainer.dataSources : null));
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }
        return control;
    }
    /**
     * @private
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    wireAlerts(question, control, form) {
        if (question.alert && question.alert !== '') {
            /** @type {?} */
            const alert = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
            control.setAlertFn(alert);
        }
    }
    /**
     * @private
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    wireHidersDisablers(question, control, form) {
        if (question.hide && question.hide !== '') {
            /** @type {?} */
            const hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
            control.setHidingFn(hider);
        }
        if (question.disable && question.disable !== '') {
            /** @type {?} */
            const disable = this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
            control.setDisablingFn(disable);
        }
    }
    /**
     * @private
     * @param {?} question
     * @param {?} control
     * @param {?=} dataSource
     * @return {?}
     */
    wireCalculator(question, control, dataSource) {
        if (question.calculateExpression && question.calculateExpression !== '') {
            /** @type {?} */
            const helper = new JsExpressionHelper();
            /** @type {?} */
            const runner = new ExpressionRunner();
            /** @type {?} */
            const runnable = runner.getRunnable(question.calculateExpression, control, helper.helperFunctions, dataSource);
            // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
            control.setCalculatorFn(runnable.run);
        }
    }
}
FormControlService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FormControlService.ctorParameters = () => [
    { type: ValidationFactory },
    { type: HidersDisablersFactory },
    { type: AlertsFactory }
];
if (false) {
    /** @type {?} */
    FormControlService.prototype.controls;
    /** @type {?} */
    FormControlService.prototype.validationFactory;
    /** @type {?} */
    FormControlService.prototype.hidersDisablersFactory;
    /**
     * @type {?}
     * @private
     */
    FormControlService.prototype.alertsFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUNsRSxNQUFNLG1DQUFtQyxDQUFDO0FBSTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJckUsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7O0lBSzNCLFlBQVksaUJBQW9DLEVBQzVDLHNCQUE4QyxFQUFVLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTHhGLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFNVixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0lBQ3pELENBQUM7Ozs7Ozs7O0lBRUQsb0JBQW9CLENBQUMsYUFBNEMsRUFBRSxhQUEyQixFQUMxRixnQkFBeUIsRUFBRSxJQUFXO1FBQ3RDLElBQUksYUFBYSxZQUFZLFlBQVksRUFBRTtZQUN2QyxJQUFJLGFBQWEsQ0FBQyxXQUFXLEtBQUssY0FB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O1lBbklKLFVBQVU7Ozs7WUFSRixpQkFBaUI7WUFDakIsc0JBQXNCO1lBQ3RCLGFBQWE7Ozs7SUFRbEIsc0NBQWM7O0lBQ2QsK0NBQXFDOztJQUNyQyxvREFBK0M7Ozs7O0lBR0ssMkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBBZmVGb3JtQ29udHJvbCwgQWZlRm9ybUFycmF5LCBBZmVGb3JtR3JvdXAsIEFmZUNvbnRyb2xUeXBlXG59IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbic7XG5cbmltcG9ydCB7IE5lc3RlZFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvbmVzdGVkLXF1ZXN0aW9ucyc7XG5cbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnkgfSBmcm9tICcuL2hpZGVycy1kaXNhYmxlcnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBBbGVydHNGYWN0b3J5IH0gZnJvbSAnLi9zaG93LW1lc3NhZ2VzLmZhY3RvcnknO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyLCBSdW5uYWJsZSB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbFNlcnZpY2Uge1xuICAgIGNvbnRyb2xzID0gW107XG4gICAgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5O1xuICAgIGhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnk6IEhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgICAgIGhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnk6IEhpZGVyc0Rpc2FibGVyc0ZhY3RvcnksIHByaXZhdGUgYWxlcnRzRmFjdG9yeTogQWxlcnRzRmFjdG9yeSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25GYWN0b3J5ID0gdmFsaWRhdGlvbkZhY3Rvcnk7XG4gICAgICAgIHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeSA9IGhpZGVyc0Rpc2FibGVyc0ZhY3Rvcnk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVDb250cm9sTW9kZWwocXVlc3Rpb25Nb2RlbDogUXVlc3Rpb25CYXNlIHwgTmVzdGVkUXVlc3Rpb24sIHBhcmVudENvbnRyb2w6IEFmZUZvcm1Hcm91cCxcbiAgICAgICAgZ2VuZXJhdGVDaGlsZHJlbjogYm9vbGVhbiwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB7XG4gICAgICAgIGlmIChxdWVzdGlvbk1vZGVsIGluc3RhbmNlb2YgUXVlc3Rpb25CYXNlKSB7XG4gICAgICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbC5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUFycmF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVGb3JtQXJyYXkocXVlc3Rpb25Nb2RlbCwgcGFyZW50Q29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbC5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUdyb3VwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVGb3JtR3JvdXBNb2RlbChxdWVzdGlvbk1vZGVsLCBnZW5lcmF0ZUNoaWxkcmVuLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHF1ZXN0aW9uTW9kZWwuY29udHJvbFR5cGUgPT09IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVGb3JtQ29udHJvbChxdWVzdGlvbk1vZGVsLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUZvcm1Hcm91cE1vZGVsKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGdlbmVyYXRlQ2hpbGRyZW46IGJvb2xlYW4sXG4gICAgICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogQWZlRm9ybUdyb3VwIHtcbiAgICAgICAgY29uc3QgZm9ybUdyb3VwID0gbmV3IEFmZUZvcm1Hcm91cCh7fSk7XG4gICAgICAgIHRoaXMud2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbiwgZm9ybUdyb3VwLCBmb3JtKTtcbiAgICAgICAgdGhpcy53aXJlQWxlcnRzKHF1ZXN0aW9uLCBmb3JtR3JvdXAsIGZvcm0pO1xuICAgICAgICBpZiAocGFyZW50Q29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1Hcm91cCkge1xuICAgICAgICAgICAgcGFyZW50Q29udHJvbC5zZXRDb250cm9sKHF1ZXN0aW9uLmtleSwgZm9ybUdyb3VwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzR3JvdXAgPSBxdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwO1xuXG4gICAgICAgIGlmIChnZW5lcmF0ZUNoaWxkcmVuICYmIGFzR3JvdXAgJiYgYXNHcm91cC5xdWVzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVGb3JtR3JvdXBDaGlsZHJlbk1vZGVsKGFzR3JvdXAucXVlc3Rpb25zLCBmb3JtR3JvdXAsIGZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1Hcm91cDtcbiAgICB9XG5cbiAgICBfZ2VuZXJhdGVGb3JtR3JvdXBDaGlsZHJlbk1vZGVsKHF1ZXN0aW9uczogUXVlc3Rpb25CYXNlW10sIHBhcmVudENvbnRyb2w6IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pIHtcblxuICAgICAgICBpZiAocXVlc3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlZCA9IHRoaXMuZ2VuZXJhdGVDb250cm9sTW9kZWwoZWxlbWVudCwgcGFyZW50Q29udHJvbCwgdHJ1ZSwgZm9ybSk7XG4gICAgICAgICAgICAgICAgaWYgKGdlbmVyYXRlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250cm9sLmFkZENvbnRyb2woZWxlbWVudC5rZXksIGdlbmVyYXRlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdlbmVyYXRlRm9ybUFycmF5KHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogQWZlRm9ybUFycmF5IHtcblxuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy52YWxpZGF0aW9uRmFjdG9yeS5nZXRWYWxpZGF0b3JzKHF1ZXN0aW9uLCBmb3JtKTtcbiAgICAgICAgIGxldCBmb3JtQXJyYXk6IEFmZUZvcm1BcnJheTtcbiAgICAgICAgIGlmICh2YWxpZGF0b3JzICYmIHZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgIGZvcm1BcnJheSA9IG5ldyBBZmVGb3JtQXJyYXkoW10sIHZhbGlkYXRvcnNbMF0pO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1BcnJheSA9IG5ldyBBZmVGb3JtQXJyYXkoW10pO1xuICAgICAgICAgfVxuICAgICAgICBmb3JtQXJyYXkudXVpZCA9IHF1ZXN0aW9uLmtleTtcbiAgICAgICAgdGhpcy53aXJlSGlkZXJzRGlzYWJsZXJzKHF1ZXN0aW9uLCBmb3JtQXJyYXksIGZvcm0pO1xuICAgICAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGZvcm1BcnJheSwgZm9ybSk7XG4gICAgICAgIGlmIChwYXJlbnRDb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUdyb3VwKSB7XG4gICAgICAgICAgICBwYXJlbnRDb250cm9sLnNldENvbnRyb2wocXVlc3Rpb24ua2V5LCBmb3JtQXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1BcnJheTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUZvcm1Db250cm9sKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsIGZvcm0/OiBGb3JtKTogQWZlRm9ybUNvbnRyb2wge1xuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gcXVlc3Rpb24uZGVmYXVsdFZhbHVlIHx8ICcnO1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy52YWxpZGF0aW9uRmFjdG9yeS5nZXRWYWxpZGF0b3JzKHF1ZXN0aW9uLCBmb3JtKTtcblxuICAgICAgICBjb25zdCBjb250cm9sID0gbmV3IEFmZUZvcm1Db250cm9sKHZhbHVlLCB2YWxpZGF0b3JzKTtcbiAgICAgICAgY29udHJvbC51dWlkID0gcXVlc3Rpb24ua2V5O1xuICAgICAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xuICAgICAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xuICAgICAgICB0aGlzLndpcmVDYWxjdWxhdG9yKHF1ZXN0aW9uLCBjb250cm9sLCAoZm9ybSA/IGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMgOiBudWxsKSk7XG5cbiAgICAgICAgaWYgKHBhcmVudENvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIHBhcmVudENvbnRyb2wuc2V0Q29udHJvbChxdWVzdGlvbi5rZXksIGNvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRyb2w7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3aXJlQWxlcnRzKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgICAgIGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLCBmb3JtPzogRm9ybSkge1xuICAgICAgICBpZiAocXVlc3Rpb24uYWxlcnQgJiYgcXVlc3Rpb24uYWxlcnQgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCBhbGVydCA9IHRoaXMuYWxlcnRzRmFjdG9yeS5nZXRKc0V4cHJlc3Npb25zaG93QWxlcnQocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgY29udHJvbC5zZXRBbGVydEZuKGFsZXJ0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHdpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICAgICAgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsIGZvcm0/OiBGb3JtKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5oaWRlICYmIHF1ZXN0aW9uLmhpZGUgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCBoaWRlciA9IHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeS5nZXRKc0V4cHJlc3Npb25IaWRlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICBjb250cm9sLnNldEhpZGluZ0ZuKGhpZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChxdWVzdGlvbi5kaXNhYmxlICYmIHF1ZXN0aW9uLmRpc2FibGUgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlID1cbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVyc0Rpc2FibGVyc0ZhY3RvcnkuZ2V0SnNFeHByZXNzaW9uRGlzYWJsZXIocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgY29udHJvbC5zZXREaXNhYmxpbmdGbihkaXNhYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgd2lyZUNhbGN1bGF0b3IocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICAgICAgY29udHJvbDogQWZlRm9ybUNvbnRyb2wsIGRhdGFTb3VyY2U/OiBhbnkpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb24gJiYgcXVlc3Rpb24uY2FsY3VsYXRlRXhwcmVzc2lvbiAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlbHBlcjogSnNFeHByZXNzaW9uSGVscGVyID0gbmV3IEpzRXhwcmVzc2lvbkhlbHBlcigpO1xuICAgICAgICAgICAgY29uc3QgcnVubmVyOiBFeHByZXNzaW9uUnVubmVyID0gbmV3IEV4cHJlc3Npb25SdW5uZXIoKTtcbiAgICAgICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uXG4gICAgICAgICAgICAgICAgLCBjb250cm9sLFxuICAgICAgICAgICAgICAgIGhlbHBlci5oZWxwZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICAgICAgZGF0YVNvdXJjZSk7XG4gICAgICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uYWxpdHkgc3RyaWN0bHkgYXNzdW1lcyB0aGUgY2FsY3VsYXRlRXhwcmVzc2lvbiBmdW5jdGlvbiBoYXMgYmVlbiBkZWZpbmVkIGluIHRoZSBKc0V4cHJlc3Npb25IZWxwZXIgY2xhc3NcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0Q2FsY3VsYXRvckZuKHJ1bm5hYmxlLnJ1bik7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIl19