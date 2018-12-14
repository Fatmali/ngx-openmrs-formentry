/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HistoricalFieldHelperService } from '../helpers/historical-field-helper-service';
import * as _ from 'lodash';
import { NodeBase } from '../form-factory/form-node';
var HistoricalValueDirective = /** @class */ (function () {
    function HistoricalValueDirective(historicalFieldHelper) {
        this.historicalFieldHelper = historicalFieldHelper;
        this._nodeChange = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    HistoricalValueDirective.prototype.setValue = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.target.name === 'historyValue') {
            if (this._node && (!this.compareString(this._node.question.renderingType, 'page')
                || !this.compareString(this._node.question.renderingType, 'section'))) {
                this._node.control.setValue(this._node.question.historicalDataValue.value);
                this._node.question['historicalValue'] = this._node.question.historicalDataValue;
                e.stopPropagation();
                this._nodeChange.emit(this._node);
            }
        }
    };
    /**
     * @private
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    HistoricalValueDirective.prototype.compareString = /**
     * @private
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (a === b) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(HistoricalValueDirective.prototype, "node", {
        set: /**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node) {
                this._node = node;
                if (this._node.question.enableHistoricalValue && !_.isUndefined(this._node.question.historicalDataValue)) {
                    /** @type {?} */
                    var display = { text: '', _date: '' };
                    if ((this._node.question.renderingType === 'select'
                        || this._node.question.renderingType === 'multi-select')) {
                        display.text = this.historicalFieldHelper.getDisplayTextFromOptions(this._node.question, 'value', 'label');
                        display._date = this._node.question.historicalDataValue.valueDate;
                        this._node.question['historicalDisplay'] = display;
                    }
                    else if (!_.isUndefined(this._node.question.historicalDataValue)) {
                        display.text = this._node.question.historicalDataValue.value;
                        display._date = this._node.question.historicalDataValue.valueDate;
                        this._node.question['historicalDisplay'] = display;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    HistoricalValueDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[node]"
                },] }
    ];
    /** @nocollapse */
    HistoricalValueDirective.ctorParameters = function () { return [
        { type: HistoricalFieldHelperService }
    ]; };
    HistoricalValueDirective.propDecorators = {
        _node: [{ type: Input }],
        _nodeChange: [{ type: Output }],
        setValue: [{ type: HostListener, args: ['click', ['$event'],] }],
        node: [{ type: Input }]
    };
    return HistoricalValueDirective;
}());
export { HistoricalValueDirective };
if (false) {
    /** @type {?} */
    HistoricalValueDirective.prototype._node;
    /** @type {?} */
    HistoricalValueDirective.prototype._nodeChange;
    /** @type {?} */
    HistoricalValueDirective.prototype.historicalDisplay;
    /**
     * @type {?}
     * @private
     */
    HistoricalValueDirective.prototype.historicalFieldHelper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2RpcmVjdGl2ZXMvaGlzdG9yaWNhbC12YWx1ZS1kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDtJQVdFLGtDQUFvQixxQkFBbUQ7UUFBbkQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUE4QjtRQUo3RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFLbkQsQ0FBQzs7Ozs7SUFHRCwyQ0FBUTs7OztJQURSLFVBQ1MsQ0FBQztRQUVSLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO1lBRXBDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDO21CQUM1RSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUU7Z0JBRXZFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFM0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDakYsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFFbkM7U0FFRjtJQUNILENBQUM7Ozs7Ozs7SUFDTyxnREFBYTs7Ozs7O0lBQXJCLFVBQXNCLENBQUMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBQ0Qsc0JBQ0ksMENBQUk7Ozs7O1FBRFIsVUFDUyxJQUFjO1lBRXJCLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFOzt3QkFDbEcsT0FBTyxHQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO29CQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLFFBQVE7MkJBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxjQUFjLENBQUMsRUFBRTt3QkFFMUQsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMseUJBQXlCLENBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUNuQixPQUFPLEVBQ1AsT0FBTyxDQUNSLENBQUM7d0JBQ0YsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7d0JBRWxFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsT0FBTyxDQUFDO3FCQUVwRDt5QkFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO3dCQUVsRSxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQzt3QkFDN0QsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7d0JBRWxFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsT0FBTyxDQUFDO3FCQUNwRDtpQkFDRjthQUNGO1FBQ0gsQ0FBQzs7O09BQUE7O2dCQW5FRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7aUJBQ25COzs7O2dCQU5RLDRCQUE0Qjs7O3dCQVVsQyxLQUFLOzhCQUNMLE1BQU07MkJBT04sWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzt1QkF5QmhDLEtBQUs7O0lBOEJSLCtCQUFDO0NBQUEsQUFyRUQsSUFxRUM7U0FqRVksd0JBQXdCOzs7SUFFbkMseUNBQXlCOztJQUN6QiwrQ0FBbUQ7O0lBRW5ELHFEQUEwQjs7Ozs7SUFFZCx5REFBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTm9kZUJhc2UgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBgW25vZGVdYFxufSlcblxuZXhwb3J0IGNsYXNzIEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgX25vZGU6IE5vZGVCYXNlO1xuICBAT3V0cHV0KCkgX25vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcblxuICBoaXN0b3JpY2FsRGlzcGxheTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaGlzdG9yaWNhbEZpZWxkSGVscGVyOiBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlKSB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHNldFZhbHVlKGUpIHtcblxuICAgIGlmIChlLnRhcmdldC5uYW1lID09PSAnaGlzdG9yeVZhbHVlJykge1xuXG4gICAgICBpZiAodGhpcy5fbm9kZSAmJiAoIXRoaXMuY29tcGFyZVN0cmluZyh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUsICdwYWdlJylcbiAgICAgICAgfHwgIXRoaXMuY29tcGFyZVN0cmluZyh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUsICdzZWN0aW9uJykpKSB7XG5cbiAgICAgICAgdGhpcy5fbm9kZS5jb250cm9sLnNldFZhbHVlKHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvblsnaGlzdG9yaWNhbFZhbHVlJ10gPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWU7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuX25vZGVDaGFuZ2UuZW1pdCh0aGlzLl9ub2RlKTtcblxuICAgICAgfVxuXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY29tcGFyZVN0cmluZyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub2RlKG5vZGU6IE5vZGVCYXNlKSB7XG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgICBpZiAodGhpcy5fbm9kZS5xdWVzdGlvbi5lbmFibGVIaXN0b3JpY2FsVmFsdWUgJiYgIV8uaXNVbmRlZmluZWQodGhpcy5fbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlKSkge1xuICAgICAgICBjb25zdCBkaXNwbGF5OiBhbnkgPSB7IHRleHQ6ICcnLCBfZGF0ZTogJycgfTtcbiAgICAgICAgaWYgKCh0aGlzLl9ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWxlY3QnXG4gICAgICAgICAgfHwgdGhpcy5fbm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnbXVsdGktc2VsZWN0JykpIHtcblxuICAgICAgICAgIGRpc3BsYXkudGV4dCA9IHRoaXMuaGlzdG9yaWNhbEZpZWxkSGVscGVyLmdldERpc3BsYXlUZXh0RnJvbU9wdGlvbnMoXG4gICAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uLFxuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICdsYWJlbCdcbiAgICAgICAgICApO1xuICAgICAgICAgIGRpc3BsYXkuX2RhdGUgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWVEYXRlO1xuXG4gICAgICAgICAgdGhpcy5fbm9kZS5xdWVzdGlvblsnaGlzdG9yaWNhbERpc3BsYXknXSA9IGRpc3BsYXk7XG5cbiAgICAgICAgfSBlbHNlIGlmICghXy5pc1VuZGVmaW5lZCh0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUpKSB7XG5cbiAgICAgICAgICBkaXNwbGF5LnRleHQgPSB0aGlzLl9ub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEYXRhVmFsdWUudmFsdWU7XG4gICAgICAgICAgZGlzcGxheS5fZGF0ZSA9IHRoaXMuX25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZS52YWx1ZURhdGU7XG5cbiAgICAgICAgICB0aGlzLl9ub2RlLnF1ZXN0aW9uWydoaXN0b3JpY2FsRGlzcGxheSddID0gZGlzcGxheTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=