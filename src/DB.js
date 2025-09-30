export default class DB {
  static setApiURL(data) {
    this.apiURL = data;
  }
  static async findAll() {
    const response = await fetch(this.apiURL + "contacts");
    return response.json();
  }
  static async create(data) {
    const response = await fetch(this.apiURL + "contacts",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        firstName: data.firstName,
        lastName:data.lastName,
        eMail:data.eMail
      })
      });
    return response.json();
  }
  static async deleteOneById(id) {
    const response = await fetch(this.apiURL + "contacts/"+ id,{
      method:"DELETE",
      });
    return response.json();
  }
}
