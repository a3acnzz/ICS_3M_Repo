import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobTriggerComponent } from './job-trigger.component';

const jobTriggerRoutes: Routes = [
    {
        path: '',
        component: JobTriggerComponent,
        data: {
            title: 'Job Trigger'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(jobTriggerRoutes)],
    exports: [RouterModule]
})
export class JobTriggerRouting { }
