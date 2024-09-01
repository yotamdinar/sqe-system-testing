Feature: Admin deletes an item from the store, and a user buys the item

    Scenario: User deletes an item from the store
        Given User is in login page for admins
        When User is logged in with "<Email>" and "<Password>"
        And User deletes a "<Product>" from the store 
        Then Product is deleted from the store

    Scenario: User attempts to buy a deleted Product
        Given User is in login page
        When User is logged in with "dinaryo@post.bgu.ac.il" and "1111"
        And User added "new" to the cart
        And Admin logged in with "admin" and "1234"
        And Admin deletes "new"
        And User attempt to buy "new"
        Then User not able to complete the buy

        Examples:
        | Email           | Password  | Product |
        | admin    | 1234  | new    |
