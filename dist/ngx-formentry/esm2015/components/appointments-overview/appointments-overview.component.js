/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
export class AppointmentsOverviewComponent {
    constructor() {
        this.showAppointments = false;
        this.loadingAppointments = false;
        this.errorLoadingAppointments = false;
        this.appointmentsLoaded = false;
        this.appointments = [];
        this.today = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.node.control.valueChanges.subscribe((v) => {
            this.resetProperties();
            /** @type {?} */
            const node = this.node;
            if (node.question.extras.questionOptions.concept
                && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
                    || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
                // console.log('what change is here', this.showAppointments);
                if (!this.showAppointments) {
                    this.loadingAppointments = true;
                    this.showAppointments = true;
                    /** @type {?} */
                    let dataSource;
                    if (node.form && node.form.dataSourcesContainer.dataSources) {
                        dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
                    }
                    /** @type {?} */
                    const locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                    if (dataSource && locationUuid) {
                        /** @type {?} */
                        const startDate = moment(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                        /** @type {?} */
                        const endDate = moment(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
                        this.today = moment(v).format('DD-MM-YYYY');
                        // create 5 week days
                        /** @type {?} */
                        const _data = [];
                        /** @type {?} */
                        const params = {
                            'programType': ['781d85b0-1359-11df-a1f1-0026b9348838', '781d897a-1359-11df-a1f1-0026b9348838',
                                '96047aaf-7ab3-45e9-be6a-b61810fe617d', 'c19aec66-1a40-4588-9b03-b6be55a8dd1d', 'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
                                '334c9e98-173f-4454-a8ce-f80b20b7fdf0', '96ba279b-b23b-4e78-aba9-dcbd46a96b7b', '781d8880-1359-11df-a1f1-0026b9348838']
                        };
                        /** @type {?} */
                        const urlParams = encodeURI(JSON.stringify(params));
                        for (let i = 1; i <= 5; i++) {
                            _data.push({
                                date: moment(v).startOf('week').add(i, 'day').format('DD-MM-YYYY'),
                                count: 0
                            });
                        }
                        dataSource.getMonthlySchedule({
                            startDate: startDate,
                            endDate: endDate,
                            limit: 5,
                            locationUuids: locationUuid,
                            programVisitEncounter: urlParams
                        }).subscribe((data) => {
                            this.appointmentsLoaded = true;
                            this.loadingAppointments = false;
                            _data.map((appointment, index) => {
                                appointment.count = data[index] !== undefined ? data[index].count.scheduled : 0;
                            });
                            this.appointments = _data;
                        }, (error) => {
                            this.loadingAppointments = false;
                            this.errorLoadingAppointments = true;
                            this.showAppointments = false;
                            console.error(error);
                        });
                    }
                    else {
                        this.showAppointments = false;
                        this.errorLoadingAppointments = true;
                    }
                }
            }
        });
    }
    /**
     * @return {?}
     */
    resetProperties() {
        this.loadingAppointments = false;
        this.appointmentsLoaded = false;
        this.errorLoadingAppointments = false;
        this.showAppointments = false;
        this.appointments = [];
        this.today = '';
    }
}
AppointmentsOverviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'appointments-overview',
                template: "<div *ngIf=\"showAppointments\" class=\"appointments\">\n  <p *ngIf=\"loadingAppointments\">\n    <span *ngIf=\"!appointmentsLoaded && errorLoadingAppointments\">Error checking appointments</span>\n    <span *ngIf=\"loadingAppointments\"><span\n      class=\"fa fa-spinner fa-spin\"></span>Checking appointments...</span>\n  </p>\n  <div *ngIf=\"appointmentsLoaded && !errorLoadingAppointments\">\n    <table *ngIf=\"appointments.length>0\" class=\"table table-stripped table-bordered\">\n      <thead>\n      <tr>\n        <th *ngFor=\"let appointment of appointments\" [ngClass]=\"{'active': appointment.date === today}\">\n          <span>{{appointment.date}}</span>\n        </th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td *ngFor=\"let appointment of appointments\"\n            [ngClass]=\"{'active': appointment.date === today}\">\n          <span><strong><em>{{appointment.count}}</em></strong></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n",
                styles: [".appointments{margin-top:12px;font-size:12px;color:#999}.appointments p{padding-top:12px}.appointments th{border-bottom:0!important;color:#333}.appointments td span,.appointments th span{display:block}.appointments td.active,.appointments th.active{background-color:#3c8dbc;color:#fff!important;padding:0}.appointments td.active span,.appointments th.active span{padding:4px}.appointments span.fa{display:inline-block;margin-right:7px}"]
            }] }
];
/** @nocollapse */
AppointmentsOverviewComponent.ctorParameters = () => [];
AppointmentsOverviewComponent.propDecorators = {
    node: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.node;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.showAppointments;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.loadingAppointments;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.errorLoadingAppointments;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.appointmentsLoaded;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.appointments;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.today;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBT3RCLE1BQU0sT0FBTyw2QkFBNkI7SUFReEM7UUFOQSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQzVCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsaUJBQVksR0FBZSxFQUFFLENBQUM7UUFDOUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUVYLENBQUM7Ozs7SUFFRCxRQUFRO0lBQ1IsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOztrQkFDakIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJO1lBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU87bUJBQzNDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxzQ0FBc0M7dUJBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFD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RUFBRSxFQUFFOzRCQUNYLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7NEJBQ2pDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7NEJBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO3FCQUNKO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzlCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7WUF4RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLGlnQ0FBcUQ7O2FBRXREOzs7OzttQkFFRSxLQUFLOzs7O0lBQU4sNkNBQXdCOztJQUN4Qix5REFBeUI7O0lBQ3pCLDREQUE0Qjs7SUFDNUIsaUVBQWlDOztJQUNqQywyREFBMkI7O0lBQzNCLHFEQUE4Qjs7SUFDOUIsOENBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMZWFmTm9kZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcG9pbnRtZW50cy1vdmVydmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHBvaW50bWVudHMtb3ZlcnZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hcHBvaW50bWVudHMtb3ZlcnZpZXcuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBub2RlOiBMZWFmTm9kZTtcbiAgc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICBsb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gIGVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICBhcHBvaW50bWVudHNMb2FkZWQgPSBmYWxzZTtcbiAgYXBwb2ludG1lbnRzOiBBcnJheTxhbnk+ID0gW107XG4gIHRvZGF5ID0gJyc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm5vZGUuY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2KSA9PiB7XG4gICAgICB0aGlzLnJlc2V0UHJvcGVydGllcygpO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdFxuICAgICAgICAmJiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPT09ICdhOGE2NjZiYS0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnXG4gICAgICAgIHx8IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID09PSAnYTg5ZDIzOTgtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JykpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3doYXQgY2hhbmdlIGlzIGhlcmUnLCB0aGlzLnNob3dBcHBvaW50bWVudHMpO1xuICAgICAgICBpZiAoIXRoaXMuc2hvd0FwcG9pbnRtZW50cykge1xuICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICBsZXQgZGF0YVNvdXJjZTtcbiAgICAgICAgICBpZiAobm9kZS5mb3JtICYmIG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcykge1xuICAgICAgICAgICAgZGF0YVNvdXJjZSA9IG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5tb250aGx5U2NoZWR1bGVSZXNvdXJjZVNlcnZpY2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGxvY2F0aW9uVXVpZCA9IG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy51c2VyTG9jYXRpb24udXVpZDtcbiAgICAgICAgICBpZiAoZGF0YVNvdXJjZSAmJiBsb2NhdGlvblV1aWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG1vbWVudCh2KS5zdGFydE9mKCd3ZWVrJykuYWRkKDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGUgPSBtb21lbnQodikuZW5kT2YoJ3dlZWsnKS5zdWJ0cmFjdCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICAgICAgICB0aGlzLnRvZGF5ID0gbW9tZW50KHYpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgICAgICAgICAgLy8gY3JlYXRlIDUgd2VlayBkYXlzXG4gICAgICAgICAgICBjb25zdCBfZGF0YSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAncHJvZ3JhbVR5cGUnOiBbJzc4MWQ4NWIwLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsICc3ODFkODk3YS0xMzU5LTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnLFxuICAgICAgICAgICAgICAnOTYwNDdhYWYtN2FiMy00NWU5LWJlNmEtYjYxODEwZmU2MTdkJywgJ2MxOWFlYzY2LTFhNDAtNDU4OC05YjAzLWI2YmU1NWE4ZGQxZCcsICdmNzc5M2Q0Mi0xMWFjLTRjZmQtOWIzNS1lMGEyMWE3YTdjMzEnLFxuICAgICAgICAgICAgICAnMzM0YzllOTgtMTczZi00NDU0LWE4Y2UtZjgwYjIwYjdmZGYwJywgJzk2YmEyNzliLWIyM2ItNGU3OC1hYmE5LWRjYmQ0NmE5NmI3YicsICc3ODFkODg4MC0xMzU5LTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IGVuY29kZVVSSShKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xuICAgICAgICAgICAgICBfZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBkYXRlOiBtb21lbnQodikuc3RhcnRPZignd2VlaycpLmFkZChpLCAnZGF5JykuZm9ybWF0KCdERC1NTS1ZWVlZJyksXG4gICAgICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhU291cmNlLmdldE1vbnRobHlTY2hlZHVsZSh7XG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZTogc3RhcnREYXRlLFxuICAgICAgICAgICAgICBlbmREYXRlOiBlbmREYXRlLFxuICAgICAgICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgICAgICAgbG9jYXRpb25VdWlkczogbG9jYXRpb25VdWlkLFxuICAgICAgICAgICAgICBwcm9ncmFtVmlzaXRFbmNvdW50ZXI6IHVybFBhcmFtc1xuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIF9kYXRhLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYXBwb2ludG1lbnQuY291bnQgPSBkYXRhW2luZGV4XSAhPT0gdW5kZWZpbmVkID8gZGF0YVtpbmRleF0uY291bnQuc2NoZWR1bGVkIDogMDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzID0gX2RhdGE7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLmFwcG9pbnRtZW50cyA9IFtdO1xuICAgIHRoaXMudG9kYXkgPSAnJztcbiAgfVxufVxuIl19