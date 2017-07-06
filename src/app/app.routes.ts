import {Routes} from "@angular/router";

import {CollectionComponent} from './collection';
import {ListComponent} from './list';
import {DetailComponent} from './detail';
import {EditComponent} from './edit';
import {PostComponent} from "./post/post.component";


export const rootRouterConfig: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: 'full'
  },
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "list/:id",
    component: DetailComponent
  },
  {
    path: "edit",
    component: EditComponent
  },
  {
    path: "edit/:id",
    component: EditComponent
  },
  {
    path: "collection",
    component: CollectionComponent
  },
  {
    path: "post",
    component: PostComponent
  }
];
