export class VehiclesRoutes {
  private static root = 'vehicles';

  public static getVehiclesList = () => `/${this.root}`;
  public static getVehicleDetails = () => `/${this.root}/:id`;
  public static addVehicle = () => `/${this.root}/add`;
  public static updateVehicle = () => `/${this.root}/update/:id`;
  public static deleteVehicle = () => `/${this.root}/delete/:id`;
}
