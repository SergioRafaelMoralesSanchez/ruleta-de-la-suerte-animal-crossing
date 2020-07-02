import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { SocketService } from "./services/socket.service";
import { PanelComponent } from "./include/panel/panel.component";
import { AdminPanelComponent } from "./pages/admin-panel/admin-panel.component";
import { RuletaComponent } from "./include/ruleta/ruleta.component";
import { UserPanelComponent } from "./pages/user-panel/user-panel.component";
import { UserRewardComponent } from "./include/user-reward/user-reward.component";
import { HomeComponent } from "./pages/home/home.component";
import { environment } from "./../environments/environment";
import { ViewerPanelComponent } from './pages/viewer-panel/viewer-panel.component';
const config: SocketIoConfig = {
  url: environment.apiUrl,
  options: { forceNew: false },
};

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    AdminPanelComponent,
    RuletaComponent,
    UserPanelComponent,
    UserRewardComponent,
    HomeComponent,
    ViewerPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
