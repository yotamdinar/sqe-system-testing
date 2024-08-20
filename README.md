# Software Quality Engineering - System Testing
This is a repository for the system-testing assignment of the Software Quality Engineering course at the [Ben-Gurion University](https://in.bgu.ac.il/), Israel.

## Assignment Description
In this assignment, we tested an open-source software called [$$*TODO* software name$$](https://address-of-the-project.com).

$$*TODO* Add some general description about the software$$

## Installation
$$*TODO* Write instructions on how to install the software and prepare the testing environment$$

# Cucumber environment
1.check the driver version:
   a.open Selenium folder with a Command Promt.
   b.run chromdriver.exe --version. you will see version number such as 128.0.6613.36 
2.download chrome browser for testing:
   a.go to https://googlechromelabs.github.io/chrome-for-testing/ 
   b.search for the Chrome Binary for your driver version and dowload it by coppying the URL.
   c.extract the folder content
   d.add the chrome-win64 folder inside the /Selenium/chrome-browser/ folder
   e.you chould have this folder tree now: ../Selenium/chrome-browser/chrome-win64/chrome.exe"
   **you can change and replace the driver and browser versions but keep it same for the pair.

![image](https://github.com/user-attachments/assets/e9b64ff2-780c-4d8d-9912-66fb08172b94)


## What we tested
$$*TODO* Add a description of the module and the user stories that you chose to test.
For example, in the case of the Moodle example, you can write something like this:

We tested the admin module that allows for deleting products. We chose to test the following user stories: 

*User story:* An admin deletes a pruduct from 'products'

*Preconditions:* There is a product in pruducts and the admin is logged in

*Expected outcome:* The product disappears from 'products'

*User story:* A customer attempts to buy that product (the deleted one).

*Preconditions:* The product is within the customer cart.

*Expected outcome:* The purchased aborts.
$$

## How we tested
We used two different testing methods:
1. [Cucumber](https://cucumber.io/), a behavior-driven testing framework.
2. [Provengo](https://provengo.tech/), a story-based testing framework.

Each of the testing methods is elaborated in its own directory. 

## Results
Update all README.md files (except for d-e, see Section 1). Specifically, replace all $$*TODO*…$$ according to the instructions inside the $$.

## Detected Bugs
We detected the following bugs:

1. Bug 1: 
   1. General description: ...
   2. Steps to reproduce: ...
   3. Expected result: ...
   4. Actual result: ...
   5. Link to the bug report: (you are encouraged to report the bug to the developers of the software)
2. Bug 2: ...

$$*TODO* if you did not detect the bug, you should delete this section$$  
