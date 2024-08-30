
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

bthread("Customer adds product to cart", function() {
    let s3 = new SeleniumSession(customerSession).start(mainPage)
    sync({request: Event('customerAddProductToCart') })
    //s3.customerAddProductToCart(customer)
    customerAddProductToCart(s3, customer)
    sync({
        request: Event('end customerAddProductToCart'),
        block: EventSet('', e => e.name == 'adminDeleteProduct' || e.name == 'checkoutEmptyCart' || e.name == 'checkout')
    })
})

bthread("Admin deletes product", function() {
    let s2 = new SeleniumSession(AdminSession).start(adminPage)
    sync({request: Event('adminDeleteProduct') })
    //s2.adminDeleteProduct(admin)
    adminDeleteProduct(s2, admin)
    sync({
        request: Event('end adminDeleteProduct'),
        block: Event('checkout')
    })
    sync({
        request: Event('end checkoutEmptyCart'),
        block: Event('checkout')
    })
})

bthread("Customer buying the product", function() {
    let s4 = new SeleniumSession(customerSession2).start(mainPage)
    sync({request: Event('checkout') })
    checkout(s4, customer)
    sync({request: Event('end checkout')})
})

bthread("Customer buying the product empty cart", function() {
    let s4 = new SeleniumSession(customerSession2).start(mainPage)
    sync({request: Event('checkoutEmptyCart') })
    checkoutEmptyCart(s4, customer)
    sync({request: Event('end checkoutEmptyCart')})
})

bthread("wait for setup", function() {
    sync({
        waitFor: Event('end setup'),
        //block: EventSet('', e => e.name == 'Start(adminDeleteProduct)')
        block: EventSet('', e => e.name == 'adminDeleteProduct' || e.name == 'customerAddProductToCart' || e.name == 'checkoutEmptyCart' || e.name == 'checkout')
    })
})

bthread("add to cart before checkoutEmptyCart and delete ", function() {
    sync({
        waitFor: Event('end customerAddProductToCart'),
        block: EventSet('', e => e.name == 'adminDeleteProduct' || e.name == 'checkoutEmptyCart' || e.name == 'checkout')
    })
})

/**
 * 
 */
bthread("", function() {
    sync({
        waitFor: Event('end adminDeleteProduct'),
        block: Event('checkoutEmptyCart')
    })
})

bthread("", function() {
    sync({
        waitFor: Event('adminDeleteProduct'),
    })
    sync({block: Event('checkout')})
})

bthread("", function() {
    sync({
        waitFor: Event('chckout')
    })
    sync({
        waitFor: Event('end checkout'),
        block: Event('adminDeleteProduct')
    })
})

// bthread("", function() {
//     sync({
//         waitFor: Event('end adminDeleteProduct'),
//         block: Event('checkout')
//     })
// })

// bthread("", function() {
//     sync({
//         request: [Event('adminDeleteProduct'), Event('checkout')]
//     })
// })

// //1.wait for setup(admin adds test product to the shop"
// bthread("delete before checkot ", function() {
//     sync({
//         waitFor: Event('end adminDeleteProduct'),
//         block: EventSet('', e => e.name == 'checkoutEmptyCart')
//     })
// })



//TODO:
//1.assert in good runing path checkoutEmptyCart succeds
//2.assert in the bad path checkoutEmptyCart fails

//bthread("Hi Venus is a spec error", function(){
//    waitFor(bp.Event("Hi, Venus"));
//    bp.ASSERT(false, "Spec Error: Saying 'Hi' to Venus should not be possible");
//});
