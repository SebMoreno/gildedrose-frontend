import {Item, Types} from "src/interfaces/item";
import {ItemsListPage} from "../page/items-list.page";

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
        const itemInBd = items.find(it =>
          it.name === item.name &&
          it.quality === item.quality &&
          it.type === item.type &&
          it.sellIn === item.sellIn
        );
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
    ItemsListPage.confirmItemCreation();
    ItemsListPage.validateItemsListLengthIncreasedBy(itemsToBeCreated)
    ItemsListPage.validateItemIsListed(item);
  });
})
