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

  it('should have a valid form', () => {
    const activatedRouteStub = TestBed.inject(ActivatedRoute) as any as ActivatedRouteStub;

    // Simule um ID para testar a edição
    activatedRouteStub.setParamMap({ id: '123' });
    fixture.detectChanges(); // Re-run ngOnInit e getDisciplineById

    // Verifique se o valor de isEditing é verdadeiro quando há um ID
    expect(component.isEditing).toBeTrue();

    // Simule a ausência de ID para testar a criação
    activatedRouteStub.setParamMap({}); // Nenhum ID presente
    fixture.detectChanges(); // Re-run ngOnInit

    // Verifique se o valor de isEditing é falso quando não há um ID
    expect(component.isEditing).toBeFalse();

    // Forneça um valor para o campo 'name' no seu teste
    if (component.formGroupDiscipline) {
      component.formGroupDiscipline.get('name')?.setValue('Nome da Disciplina de Teste');
    }

    // Adicione este log para verificar o valor do formulário
    console.log('Form Value:', component.formGroupDiscipline?.getRawValue());

    // Verifique se o formulário é válido
    expect(component.formGroupDiscipline?.valid).toBeTruthy();

  });

});
