/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
// Add ability to display all fields for debugging
import { DebugModeService } from './../services/debug-mode.service';
export class HidersDisablersFactory {
    /**
     * @param {?} expressionRunner
     * @param {?} expressionHelper
     * @param {?} _debugModeService
     */
    constructor(expressionRunner, expressionHelper, _debugModeService) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
        this._debugModeService = _debugModeService;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    getJsExpressionDisabler(question, control, form) {
        /** @type {?} */
        const runnable = this.expressionRunner.getRunnable((/** @type {?} */ (question.disable)), control, this.expressionHelper.helperFunctions, {}, form);
        /** @type {?} */
        const disabler = {
            toDisable: false,
            disableWhenExpression: (/** @type {?} */ (question.disable)),
            reEvaluateDisablingExpression: () => {
                /** @type {?} */
                const result = runnable.run();
                disabler.toDisable = result;
            }
        };
        return disabler;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    getJsExpressionHider(question, control, form) {
        /** @type {?} */
        const hide = question.hide;
        /** @type {?} */
        const value = typeof hide === 'object' ? this.convertHideObjectToString(hide) : (/** @type {?} */ (question.hide));
        // check if debugging has been enabled
        /** @type {?} */
        const debugEnabled = this._debugModeService.debugEnabled();
        /** @type {?} */
        const runnable = this.expressionRunner.getRunnable(value, control, this.expressionHelper.helperFunctions, {}, form);
        /** @type {?} */
        const hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: () => {
                /* if debug is enabled then hiders to be false
                else run the normal eveluator i.e runnable.run()
                */
                if (debugEnabled === true) {
                    hider.toHide = false;
                }
                else {
                    hider.toHide = runnable.run();
                }
            }
        };
        return hider;
    }
    /**
     * @param {?} hide
     * @return {?}
     */
    convertHideObjectToString(hide) {
        if (hide.value instanceof Array) {
            /** @type {?} */
            const arrayStr = '\'' + hide.value.join('\',\'') + '\'';
            /** @type {?} */
            const exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
            return exp;
        }
        return '';
    }
}
HidersDisablersFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HidersDisablersFactory.ctorParameters = () => [
    { type: ExpressionRunner },
    { type: JsExpressionHelper },
    { type: DebugModeService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    HidersDisablersFactory.prototype.expressionRunner;
    /**
     * @type {?}
     * @private
     */
    HidersDisablersFactory.prototype.expressionHelper;
    /**
     * @type {?}
     * @private
     */
    HidersDisablersFactory.prototype._debugModeService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBSXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUdyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUdwRSxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7SUFFL0IsWUFBb0IsZ0JBQWtDLEVBQzdDLGdCQUFvQyxFQUNwQyxpQkFBbUM7UUFGeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO1FBQ3BDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDNUMsQ0FBQzs7Ozs7OztJQUVELHVCQUF1QixDQUFDLFFBQXNCLEVBQUUsT0FBcUQsRUFDakcsSUFBVzs7Y0FDTCxRQUFRLEdBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxtQkFBQSxRQUFRLENBQUMsT0FBTyxFQUFVLEVBQUUsT0FBTyxFQUNqRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7O2NBQ2xELFFBQVEsR0FBYTtZQUN2QixTQUFTLEVBQUUsS0FBSztZQUNoQixxQkFBcUIsRUFBRSxtQkFBQSxRQUFRLENBQUMsT0FBTyxFQUFVO1lBQ2pELDZCQUE2QixFQUFFLEdBQUcsRUFBRTs7c0JBQzFCLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUM3QixRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUNoQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOzs7Ozs7O0lBRUQsb0JBQW9CLENBQUMsUUFBc0IsRUFBRSxPQUFxRCxFQUM5RixJQUFXOztjQUVMLElBQUksR0FBUSxRQUFRLENBQUMsSUFBSTs7Y0FDekIsS0FBSyxHQUFXLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxRQUFRLENBQUMsSUFBSSxFQUFVOzs7Y0FJekcsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7O2NBRXBELFFBQVEsR0FBYSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQzNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQzs7Y0FFMUMsS0FBSyxHQUFVO1lBQ2pCLE1BQU0sRUFBRSxLQUFLO1lBQ2Isa0JBQWtCLEVBQUUsS0FBSztZQUN6QiwwQkFBMEIsRUFBRSxHQUFHLEVBQUU7Z0JBQzVCOztrQkFFRTtnQkFDSCxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7b0JBQ3JCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFFO2lCQUN6QjtxQkFBTTtvQkFDSCxLQUFLLENBQUMsTUFBTSxHQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDbEM7WUFDUCxDQUFDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELHlCQUF5QixDQUFDLElBQVM7UUFFakMsSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssRUFBRTs7a0JBRXpCLFFBQVEsR0FBVyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSTs7a0JBQ3pELEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRztZQUNuRSxPQUFPLEdBQUcsQ0FBQztTQUNaO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7WUFoRUosVUFBVTs7OztZQVRGLGdCQUFnQjtZQUloQixrQkFBa0I7WUFHbEIsZ0JBQWdCOzs7Ozs7O0lBS1Qsa0RBQTBDOzs7OztJQUNyRCxrREFBNEM7Ozs7O0lBQzVDLG1EQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGlzYWJsZXIgfSBmcm9tICcuLi9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWRpc2FibGUnO1xuaW1wb3J0IHsgSGlkZXIgfSBmcm9tICcuLi9jb250cm9sLWhpZGVycy1kaXNhYmxlcnMvY2FuLWhpZGUnO1xuXG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyLCBSdW5uYWJsZSB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cFxufSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24nO1xuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcbi8vIEFkZCBhYmlsaXR5IHRvIGRpc3BsYXkgYWxsIGZpZWxkcyBmb3IgZGVidWdnaW5nXG5pbXBvcnQgeyBEZWJ1Z01vZGVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4cHJlc3Npb25SdW5uZXI6IEV4cHJlc3Npb25SdW5uZXIsXG4gICAgIHByaXZhdGUgZXhwcmVzc2lvbkhlbHBlcjogSnNFeHByZXNzaW9uSGVscGVyLFxuICAgICBwcml2YXRlIF9kZWJ1Z01vZGVTZXJ2aWNlOiBEZWJ1Z01vZGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZ2V0SnNFeHByZXNzaW9uRGlzYWJsZXIocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAsXG4gICAgICAgIGZvcm0/OiBGb3JtKTogRGlzYWJsZXIge1xuICAgICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPVxuICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uUnVubmVyLmdldFJ1bm5hYmxlKHF1ZXN0aW9uLmRpc2FibGUgYXMgc3RyaW5nLCBjb250cm9sLFxuICAgICAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbkhlbHBlci5oZWxwZXJGdW5jdGlvbnMsIHt9LCBmb3JtKTtcbiAgICAgICAgY29uc3QgZGlzYWJsZXI6IERpc2FibGVyID0ge1xuICAgICAgICAgICAgdG9EaXNhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGRpc2FibGVXaGVuRXhwcmVzc2lvbjogcXVlc3Rpb24uZGlzYWJsZSBhcyBzdHJpbmcsXG4gICAgICAgICAgICByZUV2YWx1YXRlRGlzYWJsaW5nRXhwcmVzc2lvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJ1bm5hYmxlLnJ1bigpO1xuICAgICAgICAgICAgICAgIGRpc2FibGVyLnRvRGlzYWJsZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpc2FibGVyO1xuICAgIH1cblxuICAgIGdldEpzRXhwcmVzc2lvbkhpZGVyKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxuICAgICAgICBmb3JtPzogRm9ybSk6IEhpZGVyIHtcblxuICAgICAgICBjb25zdCBoaWRlOiBhbnkgPSBxdWVzdGlvbi5oaWRlO1xuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdHlwZW9mIGhpZGUgPT09ICdvYmplY3QnID8gdGhpcy5jb252ZXJ0SGlkZU9iamVjdFRvU3RyaW5nKGhpZGUpIDogcXVlc3Rpb24uaGlkZSBhcyBzdHJpbmc7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgZGVidWdnaW5nIGhhcyBiZWVuIGVuYWJsZWRcblxuICAgICAgICBjb25zdCBkZWJ1Z0VuYWJsZWQgPSB0aGlzLl9kZWJ1Z01vZGVTZXJ2aWNlLmRlYnVnRW5hYmxlZCgpO1xuXG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZSh2YWx1ZSwgY29udHJvbCxcbiAgICAgICAgdGhpcy5leHByZXNzaW9uSGVscGVyLmhlbHBlckZ1bmN0aW9ucywge30sIGZvcm0pO1xuXG4gICAgICAgIGNvbnN0IGhpZGVyOiBIaWRlciA9IHtcbiAgICAgICAgICAgIHRvSGlkZTogZmFsc2UsXG4gICAgICAgICAgICBoaWRlV2hlbkV4cHJlc3Npb246IHZhbHVlLFxuICAgICAgICAgICAgcmVFdmFsdWF0ZUhpZGluZ0V4cHJlc3Npb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgLyogaWYgZGVidWcgaXMgZW5hYmxlZCB0aGVuIGhpZGVycyB0byBiZSBmYWxzZVxuICAgICAgICAgICAgICAgICBlbHNlIHJ1biB0aGUgbm9ybWFsIGV2ZWx1YXRvciBpLmUgcnVubmFibGUucnVuKClcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoZGVidWdFbmFibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGlkZXIudG9IaWRlID0gZmFsc2UgO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBoaWRlci50b0hpZGUgPSAgcnVubmFibGUucnVuKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBoaWRlcjtcbiAgICB9XG5cbiAgICBjb252ZXJ0SGlkZU9iamVjdFRvU3RyaW5nKGhpZGU6IGFueSkge1xuXG4gICAgICBpZiAoaGlkZS52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cbiAgICAgICAgY29uc3QgYXJyYXlTdHI6IHN0cmluZyA9ICdcXCcnICsgaGlkZS52YWx1ZS5qb2luKCdcXCcsXFwnJykgKyAnXFwnJztcbiAgICAgICAgY29uc3QgZXhwID0gJyFhcnJheUNvbnRhaW5zKFsnICsgYXJyYXlTdHIgKyAnXSwnICsgaGlkZS5maWVsZCArICcpJztcbiAgICAgICAgcmV0dXJuIGV4cDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbn1cbiJdfQ==