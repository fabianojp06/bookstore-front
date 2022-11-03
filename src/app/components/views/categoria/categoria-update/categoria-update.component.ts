import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(
    private service: CategoriaService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((reposta) => {
      this.categoria.nome = reposta.nome;
      this.categoria.descricao = reposta.descricao;
    })
  }

  update(): void {
    this.service.update(this.categoria).subscribe((resposta) =>{
    this.router.navigate(['categorias'])
    this.service.mensagem('Category updated successfully!')
    })
  }

  cancel(): void {
    this.router.navigate(['categorias'])
  }

}
