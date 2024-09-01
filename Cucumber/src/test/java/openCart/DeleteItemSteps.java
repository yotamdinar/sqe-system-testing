package openCart;

import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.Properties;
import static junit.framework.Assert.assertEquals;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class DeleteItemSteps {

    private ChromeDriver driver;
    private WebDriverWait wait;
    private Properties xpaths = new Properties();
    
    @Before
    public void setup(){
        ChromeOptions options = new ChromeOptions();
        Path browserBinaryPath = Paths.get("../Selenium/chrome-browser/chrome-win64/chrome.exe").toAbsolutePath();
        options.setBinary(browserBinaryPath.toString());
        //options.setBinary("C:\\Users\\dyota\\Desktop\\qa4\\yotamAssignment4\\Selenium\\chrome-browser\\chrome-win64 (1)\\chrome-win64\\chrome.exe");

        driver = new ChromeDriver(options);
        Path driverBinaryPath = Paths.get("../Selenium/chromedriver.exe").toAbsolutePath();
        System.setProperty("webdriver.chrome.driver", driverBinaryPath.toString());
        //System.setProperty("webdriver.chrome.driver", "C:\\Users\\dyota\\Desktop\\qaNEW\\Selenium\\chromedriver.exe");
        wait = new WebDriverWait(driver, Duration.ofSeconds(40));

        // Load XPaths properties
        try (FileInputStream input = new FileInputStream("src/test/resources/xpaths.properties")) {
            xpaths.load(input);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // @After
    // public void tearDown() {
     
    //     driver.get("http://localhost/opencartsite/yotam/");
    //     driver.manage().window().setPosition(new Point(300, 5));

    //     try {
    //         Thread.sleep(6000);
    //     } catch (InterruptedException e) {
    //         e.printStackTrace();
    //     }
    //     driver.quit();
    // }

    //first senario: deleting product
    @Given("User is in login page for admins")
    public void userIsInLoginPageForAdmins() {
        driver.get("http://localhost/opencartsite/yotam/");
        //driver.manage().window().setPosition(new Point(300, 5));
    }

    @When("Admin is logged in with {string} and {string}")
    public void admin_login(String email, String password) {
        //login admin
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpaths.getProperty("//*[@id='input-username']")))).sendKeys("admin");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpaths.getProperty("adminLoginPasswordInput")))).sendKeys("1234");
        driver.findElement(By.xpath(xpaths.getProperty("adminLoginButton"))).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @And("User deletes a {string} from the store")
    public void delete(String profuct){
        //Catalog
        driver.findElement(By.xpath(xpaths.getProperty("adminCatalogMenu"))).click();
        //Products
        driver.findElement(By.xpath(xpaths.getProperty("adminProducts"))).click();
        //search new
        driver.findElement(By.xpath(xpaths.getProperty("adminSearchInput"))).sendKeys("new");
        //filter
        driver.findElement(By.xpath(xpaths.getProperty("adminFilter"))).sendKeys("new");
        //"new" product checkbox
        driver.findElement(By.xpath(xpaths.getProperty("adminTestProductCheckbox"))).click();
        //remove item
        driver.findElement(By.xpath(xpaths.getProperty("adminRemoveButton"))).click();
        //accept alert
        Alert alert = driver.switchTo().alert();
        alert.accept(); 
        driver.close();
    }

    @Then("{string} should no longer be available in the products list")
    public void should_no_longer_be_available_in_the_products_list(String string) {

        //search "new":
        //Catalog
        driver.findElement(By.xpath(xpaths.getProperty("adminCatalogMenu"))).click();
        //Products
        driver.findElement(By.xpath(xpaths.getProperty("adminProducts"))).click();
        //search new
        driver.findElement(By.xpath(xpaths.getProperty("adminSearchInput"))).sendKeys("new");
        //filter
        driver.findElement(By.xpath(xpaths.getProperty("adminFilter"))).sendKeys("new");

        //search result
        WebElement products_meeting_search = driver.findElement(By.xpath(xpaths.getProperty("noSearchResultAdmin")));
        String text = products_meeting_search.getText();     
        
        assertEquals(text, 1, "No results!");

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    //second senario: attempting buying a deleted item
    @Given("User is in login page")
    public void user_is_logged_in() {
        //open browser
        driver.get("http://localhost/opencartsite/");
        driver.manage().window().setPosition(new Point(300, 5));

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @When("User is logged in with {string} and {string}")
    public void user_is_logged_in_with_and(String string, String string2) {
        //my account
        driver.findElement(By.xpath(xpaths.getProperty("//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/a[1]/span[1]"))).click();
        driver.findElement(By.xpath(xpaths.getProperty("login"))).click();

        //login with dinaryo@post.bgu.ac.il and 1111
        driver.findElement(By.xpath(xpaths.getProperty("loginEmailInput"))).sendKeys("dinaryo@post.bgu.ac.il");
        driver.findElement(By.xpath(xpaths.getProperty("loginPasswordInput"))).sendKeys("1111");
        driver.findElement(By.xpath(xpaths.getProperty("loginButton"))).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("User added {string} to the cart")
    public void user_added_to_the_cart(String string) {
        //search "MacBook Pro"
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpaths.getProperty("searchWindow")))).sendKeys("new");
        driver.findElement(By.xpath(xpaths.getProperty("searchButton"))).click();
        //add to cart
        driver.findElement(By.xpath(xpaths.getProperty("addToCartTestProduct1"))).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.close();
    }

    @When("Admin logged in with {string} and {string}")
    public void admin_logged_in_with_and(String string, String string2) {
        //login admin
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpaths.getProperty("loginEmailInput")))).sendKeys("admin");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpaths.getProperty("adminLoginPasswordInput")))).sendKeys("1234");
        driver.findElement(By.xpath(xpaths.getProperty("adminLoginButton"))).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Admin deletes {string}")
    public void admin_deletes(String string) {
        //Catalog
        driver.findElement(By.xpath(xpaths.getProperty("adminCatalogMenu"))).click();
        //Products
        driver.findElement(By.xpath(xpaths.getProperty("adminProducts"))).click();
        //search new
        driver.findElement(By.xpath(xpaths.getProperty("adminSearchInput"))).sendKeys("new");
        //filter
        driver.findElement(By.xpath(xpaths.getProperty("adminFilter"))).sendKeys("new");
        //"new" product checkbox
        driver.findElement(By.xpath(xpaths.getProperty("adminTestProductChecbox"))).click();
        //remove item
        driver.findElement(By.xpath(xpaths.getProperty("adminRemoveButton"))).click();
        //accept alert
        Alert alert = driver.switchTo().alert();
        alert.accept(); 
    }

    @When("User attempt to buy {string}")
    public void user_attempt_to_buy(String string) {
        //go to cart
        driver.findElement(By.xpath(xpaths.getProperty("shoppingCart2"))).click();  
    }

    @Then("User not able to complete the buy")
    public void user_not_able_to_complete_the_buy() {
        //search result
        WebElement products_meeting_search = driver.findElement(By.xpath(xpaths.getProperty("empty")));
        String text = products_meeting_search.getText();     
        
        assertEquals(text, 1, "Your shopping cart is empty!");

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.close();
    }
}
