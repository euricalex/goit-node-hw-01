
const fs = require("node:fs/promises");
const path = require("path");


const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, {encoding: "UTF-8"})
    return JSON.parse(data)
  }


  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  }
   async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if(index === -1) {
        return null;
    }
     // Зберігаємо видалений контакт для подальшого повернення його значення
  const removedContact = contacts.splice(index, 1)[0];
  await fs.writeFile(contactsPath,  JSON.stringify(contacts, null, 2), {
    encoding: "UTF-8"
  });
  return removedContact;
  
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  }

  async function addContact(name, email, phone) {
    try {
   
      const contacts = await listContacts();
  
      const newContact = {
        id: generateId(), 
        name,
        email,
        phone,
      };
  
      contacts.push(newContact);
  
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), {
        encoding: "UTF-8",
      });
  
      // Повертаємо доданий контакт
      return newContact;
    } catch (error) {
      console.error("Error adding contact:", error);
      return null;
    }
  }
  function generateId() {
    // Генеруємо унікальний ідентифікатор довжиною 8 символів
    return Math.random().toString(36).substr(2, 9);
  }
  


 module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
 }