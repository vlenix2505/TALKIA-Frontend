import {Component, inject, OnInit} from '@angular/core';
import {NavAdminComponent} from '../../../../shared/nav-admin/nav-admin.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatStep, MatStepLabel, MatStepper, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Level} from '../../../../../../core/model/level';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {LevelService} from '../../../../../../core/services/level.service';
import {Content} from '../../../../../../core/model/content';
import {ContentAdminService} from '../../../../../../core/services/content-admin.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [
    NavAdminComponent,
    FormsModule,
    MatStep,
    MatStepLabel,
    MatStepperPrevious,
    ReactiveFormsModule,
    MatInput,
    MatStepper,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    NgForOf,
    RouterOutlet,
    MatCheckbox,
    RouterLink
  ],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.css'
})
export class AddContentComponent implements OnInit {
  datoForm: FormGroup;
  listaNivel: Level[]=[]
  levelService: LevelService = inject(LevelService);
  types: string[] = ['Audio', 'Video', 'Libro'];
  themes: string[] = ['Grammar', 'Listening', 'Reading'];

  public idNivelSeleccionado: number = 0;
  contentService:ContentAdminService=inject(ContentAdminService);
  edicion: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  public selectedLevels: Level[] = [];



  constructor() {
    this.datoForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      year:  ['', [Validators.required]],
      type:  ['Audio', [Validators.required]],
      theme: ['Grammar', Validators.required],
      link: ['', Validators.required],
      level: [''],

    });


  }
  ngOnInit(): void {
    this.loadLista();
  }
  loadLista(): void {
    this.levelService.list().subscribe({
      next: (data) => this.listaNivel = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }

  setTheme(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectTheme: string = select.value;
    console.log(selectTheme);
  }

  setType(event: Event): void{
    const select= event.target as HTMLSelectElement;
    const selectType: string = select.value;
    console.log(selectType);
  }

  onSubmit(): void {
    if (this.datoForm.valid) {
      console.log(this.selectedLevels);
      const content: Content = new Content();
      content.title= this.datoForm.value.title;
      content.description=this.datoForm.value.description;
      content.year=parseInt(this.datoForm.value.year);
      content.link=this.datoForm.value.link;

      content.theme=this.datoForm.value.theme;
      content.type=this.datoForm.value.type;
      content.levels=this.selectedLevels;

      console.log(content.title);
      console.log(content.description);
      console.log(content.theme);
      console.log(content.type);
      console.log(content.levels);
      console.log("Producto validado:", content);
      this.contentService.insert(content).subscribe({
        next: (data: Object): void => {
          console.log(data);
        }
      })
      alert("Producto registrado!")
      this.contentService.list().subscribe((data: any) => {
        console.log("Lista actualizada de preguntas:", data);
        this.router.navigate(['admin/contents']);
      });
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }

  }
  onCheckboxChange(event: any, level: Level): void {
    if (event.checked) {
      this.selectedLevels.push(level);
    } else {
      const index = this.selectedLevels.indexOf(level);
      if (index > -1) {
        this.selectedLevels.splice(index, 1);
      }
    }
    console.log("Selected levels:", this.selectedLevels);
  }
  isLevelSelected(level: Level): boolean {
    return this.selectedLevels.some(selectedLevel => selectedLevel.id === level.id);
  }
}

