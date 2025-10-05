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
    // Événement pour supprimer un contact
    this.domElt.querySelector(".destroy").addEventListener("click", () => {
      window.ContactList.deleteOneById(this.id);
      this.domElt.remove();
    });

    // Événement pour entrer en mode édition
    this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
      this.domElt.classList.add("isEditing");
    });

    // Événement pour valider les modifications
    this.domElt.querySelector(".btn-check").addEventListener("click", () => {
      const updatedData = this.collectUpdatedData();

      // Validation de l'email
      if (!this.isEmailValid(updatedData.eMail)) {
        alert("L'email doit être valide.");
        return;
      }

      // Appel de la méthode update pour appliquer les modifications
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

  isEmailValid(email) {
    return email.includes("@");
  }

  update(data) {
    // Mise à jour des données locales
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.eMail = data.eMail;

    // Mise à jour de l'affichage
    this.domElt.querySelector(".first-name").innerText = data.firstName;
    this.domElt.querySelector(".last-name").innerText = data.lastName;
    this.domElt.querySelector(".e-mail").innerText = data.eMail;

    // Passer en mode non-édition
    this.domElt.classList.remove("isEditing");

    // Mise à jour dans la base de données via PUT
    DB.update(this, data)
      .then((updatedContact) => {
        console.log("Contact mis à jour :", updatedContact);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour :", error);
      });
  }
}
