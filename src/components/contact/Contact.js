import DB from "../../DB";
import getTemplate from "./template";
export default class Contact {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.eMail = data.eMail;
    this.domElt = null;
  }
  render(el) {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    el.append(this.domElt);
    this.initEvents();
  }
  initEvents() {
    this.domElt.querySelector(".destroy").addEventListener("click", () => {
      window.ContactList.deleteOneById(this.id);
      this.domElt.remove();
    }); 
  }
}
