import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  {path: 'list-users', component: ListUsersComponent},
  {path: '', component: UploadFileComponent}
];

export const routing = RouterModule.forRoot(routes);
