import DB from "../../DB";
import Contact from "../contact/Contact";
import getTemplate from "./template";
export default class ContactList {
  constructor(data) {
    this.domElt = document.querySelector(data.el);
    DB.setApiURL(data.apiURL);
    this.contacts = [];
    this.loadContacts();
  }
  async loadContacts() {
    const contacts = await DB.findAll();
    this.contacts = contacts.map((contact) => new Contact(contact));
    console.table(this.contacts);
    this.render();
  }
  getItemsCount() {
    return this.contacts.length;
  }
  renderItemsCount() {
    this.domElt.querySelector(".contacts-count").innerText =
      this.getItemsCount();
  }
  render() {
    this.domElt.innerHTML = getTemplate();
    this.contacts.forEach((contact) =>
      contact.render(this.domElt.querySelector(".contact-list"))
    );
    this.renderItemsCount();
  }
}
