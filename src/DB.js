// On crée un tableau local qui va servir de base de données temporaire
let localContacts = [
  { id: "1", firstName: "Semih", lastName: "Dev", eMail: "semih@example.com" },
  { id: "2", firstName: "Jean", lastName: "Dupont", eMail: "jean@example.com" }
];

export default class DB {
  static setApiURL(data) {
    // On garde la fonction pour ne pas casser le reste du code, 
    // mais on ne s'en sert plus.
    this.apiURL = data;
  }

  static async findAll() {
    // On simule une attente réseau
    return new Promise((resolve) => {
      setTimeout(() => resolve([...localContacts]), 300);
    });
  }

  static async create(data) {
    const newContact = {
      id: Date.now().toString(), // On génère un ID unique
      firstName: data.firstName,
      lastName: data.lastName,
      eMail: data.eMail
    };
    localContacts.push(newContact);
    return newContact;
  }

  static async deleteOneById(id) {
    localContacts = localContacts.filter(c => c.id !== id);
    return { success: true };
  }

  static async update(contact, data) {
    const index = localContacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      localContacts[index] = { ...localContacts[index], ...data };
      return localContacts[index];
    }
  }
}