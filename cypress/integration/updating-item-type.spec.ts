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
    cy.request("/api/items").its("body").then((items: Item[]) => {
      const prevItemInBD = items.find(it =>
        it.name === prevItem.name &&
        it.quality === prevItem.quality &&
        it.type === prevItem.type &&
        it.sellIn === prevItem.sellIn)
      const newItemInBD = items.find(it =>
          it.name === newItem.name &&
          it.quality === newItem.quality &&
          it.type === newItem.type &&
          it.sellIn === newItem.sellIn)
      if (prevItemInBD) {
        cy.request("DELETE", `/api/items/${prevItemInBD.id}`)
      }
      if (newItemInBD) {
        cy.request("DELETE", `/api/items/${newItemInBD.id}`)
      }
    });
    cy.request({
      method: "POST",
      url: "/api/items",
      body: prevItem,
      failOnStatusCode: false
    });
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
