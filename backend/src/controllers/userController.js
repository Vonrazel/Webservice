// User Controller
const getHello = (req, res) => {
  res.json({ message: 'Hello from the backend!' });
};

const getUsers = (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  res.json(users);
};

module.exports = {
  getHello,
  getUsers
}; 