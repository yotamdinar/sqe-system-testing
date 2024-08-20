package hellocucumber;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import static junit.framework.Assert.assertEquals;
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
    }

    @After
    public void tearDown() {
        //TODO:
        //1.adding the removed products/product back to the store.
        //2.making the <products> generic. for example instead of giving directly "iMac", use <Product> and give the "iMac" in the Example section. 

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.quit();
    }

    //first senario: deleting product
    @Given("User is in login page for admins")
    public void userIsInLoginPageForAdmins() {
        driver.get("http://localhost/opencartsite/yotam/");
        driver.manage().window().setPosition(new Point(300, 5));

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Admin is logged in with {string} and {string}")
    public void admin_login(String email, String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-username']"))).sendKeys("admin");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-password']"))).sendKeys("1234");
        driver.findElement(By.xpath("//button[@type='submit']")).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @And("User deletes a {string} from the store")
    public void delete(String profuct){
        //Catalog
        driver.findElement(By.xpath("//*[@id='menu-catalog']/a[1]")).click();
        //Products
        driver.findElement(By.xpath("//*[@id='collapse-1']/li[2]/a[1]")).click();
        //IMac checkbox
        driver.findElement(By.xpath("//*[@id='form-product']/div[1]/table[1]/tbody[1]/tr[4]/td[1]/input[1]")).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //trash icon
        driver.findElement(By.xpath("//*[@id='content']/div[1]/div[1]/div[1]/button[3]/i[1]")).click();
        //are you sure 
        driver.findElement(By.xpath("//*[@id='content']/div[1]/div[1]/div[1]/button[3]")).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    
    }

    @Then("{string} should no longer be available in the products list")
    public void should_no_longer_be_available_in_the_products_list(String string) {
        driver.get("http://localhost/opencartsite/");
        driver.manage().window().setPosition(new Point(300, 5));

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //my account
        driver.findElement(By.xpath("//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/a[1]/span[1]")).click();
        //login-page
        driver.findElement(By.xpath("//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/ul[1]/li[2]/a[1]")).click();

        //login with dinaryo@post.bgu.ac.il and 1111
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-email']"))).sendKeys("dinaryo@post.bgu.ac.il");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-password']"))).sendKeys("1111");

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.xpath("//*[@id='form-login']/div/button[1]")).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //search "iMac"
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='search']/input[1]"))).sendKeys("iMac");
        driver.findElement(By.xpath("//*[@id='search']/button[1]")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-search']"))).sendKeys("iMac");
        driver.findElement(By.xpath("//*[@id='button-search']")).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //search result
        WebElement products_meeting_search = driver.findElement(By.xpath("//*[@id='content']/p[1]"));
        String text = products_meeting_search.getText();     
        
        assertEquals(text, 1, "There is no product that matches the search criteria.");

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
        driver.findElement(By.xpath("//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/a[1]/span[1]")).click();
        //login-page
        driver.findElement(By.xpath("//*[@id='top']/div[1]/div[2]/ul[1]/li[2]/div[1]/ul[1]/li[2]/a[1]")).click();
        //login with dinaryo@post.bgu.ac.il and 1111
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-email']"))).sendKeys("dinaryo@post.bgu.ac.il");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-password']"))).sendKeys("1111");

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.xpath("//*[@id='form-login']/div/button[1]")).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("User added {string} to the cart")
    public void user_added_to_the_cart(String string) {
        //search "MacBook Pro"
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='search']/input[1]"))).sendKeys("MacBook Pro");
        driver.findElement(By.xpath("//*[@id='search']/button[1]")).click();
        //add to cart
        driver.findElement(By.xpath("//*[@id='product-list']/div[1]/div[1]/div[2]/form[1]/div[1]/button[1]")).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @When("Admin logged in with {string} and {string}")
    public void admin_logged_in_with_and(String string, String string2) {
        //admin login page
        driver.get("http://localhost/opencartsite/yotam/");
        driver.manage().window().setPosition(new Point(300, 5));

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //admin login
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-username']"))).sendKeys("admin");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='input-password']"))).sendKeys("1234");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Admin deletes {string}")
    public void admin_deletes(String string) {
                //Catalog
                driver.findElement(By.xpath("//*[@id='menu-catalog']/a[1]")).click();
                //Products
                driver.findElement(By.xpath("//*[@id='collapse-1']/li[2]/a[1]")).click();
                //MacBook Pro checkbox
                driver.findElement(By.xpath("//*[@id='form-product']/div[1]/table[1]/tbody[1]/tr[10]/td[1]/input[1]")).click();

                try {
                    Thread.sleep(6000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                //trash icon
                driver.findElement(By.xpath("//*[@id='content']/div[1]/div[1]/div[1]/button[3]/i[1]")).click();
                //are you sure 
                driver.findElement(By.xpath("//*[@id='content']/div[1]/div[1]/div[1]/button[3]")).click();
    }

    @When("User attempt to buy {string}")
    public void user_attempt_to_buy(String string) {
        //go to cart
        driver.findElement(By.xpath("//*[@id='top']/div[1]/div[2]/ul[1]/li[4]/a[1]/span[1]")).click();  
        //checkout
        driver.findElement(By.xpath("//*[@id='content']/div[3]/div[2]/a[1]")).click();

        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("User not able to complete the buy")
    public void user_not_able_to_complete_the_buy() {
        // Write code here that turns the phrase above into concrete actions
        throw new io.cucumber.java.PendingException();
    }
}
