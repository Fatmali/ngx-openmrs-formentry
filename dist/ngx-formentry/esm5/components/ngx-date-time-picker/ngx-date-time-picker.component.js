/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
/** @type {?} */
export var MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var NgxDateTimePickerComponent = /** @class */ (function () {
    function NgxDateTimePickerComponent() {
        // public date = new FormControl(moment());
        this.selectedTime = moment().format('HH:mm');
        this.selectedDate = moment().format();
        this.loadInitial = false;
        this.weeks = [0, 2, 4, 6, 8, 12, 16, 24];
        this.showTime = false;
        this.showWeeks = true;
        this.onDateChange = new EventEmitter();
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.registerOnChange = /**
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
    NgxDateTimePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.onTimeSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var setDate = moment(this.selectedDate);
        /** @type {?} */
        var setTime = $event;
        this.setDateTime(setDate, setTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.onDateSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var setDate = moment($event.value);
        /** @type {?} */
        var setTime = this.selectedTime;
        /** @type {?} */
        var dateString = this.setDateTime(setDate, setTime);
        /** @type {?} */
        var selectedDate = $event.value;
        this.value = dateString;
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setCurrentTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var setDate = moment(this.selectedDate);
        /** @type {?} */
        var currentTime = moment().format('HH:mm:ss');
        this.setDateTime(setDate, currentTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.weekSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var dateToUse = moment().format();
        /** @type {?} */
        var nextWeekDate = moment(dateToUse).add($event, 'weeks');
        /** @type {?} */
        var nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getWeekPickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getDatePickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        if (this.showTime === true) {
            return 'col-sm-8 form-group';
        }
        return 'col-sm-12 form-group';
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getTimePickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    };
    /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setDateTime = /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    function (setDate, setTime) {
        /** @type {?} */
        var newDate = moment(setDate).format('DD-MM-YYYY');
        /** @type {?} */
        var newTime;
        if (this.showTime) {
            newTime = setTime;
        }
        else {
            newTime = '00:00:00';
        }
        /** @type {?} */
        var newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
        /** @type {?} */
        var dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = newTime;
        this.value = dateTimeString;
        this.onChange(this.value);
        return dateTimeString;
    };
    NgxDateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-date-time-picker',
                    template: "<div>\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input matInput \n              [matDatepicker]=\"picker\" \n              class=\"form-control\" \n              [value]=\"value\" \n              placeholder=\"Choose a date\" \n              (dateChange)=\"onDateSelect($event)\"\n              (click)=\"picker.open()\"\n              readonly\n        >\n        <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\n        <mat-datepicker-toggle matSuffix [for]=\"picker\" class=\"input-group-btn\"></mat-datepicker-toggle>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select placeholder=\"Select Weeks\" class=\"form-control\" name=\"weeks\" [value]=\"modelValue\" (ngModelChange)=\"weekSelect($event)\">\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{count}} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n      <div class=\"input-group\">\n        <input type=\"time\" class=\"form-control\" atp-time-picker [value]=\"selectedTime\" (ngModelChange)=\"onTimeSelect($event)\"\n          id=\"ngx-atp-time-picker\" />\n        <div class=\"input-group-btn\">\n          <button mat-raised-button class=\"btn btn-default\" (click)=\"setCurrentTime()\">\n            Set Current Time\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>",
                    providers: [
                        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
                        { provide: DateAdapter, useClass: MomentDateAdapter },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgxDateTimePickerComponent; }),
                            multi: true
                        }
                    ],
                    styles: ["#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}"]
                }] }
    ];
    NgxDateTimePickerComponent.propDecorators = {
        weeks: [{ type: Input }],
        modelValue: [{ type: Input }],
        showTime: [{ type: Input }],
        showWeeks: [{ type: Input }],
        onDateChange: [{ type: Output }]
    };
    return NgxDateTimePickerComponent;
}());
export { NgxDateTimePickerComponent };
if (false) {
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedDate;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.loadInitial;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.value;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.weeks;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.modelValue;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showWeeks;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onDateChange;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onChange;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBQzVCLE1BQU0sR0FBRyxPQUFPOztBQUV0QixNQUFNLEtBQU8sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0o7QUFFRDtJQUFBOztRQWlCVyxpQkFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxpQkFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFVBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFB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QkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzsrQkFDTCxNQUFNOztJQXlHWCxpQ0FBQztDQUFBLEFBbElELElBa0lDO1NBcEhZLDBCQUEwQjs7O0lBR25DLGtEQUErQzs7SUFDL0Msa0RBQXdDOztJQUN4QyxpREFBMkI7O0lBQzNCLDJDQUFhOztJQUNiLDJDQUF1RDs7SUFDdkQsZ0RBQXlCOztJQUN6Qiw4Q0FBMEI7O0lBQzFCLCtDQUEwQjs7SUFDMUIsa0RBQWlEOztJQUNqRCw4Q0FBaUM7O0lBQ2pDLCtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNb21lbnREYXRlQWRhcHRlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLW1vbWVudC1hZGFwdGVyJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmV4cG9ydCBjb25zdCBNWV9GT1JNQVRTID0ge1xuICAgIHBhcnNlOiB7XG4gICAgICAgIGRhdGVJbnB1dDogJ0xMJyxcbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgICAgZGF0ZUlucHV0OiAnTEwnLFxuICAgICAgICBtb250aFllYXJMYWJlbDogJ01NTSBZWVlZJyxcbiAgICAgICAgZGF0ZUExMXlMYWJlbDogJ0xMJyxcbiAgICAgICAgbW9udGhZZWFyQTExeUxhYmVsOiAnTU1NTSBZWVlZJyxcbiAgICB9LFxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtZGF0ZS10aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1ZX0ZPUk1BVFMgfSxcbiAgICAgICAgeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8vIHB1YmxpYyBkYXRlID0gbmV3IEZvcm1Db250cm9sKG1vbWVudCgpKTtcbiAgICBwdWJsaWMgc2VsZWN0ZWRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbScpO1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICBwdWJsaWMgbG9hZEluaXRpYWwgPSBmYWxzZTtcbiAgICBwdWJsaWMgdmFsdWU7XG4gICAgQElucHV0KCkgd2Vla3M6IG51bWJlcltdID0gWzAsIDIsIDQsIDYsIDgsIDEyLCAxNiwgMjRdO1xuICAgIEBJbnB1dCgpIG1vZGVsVmFsdWU6IGFueTtcbiAgICBASW5wdXQoKSBzaG93VGltZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dXZWVrcyA9IHRydWU7XG4gICAgQE91dHB1dCgpIG9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xuICAgIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25UaW1lU2VsZWN0KCRldmVudCkge1xuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9ICRldmVudDtcbiAgICAgICAgdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlU2VsZWN0KCRldmVudCkge1xuXG4gICAgICAgIGNvbnN0IHNldERhdGUgPSBtb21lbnQoJGV2ZW50LnZhbHVlKTtcbiAgICAgICAgY29uc3Qgc2V0VGltZSA9IHRoaXMuc2VsZWN0ZWRUaW1lO1xuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5zZXREYXRlVGltZShzZXREYXRlLCBzZXRUaW1lKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZERhdGUgPSAkZXZlbnQudmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSBkYXRlU3RyaW5nO1xuXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2V0Q3VycmVudFRpbWUoKSB7XG5cbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIGN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2Vla1NlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGF0ZVRvVXNlID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgIGNvbnN0IG5leHRXZWVrRGF0ZSA9IG1vbWVudChkYXRlVG9Vc2UpLmFkZCgkZXZlbnQsICd3ZWVrcycpO1xuICAgICAgICBjb25zdCBuZXh0V2Vla1RpbWUgPSBkYXRlVG9Vc2U7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUobmV4dFdlZWtEYXRlLCBuZXh0V2Vla1RpbWUpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGdldFdlZWtQaWNrZXJDc3NDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTIgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdjb2wtc20tMyBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0ZVBpY2tlckNzc0NsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnNob3dXZWVrcykge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tNSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tOSBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS04IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY29sLXNtLTEyIGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lICYmIHRoaXMuc2hvd1dlZWtzKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS01IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtzID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS05IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY29sLXNtLTQgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgcHVibGljIHNldERhdGVUaW1lKHNldERhdGUsIHNldFRpbWUpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IG1vbWVudChzZXREYXRlKS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcbiAgICAgICAgbGV0IG5ld1RpbWU7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gc2V0VGltZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSAnMDA6MDA6MDAnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0RhdGVUaW1lID0gbW9tZW50KG5ld0RhdGUgKyAnJyArIG5ld1RpbWUsICdERC1NTS1ZWVlZIEhIOm1tOnNzJyk7XG4gICAgICAgIGNvbnN0IGRhdGVUaW1lU3RyaW5nID0gbW9tZW50KG5ld0RhdGVUaW1lKS5mb3JtYXQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlVGltZVN0cmluZztcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBuZXdUaW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGVUaW1lU3RyaW5nO1xuXG5cbiAgICB9XG59XG4iXX0=