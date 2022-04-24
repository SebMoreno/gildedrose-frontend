import { Item } from "src/interfaces/item";

export class Utils {
  public static itemsAreEquals(item1: Item, item2: Item) {
    return item1.name === item2.name &&
      item1.quality === item2.quality &&
      item1.type === item2.type &&
      item1.sellIn === item2.sellIn;
  }
}
