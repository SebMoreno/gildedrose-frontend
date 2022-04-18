import { Utils } from "cypress/utils/utils";
import {Item, Types} from "src/interfaces/item";
import {ItemsListPage} from "../page";
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
      .then((items: Item[]) => {
        const itemInBd = items.find(it => itemsAreEquals(it, item));
        if (itemInBd) {
          cy.request("DELETE", `/api/items/${itemInBd.id}`)
        }
      })
  })

  it("then a new item should be displayed", () => {
    const itemsToBeCreated = 1;
    ItemsListPage.visit();
    ItemsListPage.setAliasItemsList()
    ItemsListPage.openAddItemDialog()
    ItemsListPage.filloutItemAttributes(item);
    ItemsListPage.confirmItemCreationOrModification();
    ItemsListPage.validateItemsListLengthIncreasedBy(itemsToBeCreated)
    ItemsListPage.validateItemIsListed(item);
  });
})
