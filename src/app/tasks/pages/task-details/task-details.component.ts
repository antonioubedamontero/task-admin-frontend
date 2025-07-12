import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  effect,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import moment from 'moment';

import { HeaderService, TaskService } from '../../services';
import { MessageService } from '../../../shared/services';
import { TaskResponseItem } from '../../interfaces';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-task-details',
  imports: [TranslateModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './task-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskDetailsComponent {
  translate = inject(TranslateService);
  headerService = inject(HeaderService);
  taskService = inject(TaskService);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);

  isLogDetailsOpen = signal<boolean>(false);
  chevronIsOpenButton = signal<string>('chevron-down');

  taskDetailsResource = rxResource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id') ?? '' }),
    stream: ({ params }) =>
      this.taskService.getTaskById(params.id).pipe(map((resp) => resp.task)),
  });
  taskDetailValue = computed(() => this.taskDetailsResource.value());

  setFormDataEffect = effect(() => {
    const taskDetailsData = this.taskDetailValue();
    if (taskDetailsData) {
      this.setFormValue(taskDetailsData);
    }
  });

  taskDetailsForm = this.fb.group({
    name: [''],
    description: [''],
    currentState: [''],
    startDate: [''],
    startTime: [''],
    dueDate: [''],
    dueTime: [''],
  });

  constructor() {
    const headerTitle = this.translate.instant('taskDetails.title');
    this.headerService.setTitle(headerTitle);
    this.headerService.showBackBtn = true;
  }

  setFormValue(taskDetailData: TaskResponseItem): void {
    const { name, description, currentState, startDate, dueDate } =
      taskDetailData;

    this.taskDetailsForm.patchValue({
      name,
      description,
      currentState,
      startDate: startDate ? this.getDateFromDate(startDate) : 'N/A',
      startTime: startDate ? this.getTimeFromDate(startDate) : 'N/A',
      dueDate: dueDate ? this.getDateFromDate(dueDate) : 'N/A',
      dueTime: dueDate ? this.getTimeFromDate(dueDate) : 'N/A',
    });
  }

  getDateFromDate(date?: string): string {
    if (!date) return 'N/A';
    return moment(date).format('DD-MM-YYYY');
  }

  getTimeFromDate(date?: string): string {
    if (!date) return 'N/A';
    return moment(date).format('HH:mm');
  }

  getFormattedDate(date?: string): string {
    if (!date) return 'N/A';
    return moment(date).format('DD-MM-YYYY HH:mm');
  }

  toggleIsLogOpen(): void {
    this.isLogDetailsOpen.update((isOpen) => !isOpen);

    if (this.isLogDetailsOpen()) {
      this.chevronIsOpenButton.set('chevron-up');
      return;
    }

    this.chevronIsOpenButton.set('chevron-down');
  }

  closeModal(): void {
    this.messageService.isModalShown.set(false);
    this.router.navigateByUrl('/tasks');
  }
}
