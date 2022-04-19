import { Utils } from "cypress/utils/utils";
import { Item, Types } from "src/interfaces/item";
import { ItemsListPage } from "../page";

const {itemsAreEquals} = Utils;

describe("Adding items", () => {
  const item: Item = {
    id: 0,
    name: "Carrot",
    sellIn: 30,
    quality: 30,
    type: Types.NORMAL
  };

  before(() => {
    cy.request("GET", "/api/items").its("body")
      .then((items: Item[]) =>
        items
          .filter(it => itemsAreEquals(it, item))
          .forEach(it => cy.request("DELETE", `/api/items/${it.id}`))
      );
  })

  it("then a new item should be displayed", () => {
    const itemsToBeCreated = 1;
    ItemsListPage.visit();
    ItemsListPage.setAliasItemsList();
    ItemsListPage.openAddItemDialog();
    ItemsListPage.filloutItemAttributes(item);
    ItemsListPage.confirmItemCreationOrModification();
    ItemsListPage.validateItemsListLengthChangedBy(itemsToBeCreated);
    ItemsListPage.validateItemIsListed(item);
  });
})
