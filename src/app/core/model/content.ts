import {Level} from './level';

export class Content {
  id: number;
  title: string;
  description: string;
  year: number;
  type: string;
  theme: string;
  link: string;
  levels: Level[];
  iCreatedAt: Date = new Date();
  iCreatedBy: string;
  iModifiedAt: Date = new Date();
  iModifiedBy: string;


}
