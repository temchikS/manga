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
href_list = []
@app.route('/api/get_data/chapters/<string:title>', methods=['GET'])
def get_chapters(title):
    global href_list
    base_url =f"https://mangalib.me/{title}/v1/c1?page=1"
    
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
    return "complete"
        

@app.route('/api/get_data/for_read/<string:title>/c=<chapter>/page=<number>', methods=['GET'])
def show_pages(title,number,chapter):
    global href_list
    if not href_list:
        get_chapters(title)
    src_values =[]    
    url = f"https://mangalib.me/{title}/v1/c1?page=1"
    driver.get(url)
    page_source = driver.page_source
    soup = bs(page_source, "html.parser")
    select_tag = soup.find('select', {'id': 'reader-pages'})
    options = select_tag.find_all('option')   
    for page_number in range(int(number),int(number)+4):
        url = f"https://mangalib.me{href_list[int(chapter)-1]}?page={page_number}"
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

if __name__ == '__main__':
    app.run(debug=True)
