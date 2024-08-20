# Installing the System Under Test (SUT)
This page contains instructions on how to install the different SUTs and prepare the testing environment.

In general, the Docker option is the easiest way to install the SUTs. However, if you prefer to install the SUTs locally, you can follow the instructions below.

## Moodle
Moodle is a learning platform designed to provide educators, administrators, and learners with a single robust, secure, and integrated system to create personalized learning environments. 

### Installing using Docker
You can also use Docker to install Moodle. You can find the instructions [here](https://hub.docker.com/r/bitnami/moodle).

### Installing locally
You can download it from [here](https://download.moodle.org/windows/).
Download the latest stable version, extract the files, and follow the installation instructions in [here](https://docs.moodle.org/403/en/Complete_install_packages_for_Windows).


## OpenCart
OpenCart is an open-source PHP-based online e-commerce solution.

### Installing using Docker
You can use Docker to install OpenCart. You can find the instructions [here](https://hub.docker.com/r/opencart/opencart).

Another option can be found [here](https://github.com/DockerIt/opencart-docker)

### Installing locally
Follow these instructions to install OpenCart locally: https://github.com/opencart/opencart/blob/master/INSTALL.md


## PrestaShop
PrestaShop is an efficient and innovative e-commerce solution with all the features you need to create an online store and grow your business.

### Installing using Docker
Go to the [prestashop folder](prestashop) and run in the terminal:
```bash
docker-compose up -d
```
Once the container installation is complete, it will take a few more minutes for the database to be created, and the PrestaShop installation to be completed. You can access the PrestaShop installation by going to http://localhost:8080 in your web browser.

### Installing locally
Follow these instructions to install PrestaShop locally: https://devdocs.prestashop-project.org/8/basics/installation/
