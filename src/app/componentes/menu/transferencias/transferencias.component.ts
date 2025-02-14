import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css'],
})
export class TransferenciasComponent implements OnInit {
  constructor(private service: MenuService) {}

  transferencias: any[] = [];
  novaTransferencia = {
    contaOrigem: '',
    contaDestino: '',
    valor: '',
    dataTransferencia: '',
  };

  valorTotalTransferencias: string = '';
  ultimaTransferencia: any = null;

  ngOnInit(): void {
    this.carregarTransferencias();
  }

  formatarDataTransferencia(): void {
    if (this.novaTransferencia.dataTransferencia) {
      this.novaTransferencia.dataTransferencia =
        this.novaTransferencia.dataTransferencia.replace('T', ' ');
    }
  }

  converterParaDate(dataString: string): Date {
    const [dia, mes, anoHora] = dataString.split("/");
    const [ano, hora] = anoHora.split(" ");
    return new Date(`${ano}-${mes}-${dia}T${hora}`);
  }

  carregarTransferencias(): void {
    this.service.listarTransferencias().subscribe(
      (data) => {
        this.transferencias = data;

        this.transferencias.sort((a, b) => {
        const dateA = this.converterParaDate(a.dtAgendamento);
        const dateB = this.converterParaDate(b.dtAgendamento);
        return dateB.getTime() - dateA.getTime();
        });
        this.ultimaTransferencia = this.transferencias[0];
        this.valorTotalTransferencias = this.transferencias.reduce((total, transferencia) => {
          return total + (transferencia.valor || 0);
        }, 0);
      },
      (error) => {
        console.error('Erro ao carregar transferências:', error);
      }
    );
  }

  confirmarTransferencia(): void {
    this.formatarDataTransferencia();
    const novaTrans = {
      contaOrigem: this.novaTransferencia.contaOrigem,
      contaDestino: this.novaTransferencia.contaDestino,
      valor: this.novaTransferencia.valor,
      dataTransferencia: this.novaTransferencia.dataTransferencia,
    };
    this.service.criarTransferencia(novaTrans).subscribe(
      (response) => {
        alert('Transferência criada com sucesso');
        this.carregarTransferencias();
        this.novaTransferencia = {
          contaOrigem: '',
          contaDestino: '',
          valor: '',
          dataTransferencia: '',
        };
      },
      (error) => {
        alert('Erro ao criar transferência.');
      }
    );
  }
}
