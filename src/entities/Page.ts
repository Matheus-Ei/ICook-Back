export class Page {
  constructor(
    public id: number,
    public title: string,
    public description: string | null,
    public emoji: string | null,
    public nextSiblingId: number | null,
    public parentId: number | null,
    public projectId: number,
    public moduleId: number | null
  ) {}
}
