import { Item, Types } from '../../src/interfaces/item';
import { Utils } from '../utils/utils';
import { InsightsPage, ItemsListPage } from '../page';

const {itemsAreEquals} = Utils;
describe("Deleting one item", () => {
  const item: Item = {
    id: 0,
    name: "The Rolling Stones concert",
    sellIn: 4,
    quality: 10,
    type: Types.TICKETS
  };
  const extraElement: Item = {
    id: 0,
    name: "Nachos with extra cheese",
    sellIn: 0,
    quality: 80,
    type: Types.LEGENDARY
  };
  before(() => {
    cy.request("/api/items").its("body").then((items: Item[]) => {
      items.filter(it => itemsAreEquals(it, item))
        .forEach(it => cy.request("DELETE", `/api/items/${it.id}`));
    });
    cy.request("POST", "/api/items", item);
    cy.request({
      method: "POST",
      url: "/api/items",
      body: extraElement,
      failOnStatusCode: false
    });
  });

  it("then the item is no longer displayed", () => {
    ItemsListPage.visit();
    ItemsListPage.validateItemIsListed(item);
    ItemsListPage.setAliasItemsList();
    InsightsPage.visit();
    InsightsPage.setAliasTypeAmounts();
    InsightsPage.goBack();
    ItemsListPage.deleteItem(item);
    ItemsListPage.getItem(item, false);
    ItemsListPage.validateItemsListLengthChangedBy(-1);
    InsightsPage.visit();
    InsightsPage.validateAmountChangedBy(-1, item.type)
  });
})
