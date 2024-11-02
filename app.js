const mongoose = require('mongoose')
const Customers = require('./models/Customers')
const prompt = require('prompt-sync')()
const dotenv = require('dotenv')
dotenv.config()

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI)
  //console.log('Connected to MongoDB')

  await display()
  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  //await runQueries()

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')

  // Close our app, bringing us back to the command line.
  process.exit()
}
connect()
console.log('Welcome to the CRM')
const display = async () => {
  const userAction = prompt(
    'What would you like to do? \n 1. Create a customer \n 2. View all customers \n 3. Update a customer \n 4. Delete a customer \n 5. quit  '
  )
  switch (userAction) {
    case '1':
      await createCustomer()
      break
    case '2':
      await viewCustomers()
      await display()
      break
    case '3':
      await updateCustomer()
      break
    case '4':
      await deleteCustomer()
      break
    case '5':
      await quit()
      break
  }
  //console.log(`User Inputs ${userAction}`)
}
const createCustomer = async () => {
  const name = prompt('Insert Customer Name: ')
  const age = prompt('Insert Customer Age: ')
  const customerData = {
    name: name,
    age: age
  }
  const customer = await Customers.create(customerData)
  if (customer) {
    console.log('Record added successfully')
    await viewCustomers()
  } else {
    console.log('Please try again latter')
  }
  await display()
}
const viewCustomers = async () => {
  const customers = await Customers.find()
  console.log('Below is a list of customers:')
  const displayCustomersArr = customers.forEach((customer) => {
    console.log(
      `id: ${customer.id} --  Name: ${customer.name}   Age: ${customer.age}`
    )
  })
  // console.log(displayCustomersArr)
}
const updateCustomer = async () => {
  await viewCustomers()
  const customerId = prompt(
    'Copy and paste the id of the customer you would like to update here: '
  )
  const newCustomerName = prompt('What is the customers new name?')
  const newCustomerAge = prompt('What is the customers new age?')
  const updatedCustomer = await Customers.findByIdAndUpdate(customerId, {
    name: newCustomerName,
    age: newCustomerAge
  })
  if (updatedCustomer) {
    console.log('Record updated successfully')
    await viewCustomers()
  } else {
    console.log('Please try again latter')
  }
  await display()
}
const deleteCustomer = async () => {
  await viewCustomers()
  const customerId = prompt(
    'Copy and paste the id of the customer you would like to delete here: '
  )
  const deletedCustomer = await Customers.findByIdAndDelete(customerId)
  if (deletedCustomer) {
    console.log('The Following Record Was Deleted: ', deletedCustomer)
  } else {
    console.log('Please try again latter')
  }
  await display()
}
const quit = async () => {
  console.log('exiting...')
  mongoose.connection.close()
}
const runQueries = async () => {
  console.log('Queries running.')
}

/*------------------------------ Query Functions -----------------------------*/
