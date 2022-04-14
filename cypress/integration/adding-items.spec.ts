import { Item, Types } from "src/interfaces/item";

describe("Adding items", () => {
  it("then a new item should be displayed", () => {

    const item: Item = {
      id: 0,
      name: "Carrot",
      sellIn: 30,
      quality: 30,
      type: Types.LEGENDARY
    };
    cy.visit("/list");
    cy.get(".list-add-button").click();
    cy.get("[data-automation=item-form-name]").type(item.name);
    cy.get("[data-automation=item-form-sell-in]").type(item.sellIn.toString());
    cy.get("[data-automation=item-form-quality]").type(item.quality.toString());
    cy.get("[data-automation=item-form-type]").click();
    cy.get("mat-option").contains(item.type).click();
    cy.intercept("GET", "/api/items").as("getItems");
    cy.get("[data-automation=item-form-confirm-button]").click();
    cy.wait("@getItems");
    const createdItem = cy.get(".mat-card > :nth-child(1)").filter(`:contains('${item.name}')`)
      .siblings(":nth-child(2)").filter(`:contains('${item.sellIn}')`)
      .siblings(":nth-child(3)").filter(`:contains('${item.quality}')`)
      .siblings(":nth-child(4)").filter(`:contains('${item.type}')`);
    createdItem.should("exist");
    createdItem.siblings().find("[data-automation=list-delete-button]").click();
    cy.get("[data-automation=delete-dialog-confirm-button]").contains("Delete").click();
  });
})
