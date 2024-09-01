// @provengo summon ctrl
// @provengo summon constraints
// @provengo summon selenium

/**
This set-up story opens a new browser window, goes to openCart admin site, logging in, and add a new product for testings.
*/
bthread('setUp-admin add test product', function() {
    let s1 = new SeleniumSession(setupSession).start(adminPage)
    adminAddProduct(s1, admin)
    sync({request: Event('end setup')})
})

/**
 * this story opens a new browser window,logging in, search for the test product and adds it to the shopping cart.
 */
bthread("Customer adds product to cart", function() {
    let s3 = new SeleniumSession(customerSession).start(mainPage)
    sync({request: Event('customerAddProductToCart') })
    customerAddProductToCart(s3, customer)
    sync({
        request: Event('end customerAddProductToCart'),
    })
})

/**
 * this story opens a new browser window, goes to openCart admin site, logging in, search for the test product and deletes it from the shop.
 */
bthread("Admin deletes product", function() {
    let s2 = new SeleniumSession(AdminSession).start(adminPage)
    sync({request: Event('adminDeleteProduct') })
    interrupt(Event('End(adminDeleteProduct)'), function() {
        adminDeleteProduct(s2, admin)
    })
    sync({request: Event('end adminDeleteProduct') })
})

/**
 * this story opens a new browser window,logging in, goes to shopping cart and does checkout.
 */
bthread("Customer buying the product", function() {
        let s4 = new SeleniumSession(customerChcekout).start(mainPage)
        sync({request: Event('checkout') })
        interrupt(Event('End(checkout)'), function() {
            checkout(s4, customer)
        })
        sync({request: Event('end checkout')})
})

/**
 * this story opens a new browser window,logging in, goes to shopping cart and tries do checkout where the cart is empty .
 */
bthread("Customer buying the product empty cart", function() {
    interrupt(Event('end checkout'), function() {
        let s5 = new SeleniumSession(customerChcekoutEmpty).start(mainPage)
        sync({request: Event('checkoutEmptyCart') })
        checkoutEmptyCart(s5, customer)
        sync({request: Event('end checkoutEmptyCart')})
    })
})

/**
 * this story ensure that firstly set-up story will ends
 */
bthread("wait for setup", function() {
    sync({
        waitFor: Event('end setup'),
        block: EventSet('', e => e.name == 'adminDeleteProduct' || e.name == 'customerAddProductToCart' || e.name == 'checkoutEmptyCart' || e.name == 'checkout')
    })
})

/**
 *this story ensure that secondly add to cart story will ends.
 */
bthread("add to cart before checkoutEmptyCart and delete ", function() {
    sync({
        waitFor: Event('end customerAddProductToCart'),
        block: EventSet('', e => e.name == 'adminDeleteProduct' || e.name == 'checkoutEmptyCart' || e.name == 'checkout')
    })
})

/**
 * this story ensure that checkout empty cart will happen only after delete happened
 */
bthread("", function() {
    sync({
        waitFor: Event('end adminDeleteProduct'),
        block: Event('checkoutEmptyCart')
    })
})

/**
 * marking story
 */
bthread('mark adminDeleteProduct at', function(){ 
    const endOfActions = EventSet("", e => e.name.startWith("end "))

    let e = sync({endOfActions })

    for(var count = 0; e.name != 'end adminDeleteProduct'; count++)
        e = sync({ waitFor: endOfActions })

    sync({ request: Ctrl.markEvent(`deleteAt${count}`) })
})

