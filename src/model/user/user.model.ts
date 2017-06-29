export class UserModel {

  private id: number;
  private name: string;
  private username: string;
  private email: string;
  private phone_number: string;
  private ddd: string;
  private created_at: Date;
  private updated_at: Date;

  constructor(public params?:any) {
    params = params || {}
    this.id = params.id || null;
    this.name = params.name || "";
    this.username = params.username || "";
    this.email = params.email || "";
    this.phone_number = params.phone_number || "";
    this.ddd = params.ddd || "";
    this.created_at = params.created_at || "";
    this.updated_at = params.updated_at || "";
  }
}
