import requests
from selenium import webdriver
from bs4 import BeautifulSoup as bs
from flask import Flask
from flask_cors import CORS
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup as bs
import urllib.parse
app = Flask(__name__)
CORS(app)
driver = webdriver.Chrome()
# base_url = "https://mangalib.me"
# headers = {
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
# }
# href_list = []

# driver.quit()

# driver.get(url)

# button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//div[contains(@class, "reader-header-action") and contains(text(), "Оглавление")]')))

# button.click()

# div_modal_body = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, 'popup__content')))

# modal_html = div_modal_body.get_attribute("outerHTML")

# soup = bs(modal_html, "html.parser")

# a_elements = soup.find_all('a', class_='menu__item')

# href_list_reversed = []

# for a_element in a_elements:
#     href_value = a_element.get('href')
#     href_list_reversed.append(href_value)

# print(href_list_reversed[::-1])


# # for page_number in range(1, 48):
# #     url = f"{base_url}{page_number}"
    
# #     driver.get(url)
# #     page_source = driver.page_source
# #       # Закрываем браузер после получения страницы

# #     soup = bs(page_source, "html.parser")

# #     # Находим все div-элементы с классом 'reader-view__wrap'
# #     container_divs = soup.find_all('div', class_='reader-view__wrap')

# #     for container_div in container_divs:
# #         # Проверяем совпадение атрибута 'data-p' и номера страницы
# #         if container_div.get('data-p') == str(page_number):
# #             img_tags = container_div.find_all('img')

# #             for img_tag in img_tags:
# #                 src_value = img_tag.get('src')
# #                 print(src_value)
# driver.quit()


@app.route('/api/get_data/chapters/<string:title>', methods=['GET'])
def get_chapters(title):
    base_url =f"https://mangalib.me/{title}/v1/c1?page=1"
    href_list = []
    src_values =[]
    driver.get(base_url)
    button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//div[contains(@class, "reader-header-action") and contains(text(), "Оглавление")]')))
    button.click()
    div_modal_body = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, 'popup__content')))
    modal_html = div_modal_body.get_attribute("outerHTML")
    soup = bs(modal_html, "html.parser")
    a_elements = soup.find_all('a', class_='menu__item')
    for a_element in a_elements:
        href_value = a_element.get('href')
        href_list.append(href_value)
    href_list = href_list[::-1]
    
        
    for i in range(0,2):
        page_number = 1
        mangalib_url = "https://mangalib.me"
        url = f"{mangalib_url}{href_list[i]}{"?page="}{page_number}"
        driver.get(url)
        page_source = driver.page_source
        soup = bs(page_source, "html.parser")
        select_tag = soup.find('select', {'id': 'reader-pages'})
        options = select_tag.find_all('option')   
        for page_number in range(1,10):
            url = f"{mangalib_url}{href_list[i]}{"?page="}{page_number}"
            driver.get(url)
            page_source = driver.page_source
            soup = bs(page_source, "html.parser")

            container_divs = soup.find_all('div', class_='reader-view__wrap')

            for container_div in container_divs:
                if container_div.get('data-p') == str(page_number):
                    img_tags = container_div.find_all('img')

                    for img_tag in img_tags:
                        src_value = img_tag.get('src')
                        src_values.append(src_value)
    return src_values


@app.route('/api/get_data/pages/<string:title>', methods=['GET'])
def get_pages():
    base_url =f"https://mangalib.me/{title}/v1/c1?page=1"
    href_list = []
    driver.get(base_url)
    button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//div[contains(@class, "reader-header-action") and contains(text(), "Оглавление")]')))
    button.click()
    div_modal_body = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, 'popup__content')))
    modal_html = div_modal_body.get_attribute("outerHTML")
    soup = bs(modal_html, "html.parser")
    a_elements = soup.find_all('a', class_='menu__item')
    for a_element in a_elements:
        href_value = a_element.get('href')
        href_list.append(href_value)

    

    data_from_db = "Тут данные о страницах"
    return data_from_db
if __name__ == '__main__':
    app.run(debug=True)