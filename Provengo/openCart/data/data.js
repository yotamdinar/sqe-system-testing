// @provengo summon ctrl

/*
 *  This is a good place to put common test data, project-wide constants, etc.
 */

const mainPage = "http://localhost/opencartsite"
const adminPage = "http://localhost/opencartsite/yotam"
const customerSession = "customer-session"
const customerChcekout = "customer-chcekout"
const customerChcekoutEmpty = "customerChcekoutEmpty"
const AdminSession = "admin-session"
const setupSession = "setup-session"

const XPATHS = {
    myAccount: "//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/a[1]/span[1]",
    login: "//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/ul[1]/li[2]/a[1]",
    loginEmailInput: "//*[@id='form-login']/div[1]/input[1]",
    loginPasswordInput: "//*[@id='form-login']/div[2]/input[1]",
    loginButton: "//*[@id='form-login']/div[3]/button[1]",
    searchWindow: "//*[@id='search']/input[1]",
    searchButton: "//*[@id='search']/button[1]",
    addToCartTestProduct2: "//*[@id='product-list']/div/div/div/form/div/button[1]",
    addToCartTestProduct1: "//*[@id='product-list']/div[1]/div[1]/div[2]/form[1]/div[1]/button[1]",           
    shoppingCart: "//*[@id='top']/div[1]/div[2]/ul[1]/li[4]/a[1]/span[1]",
    shoppingCart2: "//*[@id='header-cart']/div/button[1]",

    shoppingCartEmpty: "//*[@id='header-cart']/div/button[1]",

    checkout: "//*[@id='content']/div[3]/div[2]/a[1]",
    checkout2: "//*[@id='header-cart']/div[1]/ul[1]/li[1]/div[1]/p[1]/a[2]/strong[1]",
    checkoutName: "//*[@id='form-shipping-address']/div[1]/div[1]/input[1]",
    checkoutPostCode: "//*[@id='form-shipping-address']/div[1]/div[7]/input[1]",
    checkoutState: "//*[@id='form-shipping-address']/div[1]/div[9]/select[1]",
    checkoutLAstname: "//*[@id='form-shipping-address']/div[1]/div[2]/input[1]",
    checkoutAdress: "//*[@id='form-shipping-address']/div[1]/div[4]/input[1]",
    checkoutCity: "//*[@id='form-shipping-address']/div[1]/div[6]/input[1]",
    checkoutCountrybar: "//*[@id='form-shipping-address']/div[1]/div[8]/select[1]",

    chooseAddress: "//*[@id='shipping-existing']/select[1]",
    chooseTestAdress: "//select[@name='address_id']/option[text()='a a, aaa, aa, Harbour Island, Bahamas']",

    shipping: "//*[@id='button-shipping-methods']",
    shippingcheckbox: "//*[@id='form-shipping-method']/div/input[1]",
    shippingContinue: "//*[@id='form-shipping-method']/div/button[1]",

    paymentMethod: "//*[@id='button-payment-methods']",
    paymentCheckbox: "//*[@id='form-payment-method']/div/input[1]",
    paymentContinue: "//*[@id='form-payment-method']/div/button[1]",
    confirmOrder1: "//*[@id='checkout-payment']/div/button[1]",
    confirmOrder2: "//*[@id='checkout-payment']/div[1]/button[1]",
    confirmationMsg: "//*[@id='content']/h1[1]",
    


    adminLoginUsernameInput: "//*[@id='input-username']",
    adminLoginPasswordInput: "//*[@id='input-password']",
    adminLoginButton: "//button[@type='submit']",
    adminCatalogMenu: "//*[@id='menu-catalog']/a[1]",
    adminProducts: "//*[@id='collapse-1']/li[2]/a[1]",

    adminAddNew: "//*[@id='content']/div/div/div/a/i[1]",
    addNewNameInput: "//*[@id='language-1']/div[1]/div[1]/div[1]/input[1]",
    addNewTagTitleInput: "//*[@id='language-1']/div[3]/div[1]/div[1]/input[1]",
    addNewDataTab: "//*[@id='form-product']/ul[1]/li[2]/a[1]",
    addNewModelInput: "//*[@id='tab-data']/fieldset[1]/div[1]/div[1]/div[1]/input[1]",
    addNewSeoTab: "//*[@id='form-product']/ul[1]/li[11]/a[1]",
    addNewSeoInput: "//*[@id='product-seo']/table/tbody/tr/td/div/input[1]",
    addNewSaveButton: "//*[@id='content']/div/div/div/button/i[1]",

    adminRemoveButton: "//*[@id='content']/div[1]/div[1]/div[1]/button[3]/i[1]",
    areYouSure: "//*[@id='content']/div/div/div/button[3]",
    adminSearchInput: "//*[@id='filter-product']/div[1]/div[2]/div[1]/input[1]",
    adminFilter: "//*[@id='filter-product']/div/div/div/button[1]",
    adminTestProductChecbox: "//*[@id='form-product']/div/table/tbody/tr/td/input[1]",

    noSearchResultAdmin: "//*[@id='form-product']/div/table/tbody/tr/td[1]"
    
    
}

customer = {
    email: 'dinaryo@post.bgu.ac.il',
    password: '1111'
}

admin = {
    username: 'admin',
    password: '1234'
}

product = {
    name: 'iMac'
}

testProduct = {
  name: 'new',
  model: 'model',
  seo: 'seo',
  tag: 'tag'
}

productSerach = "mac"

function sleepEkSec() {
    Ctrl.doSleep(1000)
}