import DB from '../../DB';
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
    // Supprimer un contact
    this.domElt.querySelector(".destroy").addEventListener("click", () => {
      window.ContactList.deleteOneById(this.id);
      this.domElt.remove();
    });

    // Mode édition
    this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
      this.domElt.classList.add("isEditing");
    });

    // Valider des modifications
    this.domElt.querySelector(".btn-check").addEventListener("click", () => {
      const updatedData = this.collectUpdatedData();

      // Validation de l'email
      if (!updatedData.eMail.includes("@")) {
        alert("L'email doit être valide.");
        return;
      }
      this.update(updatedData);
    });
  }

  collectUpdatedData() {
    return {
      firstName: this.domElt.querySelector(".input-firstname").value,
      lastName: this.domElt.querySelector(".input-lastname").value,
      eMail: this.domElt.querySelector(".input-email").value,
    };
  }



  update(data) {
    // Update des données locales
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.eMail = data.eMail;

    // Update du domElt
    this.domElt.querySelector(".first-name").innerText = data.firstName;
    this.domElt.querySelector(".last-name").innerText = data.lastName;
    this.domElt.querySelector(".e-mail").innerText = data.eMail;

    // Retirer le isEditing du tr
    this.domElt.classList.remove("isEditing");

    // Put dans la DB
    DB.update(this, data);
  }
}
