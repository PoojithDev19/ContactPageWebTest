Feature: Medavie Contact Page Validation

  Scenario: Verify Medavie Blue Cross Contact page displays correct Contact Information (English)
    Given I open the Medavie English homepage
    When I click on the Contact menu
    Then I should see the Contact page for English site
    And I verify the contact numbers for English site

  Scenario: Verify Croix Bleue Medavie Contact page displays correct Contact Informations (French)
    Given I open the Medavie French homepage
    When I click on the Coordonnées menu
    Then I should see the Contact page for French site
    And I verify the contact numbers for French site