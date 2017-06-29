export class AddressModel {

  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  district: string;
  countryName: string;
  countryCode: string;
  formatted_address: string;

  constructor(public params?:any) {
    params = params || {}
    this.street = params.street || "";
    this.houseNumber = params.houseNumber || "";
    this.postalCode = params.postalCode || "";
    this.city = params.city || "";
    this.district = params.district || "";
    this.countryName = params.countryName || "";
    this.countryCode = params.countryCode || "";
    this.formatted_address = this.format_address() || "";
  }

  format_address(){
    return this.street + ", " + this.houseNumber + " - " + this.district + ", " + this.city;
  }

}
