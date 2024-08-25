
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;



app.use(cors());

app.use(express.json());

function isValidDataArray(data) {
    return Array.isArray(data) && data.every(item => typeof item === 'string' || typeof item === 'number');
}

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


function findHighestLowercaseAlphabet(alphabets) {
    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    return lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().reverse()[0]] : [];
}


app.post('/akshit_bahl/bfhl', (req, res) => {
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
app.get('/akshit_bahl/bfhl', (req, res) => {
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
    console.log(`Server is running on port ${port}`);
});
