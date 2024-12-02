import {Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavAdminComponent} from '../../../../shared/nav-admin/nav-admin.component';
import {ContentAdminService} from '../../../../../../core/services/content-admin.service';
import {Content} from '../../../../../../core/model/content';
import {ActivatedRoute, Params, Router, RouterLink, RouterOutlet} from '@angular/router';
import {Level} from '../../../../../../core/model/level';
import {LevelService} from '../../../../../../core/services/level.service';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatLabel} from '@angular/material/form-field';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-edit-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavAdminComponent,
    MatCheckbox,
    MatLabel,
    NgForOf,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './edit-content.component.html',
  styleUrl: './edit-content.component.css'
})
export class EditContentComponent implements OnInit{
  materialForm: FormGroup;
  listaNivel: Level[] = []; // Define listaNivel como un array de Level
  levelService: LevelService = inject(LevelService);
  public selectedLevels: Level[] = [];
  nivelForm: FormGroup;
  fb = inject(FormBuilder);
  contentAdminService: ContentAdminService= inject(ContentAdminService);
  router: Router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.materialForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      link: ['', Validators.required],
      type: ['', ],
      theme: ['', ],
      levels:[''],
    })
  }

  ngOnInit(): void { //sólo una vez luego del constructor
    this.loadLista();
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de EditContentComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      console.log(this.id);
      this.edicion = data['id'] != null;//true, false
      this.cargaForm()
    });
  }

  loadLista(): void {
    this.levelService.list().subscribe({
      next: (data) => this.listaNivel = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }


  cargaForm() {
    if (this.edicion) {
      this.contentAdminService.listId(this.id).subscribe((data: Content) => {
        console.log(data);
        this.materialForm.patchValue({
          title: data.title,
          description: data.description,
          year: data.year,
          link: data.link,
          type: data.type,
          theme: data.theme,
          //levels: data.levels
        });
        this.selectedLevels = data.levels;
        console.log("Niveles seleccionados:", this.selectedLevels);

      });

    }
  }
  isLevelSelected(level: Level): boolean {
    return this.selectedLevels.some(selectedLevel => selectedLevel.id === level.id);
  }
  onCheckboxChange(event: any, level: Level): void {
    if (event.checked) {
      if (!this.isLevelSelected(level)) {
        this.selectedLevels.push(level);
      }
    } else {
      this.selectedLevels = this.selectedLevels.filter(
        (selectedLevel) => selectedLevel.id !== level.id
      );
    }
    console.log('Selected levels:', this.selectedLevels);
  }

  onSubmit() {
    if (this.materialForm.valid) {
      const content: Content = new Content();
      content.id = this.id;
      content.title = this.materialForm.value.title;
      content.description = this.materialForm.value.description;
      content.year = this.materialForm.value.year;
      content.theme = this.materialForm.value.theme;
      content.type = this.materialForm.value.type;
      content.link = this.materialForm.value.link;

      content.levels=this.selectedLevels;
      if (!this.edicion) {
        console.log("Datos aceptado:", content);
        this.contentAdminService.insert(content).subscribe((data: Object): void => {
            console.log("Datos insertados:", data);
          }
        );
      } else {
        //update
        console.log("Datos aceptado:", content);
        this.contentAdminService.update(content).subscribe((data: Object): void => {
            console.log("Datos actualizados:", data);
          }
        );
      }
      this.router.navigate(['admin/contents']);
    } else {
      console.log("Formulario no valido");
    }
  }
}
