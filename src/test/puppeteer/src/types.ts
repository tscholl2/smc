export interface Creds {
  readonly sitename: string;
  readonly url: string;
  readonly email: string;
  readonly passw: string;
  readonly project: string;
}

export interface Opts {
  headless?: string;
  screenshot?: string;
  path?: string|boolean;
  skip?: RegExp;
}

export class PassFail {
  pass: number;
  fail: number;
  constructor(p: number = 0, f: number = 0) { this.pass = p; this.fail = f }
  add (pf: PassFail): PassFail {
    this.pass += pf.pass;
    this.fail += pf.fail;
    return this;
  }
}

export class ApiGetString extends PassFail {
  result: string;
  constructor() {
    super();
    this.result = "NONE";
  }
}

export const TestFiles = {
  texfile: "latex-sample.tex",
  widgetfile: "widgets-sample.ipynb",
  sageipynbfile: "sage-sample.ipynb",
  sagewsfile: "sagews-sample.sagews"
}