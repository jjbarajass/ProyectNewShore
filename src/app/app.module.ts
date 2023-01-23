import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { FontAwesomeModule } from '@fortawesome/fontawesome-free';
// @import '@font-awesome/css/font-awesome.css';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ContenidoComponent } from './component/contenido/contenido.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContenidoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }


