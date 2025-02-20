export class Adapter {
  protected value: unknown[];

  constructor(originalData: unknown | unknown[]) {
    if (Array.isArray(originalData)) {
      this.value = originalData;
    } else {
      this.value = [originalData];
    }
  }

  static from<Source>(originalData: Source | Source[]) {
    return new this(originalData);
  }

  to<Input, Output>(map: (value: Input) => Output): Output[] {
    return (this.value as Input[]).map(map);
  }
}
