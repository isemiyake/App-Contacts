import DB from "../../DB";
import Contact from "../contact/Contact";
import getTemplate from "./template";
export default class ContactList {
  constructor(data) {
    this.domElt = document.querySelector(data.el);
    this.listDomElt = null;
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
    this.listDomElt = this.domElt.querySelector(".contact-list");
    this.contacts.forEach((contact) => contact.render(this.listDomElt));
    this.renderItemsCount();
    this.initEvents();
  }
  async addContact(data) {
    //Ajouter a la DB
    const contact = await DB.create(data);
    //Ajouter a this.contact
    const newContact = new Contact(contact);
    this.contacts.push(newContact);
    //Ajouter dans le dom
    newContact.render(this.domElt.querySelector(".contact-list"));
    //Relancer le renderItemsCount()
    this.renderItemsCount();
  }
  async deleteOneById(id) {
    //Supprimer de la DB
    const resp = await DB.deleteOneById(id);
    //Supprimer des todos
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    //Relancer le renderItemsLeftCount()
    this.renderItemsCount();
  }
  initEvents() {
    this.domElt.querySelector(".add").addEventListener("click", () => {
      const firstName = this.domElt.querySelector(".firstName").value;
      const lastName = this.domElt.querySelector(".lastName").value;
      const eMail = this.domElt.querySelector(".eMail").value;
      if (firstName === "" || lastName === "" || eMail === "") {
        alert("Veuillez remplir tous les champs avant d'ajouter un contact.");
        return;
      }
      if (!eMail.includes("@")) {
        alert("L'email doit contenir un '@'.");
        return;
      }
      this.addContact({ firstName, lastName, eMail });
    });
  }
}
