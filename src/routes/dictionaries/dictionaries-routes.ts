export class DictionariesRoutes {
  private static root = 'dictionaries';

  public static getVehicleType = () => `/${this.root}/vehicleType`;
  public static getVehicleStatus = () => `/${this.root}/vehicleStatus`;
  public static getOrderStatus = () => `/${this.root}/orderStatus`;
}
