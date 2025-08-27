export class TestSimple {
  static readonly TEST = 1;
  
  constructor(input: string) {
    console.log(input);
  }
  
  test(): number {
    return TestSimple.TEST;
  }
}
