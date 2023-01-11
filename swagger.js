const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Readathon',
        description: 'A monthly readathon challenge',
    },
    host: 'localhost:8000',
    schemes: ['http'],
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/books.js', './routes/users.js']



swaggerAutogen(outputFile, endpointsFiles, doc)