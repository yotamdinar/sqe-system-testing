// @provengo summon ctrl

// Define an event filter for start events in a session
const AnyStartInSession = function (s) {
    return bp.EventSet("AnyStartInSession-" + s, function (e) {
        return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && String(s).equals(e.data.session.name)
    })
}

defineAction = function (name, func) {
    // Add the new action to the SeleniumSession prototype
    SeleniumSession.prototype[name] = function (data) {
        let session = this;

        // Request a start event
        // sync({ request: bp.Event(`Start(${name})`, { session: session, startEvent: true, parameters: data }) })

        // Block any other start events in the session while the function is executing
        block(AnyStartInSession(this.name), function () {
            // Execute the function
            func(session, data)

        // Request an end event
        // sync({ request: bp.Event(`End(${name})`, { session: session, endEvent: true, parameters: data }) })
        })
    }
}

defineAction('adminAddProduct', function(session, admin) {
    // //login admin
    // session.waitForVisibility(XPATHS.adminLoginUsernameInput)
    // session.writeText(XPATHS.adminLoginUsernameInput, admin.username); 

    // session.waitForVisibility(XPATHS.adminLoginPasswordInput)
    // session.writeText(XPATHS.adminLoginPasswordInput, admin.password);
    
    // session.click(XPATHS.adminLoginButton); 

    // //enter products page
    // session.waitForVisibility(XPATHS.adminCatalogMenu)
    // session.click(XPATHS.adminCatalogMenu);
    // session.waitForVisibility(XPATHS.adminProducts)
    // session.click(XPATHS.adminProducts); 

    // //add new product
    // session.waitForVisibility(XPATHS.adminAddNew)
    // session.click(XPATHS.adminAddNew)

    // session.waitForVisibility(XPATHS.addNewNameInput)
    // session.writeText(XPATHS.addNewNameInput, testProduct.name)
    // session.writeText(XPATHS.addNewTagTitleInput, testProduct.tag)
    // session.click(XPATHS.addNewDataTab)
    // session.writeText(XPATHS.addNewModelInput, testProduct.model)
    // session.click(XPATHS.addNewSeoTab)
    // session.writeText(XPATHS.addNewSeoInput, testProduct.seo)
    // session.click(XPATHS.addNewSaveButton)
})

defineAction('adminDeleteProduct', function(session, admin) {
    //login admin
    // session.waitForVisibility(XPATHS.adminLoginUsernameInput)
    // session.writeText(XPATHS.adminLoginUsernameInput, admin.username); 
    // session.waitForVisibility(XPATHS.adminLoginPasswordInput)
    // session.writeText(XPATHS.adminLoginPasswordInput, admin.password);
    // session.click(XPATHS.adminLoginButton); linger(2)

    // //enter products page
    // session.waitForVisibility(XPATHS.adminCatalogMenu)
    // session.click(XPATHS.adminCatalogMenu);
    // session.waitForVisibility(XPATHS.adminProducts)
    // session.click(XPATHS.adminProducts); 
    // linger(2)

    // //remove test product
    // session.waitForVisibility(XPATHS.adminSearchInput)
    // session.writeText(XPATHS.adminSearchInput, 'new');
    // session.click(XPATHS.adminFilter)
    // session.waitForVisibility(XPATHS.adminTestProductChecbox)
    // session.click(XPATHS.adminTestProductChecbox);
    // session.click(XPATHS.adminRemoveButton);     
    // session.acceptAlert(); // Accept the "Are you sure?" alert
    // linger(2)
})

defineAction('customerAddProductToCart', function(session, customer) {
    //login
    // session.click(XPATHS.myAccount); 
    // session.click(XPATHS.login); 
    // session.waitForVisibility(XPATHS.loginEmailInput)
    // session.writeText(XPATHS.loginEmailInput, customer.email);    
    // session.waitForVisibility(XPATHS.loginPasswordInput)
    // session.writeText(XPATHS.loginPasswordInput, customer.password); 
    // session.click(XPATHS.loginButton); 

    // //search
    // session.waitForVisibility(XPATHS.searchWindow)
    // session.writeText(XPATHS.searchWindow, testProduct.name) 
    // session.click(XPATHS.searchButton); 

    // //add to cart
    // linger(2)
    // session.waitForVisibility(XPATHS.addToCartTestProduct)
    // linger(2)
    // session.click(XPATHS.addToCartTestProduct); linger(2);linger(2)
})

defineAction('checkout', function(session, customer) {
    //login
    // session.click(XPATHS.myAccount); 
    // session.click(XPATHS.login); 
    // session.waitForVisibility(XPATHS.loginEmailInput)
    // session.writeText(XPATHS.loginEmailInput, customer.email);    
    // session.waitForVisibility(XPATHS.loginPasswordInput)
    // session.writeText(XPATHS.loginPasswordInput, customer.password); 
    // session.click(XPATHS.loginButton); 

    // //my cRT
    // linger(2)
    // session.waitForVisibility(XPATHS.shoppingCart2)
    // session.click(XPATHS.shoppingCart2);
    // session.waitForVisibility(XPATHS.checkout2)
    // session.click(XPATHS.checkout2);linger(2)
    // session.click(XPATHS.chooseAddress);linger(2)
    // session.click(XPATHS.chooseTestAdress);linger(2)

    // session.click(XPATHS.shipping);linger(2)
    // session.click(XPATHS.shippingcheckbox);linger(2)
    // session.click(XPATHS.shippingContinue);linger(2)

    // session.click(XPATHS.paymentMethod);linger(2)
    // session.click(XPATHS.paymentCheckbox);linger(2)
    // session.click(XPATHS.paymentContinue);linger(2)
    // session.waitForVisibility(XPATHS.confirmOrder);linger(2);
    // session.click(XPATHS.confirmOrder);linger(2);linger(2)
})

function linger(seconds){
    Ctrl.doSleep(1000*seconds)
}