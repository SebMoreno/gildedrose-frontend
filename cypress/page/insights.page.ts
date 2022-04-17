import {Types} from "../../src/interfaces/item";
import { ItemsListPage } from "./items-list.page";

export class InsightsPage {
  private static readonly goBackButton = "[data-automation=insights-go-back-button]";
  private static readonly getItemsRequestAlias = "getItems";

  public static visit() {
    cy.visit("/insights");
    cy.wait(2000);
  }

  public static goBack() {
    cy.intercept("GET", "/api/items").as(this.getItemsRequestAlias);
    cy.get(this.goBackButton).click();
    ItemsListPage.waitListToRender(this.getItemsRequestAlias);    
  }

  public static setAliasTypeAmounts() {    
    for (let typesKey in Types) {
      cy.get(this.getItemAmountLocatorOfType(typesKey)).as(typesKey);
    }
  }

  public static validateAmountChangedBy(change: number, type: Types) {
    // TODO esto esta mal xD
    cy.get("@" + type).then(initialItemAmount =>
      cy.get(this.getItemAmountLocatorOfType(type))
        .should("contain.value", parseInt(initialItemAmount.text()) + change)
    );
  }

  private static getItemAmountLocatorOfType(type: string) {
    return `[data-automation=item-type-${type.toLowerCase()}-value]`
  }
}
