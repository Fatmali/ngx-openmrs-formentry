/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-picker.component
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment_ from 'moment';
/** @type {?} */
var moment = moment_;
import * as _ from 'lodash';
// const myDpStyles: string = require('./date-picker.component.css');
// const myDpTpl: string = require('./date-picker.component.html');
// webpack2_
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent() {
        this.locale = 'en';
        this.viewFormat = 'll';
        this.returnObject = 'js';
        this.onDatePickerCancel = new EventEmitter();
        this.onSelectDate = new EventEmitter();
        this.onDisplayMonths = false;
        this.onDisplayYears = false;
        this.displayYearsIndex = 0;
        this.monthsShort = moment.monthsShort();
    }
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.initValue();
        // default to current year range
        _.each(this.fullYearRange, function (v, i) {
            _this.currentYear = _this.calendarDate.clone().startOf('year').year();
            if (v.indexOf(_this.currentYear) !== -1) {
                _this.displayYearsIndex = i;
            }
        });
        this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        this.generateCalendar();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.prev = /**
     * @return {?}
     */
    function () {
        if (this.onDisplayYears) {
            this.displayYearsIndex--;
            if (this.displayYearsIndex < 0) {
                this.displayYearsIndex = 0;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex];
        }
        else {
            this.calendarDate = this.calendarDate.clone().subtract(1, 'M');
        }
        this.generateCalendar();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.showMonthSelection = /**
     * @return {?}
     */
    function () {
        this.onDisplayMonths = true;
        this.onDisplayYears = false;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.showYearSelection = /**
     * @return {?}
     */
    function () {
        this.onDisplayYears = true;
        this.onDisplayMonths = false;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        if (this.onDisplayYears) {
            this.displayYearsIndex++;
            if (this.displayYearsIndex >= this.fullYearRange.length) {
                this.displayYearsIndex = this.fullYearRange.length - 1;
            }
            this.displayYearRange = this.fullYearRange[this.displayYearsIndex++];
        }
        else {
            this.calendarDate = this.calendarDate.clone().add(1, 'M');
        }
        this.generateCalendar();
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DatePickerComponent.prototype.selectDay = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        /** @type {?} */
        var daysDifference = day.diff(this.calendarDate.clone().startOf('date'), 'days');
        day = this.calendarDate.clone().add(daysDifference, 'd');
        /** @type {?} */
        var selectedDay = this.parseToReturnObjectType(day);
        this.onSelectDate.emit(selectedDay);
        this.cancelDatePicker();
        return;
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DatePickerComponent.prototype.selectMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.calendarDate = this.calendarDate.clone().month(month);
        this.onDisplayMonths = false;
        this.generateCalendar();
    };
    /**
     * @param {?} year
     * @return {?}
     */
    DatePickerComponent.prototype.selectYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.calendarDate = this.calendarDate.clone().year(year);
        this.onDisplayYears = false;
        this.generateCalendar();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.selectToday = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var today = this.parseToReturnObjectType(moment());
        this.onSelectDate.emit(today);
        this.cancelDatePicker();
        return;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.clearPickDate = /**
     * @return {?}
     */
    function () {
        this.onSelectDate.emit(null);
        this.cancelDatePicker();
        return;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.cancelDatePicker = /**
     * @return {?}
     */
    function () {
        this.onDatePickerCancel.emit(false);
        return;
    };
    /**
     * @protected
     * @return {?}
     */
    DatePickerComponent.prototype.generateYears = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentYear = moment().year();
        /** @type {?} */
        var startYr = this.calendarDate.clone().subtract(100, 'y').year();
        // const endYr = this.calendarDate.clone().add(10, 'y').year();
        /** @type {?} */
        var years = [];
        for (var year = startYr; year <= currentYear; year++) {
            years.push(year);
        }
        this.fullYearRange = _.chunk(years, 14);
    };
    /**
     * @protected
     * @return {?}
     */
    DatePickerComponent.prototype.initValue = /**
     * @protected
     * @return {?}
     */
    function () {
        // set moment locale (default is en)
        moment.locale(this.locale);
        // set today value
        this.today = moment().startOf('date');
        this.currentMonth = this.monthsShort[moment().month()];
        this.currentYear = moment().year();
        // set week days name array
        this.dayNames = moment.weekdaysShort(true);
        // check if the input initDate has value
        if (this.initDate) {
            this.calendarDate = this.returnObject === 'string' ? moment(this.initDate, this.viewFormat) :
                moment(this.initDate);
            this.selectedDate = this.calendarDate.clone().startOf('date');
        }
        else {
            this.calendarDate = moment();
        }
        this.generateYears();
    };
    /**
     * @protected
     * @return {?}
     */
    DatePickerComponent.prototype.generateCalendar = /**
     * @protected
     * @return {?}
     */
    function () {
        this.calendarDays = [];
        /** @type {?} */
        var start = 0 - (this.calendarDate.clone().startOf('month').day() +
            (7 - moment.localeData().firstDayOfWeek())) % 7;
        /** @type {?} */
        var end = 41 + start;
        for (var i = start; i <= end; i += 1) {
            /** @type {?} */
            var day = this.calendarDate.clone().startOf('month').add(i, 'days');
            this.calendarDays.push(day);
        }
    };
    /**
     * @protected
     * @param {?} day
     * @return {?}
     */
    DatePickerComponent.prototype.parseToReturnObjectType = /**
     * @protected
     * @param {?} day
     * @return {?}
     */
    function (day) {
        switch (this.returnObject) {
            case 'js':
                return day.toDate();
            case 'string':
                return day.format(this.viewFormat);
            case 'moment':
                return day;
            case 'json':
                return day.toJSON();
            case 'array':
                return day.toArray();
            case 'iso':
                return day.toISOString();
            case 'object':
                return day.toObject();
            default:
                return day;
        }
    };
    DatePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-picker',
                    template: "<picker-modal (onOverlayClick)=\"cancelDatePicker()\">\n  <div class=\"picker-wrap\">\n    <div class=\"picker-box\">\n      <div class=\"picker-header\">\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-prev\" (click)=\"prev()\"></span>\n        </div>\n        <div class=\"picker-header-content\">\n          <div class=\"content\">\n            <span (click)=\"showMonthSelection()\" class=\"month\">{{calendarDate | moment: \"MMMM\"}}</span>\n            <span class=\"seperator\">|</span>\n            <span (click)=\"showYearSelection()\" class=\"year\">{{calendarDate | moment: \"YYYY\"}}</span>\n          </div>\n        </div>\n        <div class=\"picker-header-nav\">\n          <span class=\"nav-next\" (click)=\"next()\"></span>\n        </div>\n      </div>\n      <div class=\"picker-calendar\">\n        <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n          <span class=\"picker-weekday\" *ngFor=\"let day of dayNames\">{{ day }}</span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"!onDisplayMonths && !onDisplayYears\">\n                    <span class=\"picker-day\" (click)=\"selectDay(day)\" [ngClass]=\"{\n                       'out-focus': day.month() != calendarDate.month(),\n                       'today': day.isSame(today),\n                       'selected': day.isSame(selectedDate)\n                      }\" *ngFor=\"let day of calendarDays\">\n                    {{ day | moment: 'D'}}\n                </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayMonths\">\n                    <span class=\"picker-month\" *ngFor=\"let month of monthsShort\"\n                          (click)=\"selectMonth(month)\"\n                          [ngClass]=\"{\n                       'selected': month === currentMonth\n                      }\">\n                    {{ month }}\n                </span>\n        </div>\n        <div class=\"picker-calendar-row\" *ngIf=\"onDisplayYears\">\n                    <span class=\"picker-year\" *ngFor=\"let year of displayYearRange\"\n                          (click)=\"selectYear(year)\"\n                          [ngClass]=\"{\n                       'selected': year === currentYear\n                      }\">\n                    {{ year }}\n                </span>\n        </div>\n      </div>\n      <div class=\"picker-footer\">\n        <div class=\"picker-action action-today\" (click)=\"selectToday()\"><span class=\"text\">Today</span></div>\n        <div class=\"picker-action action-clear\" (click)=\"clearPickDate()\"><span class=\"text\">Clear</span></div>\n        <div class=\"picker-action action-close\" (click)=\"cancelDatePicker()\"><span class=\"text\">Close</span></div>\n      </div>\n    </div>\n  </div>\n</picker-modal>\n",
                    styles: ["*,::after,::before{box-sizing:border-box}.picker-wrap{width:95vw;max-width:666px}.picker-box{font-family:'Open Sans';min-width:400px!important;padding:.625rem 1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picker-footer,.picker-header{font-size:1.333rem;line-height:2.5rem;display:flex;height:2.5rem;width:100%}.picker-header-nav{position:relative;cursor:pointer;width:calc(100% / 8)}.picker-header-nav>*{position:absolute;top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.picker-header-nav .nav-next::before,.picker-header-nav .nav-prev::before{content:\" \";border-top:.5em solid transparent;border-bottom:.5em solid transparent;border-right:.75em solid #000;width:0;height:0;display:block;margin:0 auto}.picker-header-nav .nav-next::before{border-right:0;border-left:.75em solid #000}.picker-header-content{width:calc(100% * 6 / 8);text-align:center}.picker-header-content .month{font-size:1.778rem;line-height:2.5rem;margin-right:.5rem;font-weight:700}.picker-header-content .year{font-style:italic;color:#999}.picker-calendar{width:100%}.picker-calendar .picker-calendar-row{display:flex;flex-wrap:wrap;width:100%;margin-bottom:.625rem}.picker-calendar .picker-weekday{font-weight:700;text-align:left;color:#999;width:calc(100% / 7)}.picker-calendar .picker-day,.picker-calendar .picker-month,.picker-calendar .picker-year{font-size:1.333rem;line-height:2.5rem;position:relative;height:2.5rem;text-align:center;cursor:pointer;width:calc(100% / 7)}.picker-calendar .picker-day:hover,.picker-calendar .picker-month:hover,.picker-calendar .picker-year:hover{background:#b1dcfb}.picker-calendar .out-focus{color:#ddd}.picker-calendar .out-focus:hover{color:#000}.picker-calendar .selected{background:#0089ec;color:#fff}.picker-calendar .selected:hover{background:#0089ec}.picker-calendar .today::before{content:\" \";position:absolute;top:2px;right:2px;width:0;height:0;border-top:.5em solid #0059bc;border-left:.5em solid transparent}.picker-footer{cursor:pointer}.picker-footer .picker-action{text-align:center;width:calc(100% / 3)}.picker-footer .picker-action:hover{background-color:#b1dcfb}.picker-footer .picker-action .text{padding-left:.8rem}.picker-footer .action-clear::before,.picker-footer .action-close::before,.picker-footer .action-today::before{content:\" \";position:relative;display:inline-block;height:0;width:0}.picker-footer .action-today::before{border-top:.66em solid #0059bc;border-left:.66em solid transparent}.picker-footer .action-clear::before{top:-.5rem;width:1rem;border-top:3px solid #e20}.picker-footer .action-close::before{width:1rem;height:1rem;background:linear-gradient(to bottom,transparent 35%,#777 35%,#777 65%,transparent 65%),linear-gradient(to right,transparent 35%,#777 35%,#777 65%,transparent 65%);-webkit-transform:rotate(45deg);transform:rotate(45deg)}"]
                }] }
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return []; };
    DatePickerComponent.propDecorators = {
        initDate: [{ type: Input }],
        locale: [{ type: Input }],
        viewFormat: [{ type: Input }],
        returnObject: [{ type: Input }],
        onDatePickerCancel: [{ type: Output }],
        onSelectDate: [{ type: Output }]
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
if (false) {
    /** @type {?} */
    DatePickerComponent.prototype.dayNames;
    /** @type {?} */
    DatePickerComponent.prototype.initDate;
    /** @type {?} */
    DatePickerComponent.prototype.locale;
    /** @type {?} */
    DatePickerComponent.prototype.viewFormat;
    /** @type {?} */
    DatePickerComponent.prototype.returnObject;
    /** @type {?} */
    DatePickerComponent.prototype.onDatePickerCancel;
    /** @type {?} */
    DatePickerComponent.prototype.onSelectDate;
    /** @type {?} */
    DatePickerComponent.prototype.calendarDate;
    /** @type {?} */
    DatePickerComponent.prototype.selectedDate;
    /** @type {?} */
    DatePickerComponent.prototype.currentMonth;
    /** @type {?} */
    DatePickerComponent.prototype.today;
    /** @type {?} */
    DatePickerComponent.prototype.currentYear;
    /** @type {?} */
    DatePickerComponent.prototype.onDisplayMonths;
    /** @type {?} */
    DatePickerComponent.prototype.onDisplayYears;
    /** @type {?} */
    DatePickerComponent.prototype.displayYearsIndex;
    /** @type {?} */
    DatePickerComponent.prototype.displayYearRange;
    /** @type {?} */
    DatePickerComponent.prototype.fullYearRange;
    /** @type {?} */
    DatePickerComponent.prototype.monthsShort;
    /** @type {?} */
    DatePickerComponent.prototype.calendarDays;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFFNUIsTUFBTSxHQUFHLE9BQU87QUFDdEIsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7QUFTNUI7SUE4QkU7UUFuQmdCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ25CLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDakQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBT2pELG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUd0QixnQkFBVyxHQUFrQixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFJekQsQ0FBQzs7OztJQUVNLHNDQUFROzs7SUFBZjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGdDQUFnQztRQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUM5QixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUks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QU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXZCLEtBQUssS0FBSztnQkFDUixPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUUzQixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFeEI7Z0JBQ0UsT0FBTyxHQUFHLENBQUM7U0FDZDtJQUNILENBQUM7O2dCQWxNRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLHN5RkFBMkM7O2lCQUU1Qzs7Ozs7MkJBTUUsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7K0JBQ0wsS0FBSztxQ0FDTCxNQUFNOytCQUNOLE1BQU07O0lBb0xULDBCQUFDO0NBQUEsQUFuTUQsSUFtTUM7U0E3TFksbUJBQW1COzs7SUFFOUIsdUNBQStCOztJQUUvQix1Q0FBOEI7O0lBQzlCLHFDQUE4Qjs7SUFDOUIseUNBQWtDOztJQUNsQywyQ0FBb0M7O0lBQ3BDLGlEQUFrRTs7SUFDbEUsMkNBQXdEOztJQUV4RCwyQ0FBNEI7O0lBQzVCLDJDQUE0Qjs7SUFDNUIsMkNBQTBCOztJQUMxQixvQ0FBcUI7O0lBQ3JCLDBDQUEyQjs7SUFDM0IsOENBQStCOztJQUMvQiw2Q0FBOEI7O0lBQzlCLGdEQUE2Qjs7SUFDN0IsK0NBQXVDOztJQUN2Qyw0Q0FBaUM7O0lBQ2pDLDBDQUF5RDs7SUFDekQsMkNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXBpY2tlci5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQvbW9tZW50JztcblxuLy8gd2VicGFjazFfXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XG4vLyBjb25zdCBteURwU3R5bGVzOiBzdHJpbmcgPSByZXF1aXJlKCcuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5jc3MnKTtcbi8vIGNvbnN0IG15RHBUcGw6IHN0cmluZyA9IHJlcXVpcmUoJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnKTtcbi8vIHdlYnBhY2syX1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgZGF5TmFtZXM6IEFycmF5PHN0cmluZz47XG5cbiAgQElucHV0KCkgcHVibGljIGluaXREYXRlOiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBsb2NhbGUgPSAnZW4nO1xuICBASW5wdXQoKSBwdWJsaWMgdmlld0Zvcm1hdCA9ICdsbCc7XG4gIEBJbnB1dCgpIHB1YmxpYyByZXR1cm5PYmplY3QgPSAnanMnO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRGF0ZVBpY2tlckNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvblNlbGVjdERhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgY2FsZW5kYXJEYXRlOiBNb21lbnQ7XG4gIHB1YmxpYyBzZWxlY3RlZERhdGU6IE1vbWVudDtcbiAgcHVibGljIGN1cnJlbnRNb250aDogYW55IDtcbiAgcHVibGljIHRvZGF5OiBNb21lbnQ7XG4gIHB1YmxpYyBjdXJyZW50WWVhcjogbnVtYmVyO1xuICBwdWJsaWMgb25EaXNwbGF5TW9udGhzID0gZmFsc2U7XG4gIHB1YmxpYyBvbkRpc3BsYXlZZWFycyA9IGZhbHNlO1xuICBwdWJsaWMgZGlzcGxheVllYXJzSW5kZXggPSAwO1xuICBwdWJsaWMgZGlzcGxheVllYXJSYW5nZTogQXJyYXk8bnVtYmVyPjtcbiAgcHVibGljIGZ1bGxZZWFyUmFuZ2U6IEFycmF5PGFueT47XG4gIHB1YmxpYyBtb250aHNTaG9ydDogQXJyYXk8c3RyaW5nPiA9IG1vbWVudC5tb250aHNTaG9ydCgpO1xuICBwdWJsaWMgY2FsZW5kYXJEYXlzOiBBcnJheTxNb21lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdFZhbHVlKCk7XG4gICAgLy8gZGVmYXVsdCB0byBjdXJyZW50IHllYXIgcmFuZ2VcbiAgICBfLmVhY2godGhpcy5mdWxsWWVhclJhbmdlLCAodiwgaSkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZigneWVhcicpLnllYXIoKTtcbiAgICAgIGlmICh2LmluZGV4T2YodGhpcy5jdXJyZW50WWVhcikgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXggPSBpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZGlzcGxheVllYXJSYW5nZSA9IHRoaXMuZnVsbFllYXJSYW5nZVt0aGlzLmRpc3BsYXlZZWFyc0luZGV4XTtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9uRGlzcGxheVllYXJzKSB7XG4gICAgICB0aGlzLmRpc3BsYXlZZWFyc0luZGV4LS07XG4gICAgICBpZiAodGhpcy5kaXNwbGF5WWVhcnNJbmRleCA8IDApIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5WWVhcnNJbmRleCA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BsYXlZZWFyUmFuZ2UgPSB0aGlzLmZ1bGxZZWFyUmFuZ2VbdGhpcy5kaXNwbGF5WWVhcnNJbmRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnTScpO1xuICAgIH1cbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TW9udGhTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5vbkRpc3BsYXlNb250aHMgPSB0cnVlO1xuICAgIHRoaXMub25EaXNwbGF5WWVhcnMgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93WWVhclNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLm9uRGlzcGxheVllYXJzID0gdHJ1ZTtcbiAgICB0aGlzLm9uRGlzcGxheU1vbnRocyA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub25EaXNwbGF5WWVhcnMpIHtcbiAgICAgIHRoaXMuZGlzcGxheVllYXJzSW5kZXgrKztcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlZZWFyc0luZGV4ID49IHRoaXMuZnVsbFllYXJSYW5nZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5WWVhcnNJbmRleCA9IHRoaXMuZnVsbFllYXJSYW5nZS5sZW5ndGggLSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5kaXNwbGF5WWVhclJhbmdlID0gdGhpcy5mdWxsWWVhclJhbmdlW3RoaXMuZGlzcGxheVllYXJzSW5kZXgrK107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5hZGQoMSwgJ00nKTtcbiAgICB9XG4gICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0RGF5KGRheTogTW9tZW50KTogdm9pZCB7XG4gICAgY29uc3QgZGF5c0RpZmZlcmVuY2UgPSBkYXkuZGlmZih0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ2RhdGUnKSwgJ2RheXMnKTtcbiAgICBkYXkgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLmFkZChkYXlzRGlmZmVyZW5jZSwgJ2QnKTtcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHRoaXMucGFyc2VUb1JldHVybk9iamVjdFR5cGUoZGF5KTtcbiAgICB0aGlzLm9uU2VsZWN0RGF0ZS5lbWl0KHNlbGVjdGVkRGF5KTtcbiAgICB0aGlzLmNhbmNlbERhdGVQaWNrZXIoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0TW9udGgobW9udGg6IHN0cmluZykge1xuICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS5tb250aChtb250aCk7XG4gICAgdGhpcy5vbkRpc3BsYXlNb250aHMgPSBmYWxzZTtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RZZWFyKHllYXI6IG51bWJlcikge1xuICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5jYWxlbmRhckRhdGUuY2xvbmUoKS55ZWFyKHllYXIpO1xuICAgIHRoaXMub25EaXNwbGF5WWVhcnMgPSBmYWxzZTtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RUb2RheSgpOiB2b2lkIHtcbiAgICBjb25zdCB0b2RheSA9IHRoaXMucGFyc2VUb1JldHVybk9iamVjdFR5cGUobW9tZW50KCkpO1xuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQodG9kYXkpO1xuICAgIHRoaXMuY2FuY2VsRGF0ZVBpY2tlcigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclBpY2tEYXRlKCk6IHZvaWQge1xuICAgIHRoaXMub25TZWxlY3REYXRlLmVtaXQobnVsbCk7XG4gICAgdGhpcy5jYW5jZWxEYXRlUGlja2VyKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHVibGljIGNhbmNlbERhdGVQaWNrZXIoKTogdm9pZCB7XG4gICAgdGhpcy5vbkRhdGVQaWNrZXJDYW5jZWwuZW1pdChmYWxzZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlWWVhcnMoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFllYXIgPSBtb21lbnQoKS55ZWFyKCk7XG4gICAgY29uc3Qgc3RhcnRZciA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3VidHJhY3QoMTAwLCAneScpLnllYXIoKTtcbiAgICAvLyBjb25zdCBlbmRZciA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuYWRkKDEwLCAneScpLnllYXIoKTtcbiAgICBjb25zdCB5ZWFycyA9IFtdO1xuICAgIGZvciAobGV0IHllYXIgPSBzdGFydFlyOyB5ZWFyIDw9IGN1cnJlbnRZZWFyOyB5ZWFyKyspIHtcbiAgICAgIHllYXJzLnB1c2goeWVhcik7XG4gICAgfVxuXG4gICAgdGhpcy5mdWxsWWVhclJhbmdlID0gXy5jaHVuayh5ZWFycywgMTQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRWYWx1ZSgpIHtcblxuICAgIC8vIHNldCBtb21lbnQgbG9jYWxlIChkZWZhdWx0IGlzIGVuKVxuICAgIG1vbWVudC5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIC8vIHNldCB0b2RheSB2YWx1ZVxuICAgIHRoaXMudG9kYXkgPSBtb21lbnQoKS5zdGFydE9mKCdkYXRlJyk7XG4gICAgdGhpcy5jdXJyZW50TW9udGggPSB0aGlzLm1vbnRoc1Nob3J0W21vbWVudCgpLm1vbnRoKCldO1xuICAgIHRoaXMuY3VycmVudFllYXIgPSBtb21lbnQoKS55ZWFyKCk7XG5cbiAgICAvLyBzZXQgd2VlayBkYXlzIG5hbWUgYXJyYXlcbiAgICB0aGlzLmRheU5hbWVzID0gbW9tZW50LndlZWtkYXlzU2hvcnQodHJ1ZSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgaW5wdXQgaW5pdERhdGUgaGFzIHZhbHVlXG4gICAgaWYgKHRoaXMuaW5pdERhdGUpIHtcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRlID0gdGhpcy5yZXR1cm5PYmplY3QgPT09ICdzdHJpbmcnID8gbW9tZW50KHRoaXMuaW5pdERhdGUsIHRoaXMudmlld0Zvcm1hdCkgOlxuICAgICAgICBtb21lbnQodGhpcy5pbml0RGF0ZSk7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignZGF0ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF0ZSA9IG1vbWVudCgpO1xuICAgIH1cbiAgICB0aGlzLmdlbmVyYXRlWWVhcnMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZW5lcmF0ZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgIHRoaXMuY2FsZW5kYXJEYXlzID0gW107XG4gICAgY29uc3Qgc3RhcnQgPSAwIC0gKHRoaXMuY2FsZW5kYXJEYXRlLmNsb25lKCkuc3RhcnRPZignbW9udGgnKS5kYXkoKSArXG4gICAgICg3IC0gbW9tZW50LmxvY2FsZURhdGEoKS5maXJzdERheU9mV2VlaygpKSkgJSA3O1xuICAgIGNvbnN0IGVuZCA9IDQxICsgc3RhcnQ7IC8vIGl0ZXJhdG9yIGVuZGluZyBwb2ludFxuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBkYXkgPSB0aGlzLmNhbGVuZGFyRGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJykuYWRkKGksICdkYXlzJyk7XG4gICAgICB0aGlzLmNhbGVuZGFyRGF5cy5wdXNoKGRheSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlVG9SZXR1cm5PYmplY3RUeXBlKGRheTogTW9tZW50KTogYW55IHtcbiAgICBzd2l0Y2ggKHRoaXMucmV0dXJuT2JqZWN0KSB7XG4gICAgICBjYXNlICdqcyc6XG4gICAgICAgIHJldHVybiBkYXkudG9EYXRlKCk7XG5cbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBkYXkuZm9ybWF0KHRoaXMudmlld0Zvcm1hdCk7XG5cbiAgICAgIGNhc2UgJ21vbWVudCc6XG4gICAgICAgIHJldHVybiBkYXk7XG5cbiAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICByZXR1cm4gZGF5LnRvSlNPTigpO1xuXG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgIHJldHVybiBkYXkudG9BcnJheSgpO1xuXG4gICAgICBjYXNlICdpc28nOlxuICAgICAgICByZXR1cm4gZGF5LnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiBkYXkudG9PYmplY3QoKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRheTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==