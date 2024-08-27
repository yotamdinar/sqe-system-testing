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
        sync({ request: bp.Event(`Start(${name})`, { session: session, startEvent: true, parameters: data }) })

        // Block any other start events in the session while the function is executing
        block(AnyStartInSession(this.name), function () {
            // Execute the function
            func(session, data)

            // Request an end event
            sync({ request: bp.Event(`End(${name})`, { session: session, endEvent: true, parameters: data }) })
        })
    }
}

function adminAddProduct(session, data) {
    //login admin
    session.waitForVisibility(XPATHS.adminLoginUsernameInput)
    session.writeText(XPATHS.adminLoginUsernameInput, admin.username); 

    session.waitForVisibility(XPATHS.adminLoginPasswordInput)
    session.writeText(XPATHS.adminLoginPasswordInput, admin.password);
    
    session.click(XPATHS.adminLoginButton); 

    //enter products page
    session.waitForVisibility(XPATHS.adminCatalogMenu)
    session.click(XPATHS.adminCatalogMenu);
    session.waitForVisibility(XPATHS.adminProducts)
    session.click(XPATHS.adminProducts); 

    //add new product
    session.waitForVisibility(XPATHS.adminAddNew)
    session.click(XPATHS.adminAddNew)

    session.waitForVisibility(XPATHS.addNewNameInput)
    session.writeText(XPATHS.addNewNameInput, testProduct.name)
    session.writeText(XPATHS.addNewTagTitleInput, testProduct.tag)
    session.click(XPATHS.addNewDataTab)
    session.writeText(XPATHS.addNewModelInput, testProduct.model)
    session.click(XPATHS.addNewSeoTab)

    session.writeText(XPATHS.addNewSeoInput, testProduct.seo)
    session.click(XPATHS.addNewSaveButton)
                           

}

function adminDeleteProduct(session, data){
    //login admin
    session.waitForVisibility(XPATHS.adminLoginUsernameInput)
    session.writeText(XPATHS.adminLoginUsernameInput, admin.username); 

    session.waitForVisibility(XPATHS.adminLoginPasswordInput)
    session.writeText(XPATHS.adminLoginPasswordInput, admin.password);
    session.click(XPATHS.adminLoginButton); 
    linger(3)

    //enter products page
    session.waitForVisibility(XPATHS.adminCatalogMenu)
    session.click(XPATHS.adminCatalogMenu);
    session.waitForVisibility(XPATHS.adminProducts)
    session.click(XPATHS.adminProducts); 
    linger(3)

    //remove test product
    session.waitForVisibility(XPATHS.adminSearchInput)
    session.writeText(XPATHS.adminSearchInput, 'new');
    session.click(XPATHS.adminFilter)
    session.waitForVisibility(XPATHS.adminTestProductChecbox)
    session.click(XPATHS.adminTestProductChecbox);
    session.click(XPATHS.adminRemoveButton);     
    session.acceptAlert(); // Accept the "Are you sure?" alert
    linger(3)
}

function customerAddProductToCart(session, data){
    //login
    session.click(XPATHS.myAccount); 
    session.click(XPATHS.login); 
    session.waitForVisibility(XPATHS.loginEmailInput)
    session.writeText(XPATHS.loginEmailInput, customer.email);    
    session.waitForVisibility(XPATHS.loginPasswordInput)
    session.writeText(XPATHS.loginPasswordInput, customer.password); 
    session.click(XPATHS.loginButton); 

    //search
    session.waitForVisibility(XPATHS.searchWindow)
    session.writeText(XPATHS.searchWindow, testProduct.name) 
    session.click(XPATHS.searchButton); 

    //add to cart
    linger(3)
    session.waitForVisibility(XPATHS.addToCartTestProduct)
    linger(3)
    session.click(XPATHS.addToCartTestProduct); linger(2);linger(2)
    // sync({ request: Event("End(login)") })
}

function linger(seconds){
    Ctrl.doSleep(1000*seconds)
}