// @provengo summon ctrl
// @provengo summon selenium

//Define an event filter for start events in a session
// const AnyStart = function (name) {
//     return bp.EventSet("AnyStart", function (e) {
//         return e.data !== null && e.data.hasOwnProperty('startEvent') && e.data.startEvent && e.data.name !== name //&& String(s).equals(e.data.session.name)
//     })
// }

// defineAction = function (name, func) {
//     // Add the new action to the SeleniumSession prototype
//     SeleniumSession.prototype[name] = function (data) {
//         let session = this;

//         // Request a start event
//         sync({ request: bp.Event(`Start(${name})`, { session: session, startEvent: true, parameters: data }) })

//         // Block any other start events in the session while the function is executing
//         block(AnyStart(this.name), function () {
//             // Execute the function
//             func(session, data)

//         // Request an end event
//         sync({ request: bp.Event(`End(${name})`, { session: session, endEvent: true, parameters: data }) })
//         })
//     }
// }

// function startAllSessions() {
//     let sessions = {};
//     sessions.s = new SeleniumSession(setupSession).start(adminPage)
//     sessions.s2 = new SeleniumSession(AdminSession).start(adminPage)
//     sessions.s3 = new SeleniumSession(customerSession).start(mainPage)
//     return sessions
// }

// function adminAddProduct(session, admin){
//     session.adminAddProduct(admin)
// }

// function adminDeleteProduct(session, admin){
//     session.adminDeleteProduct(admin)
// }

// function customerAddProductToCart(session, admin){
//     session.customerAddProductToCart(admin)
// }

// function checkout(session, admin){
//     session.checkout(admin)
// }

function adminAddProduct(session, admin) {
    sync({request: Event('Start(adminAddProduct)', {startEvent: true, session: session, parameters: admin})})

    block(EventSet('', e => e.startEvent == true), function() {//[Event('Start(adminDeleteProduct)', Start(customerAddProductToCart)'])
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

        session.close()
        sync({request: Event('End(adminAddProduct)', {endEvent: true, session: session, parameters: admin}) })
    })
}

function adminDeleteProduct(session, admin) {
    sync({request: Event('Start(adminDeleteProduct)', {startEvent: true, session: session, parameters: admin})})

    block(EventSet('', e => e.startEvent == true), function() {
        //login admin
        session.waitForVisibility(XPATHS.adminLoginUsernameInput)
        session.writeText(XPATHS.adminLoginUsernameInput, admin.username); 
        session.waitForVisibility(XPATHS.adminLoginPasswordInput)
        session.writeText(XPATHS.adminLoginPasswordInput, admin.password);
        session.click(XPATHS.adminLoginButton); linger(7)

        //enter products page
        session.waitForVisibility(XPATHS.adminCatalogMenu)
        session.click(XPATHS.adminCatalogMenu);
        session.waitForVisibility(XPATHS.adminProducts)
        session.click(XPATHS.adminProducts); 
        linger(7)

        //remove test product
        session.waitForVisibility(XPATHS.adminSearchInput)
        session.writeText(XPATHS.adminSearchInput, 'new');
        linger(7)
        session.click(XPATHS.adminFilter)
        linger(7)
        session.waitForVisibility(XPATHS.adminTestProductChecbox)
        session.click(XPATHS.adminTestProductChecbox);
        linger(7)
        session.waitForVisibility(XPATHS.adminRemoveButton)
        session.click(XPATHS.adminRemoveButton);    
        linger(7) 
        session.acceptAlert(); // Accept the "Are you sure?" alert
        linger(7)

        session.close()
        sync({request: Event('End(adminDeleteProduct)', {endEvent: true, session: session, parameters: admin}) })
    })
}


function customerAddProductToCart(session, admin) {
    sync({request: Event('Start(customerAddProductToCart)', {startEvent: true, session: session, parameters: admin})})

    block(EventSet('', e => e.startEvent == true), function() {
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
        linger(7)
        session.click(XPATHS.searchButton)

        //add to cart
        linger(7);        linger(7)
;        linger(7)
        session.waitForVisibility(XPATHS.addToCartTestProduct1)
        try {
            session.click(XPATHS.addToCartTestProduct1); // Try the first XPath
            linger(7);
        } catch (error) {
            // If an error occurs (like element not found), try the second XPath
            try {
                session.click(XPATHS.addToCartTestProduct2); // Try the second XPath
                linger(7);
            } catch (error) {
                console.log("Both XPaths failed to find the element.");
            }
        }
        //session.click(XPATHS.addToCartTestProduct);nger(3)


        session.close()

        sync({request: Event('End(customerAddProductToCart)', {endEvent: true, session: session, parameters: admin}) })
    })
}



function checkout(session, admin) {
    sync({request: Event('Start(checkout)', {startEvent: true, session: session, parameters: admin})})

    block(EventSet('', e => e.startEvent == true), function() {
        //login
        session.click(XPATHS.myAccount); 
        session.click(XPATHS.login); 
        session.waitForVisibility(XPATHS.loginEmailInput)
        session.writeText(XPATHS.loginEmailInput, customer.email);    
        session.waitForVisibility(XPATHS.loginPasswordInput)
        session.writeText(XPATHS.loginPasswordInput, customer.password); 
        session.click(XPATHS.loginButton); 

        //my cRT
        linger(7)
        session.waitForVisibility(XPATHS.shoppingCart2)
        session.click(XPATHS.shoppingCart2);
        session.waitForVisibility(XPATHS.checkout2)
        session.click(XPATHS.checkout2);linger(7)
        session.click(XPATHS.chooseAddress);linger(7)
        session.click(XPATHS.chooseTestAdress);linger(7)

        session.click(XPATHS.shipping);linger(7)
        session.click(XPATHS.shippingcheckbox);linger(7)
        session.click(XPATHS.shippingContinue);linger(7)

        session.click(XPATHS.paymentMethod);linger(7)
        session.click(XPATHS.paymentCheckbox);linger(7)
        session.click(XPATHS.paymentContinue);linger(7)
        //session.click(XPATHS.confirmOrder);linger(7);linger(7)
        try {
            session.click(XPATHS.confirmOrder1); // Try the first XPath
            linger(7);
        } catch (error) {
            // If an error occurs (like element not found), try the second XPath
            try {
                session.click(XPATHS.confirmOrder2); // Try the second XPath
                linger(7);
            } catch (error) {
                console.log("Both XPaths failed to find the element.");
            }
        }
        session.close()

        sync({request: Event('End(checkout)', {endEvent: true, session: session, parameters: admin}) })
    })
}






































///////////////////////////////////////////////////**************************************************************//////////////////////////////// */
// defineAction('adminAddProduct', function(session, admin) {
//     //login admin
//     session.waitForVisibility(XPATHS.adminLoginUsernameInput)
//     session.writeText(XPATHS.adminLoginUsernameInput, admin.username); 

//     session.waitForVisibility(XPATHS.adminLoginPasswordInput)
//     session.writeText(XPATHS.adminLoginPasswordInput, admin.password);
    
//     session.click(XPATHS.adminLoginButton); 

//     //enter products page
//     session.waitForVisibility(XPATHS.adminCatalogMenu)
//     session.click(XPATHS.adminCatalogMenu);
//     session.waitForVisibility(XPATHS.adminProducts)
//     session.click(XPATHS.adminProducts); 

//     //add new product
//     session.waitForVisibility(XPATHS.adminAddNew)
//     session.click(XPATHS.adminAddNew)

//     session.waitForVisibility(XPATHS.addNewNameInput)
//     session.writeText(XPATHS.addNewNameInput, testProduct.name)
//     session.writeText(XPATHS.addNewTagTitleInput, testProduct.tag)
//     session.click(XPATHS.addNewDataTab)
//     session.writeText(XPATHS.addNewModelInput, testProduct.model)
//     session.click(XPATHS.addNewSeoTab)
//     session.writeText(XPATHS.addNewSeoInput, testProduct.seo)
//     session.click(XPATHS.addNewSaveButton)
// })

// defineAction('adminDeleteProduct', function(session, admin) {
//     //login admin
//     session.waitForVisibility(XPATHS.adminLoginUsernameInput)
//     session.writeText(XPATHS.adminLoginUsernameInput, admin.username); 
//     session.waitForVisibility(XPATHS.adminLoginPasswordInput)
//     session.writeText(XPATHS.adminLoginPasswordInput, admin.password);
//     session.click(XPATHS.adminLoginButton); linger(7)

//     //enter products page
//     session.waitForVisibility(XPATHS.adminCatalogMenu)
//     session.click(XPATHS.adminCatalogMenu);
//     session.waitForVisibility(XPATHS.adminProducts)
//     session.click(XPATHS.adminProducts); 
//     linger(7)

//     //remove test product
//     session.waitForVisibility(XPATHS.adminSearchInput)
//     session.writeText(XPATHS.adminSearchInput, 'new');
//     session.click(XPATHS.adminFilter)
//     session.waitForVisibility(XPATHS.adminTestProductChecbox)
//     session.click(XPATHS.adminTestProductChecbox);
//     session.click(XPATHS.adminRemoveButton);     
//     session.acceptAlert(); // Accept the "Are you sure?" alert
//     linger(7)
// })

// defineAction('customerAddProductToCart', function(session, customer) {
//     //login
//     session.click(XPATHS.myAccount); 
//     session.click(XPATHS.login); 
//     session.waitForVisibility(XPATHS.loginEmailInput)
//     session.writeText(XPATHS.loginEmailInput, customer.email);    
//     session.waitForVisibility(XPATHS.loginPasswordInput)
//     session.writeText(XPATHS.loginPasswordInput, customer.password); 
//     session.click(XPATHS.loginButton); 

//     //search
//     session.waitForVisibility(XPATHS.searchWindow)
//     session.writeText(XPATHS.searchWindow, testProduct.name) 
//     session.click(XPATHS.searchButton); 

//     //add to cart
//     linger(7)
//     session.waitForVisibility(XPATHS.addToCartTestProduct)
//     linger(7)
//     session.click(XPATHS.addToCartTestProduct); linger(7);linger(7)
// })

// defineAction('checkout', function(session, customer) {
//     //login
//     session.click(XPATHS.myAccount); 
//     session.click(XPATHS.login); 
//     session.waitForVisibility(XPATHS.loginEmailInput)
//     session.writeText(XPATHS.loginEmailInput, customer.email);    
//     session.waitForVisibility(XPATHS.loginPasswordInput)
//     session.writeText(XPATHS.loginPasswordInput, customer.password); 
//     session.click(XPATHS.loginButton); 

//     //my cRT
//     linger(7)
//     session.waitForVisibility(XPATHS.shoppingCart2)
//     session.click(XPATHS.shoppingCart2);
//     session.waitForVisibility(XPATHS.checkout2)
//     session.click(XPATHS.checkout2);linger(7)
//     session.click(XPATHS.chooseAddress);linger(7)
//     session.click(XPATHS.chooseTestAdress);linger(7)

//     session.click(XPATHS.shipping);linger(7)
//     session.click(XPATHS.shippingcheckbox);linger(7)
//     session.click(XPATHS.shippingContinue);linger(7)

//     session.click(XPATHS.paymentMethod);linger(7)
//     session.click(XPATHS.paymentCheckbox);linger(7)
//     session.click(XPATHS.paymentContinue);linger(7)
//     session.waitForVisibility(XPATHS.confirmOrder);linger(7);
//     session.click(XPATHS.confirmOrder);linger(7);linger(7)
// })

function linger(seconds){
    Ctrl.doSleep(1000*seconds)
}