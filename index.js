const { Command } = require('commander');
const contacts = require("./db/contacts.js");

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const contactList = await contacts.listContacts();
        console.log("List of contacts:", contactList);
      break;

    case 'get':
      const contactByID = await contacts.getContactById(id)
      console.log("Contact by Id:", contactByID)
      break;

    case 'add':
      const addedContact = await contacts.addContact(name, email, phone);
      console.log('Added contact:', addedContact);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.log('Removed contact:', removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
