/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MatTabsModule, MatIconModule, MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DebugModeService } from '../form-entry/services/debug-mode.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormErrorsService } from './services/form-errors.service';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { ErrorRendererComponent } from './error-renderer/error-renderer.component';
import { HistoricalValueDirective } from './directives/historical-value-directive';
import { HistoricalFieldHelperService } from './helpers/historical-field-helper-service';
import { SelectModule } from '../components/select/select.module';
import { RemoteFileUploadModule } from '../components/file-upload/file-upload.module';
import { DateTimePickerModule } from '../components/date-time-picker';
import { NgxDateTimePickerModule } from '../components/ngx-date-time-picker/ngx-date-time-picker.module';
import { AfeNgSelectComponent } from '../components/afe-ng-select.component';
import { HidersDisablersFactory } from './form-factory/hiders-disablers.factory';
import { AlertsFactory } from './form-factory/show-messages.factory';
import { ExpressionRunner } from './expression-runner/expression-runner';
import { JsExpressionHelper } from './helpers/js-expression-helper';
import { FormSchemaCompiler } from './services/form-schema-compiler.service';
import { FormFactory } from './form-factory/form.factory';
import { QuestionFactory } from './form-factory/question.factory';
import { ControlRelationsFactory } from './form-factory/control-relations.factory';
import { EncounterAdapter } from './value-adapters/encounter.adapter';
import { PersonAttribuAdapter } from './value-adapters/person-attribute.adapter';
import { OrderValueAdapter } from './value-adapters/order.adapter';
import { ObsAdapterHelper } from './value-adapters/obs-adapter-helper';
import { ObsValueAdapter } from './value-adapters/obs.adapter';
import { RemoteSelectModule } from '../components/remote-select/remote-select.module';
import { DataSources } from './data-sources/data-sources';
import { AppointmentsOverviewComponent } from '../components/appointments-overview/appointments-overview.component';
import { EncounterViewerModule } from '../encounter-viewer/encounter-viewer.module';
import { CheckboxModule } from '../components/check-box/checkbox.module';
var FormEntryModule = /** @class */ (function () {
    function FormEntryModule() {
    }
    FormEntryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule,
                        ReactiveFormsModule,
                        CollapseModule,
                        SelectModule,
                        DateTimePickerModule,
                        RemoteSelectModule,
                        RemoteFileUploadModule,
                        EncounterViewerModule,
                        CheckboxModule,
                        MatIconModule,
                        MatTabsModule,
                        MatCardModule,
                        NgxDateTimePickerModule
                    ],
                    declarations: [
                        FormRendererComponent,
                        AfeNgSelectComponent,
                        AppointmentsOverviewComponent,
                        HistoricalValueDirective,
                        ErrorRendererComponent
                    ],
                    providers: [
                        FormBuilder,
                        FormControlService,
                        FormErrorsService,
                        ValidationFactory,
                        HidersDisablersFactory,
                        AlertsFactory,
                        ExpressionRunner,
                        JsExpressionHelper,
                        HistoricalFieldHelperService,
                        FormSchemaCompiler,
                        FormFactory,
                        QuestionFactory,
                        ValidationFactory,
                        ControlRelationsFactory,
                        ObsAdapterHelper,
                        ObsValueAdapter,
                        EncounterAdapter,
                        PersonAttribuAdapter,
                        OrderValueAdapter,
                        DebugModeService,
                        DataSources
                    ],
                    exports: [FormRendererComponent, AfeNgSelectComponent,
                        ErrorRendererComponent, DateTimePickerModule, EncounterViewerModule, NgxDateTimePickerModule]
                },] },
    ];
    return FormEntryModule;
}());
export { FormEntryModule };
function FormEntryModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormEntryModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormEntryModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lbnRyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZW50cnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUcsYUFBYSxFQUFHLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUN6RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDckUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFDSCw2QkFBNkIsRUFDaEMsTUFBTSxxRUFBcUUsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7O2dCQUd4RSxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWTt3QkFDbEIsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLHNCQUFzQjt3QkFDdEIscUJBQXFCO3dCQUNyQixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixhQUFhO3dCQUNiLHVCQUF1QjtxQkFDMUI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLHFCQUFxQjt3QkFDckIsb0JBQW9CO3dCQUNwQiw2QkFBNkI7d0JBQzdCLHdCQUF3Qjt3QkFDeEIsc0JBQXNCO3FCQUN6QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxrQkFBa0I7d0JBQ2xCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixzQkFBc0I7d0JBQ3RCLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLDRCQUE0Qjt3QkFDNUIsa0JBQWtCO3dCQUNsQixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQixnQkFBZ0I7d0JBQ2hCLFdBQVc7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CO3dCQUNqRCxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsRUFBRyx1QkFBdUIsQ0FBQztpQkFDckc7OzBCQTNGRDs7U0E0RmEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlICwgTWF0SWNvbk1vZHVsZSAsIE1hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIQU1NRVJfR0VTVFVSRV9DT05GSUcgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgRGVidWdNb2RlU2VydmljZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvc2VydmljZXMvZGVidWctbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbGxhcHNlTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb2xsYXBzZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1lcnJvcnMuc2VydmljZSc7XG5pbXBvcnQgeyBIYW1tZXJDb25maWcgfSBmcm9tICcuL2hlbHBlcnMvaGFtbWVyLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXJyb3JSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vZXJyb3ItcmVuZGVyZXIvZXJyb3ItcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEhpc3RvcmljYWxWYWx1ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9oaXN0b3JpY2FsLXZhbHVlLWRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIaXN0b3JpY2FsRmllbGRIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi9oZWxwZXJzL2hpc3RvcmljYWwtZmllbGQtaGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBSZW1vdGVGaWxlVXBsb2FkTW9kdWxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL25neC1kYXRlLXRpbWUtcGlja2VyL25neC1kYXRlLXRpbWUtcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBBZmVOZ1NlbGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvYWZlLW5nLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2hpZGVycy1kaXNhYmxlcnMuZmFjdG9yeSc7XG5pbXBvcnQgeyBBbGVydHNGYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3Rvcnkvc2hvdy1tZXNzYWdlcy5mYWN0b3J5JztcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIgfSBmcm9tICcuL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5pbXBvcnQgeyBGb3JtU2NoZW1hQ29tcGlsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tc2NoZW1hLWNvbXBpbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUZhY3RvcnkgfSBmcm9tICcuL2Zvcm0tZmFjdG9yeS9mb3JtLmZhY3RvcnknO1xuaW1wb3J0IHsgUXVlc3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9mb3JtLWZhY3RvcnkvcXVlc3Rpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB9IGZyb20gJy4vZm9ybS1mYWN0b3J5L2NvbnRyb2wtcmVsYXRpb25zLmZhY3RvcnknO1xuaW1wb3J0IHsgRW5jb3VudGVyQWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvZW5jb3VudGVyLmFkYXB0ZXInO1xuaW1wb3J0IHsgUGVyc29uQXR0cmlidUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLWFkYXB0ZXJzL3BlcnNvbi1hdHRyaWJ1dGUuYWRhcHRlcic7XG5pbXBvcnQgeyBPcmRlclZhbHVlQWRhcHRlciB9IGZyb20gJy4vdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNBZGFwdGVySGVscGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vYnMtYWRhcHRlci1oZWxwZXInO1xuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi92YWx1ZS1hZGFwdGVycy9vYnMuYWRhcHRlcic7XG5pbXBvcnQgeyBSZW1vdGVTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL3JlbW90ZS1zZWxlY3QvcmVtb3RlLXNlbGVjdC5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHtcbiAgICBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudFxufSBmcm9tICcuLi9jb21wb25lbnRzL2FwcG9pbnRtZW50cy1vdmVydmlldy9hcHBvaW50bWVudHMtb3ZlcnZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlck1vZHVsZSB9IGZyb20gJy4uL2VuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXZpZXdlci5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL2NoZWNrLWJveC9jaGVja2JveC5tb2R1bGUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29sbGFwc2VNb2R1bGUsXG4gICAgICAgIFNlbGVjdE1vZHVsZSxcbiAgICAgICAgRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgICAgIFJlbW90ZVNlbGVjdE1vZHVsZSxcbiAgICAgICAgUmVtb3RlRmlsZVVwbG9hZE1vZHVsZSxcbiAgICAgICAgRW5jb3VudGVyVmlld2VyTW9kdWxlLFxuICAgICAgICBDaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGb3JtUmVuZGVyZXJDb21wb25lbnQsXG4gICAgICAgIEFmZU5nU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCxcbiAgICAgICAgSGlzdG9yaWNhbFZhbHVlRGlyZWN0aXZlLFxuICAgICAgICBFcnJvclJlbmRlcmVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRm9ybUJ1aWxkZXIsXG4gICAgICAgIEZvcm1Db250cm9sU2VydmljZSxcbiAgICAgICAgRm9ybUVycm9yc1NlcnZpY2UsXG4gICAgICAgIFZhbGlkYXRpb25GYWN0b3J5LFxuICAgICAgICBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5LFxuICAgICAgICBBbGVydHNGYWN0b3J5LFxuICAgICAgICBFeHByZXNzaW9uUnVubmVyLFxuICAgICAgICBKc0V4cHJlc3Npb25IZWxwZXIsXG4gICAgICAgIEhpc3RvcmljYWxGaWVsZEhlbHBlclNlcnZpY2UsXG4gICAgICAgIEZvcm1TY2hlbWFDb21waWxlcixcbiAgICAgICAgRm9ybUZhY3RvcnksXG4gICAgICAgIFF1ZXN0aW9uRmFjdG9yeSxcbiAgICAgICAgVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgICAgIENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5LFxuICAgICAgICBPYnNBZGFwdGVySGVscGVyLFxuICAgICAgICBPYnNWYWx1ZUFkYXB0ZXIsXG4gICAgICAgIEVuY291bnRlckFkYXB0ZXIsXG4gICAgICAgIFBlcnNvbkF0dHJpYnVBZGFwdGVyLFxuICAgICAgICBPcmRlclZhbHVlQWRhcHRlcixcbiAgICAgICAgRGVidWdNb2RlU2VydmljZSxcbiAgICAgICAgRGF0YVNvdXJjZXNcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtGb3JtUmVuZGVyZXJDb21wb25lbnQsIEFmZU5nU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBFcnJvclJlbmRlcmVyQ29tcG9uZW50LCBEYXRlVGltZVBpY2tlck1vZHVsZSwgRW5jb3VudGVyVmlld2VyTW9kdWxlICwgTmd4RGF0ZVRpbWVQaWNrZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1FbnRyeU1vZHVsZSB7XG5cbn1cbiJdfQ==