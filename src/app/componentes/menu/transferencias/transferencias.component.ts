import { TransferenciasService } from '../transferencias.service';
import { Component, OnInit } from '@angular/core';
import { Transferencias } from '../transferencias';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  listaTransferencias: Transferencias[] = [];

  constructor(private service: TransferenciasService) { }

  ngOnInit(): void {
  }
}

