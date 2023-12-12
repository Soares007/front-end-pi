import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormNewDisciplineComponent } from './form-new-discipline.component';
import { DisciplineService } from 'src/app/discipline.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

class CustomParamMap implements ParamMap {
  private paramMap: Map<string, string>;

  constructor(params: any) {
    this.paramMap = new Map(Object.entries(params));
  }

  get(name: string): string | null {
    return this.paramMap.get(name) || null;
  }

  getAll(name: string): string[] {
    return this.paramMap.has(name) ? [this.paramMap.get(name)!] : [];
  }

  has(name: string): boolean {
    return this.paramMap.has(name);
  }

  get keys(): string[] {
    return Array.from(this.paramMap.keys());
  }
}

class ActivatedRouteStub {
  private paramMapSubject = new BehaviorSubject(new CustomParamMap({ id: '123' }));
  paramMap = this.paramMapSubject.asObservable();

  // Use este método para atualizar o paramMap em seus testes
  setParamMap(params: any) {
    // Converta o ID para número antes de definir o paramMap
    params.id = Number(params.id);
    this.paramMapSubject.next(new CustomParamMap(params));
  }
}

describe('FormNewDisciplineComponent', () => {
  let component: FormNewDisciplineComponent;
  let fixture: ComponentFixture<FormNewDisciplineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewDisciplineComponent],
      providers: [
        DisciplineService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(FormNewDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const activatedRouteStub = TestBed.inject(ActivatedRoute) as any as ActivatedRouteStub;
    activatedRouteStub.setParamMap({ id: '123' });

    expect(component).toBeTruthy();
  });

  it('should have a valid form', (done) => {
    const activatedRouteStub = TestBed.inject(ActivatedRoute) as any as ActivatedRouteStub;

    // Simule um ID para testar a edição
    activatedRouteStub.setParamMap({ id: '123' });

    // Use o método getDisciplineById diretamente para simular o comportamento assíncrono
    component['getDisciplineById'](123);

    // Adicione um pequeno atraso para garantir que o método seja concluído
    setTimeout(() => {
      fixture.detectChanges(); // Re-run ngOnInit e getDisciplineById

      // Verifique se o método getDisciplineById foi chamado corretamente
      expect(component.isEditing).toBeTrue();

      // Forneça um valor para o campo 'name' no seu teste
      if (component.formGroupDiscipline) {
        component.formGroupDiscipline.get('name')?.setValue('Nome da Disciplina de Teste');
      }

      // Adicione este log para verificar o valor do formulário
      console.log('Form Value:', component.formGroupDiscipline?.getRawValue());

      // Verifique se o formulário é válido após a alteração
      expect(component.formGroupDiscipline?.valid).toBeTruthy();

      // Indique que o teste está concluído
      done();
    }, 100); // Ajuste o tempo conforme necessário
  });
});
