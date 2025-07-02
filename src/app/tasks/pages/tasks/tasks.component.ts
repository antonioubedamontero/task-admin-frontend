import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { headerTitle$ } from '../../components/header/header.component';
import { AuthService } from '../../../auth/services';
import { MiniTaskItem, TaskState } from '../../interfaces';
import { MiniTaskByCategoryComponent } from '../../components/mini-task-by-category/mini-task-by-category.component';

const tasksItemsData: MiniTaskItem[] = [
  {
    title: 'Gestión del tiempo',
    startDate: new Date().toJSON(),
    dueDate: new Date().toJSON(),
  },
  {
    title: 'Incluir nueva feature',
  },
  {
    title: 'borrar atributo',
    startDate: new Date().toJSON(),
    dueDate: new Date().toJSON(),
  },
  {
    title: 'cambiar libreria de i18n',
  },
  {
    title: 'meter sombras en las tarjetas',
    startDate: new Date().toJSON(),
    dueDate: new Date().toJSON(),
  },
  {
    title: 'planificacion de las tareas',
  },
  {
    title: 'Fin del sprint',
    startDate: new Date().toJSON(),
    dueDate: new Date().toJSON(),
  },
  {
    title: 'Reunión de retrospectiva',
  },
];
@Component({
  selector: 'app-tasks',
  imports: [TranslateModule, MiniTaskByCategoryComponent],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksComponent {
  readonly taskState = TaskState;
  taskItems = [...tasksItemsData];

  translate = inject(TranslateService);
  authService = inject(AuthService);

  ngOnInit(): void {
    // TODO: Try to avoid this life cycle
    const headerTitle = this.translate.instant('tasks.title', {
      name: this.authService.nameAndSurname(),
    });
    headerTitle$.next(headerTitle);
  }
}
