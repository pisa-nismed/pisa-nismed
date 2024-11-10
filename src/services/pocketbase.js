import axios from 'axios';

const API_URL = 'https://pisa-nismed.pockethost.io'; // Your PocketBase API URL
const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register User (POST request)
export const registerUser = async (email, password) => {
  try {
    // Make the registration request (POST request to create a new user)
    const response = await client.post('/api/collections/users/records', {
      email,
      password,
      passwordConfirm: password, // Add this field for password confirmation
    });

    console.log('Registration response:', response.data); // Debug: Log the registration response

    // After successful registration, request email verification
    const verificationResponse = await requestVerification(email);

    console.log('Verification response:', verificationResponse.data); // Debug: Log the verification response

    return response.data; // Return the registered user data if successful
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    console.error('Error during registration or email verification:', errorMessage);
    throw new Error(errorMessage || 'Registration failed. Please try again.');
  }
};

// Function to request email verification after registration
const requestVerification = async (email) => {
  try {
    // Make a request to PocketBase's API to trigger email verification
    const response = await client.post('/api/collections/users/verify', {
      email,
    });

    return response; // Return the response if email verification is successful
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    console.error('Error requesting email verification:', errorMessage);
    throw new Error(errorMessage || 'Email verification request failed.');
  }
};
// Login User (POST request)
export const loginUser = async (email, password) => {
  try {
    // Make the POST request to the PocketBase login API
    const response = await client.post('/api/collections/users/auth-with-password', {
      identity: email,  // The email field (or username, depending on your configuration)
      password: password,
    });

    return response.data;  // Return the user data from the response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed, please check your credentials.');
  }
};

// Logout User (POST request)
export const logoutUser = async () => {
  try {
    await client.post('/api/collections/users/logout');
    // Handle successful logout (Clear localStorage, etc)
  } catch (error) {
    console.error('Error during logout', error);
    throw error.response?.data?.message || 'Logout failed. Please try again.';
  }
};

export default client;
