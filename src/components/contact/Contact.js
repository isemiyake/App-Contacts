import getTemplate from "./template";
export default class Contact {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.eMail = data.eMail;
  }
  render(el) {
    const template = document.createElement("div");
    template.innerHTML = getTemplate(this);
    el.append(template);
  }
}
