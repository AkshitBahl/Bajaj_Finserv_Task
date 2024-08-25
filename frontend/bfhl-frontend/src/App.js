import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResponseData(null);
  
    try {
      // Debugging: Check input value
      console.log("Input Value:", inputValue);
      
      // Parse the input JSON
      const jsonData = JSON.parse(inputValue);
      console.log("Parsed JSON Data:", jsonData);
  
      // Call the API
      const response = await axios.post('https://bajaj-finserv-task-dusky.vercel.app/akshit_post/bfhl/', jsonData);

      console.log("API Response:", response.data);
  
      setResponseData(response.data);
    } catch (err) {
      console.error("Error:", err);
      setError('Invalid JSON input');
    }
  };

  const handleDropdownChange = (options) => {
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const options = {
      Alphabets: responseData.alphabets || [],
      Numbers: responseData.numbers || [],
      'Highest lowercase alphabet': responseData.highest_lowercase_alphabet || [],
    };

    return (
      <div>
        {selectedOptions.map((option) => (
          <div key={option.value}>
            <h3>{option.label}</h3>
            <p>{options[option.label].join(', ')}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number Here</h1>

      <form onSubmit={handleFormSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Enter JSON here (e.g., {"data": ["A", "C", "z"]})'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <>
          <Select
            isMulti
            options={[
              { value: 'Alphabets', label: 'Alphabets' },
              { value: 'Numbers', label: 'Numbers' },
              { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
            ]}
            onChange={handleDropdownChange}
          />

          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
