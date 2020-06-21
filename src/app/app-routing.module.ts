import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PanelComponent } from "./include/panel/panel.component";
import { AdminPanelComponent } from "./pages/admin-panel/admin-panel.component";
import { UserPanelComponent } from "./pages/user-panel/user-panel.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "panel", component: UserPanelComponent },
  { path: "admin/panel", component: AdminPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
