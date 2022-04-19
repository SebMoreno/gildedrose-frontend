import {Item, Types} from "src/interfaces/item";
import {ItemsListPage} from "../page";

describe("Adding items with miss information", () => {
  const item: Item = {
    id: 0,
    name: "Wine",
    sellIn: 30,
    quality: -3,
    type: Types.AGED
  };
  const qualityErrorExpected = "Expected value between 0 and 80";
  const confirmButtonStateExpected = "be.disabled";

  it("then the item can't be created", () => {
    ItemsListPage.visit();
    ItemsListPage.openAddItemDialog();
    ItemsListPage.filloutItemAttributes(item);
    ItemsListPage.validateConfirmAddButtonIs(confirmButtonStateExpected);
    ItemsListPage.validateQualityErrorMessage(qualityErrorExpected);
  });
});
