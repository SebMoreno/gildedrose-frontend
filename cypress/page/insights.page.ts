import {Types} from "../../src/interfaces/item";

export class InsightsPage {
  private static readonly goBackButton = "[data-automation=insights-go-back-button]";

  public static visit() {
    cy.visit("/insights");
  }

  public static goBack() {
    cy.get(this.goBackButton).click();
  }

  public static setAliasTypeAmounts() {
    for (let typesKey in Types) {
      cy.get(this.getItemAmountLocatorOfType(typesKey)).as(typesKey);
    }
  }

  public static validateAmountChangedBy(change: number, type: Types) {
    cy.get("@" + type).then(initialItemAmount =>
      cy.get(this.getItemAmountLocatorOfType(type))
        .should("contain.value", parseInt(initialItemAmount.text()) + change)
    );
  }

  private static getItemAmountLocatorOfType(type: string) {
    return `[data-automation=item-type-${type.toLowerCase()}-value]`
  }
}
