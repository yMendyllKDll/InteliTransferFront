export interface Transferencias {
  id: number
  contaOrigem?: string
  contaDestino: string
  valor: number
  dataAgendamento: Date
}