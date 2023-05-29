export class DuplicationError extends Error {
  constructor() {
    super('Duplicate data');
    this.name = "DuplicationError";
  }
}
