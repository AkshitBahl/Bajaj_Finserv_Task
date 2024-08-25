// const express = require('express');
// const app = express();

// app.use(express.json()); 



// app.post('/akshit_post/bfhl', (req, res) => {
//     const { data } = req.body;

//     const user_id = "AkshitBahl_28102002";
//     const email = "akshit.bahl2021@vitstudent.ac.in";
//     const roll_number = "21BIT0012";

//     if (!data || !Array.isArray(data)) {
//         return res.status(400).json({
//             is_success: false,
//             message: 'data format not valid, give in json.'
//         });
//     }

//     const numbers = [];
//     const alphabets = [];

//     data.forEach(item => {
//         if (/^\d+$/.test(item)) {
//             numbers.push(item);
//         } else if (/^[a-zA-Z]$/.test(item)) {
//             alphabets.push(item);
//         }
//     });

//     const highestLowercase = alphabets
//         .filter(char => char === char.toLowerCase())
//         .sort()
//         .reverse()[0] || null;

//     res.json({
//         is_success: true,
//         user_id: user_id,
//         email: email,
//         roll_number: roll_number,
//         numbers: numbers,
//         alphabets: alphabets,
//         highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
//     });
// });



// app.get('/akshit_get/bfhl', (req, res) => {
//     res.status(200).json({
//         operation_code: 1
//     });
// });



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Utility function for input validation
function isValidDataArray(data) {
    return Array.isArray(data) && data.every(item => typeof item === 'string' || typeof item === 'number');
}

// Utility function to extract numbers and alphabets
function extractNumbersAndAlphabets(data) {
    const numbers = [];
    const alphabets = [];

    data.forEach(item => {
        if (/^\d+$/.test(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    return { numbers, alphabets };
}

// Utility function to find the highest lowercase alphabet
function findHighestLowercaseAlphabet(alphabets) {
    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    return lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().reverse()[0]] : [];
}

// POST route for /bfhl
app.post('/akshit_post/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Input validation
        if (!data || !isValidDataArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: 'Invalid data provided. "data" should be an array containing only strings or numbers.'
            });
        }

        // Hardcoded user information
        const user_id = "john_doe_17091999";
        const email = "john@xyz.com";
        const roll_number = "ABCD123";

        const { numbers, alphabets } = extractNumbersAndAlphabets(data);
        const highest_lowercase_alphabet = findHighestLowercaseAlphabet(alphabets);

        // Response
        return res.json({
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highest_lowercase_alphabet
        });
    } catch (error) {
        // General error handling
        console.error('Error processing request:', error);
        return res.status(500).json({
            is_success: false,
            message: 'An internal server error occurred.'
        });
    }
});

// GET route for /bfhl
app.get('/akshit_get/bfhl', (req, res) => {
    try {
        res.status(200).json({
            operation_code: 1
        });
    } catch (error) {
        // General error handling
        console.error('Error processing request:', error);
        return res.status(500).json({
            is_success: false,
            message: 'An internal server error occurred.'
        });
    }
});

// 404 handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({
        is_success: false,
        message: 'Resource not found.'
    });
});

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        is_success: false,
        message: 'An unexpected error occurred.'
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
