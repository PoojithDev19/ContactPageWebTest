class ContactPageElements {
  get header() {
    return 'h1.text-white';  
  }

  get body() {
    return 'main';            
}
get contactList() {
  return "//h3[normalize-space()='Medavie Blue Cross']/following::ul[1]";
}

}

module.exports = ContactPageElements;
