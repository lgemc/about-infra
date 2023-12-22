export interface Context {
  Value(key: string): any;
  SetValue(key: string, value: any);
  GetAll();
}

export class ContextClass {
  data: { [key: string]: any };
  parent: Context;

  constructor() {
    this.data = {};
  }

  Value(key: string): any {
    return this.data[key];
  }

  SetValue(key: string, value: any) {
    return (this.data[key] = value);
  }

  GetAll(): { [key: string]: any } {
    return this.data;
  }
}
