import _parse from './parse/index.js'

export default class Servable {

  constructor() {
    this.App = {
      ...Parse,
      ..._parse
    }
  }
}
