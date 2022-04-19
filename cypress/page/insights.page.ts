import { Utils } from "cypress/utils/utils";
import {Types} from "../../src/interfaces/item";
import { ItemsListPage } from "./items-list.page";

export class InsightsPage {
  private static readonly goBackButton = "[data-automation=insights-go-back-button]";

  public static visit() {
    cy.visit("/insights");
    cy.wait("@" + Utils.getItemsRequestAlias);
    cy.wait(2000);
  }

  public static goBack() {
    cy.get(this.goBackButton).click();
    ItemsListPage.waitListToRender(Utils.getItemsRequestAlias);
  }

  public static setAliasTypeAmounts() {
    for (let typesKey in Types) {
      cy.get(this.getItemAmountLocatorOfType(typesKey))
      .then(el => parseInt(el.text())).as(typesKey);
    }
  }

  public static validateAmountChangedBy(change: number, type: Types) {
    cy.get("@" + type).then(initialItemAmount => {
      cy.get(this.getItemAmountLocatorOfType(type))
        .then(el => parseInt(el.text()))
        .should("equal", initialItemAmount as unknown as string + change);
    }
    );
  }

  private static getItemAmountLocatorOfType(type: string) {
    return `[data-automation=item-type-${type.toLowerCase()}-value]`;
  }
}
