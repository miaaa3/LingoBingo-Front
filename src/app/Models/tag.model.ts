export class Tag {
    name!: string;
    constructor(data: any) {
      this.name = data.name;
    }
    static fromJson(json: any): Tag {
      return new Tag({
        name: json.name,
      });
    }
  }