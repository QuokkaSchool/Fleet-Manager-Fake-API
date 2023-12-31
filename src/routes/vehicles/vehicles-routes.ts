export class VehiclesRoutes {
  private static root = 'vehicles';

  public static getList = () => `/${this.root}`;
  public static getDetails = () => `/${this.root}/:id`;
  public static add = () => `/${this.root}/add`;
  public static update = () => `/${this.root}/update/:id`;
  public static remove = () => `/${this.root}/delete/:id`;
}
