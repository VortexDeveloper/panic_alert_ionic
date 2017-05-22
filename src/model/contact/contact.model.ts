export class ContactModel {
  private name: string;
  private phoneNumbers: Array<{number: string}>;

  constructor(contact_params) {
    this.name = contact_params.name;

    for(let number of contact_params.numbers) {
      this.phoneNumbers.push({number: number});
    }
  }
}
