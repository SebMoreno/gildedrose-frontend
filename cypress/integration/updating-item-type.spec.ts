import {Item, Types} from "../../src/interfaces/item";
import {InsightsPage, ItemsListPage} from "../page";

describe("Update the type of an item", () => {
  const prevItem: Item = {
    id: 0,
    name: "Chocolate",
    sellIn: 0,
    quality: 10,
    type: Types.NORMAL
  };
  const newItem: Item = {
    id: 0,
    name: "Chocolate",
    sellIn: 0,
    quality: 10,
    type: Types.AGED
  };
  before(() => {
    // validar no existe ni prev ni new item
    cy.request("POST", "/api/items", prevItem);
  });

  it("then the item type should have changed", () => {
    ItemsListPage.visit();
    ItemsListPage.validateItemIsListed(prevItem);
    InsightsPage.visit();
    InsightsPage.setAliasTypeAmounts();
    InsightsPage.goBack();
    ItemsListPage.openEditItemDialog(prevItem);
    ItemsListPage.filloutItemAttributes(newItem);
    ItemsListPage.confirmItemCreationOrModification();
    ItemsListPage.validateItemIsListed(newItem);
    InsightsPage.visit();
    InsightsPage.validateAmountChangedBy(-1, prevItem.type)
    InsightsPage.validateAmountChangedBy(1, newItem.type)
  });
})
