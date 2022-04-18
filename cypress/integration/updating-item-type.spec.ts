import { Utils } from "cypress/utils/utils";
import {Item, Types} from "../../src/interfaces/item";
import {InsightsPage, ItemsListPage} from "../page";
const {itemsAreEquals} = Utils;

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
      const prevItemInBD = items.find(it => itemsAreEquals(it, prevItem))
      const newItemInBD = items.find(it => itemsAreEquals(it, newItem))
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
