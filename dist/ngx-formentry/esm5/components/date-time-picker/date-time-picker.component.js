/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
var /** @type {?} */ Moment = moment_;
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent() {
        this.showDate = true;
        this.showTime = false;
        this.showWeeks = false;
        this.weeks = [2, 4, 6, 8, 12, 16, 24];
        this.onDateChange = new EventEmitter();
        this.showDatePicker = false;
        this.showTimePicker = false;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    /**
     * @return {?}
     */
    DateTimePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} count
     * @return {?}
     */
    DateTimePickerComponent.prototype.weeksSelected = /**
     * @param {?} count
     * @return {?}
     */
    function (count) {
        var /** @type {?} */ now = new Date();
        var /** @type {?} */ nextDate = now.setDate(now.getDate() + count * 7);
        this.value = Moment(nextDate).format();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateTimePickerComponent.prototype.setDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date && date !== '') {
            this.value = Moment(date).format();
        }
        else {
            this.value = date;
        }
    };
    /**
     * @param {?} time
     * @return {?}
     */
    DateTimePickerComponent.prototype.setTime = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        if (time && time !== '') {
            this.value = Moment(time).format();
        }
        else {
            this.value = time;
        }
        return;
    };
    /**
     * @param {?} status
     * @return {?}
     */
    DateTimePickerComponent.prototype.toggleDatePicker = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        this.showDatePicker = status;
        /*setTimeout(function() {
                let _body = document.getElementById('content-wrapper').getBoundingClientRect(),
                  elem = document.getElementById('section-modal-main');
                if (elem) {
                  let elemBox = elem.getBoundingClientRect();
                  if (elemBox.bottom > _body.bottom) {
                    elem.style.bottom = '36px';
                  }
                }
              }, 0);*/
        return;
    };
    /**
     * @param {?} status
     * @return {?}
     */
    DateTimePickerComponent.prototype.toggleTimePicker = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        this.showTimePicker = status;
        return;
    };
    Object.defineProperty(DateTimePickerComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.modelValue;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.modelValue = val;
            this.onDateChange.emit(val);
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    DateTimePickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DateTimePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateTimePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value instanceof Date) {
            this.value = Moment(value).format();
        }
        else {
            this.value = value;
        }
    };
    DateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-time-picker',
                    template: "<div class='row'>\n    <div *ngIf=\"!showTime\" class='col-xs-12 col-md-12'>\n        <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n            readonly placeholder=\"Select Date\" />\n        <div *ngIf=\"showWeeks\" class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                readonly placeholder=\"Select Date\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu up\">\n                    <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showTime\" class='col-xs-8 col-md-8'>\n        <input *ngIf=\"!showWeeks\" type=\"text\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n            readonly placeholder=\"Select Date\" />\n        <div *ngIf=\"showWeeks\" class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" class=\"form-control\" [value]=\"value | date: 'mediumDate'\" (focus)=\"toggleDatePicker(true)\"\n                readonly placeholder=\"Select Date\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Weeks <span class=\"caret\"></span></button>\n                <ul class=\"dropdown-menu up\">\n                    <li (click)=\"weeksSelected(count)\" *ngFor=\"let count of weeks\"><span> {{count}} Weeks</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"showTime\" class='col-xs-4 col-md-4'>\n        <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n        />\n    </div>\n</div>\n<date-picker *ngIf=\"showDatePicker\" [initDate]=\"value\" (onSelectDate)=\"setDate($event)\" (onDatePickerCancel)=\"toggleDatePicker($event)\"></date-picker>\n\n<time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"setTime($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>",
                    styles: ["input[readonly]{background-color:#fff}.up{bottom:100%!important;top:auto!important}.glyphicon{top:1px}"],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return DateTimePickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    DateTimePickerComponent.ctorParameters = function () { return []; };
    DateTimePickerComponent.propDecorators = {
        "modelValue": [{ type: Input },],
        "showDate": [{ type: Input },],
        "showTime": [{ type: Input },],
        "showWeeks": [{ type: Input },],
        "weeks": [{ type: Input },],
        "onDateChange": [{ type: Output },],
    };
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
function DateTimePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DateTimePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DateTimePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DateTimePickerComponent.propDecorators;
    /** @type {?} */
    DateTimePickerComponent.prototype.modelValue;
    /** @type {?} */
    DateTimePickerComponent.prototype.showDate;
    /** @type {?} */
    DateTimePickerComponent.prototype.showTime;
    /** @type {?} */
    DateTimePickerComponent.prototype.showWeeks;
    /** @type {?} */
    DateTimePickerComponent.prototype.weeks;
    /** @type {?} */
    DateTimePickerComponent.prototype.onDateChange;
    /** @type {?} */
    DateTimePickerComponent.prototype.showDatePicker;
    /** @type {?} */
    DateTimePickerComponent.prototype.showTimePicker;
    /** @type {?} */
    DateTimePickerComponent.prototype.onChange;
    /** @type {?} */
    DateTimePickerComponent.prototype.onTouched;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxxQkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDOztJQThEbkI7d0JBVm9CLElBQUk7d0JBQ0osS0FBSzt5QkFDSixLQUFLO3FCQUNDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDOzRCQUMxQixJQUFJLFlBQVksRUFBTzs4QkFDeEIsS0FBSzs4QkFDTCxLQUFLO3dCQUNiLGVBQVM7eUJBQ1IsZUFBUztLQUd6Qjs7OztJQUVELDBDQUFROzs7SUFBUixlQUFjOzs7OztJQUVkLCtDQUFhOzs7O0lBQWIsVUFBYyxLQUFLO1FBQ2YscUJBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIscUJBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMxQzs7Ozs7SUFDRCx5Q0FBTzs7OztJQUFQLFVBQVEsSUFBUztRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDckI7S0FFSjs7Ozs7SUFFRCx5Q0FBTzs7OztJQUFQLFVBQVEsSUFBUztRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDckI7UUFDRCxNQUFNLENBQUM7S0FDVjs7Ozs7SUFFRCxrREFBZ0I7Ozs7SUFBaEIsVUFBaUIsTUFBZTtRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7UUFXN0IsTUFBTSxDQUFDO0tBQ1I7Ozs7O0lBRUQsa0RBQWdCOzs7O0lBQWhCLFVBQWlCLE1BQWU7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDN0IsTUFBTSxDQUFDO0tBQ1Y7SUFDRCxzQkFBSSwwQ0FBSzs7OztRQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7Ozs7O1FBRUQsVUFBVSxHQUFHO1lBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7OztPQVBBOzs7OztJQVNELGtEQUFnQjs7OztJQUFoQixVQUFpQixFQUFFO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7S0FDdEI7Ozs7O0lBRUQsbURBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQUU7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDdkI7Ozs7O0lBRUQsNENBQVU7Ozs7SUFBVixVQUFXLEtBQUs7UUFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN2QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDdEI7S0FDSjs7Z0JBcElKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsOGtGQW9DNEo7b0JBQ3RLLE1BQU0sRUFBRSxDQUFDLHdHQUF3RyxDQUFDO29CQUNsSCxTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsdUJBQXVCLEVBQXZCLENBQXVCLENBQUM7NEJBQ3RELEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKO2lCQUNKOzs7OzsrQkFFSSxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7aUNBQ0wsTUFBTTs7a0NBNURYOztTQXNEYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IE1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZGF0ZS10aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPSdyb3cnPlxuICAgIDxkaXYgKm5nSWY9XCIhc2hvd1RpbWVcIiBjbGFzcz0nY29sLXhzLTEyIGNvbC1tZC0xMic+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cIiFzaG93V2Vla3NcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ21lZGl1bURhdGUnXCIgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxuICAgICAgICAgICAgcmVhZG9ubHkgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZVwiIC8+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla3NcIiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ21lZGl1bURhdGUnXCIgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5XZWVrcyA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIChjbGljayk9XCJ3ZWVrc1NlbGVjdGVkKGNvdW50KVwiICpuZ0Zvcj1cImxldCBjb3VudCBvZiB3ZWVrc1wiPjxzcGFuPiB7e2NvdW50fX0gV2Vla3M8L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJzaG93VGltZVwiIGNsYXNzPSdjb2wteHMtOCBjb2wtbWQtOCc+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cIiFzaG93V2Vla3NcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ21lZGl1bURhdGUnXCIgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxuICAgICAgICAgICAgcmVhZG9ubHkgcGxhY2Vob2xkZXI9XCJTZWxlY3QgRGF0ZVwiIC8+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla3NcIiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ21lZGl1bURhdGUnXCIgKGZvY3VzKT1cInRvZ2dsZURhdGVQaWNrZXIodHJ1ZSlcIlxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IHBsYWNlaG9sZGVyPVwiU2VsZWN0IERhdGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5XZWVrcyA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIChjbGljayk9XCJ3ZWVrc1NlbGVjdGVkKGNvdW50KVwiICpuZ0Zvcj1cImxldCBjb3VudCBvZiB3ZWVrc1wiPjxzcGFuPiB7e2NvdW50fX0gV2Vla3M8L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJzaG93VGltZVwiIGNsYXNzPSdjb2wteHMtNCBjb2wtbWQtNCc+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ3Nob3J0VGltZSdcIiAoZm9jdXMpPVwidG9nZ2xlVGltZVBpY2tlcih0cnVlKVwiIHJlYWRvbmx5IHBsYWNlaG9sZGVyPVwiU2VsZWN0IFRpbWVcIlxuICAgICAgICAvPlxuICAgIDwvZGl2PlxuPC9kaXY+XG48ZGF0ZS1waWNrZXIgKm5nSWY9XCJzaG93RGF0ZVBpY2tlclwiIFtpbml0RGF0ZV09XCJ2YWx1ZVwiIChvblNlbGVjdERhdGUpPVwic2V0RGF0ZSgkZXZlbnQpXCIgKG9uRGF0ZVBpY2tlckNhbmNlbCk9XCJ0b2dnbGVEYXRlUGlja2VyKCRldmVudClcIj48L2RhdGUtcGlja2VyPlxuXG48dGltZS1waWNrZXIgKm5nSWY9XCJzaG93VGltZVBpY2tlclwiIFtpbml0VGltZV09XCJ2YWx1ZVwiIFt1c2UxMkhvdXJdPVwidHJ1ZVwiIChvblNlbGVjdFRpbWUpPVwic2V0VGltZSgkZXZlbnQpXCIgKG9uVGltZVBpY2tlckNhbmNlbCk9XCJ0b2dnbGVUaW1lUGlja2VyKCRldmVudClcIj48L3RpbWUtcGlja2VyPmAsXG4gICAgc3R5bGVzOiBbYGlucHV0W3JlYWRvbmx5XXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LnVwe2JvdHRvbToxMDAlIWltcG9ydGFudDt0b3A6YXV0byFpbXBvcnRhbnR9LmdseXBoaWNvbnt0b3A6MXB4fWBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgbW9kZWxWYWx1ZTogYW55O1xuICAgIEBJbnB1dCgpIHNob3dEYXRlID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dXZWVrcyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHdlZWtzOiBudW1iZXJbXSA9IFsyLCA0LCA2LCA4LCAxMiwgMTYsIDI0XTtcbiAgICBAT3V0cHV0KCkgb25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgcHVibGljIHNob3dEYXRlUGlja2VyID0gZmFsc2U7XG4gICAgcHVibGljIHNob3dUaW1lUGlja2VyID0gZmFsc2U7XG4gICAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICB3ZWVrc1NlbGVjdGVkKGNvdW50KSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IG5leHREYXRlID0gbm93LnNldERhdGUobm93LmdldERhdGUoKSArIGNvdW50ICogNyk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBNb21lbnQobmV4dERhdGUpLmZvcm1hdCgpO1xuICAgIH1cbiAgICBzZXREYXRlKGRhdGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0ZSAmJiBkYXRlICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudChkYXRlKS5mb3JtYXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBkYXRlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZXRUaW1lKHRpbWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGltZSAmJiB0aW1lICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudCh0aW1lKS5mb3JtYXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2dnbGVEYXRlUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgdGhpcy5zaG93RGF0ZVBpY2tlciA9IHN0YXR1cztcbiAgICAgIC8qc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IF9ib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQtd3JhcHBlcicpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VjdGlvbi1tb2RhbC1tYWluJyk7XG4gICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgbGV0IGVsZW1Cb3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGlmIChlbGVtQm94LmJvdHRvbSA+IF9ib2R5LmJvdHRvbSkge1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5ib3R0b20gPSAnMzZweCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAwKTsqL1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvZ2dsZVRpbWVQaWNrZXIoc3RhdHVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd1RpbWVQaWNrZXIgPSBzdGF0dXM7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbFZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5tb2RlbFZhbHVlID0gdmFsO1xuICAgICAgICB0aGlzLm9uRGF0ZUNoYW5nZS5lbWl0KHZhbCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IE1vbWVudCh2YWx1ZSkuZm9ybWF0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=