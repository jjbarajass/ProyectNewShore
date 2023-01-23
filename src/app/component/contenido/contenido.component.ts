import { Component,OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent {
username = '';
  origen = '';
  destino = '';
  nombre = '';
  monedaSeleccionada: string = 'USD';
  data: any;

  respuesta: any;
  auxValorMoneda: any;
  resultados: any[] = [];
  consoleLog() {
    console.log(this.origen);
    console.log(this.destino);
  }
  constructor(private http: HttpClient) {
    this.origen = '';
    this.destino = '';
    this.nombre = '';
  }
  convertirMoneda() {
    if (this.monedaSeleccionada === 'MXN') {
      this.auxValorMoneda = 0;
      this.auxValorMoneda = this.respuesta?.obj?.Precio;
      this.auxValorMoneda = this.auxValorMoneda * 18.92;
    } else if (this.monedaSeleccionada === 'COP') {
      this.auxValorMoneda = 0;
      this.auxValorMoneda = this.respuesta?.obj?.Precio;
      this.auxValorMoneda = this.auxValorMoneda * 4648;
    } else if (this.monedaSeleccionada === 'USD') {
      this.auxValorMoneda = 0;
      this.auxValorMoneda = this.respuesta?.obj?.Precio;
    }
  }
  checkRoute(origin: string, destination: string, flights: any[]) {
    console.log('ESTOS SON LOS VUELOS', flights);
    let res = { status: false, codigo: 0, msg: '', obj: {} };
    let originExists = false;
    let destinationExists = false;

    for (let flight of flights[0]) {
      if (flight.departureStation === origin) {
        originExists = true;
      }
      if (flight.arrivalStation === destination) {
        destinationExists = true;
      }
    }

    if (!originExists) {
      res['msg'] = 'El origen no está registrado en la aerolínea.';
      res['obj'] = {
        Origen: origin,
        Destino: destination,
        Aerolinea: 'Aerolínea no encontrada',
        NumeroVuelo: 'No aplica',
        Precio: 'No aplica',
      };
      return res;
    }

    if (!destinationExists) {
      res['msg'] = 'El destino no está registrado en la aerolínea.';
      res['obj'] = {
        Origen: origin,
        Destino: destination,
        Aerolinea: 'Aerolínea no encontrada',
        NumeroVuelo: 'No aplica',
        Precio: 'No aplica',
      };
      return res;
    }

    for (let flight of flights[0]) {
      if (
        flight.departureStation === origin &&
        flight.arrivalStation === destination
      ) {
        res['status'] = true;
        res['msg'] = 'Ruta de viaje encontrada: ';
        res['obj'] = {
          Origen: origin,
          Destino: destination,
          Aerolinea: flight['flightCarrier'],
          NumeroVuelo: flight['flightNumber'],
          Precio: flight['price'],
        };
        return res;
      }
    }

    for (let flight of flights[0]) {
      if (flight.departureStation === origin) {
        for (let f of flights[0]) {
          if (
            f.departureStation === flight.arrivalStation &&
            f.arrivalStation === destination
          ) {
            res['status'] = true;
            res['msg'] = 'Ruta de viaje con escalas encontradas: ';
            res['obj'] = {
              Origen: origin,
              Destino: destination,
              Aerolinea: f['flightCarrier'],
              NumeroVuelo: f['flightNumber'],
              Precio: flight['price'] + f['price'],
            };
            return res;
          }
        }
      }
    }

    res['msg'] =
      'La ruta no puede ser calculada, no se ha encontrado una ruta de viaje entre el origen y el destino especificado.';
    return res;
  }
  getData() {
    if (this.origen === this.destino) {
      alert(
        'Lo sentimos, el valor del origen y el destino son los mismos, ingresa valores diferentes para poder consultar tu vuelo '
      );
    } else {
      if (!this.origen || !this.destino) {
        alert('INGRESE TODOS LOS CAMPOS');
        return;
      }
      this.http
        .get(`https://recruiting-api.newshore.es/api/flights/2`)
        .subscribe(
          (data) => {
            this.resultados.push(data);
            this.data = [data];
            console.log(this.data);
            this.respuesta = this.checkRoute(
              this.origen,
              this.destino,
              this.data
            );
            console.log(this.respuesta);
            this.origen = '';
            this.destino = '';
          },
          (error) => {
            console.log('ERROR', error);
            this.origen = '';
            this.destino = '';
          }
        );
    }
  }
}

