// @provengo summon ctrl
// @provengo summon constraints
// @provengo summon selenium


const mainPage = "http://localhost/opencartsite"
const SESSION = "customer-session"

const XPATHS = {
    myAccount: "//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/a[1]/span[1]",
    login: "//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/ul[1]/li[2]/a[1]",
    loginEmailInput: "//*[@id='form-login']/div[1]/input[1]",
    loginPasswordInput: "//*[@id='form-login']/div[2]/input[1]",
    loginButton: "//*[@id='form-login']/div[3]/button[1]",
    searchWindow: "//*[@id='search']/input[1]",
    searchButton: "//*[@id='search']/button[1]",
    macImg: "//*[@id='product-list']/div[1]/div[1]/div[1]/a[1]/img[1]",
    addToCartMacBook: "//*[@id='form-product']/div[1]/button[1]",
}

user = {
    email: 'dinaryo@post.bgu.ac.il',
    password: '1111'
}

product = {
    name: 'iMac'
}

productSerach = "mac"

function sleepEkSec() {
    Ctrl.doSleep(100)
}

bthread('login', function () {
    with (new SeleniumSession(SESSION).start(mainPage)) {
        //login
        sync({ request: Event("Begin(login)") }); sleepEkSec()
        click(XPATHS.myAccount); sleepEkSec()
        click(XPATHS.login); sleepEkSec()
        waitForVisibility(XPATHS.loginEmailInput)
        writeText(XPATHS.loginEmailInput, user.email); sleepEkSec()    
        waitForVisibility(XPATHS.loginPasswordInput)
        writeText(XPATHS.loginPasswordInput, user.password); sleepEkSec()
        click(XPATHS.loginButton); sleepEkSec();sleepEkSec();sleepEkSec()

        //search
        waitForVisibility(XPATHS.searchWindow)
        writeText(XPATHS.searchWindow, productSerach) ;sleepEkSec()
        click(XPATHS.searchButton); sleepEkSec(); sleepEkSec();

        //add to cart
        waitForVisibility(XPATHS.macImg)
        click(XPATHS.macImg); sleepEkSec();sleepEkSec()
        waitForVisibility(XPATHS.addToCartMacBook)
        click(XPATHS.addToCartMacBook); sleepEkSec();sleepEkSec()

        // switchFrame('//iframe[contains(@id,"framelive")]')
        //waitForVisibility('//img[contains(@src,"logo")]', 50000)
        // click('//span[contains(.,"Sign in")]')
        // writeText('//input[@id="field-email"]', user.email)
        // writeText('//input[@id="field-password"]', user.password)
        

        // sync({ request: Event("End(login)") })
    }
})

// bthread("add to cart", function () {
//     with (new SeleniumSession(SESSION).start(URL)) {
//         sync({ request: Event("Begin(addToCart)") })

//         writeText('//input[@name="s"]', product.name + '\n')
//         click('(//div[@id="js-product-list"]//a)[1]')
//         click('//button[@data-button-action="add-to-cart"]')
//         click('//div[h4[contains(text(),"Product successfully added to your shopping cart")]]/button')

//         sync({ request: Event("End(addToCart)") })
//     }
// })

// bthread('Add do card cannot start before login ends to cart', function () {
//     // Your code goes here
// })























/**
 * Base flow: choose a greeting, choose a planet, greet.
 */
// bthread("Greeting activity",function() {
//     let greeting = select("Greeting").from(GREETINGS);
//     let planet = choose("Jupiter", "Mars", "Venus", "World");
//     request(bp.Event(`${greeting}, ${planet}`));

// });


// /**
//  * When producing the classic "Hello World" greeting, note that the classic path was chosen.
//  */
// bthread("Programmer", function(){
//     waitFor(bp.Event("Hello, World"));
//     Ctrl.doMark("Classic!");
// });

// /**
//  * If we chose Howdy as a greeting, don't choose Mars as a planet.
//  */
// bthread("Don't Howdy Mars", function(){
//     waitFor(any(/Howdy/)); // wait for any event whose name contains "Howdy"
//     block(choiceEvent("Mars")); // block "choose" calls from selecting "Mars"
// });

/**
 * (advanced) 
 * Uncomment to create the following general requirement: 
 *  It should not be possible to say "Hi, Venus". If a scenario allows 
 * this, complain informatively.
 */
//bthread("Hi Venus is a spec error", function(){
//    waitFor(bp.Event("Hi, Venus"));
//    bp.ASSERT(false, "Spec Error: Saying 'Hi' to Venus should not be possible");
//});

/**
 * Block saying "Hi" to Venus.
 * Un-comment to ensure no scenario violates the above requirement.
 */
// Constraints.after(choiceEvent("Hi"))
//     .block(choiceEvent("Venus"))
//     .forever();
