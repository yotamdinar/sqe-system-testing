// @provengo summon ctrl
// @provengo summon selenium

function loginCustomer(session) {
    session.click(XPATHS.myAccount);
    session.click(XPATHS.login);
    session.waitForVisibility(XPATHS.loginEmailInput);
    session.writeText(XPATHS.loginEmailInput, customer.email);
    session.waitForVisibility(XPATHS.loginPasswordInput);
    session.writeText(XPATHS.loginPasswordInput, customer.password);
    session.click(XPATHS.loginButton);
    
}

function loginAdmin(session) {
    session.waitForVisibility(XPATHS.adminLoginUsernameInput);
    session.writeText(XPATHS.adminLoginUsernameInput, admin.username);
    session.waitForVisibility(XPATHS.adminLoginPasswordInput);
    session.writeText(XPATHS.adminLoginPasswordInput, admin.password);
    session.click(XPATHS.adminLoginButton);
}

function adminAddProduct(session) {
    sync({ request: Event('Start(adminAddProduct)', { startEvent: true }) });

    block(EventSet('', e => typeof e.startEvent !== 'undefined' && e.startEvent === true), function () {

        loginAdmin(session);

        session.waitForVisibility(XPATHS.adminCatalogMenu);
        session.click(XPATHS.adminCatalogMenu);
        session.waitForVisibility(XPATHS.adminProducts);
        session.click(XPATHS.adminProducts);

        session.waitForVisibility(XPATHS.adminAddNew);
        session.click(XPATHS.adminAddNew);

        session.waitForVisibility(XPATHS.addNewNameInput);
        session.writeText(XPATHS.addNewNameInput, testProduct.name);
        session.writeText(XPATHS.addNewTagTitleInput, testProduct.tag);
        session.click(XPATHS.addNewDataTab);
        session.writeText(XPATHS.addNewModelInput, testProduct.model);
        session.click(XPATHS.addNewSeoTab);
        session.writeText(XPATHS.addNewSeoInput, testProduct.seo);
        session.click(XPATHS.addNewSaveButton);
        session.close();

        sync({ request: Event('End(adminAddProduct)', { endEvent: true }) });
    });
}

function adminDeleteProduct(session) {
    sync({ request: Event('Start(adminDeleteProduct)', { startEvent: true }) },

    block(EventSet('', e => typeof e.startEvent !== 'undefined' && e.startEvent === true), function () {

        loginAdmin(session);

        session.waitForVisibility(XPATHS.adminCatalogMenu);
        session.click(XPATHS.adminCatalogMenu);
        linger(1);
        session.waitForVisibility(XPATHS.adminProducts);
        session.click(XPATHS.adminProducts);
        linger(1);

        session.waitForVisibility(XPATHS.adminSearchInput);
        session.writeText(XPATHS.adminSearchInput, 'new');
        linger(1);
        session.click(XPATHS.adminFilter);
        linger(1);
        session.waitForVisibility(XPATHS.adminTestProductChecbox);
        session.click(XPATHS.adminTestProductChecbox);
        linger(1);
        session.waitForVisibility(XPATHS.adminRemoveButton);
        session.click(XPATHS.adminRemoveButton);
        linger(1);
        sync({ request: Event('End(adminDeleteProduct)', { endEvent: true }) });
        session.acceptAlert();
        linger(1);

        session.close();
    })
)
}

function customerAddProductToCart(session) {
    sync({ request: Event('Start(customerAddProductToCart)', { startEvent: true }) });

    block(EventSet('', e => typeof e.startEvent !== 'undefined' && e.startEvent === true), function () {

        loginCustomer(session);

        session.waitForVisibility(XPATHS.searchWindow);
        session.writeText(XPATHS.searchWindow, testProduct.name);
        session.click(XPATHS.searchButton);

        session.waitForVisibility(XPATHS.addToCartTestProduct1);
        session.moveToElement(XPATHS.addToCartTestProduct1);
        session.click(XPATHS.addToCartTestProduct1);

        session.close();

        sync({ request: Event('End(customerAddProductToCart)', { endEvent: true }) });
    });
}

function checkout(session) {
    sync({ request: Event('Start(checkout)', { startEvent: true }) });

    block(EventSet('', e => typeof e.startEvent !== 'undefined' && e.startEvent === true), function () {
        //interrupt(Event('end adminDeleteProduct'), function() {

            loginCustomer(session);

            linger(1);
            session.waitForVisibility(XPATHS.shoppingCart2);
            session.click(XPATHS.shoppingCart2);
            session.click(XPATHS.checkout2);
            linger(1);
            session.click(XPATHS.chooseAddress);
            linger(1);
            session.click(XPATHS.chooseTestAdress);
            linger(1);

            session.click(XPATHS.shipping);
            linger(1);
            session.click(XPATHS.shippingcheckbox);
            linger(1);
            session.click(XPATHS.shippingContinue);
            linger(1);

            session.click(XPATHS.paymentMethod);
            linger(1);
            session.click(XPATHS.paymentCheckbox);
            linger(1);
            session.click(XPATHS.paymentContinue);
            linger(1);
            session.moveToElement(XPATHS.confirmOrder1);
            sync({ request: Event('End(checkout)', { endEvent: true }) });
            session.click(XPATHS.confirmOrder1);
            session.close();

       // })
    });
}

function checkoutEmptyCart(session) {
    sync({ request: Event('Start(checkoutEmptyCart)', { startEvent: true }) });

    block(EventSet('', e => typeof e.startEvent !== 'undefined' && e.startEvent === true), function () {

        loginCustomer(session);

        linger(1);
        session.waitForVisibility(XPATHS.shoppingCart2);
        linger(1);
        session.click(XPATHS.shoppingCart2);
        linger(1);

        sync({ request: Event('End(checkoutEmptyCart)', { endEvent: true }) });
    });
}

function linger(seconds) {
    Ctrl.doSleep(1000 * seconds);
}
