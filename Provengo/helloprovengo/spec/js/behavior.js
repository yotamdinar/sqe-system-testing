
// @provengo summon ctrl
// @provengo summon constraints
// @provengo summon selenium

// Shared object to store the sessions
let sessions = {};

// A single bthread to initialize all SeleniumSession instances
bthread("Initialize Sessions", function() {
    startAllSessions()
    sync({request: Event('sessionsInitialized')}); // Indicate that sessions are initialized
});

// A constraint to ensure all sessions are initialized before any actions
bthread("Wait for Session Initialization", function() {
    sync({
        waitFor: Event('sessionsInitialized'),
        block: [Event('setup'), Event('adminDeleteProduct'), Event('customerAddProductToCart'), Event('checkout')]
    });
});

bthread("setUp-admin add test product", function() {
    let s = new SeleniumSession(setupSession).start(adminPage)
    sync({request: Event('setup')})
    adminAddProduct(s, admin)
})

bthread("Admin deletes product", function() {
    let s2 = new SeleniumSession(AdminSession).start(adminPage)
    sync({request: Event('adminDeleteProduct') })
    adminDeleteProduct(s2, admin)
})

bthread("Customer adds product to cart", function() {
    let s3 = new SeleniumSession(customerSession).start(mainPage)
    sync({request: Event('customerAddProductToCart') })
    customerAddProductToCart(s3, customer)
})

bthread("Customer buying the product", function() {
    let s4 = new SeleniumSession(customerSession).start(mainPage)
    sync({request: Event('checkout') })
    sync(checkout(s4, customer))
})

//constrains
//1.wait for setup(admin adds test product to the shop"
bthread("wait for setup", function() {
    sync({
        waitFor: Event('setup'),
        block: [Event('adminDeleteProduct'),Event('customerAddProductToCart'),Event('checkout')]
    })
})

//2.
bthread("wait for setup", function() {
    sync({
        waitFor: Event('customerAddProductToCart'),
        block: [Event('checkout')]
    })
})


//TODO:
//1.assert in good runing path checkout succeds
//2.assert in the bad path checkout fails

//bthread("Hi Venus is a spec error", function(){
//    waitFor(bp.Event("Hi, Venus"));
//    bp.ASSERT(false, "Spec Error: Saying 'Hi' to Venus should not be possible");
//});
