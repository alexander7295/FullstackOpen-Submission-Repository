const mongoose = require('mongoose')

const arguments = process.argv

if (arguments.length < 3) {
    console.log("Please enter your password + optionally the name and number of the person you want to add")
    process.exit(1)
}

if (arguments.length > 5) {
    console.log("Too many arguments provided")
    process.exit(1)
}

const password = arguments[2]

const url = `mongodb://fullstack:${password}@ac-2kxrmu8-shard-00-00.fxlmth9.mongodb.net:27017,ac-2kxrmu8-shard-00-01.fxlmth9.mongodb.net:27017,ac-2kxrmu8-shard-00-02.fxlmth9.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-xp3l7x-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (arguments.length == 3) {
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
else {
    const name = arguments[3]
    const number = arguments[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log("Person saved")
        console.log(result)
        mongoose.connection.close()
    })
}