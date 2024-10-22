export class Content {
  id: number;
  title: string;
  description: string;
  year: string;
  type: string;
  theme: string;
  link: string;
  iCreatedAt: Date = new Date();
  iCreatedBy: string;
  iModifiedAt: Date = new Date();
  iModifiedBy: string;

  constructor(
    id: number, title: string, description: string, year: string, type: string, theme: string, 
    link: string, iCreatedBy: string, iModifiedBy: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.year = year;
    this.type = type;
    this.theme = theme;
    this.link = link;
    this.iCreatedBy = iCreatedBy;
    this.iModifiedBy = iModifiedBy;
  }
}
