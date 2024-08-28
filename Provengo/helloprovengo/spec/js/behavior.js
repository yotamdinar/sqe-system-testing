
// @provengo summon ctrl
// @provengo summon constraints
// @provengo summon selenium

// Shared object to store the sessions

// A single bthread to initialize all SeleniumSession instances
// bthread("Initialize Sessions", function() {
//     sessions = startAllSessions()
//     sync({request: Event('sessionsInitialized')}); // Indicate that sessions are initialized
// });

bthread('setUp-admin add test product', function() {
    let s1 = new SeleniumSession(setupSession).start(adminPage)
    //s1.adminAddProduct(admin)
    adminAddProduct(s1, admin)
    sync({request: Event('end setup')})
})

bthread("Admin deletes product", function() {
    let s2 = new SeleniumSession(AdminSession).start(adminPage)
    sync({request: Event('adminDeleteProduct') })
    //s2.adminDeleteProduct(admin)
    adminDeleteProduct(s2, admin)
})

bthread("Customer adds product to cart", function() {
    let s3 = new SeleniumSession(customerSession).start(mainPage)
    sync({request: Event('customerAddProductToCart') })
    //s3.customerAddProductToCart(customer)
    customerAddProductToCart(s3, customer)
    sync({request: Event('end customerAddProductToCart')})
})

bthread("Customer buying the product", function() {
    let s4 = new SeleniumSession(customerSession2).start(mainPage)
    sync({request: Event('checkout') })
    checkout(s4, customer)
    sync({request: Event('end checkout')})
})

// //0. A constraint to ensure all sessions are initialized before any actions
// bthread("Wait for Session Initialization", function() {
//     sync({
//         waitFor: Event('sessionsInitialized'),
//         block: [Event('setup'), Event('adminDeleteProduct'), Event('customerAddProductToCart'), Event('checkout')]
//     });
// });

// //constrains
// //1.wait for setup(admin adds test product to the shop"
// bthread("wait for setup", function() {
//     sync({
//         waitFor: Event('setup'),
//         block: [Event('adminDeleteProduct'),Event('customerAddProductToCart'),Event('checkout')]
//     })
// })

//constrains
// //1.wait for setup(admin adds test product to the shop"
// bthread("wait for setup", function() {
//     sync({
//         waitFor: Event('setup'),
//         block: EventSet('', e => e.name == 'adminDeleteProduct')
//     })
// })

//1.wait for setup(admin adds test product to the shop"
bthread("wait for setup", function() {
    sync({
        waitFor: Event('end setup'),
        //block: EventSet('', e => e.name == 'Start(adminDeleteProduct)')
        block: EventSet('', e => e.name == 'adminDeleteProduct' || e.name == 'customerAddProductToCart' || e.name == 'checkout')
    })
})

//1.wait for setup(admin adds test product to the shop"
bthread("add to cart before checkout and delete ", function() {
    sync({
        waitFor: Event('end customerAddProductToCart'),
        block: EventSet('', e => e.name == 'adminDeleteProduct' || e.name == 'checkout')
    })
})

//1.wait for setup(admin adds test product to the shop"
bthread("checkout before delete", function() {
    sync({
        waitFor: Event('end checkout'),
        block: EventSet('', e => e.name == 'adminDeleteProduct')
    })
})

// //2.
// bthread("checkout after adding to cart", function() {
//     sync({
//         waitFor: Event('End(customerAddProductToCart)'),
//         block: [Event('Strart(checkout)')]
//     })
// })

// //3.
// bthread("add to cart before delete", function() {
//     sync({
//         waitFor: Event('End(customerAddProductToCart)'),
//         block: [Event('Start(adminDeleteProduct)')]
//     })
// })

// //constrains
// //1.wait for setup(admin adds test product to the shop"
// bthread("wait for setup", function() {
//     sync({
//         waitFor: Event('adminAddProduct'),
//         block: Event('adminDeleteProduct, customerAddProductToCart')
//     })
// })

// //2.
// bthread("checkout after adding to cart", function() {
//     sync({
//         waitFor: Event('customerAddProductToCart'),
//         block: [Event('checkout')]
//     })
// })

// //3.
// bthread("add to cart before delete", function() {
//     sync({
//         waitFor: Event('customerAddProductToCart'),
//         block: [Event('adminDeleteProduct')]
//     })
// })

//TODO:
//1.assert in good runing path checkout succeds
//2.assert in the bad path checkout fails

//bthread("Hi Venus is a spec error", function(){
//    waitFor(bp.Event("Hi, Venus"));
//    bp.ASSERT(false, "Spec Error: Saying 'Hi' to Venus should not be possible");
//});
