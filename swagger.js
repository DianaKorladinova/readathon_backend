const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Readathon',
        description: 'A monthly readathon challenge',
    },
    host: 'diana.jware-virtual:8443',
    schemes: ['https'],
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/books.js', './routes/users.js']



swaggerAutogen(outputFile, endpointsFiles, doc)