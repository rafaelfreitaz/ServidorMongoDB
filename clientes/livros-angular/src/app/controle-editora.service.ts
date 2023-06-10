import { Injectable } from '@angular/core';
import  Editora  from './editora';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {
  editoras: Array<Editora> = [
    { codEditora: 1, nome: 'Alta Books' },
    { codEditora: 2, nome: 'Bookman' },
    { codEditora: 3, nome: 'Addison Wesley' },
    { codEditora: 4, nome: 'Pearson' }
  ];

  constructor() { }

  getNomeEditora(codEditora: number): string {
    const editora = this.editoras.find(e => e.codEditora === codEditora);
    return editora ? editora.nome : '';
  }

  getEditoras(): Array<Editora> {
    return this.editoras;
  }
}
