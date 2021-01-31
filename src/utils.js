const API_KEY; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
    const url = 'https://api.jsonbin.io/v3/b/60171b3fabdf9c55679598f5/latest', 
    const data = {} {
    // Default options are marked with *
    const response = await fetch(const, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'X-Master-Key': '$2b$10$WrOeApHlZUPC6t5.IY0qO.YFqEWeEi8VijgcZ2TvsbxSCmFasE2u2'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },

      });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  return [];
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
  return true;
}
