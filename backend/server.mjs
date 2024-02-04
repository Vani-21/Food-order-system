import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3001;

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images/'); // Define the destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Use the original filename
  },
});

const upload = multer({ storage: storage });

// Adjusted CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your client
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'food-order',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Serve uploaded files statically
app.use('/Images', express.static('Images'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Endpoint to create the 'menu' table
app.get('/create-menu-table', (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS menu (
      id INT PRIMARY KEY AUTO_INCREMENT,
      category VARCHAR(255) NOT NULL,
      foodType VARCHAR(255) NOT NULL,
      menuName VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description TEXT,
      restaurantId INT,
      imagePath VARCHAR(255),
      FOREIGN KEY (restaurantId) REFERENCES signup(id)
    )
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating menu table:', err);
      res.status(500).json({ success: false, message: 'Failed to create menu table' });
    } else {
      console.log('Menu table created successfully');
      res.status(200).json({ success: true, message: 'Menu table created successfully' });
    }
  });
});

// Endpoint to fetch all menu items
app.get('/menu', (req, res) => {
  const sql = 'SELECT * FROM menu';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch menu items' });
    } else {
      console.log('Fetched menu items successfully');
      res.status(200).json({ success: true, menuItems: result });
    }
  });
});

// Endpoint to add a menu item
app.post('/menu', upload.single('image'), (req, res) => {
  const { category, foodType, menuName, price, description, restaurantId } = req.body;
  const imagePath = req.file.path;

  const sql =
    'INSERT INTO menu (category, foodType, menuName, price, description, restaurantId, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [category, foodType, menuName, price, description, restaurantId, imagePath], (err, result) => {
    if (err) {
      console.error('Error inserting into the menu table:', err);
      res.status(500).json({ success: false, message: 'Failed to add menu item' });
    } else {
      console.log('Menu item added successfully');
      res.status(200).json({ success: true, message: 'Menu item added successfully' });
    }
  });
});

// Endpoint to update a menu item
app.put('/menu/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedData = req.body;

  const sql =
    'UPDATE menu SET category = ?, foodType = ?, menuName = ?, price = ?, description = ?, imagePath=? WHERE id = ?';
  db.query(
    sql,
    [
      updatedData.category,
      updatedData.foodType,
      updatedData.menuName,
      updatedData.price,
      updatedData.description,
      updatedData.imagePath,
      itemId,
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating menu item:', err);
        return res.status(500).json({ success: false, message: 'Failed to update menu item', error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }

      console.log('Menu item updated successfully');
      res.status(200).json({ success: true, message: 'Menu item updated successfully' });
    }
  );
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Endpoint to delete a menu item
app.delete('/menu/:id', (req, res) => {
  const itemId = req.params.id;

  const sql = 'DELETE FROM menu WHERE id = ?';
  db.query(sql, [itemId], (err, result) => {
    if (err) {
      console.error('Error deleting menu item:', err);
      res.status(500).json({ success: false, message: 'Failed to delete menu item' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ success: false, message: 'Menu item not found' });
      } else {
        console.log('Menu item deleted successfully');
        res.status(200).json({ success: true, message: 'Menu item deleted successfully' });
      }
    }
  });
});


// app.post('/signup', upload.single('image'), (req, res) => {
//   const { name, email, password, role, phone } = req.body;
//   const imagePath = req.file ? req.file.path : null;

//   // Adjusted SQL query to include image and phone
//   const sql = 'INSERT INTO signup (name, email, password, role, image, phone) VALUES (?, ?, ?, ?, ?, ?)';
//   db.query(sql, [name, email, password, role, imagePath, phone], (err, result) => {
//     if (err) {
//       console.error('Error inserting into the database:', err);
//       res.status(500).json({ success: false, message: 'Registration failed' });
//     } else {
//       console.log('User registered successfully');
//       res.status(200).json({ success: true, message: 'Registration successful' });
//     }
//   });
// });

//Endpoint for user registration
app.post('/signup', (req, res) => {
  const { name, email, password, role } = req.body;

  const sql = 'INSERT INTO signup (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      console.error('Error inserting into the database:', err);
      res.status(500).json({ success: false, message: 'Registration failed' });
    } else {
      console.log('User registered successfully');
      res.status(200).json({ success: true, message: 'Registration successful' });
    }
  });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log('Received login request with email:', email, 'and password:', password);

  // Query the database to check if the email and password match any user
  const sql = 'SELECT id, name, email, role FROM signup WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ success: false, message: 'Login failed' });
    } else {
      if (result.length > 0) {
        // Login successful
        console.log('Login successful');
        const user = result[0];
        res.status(200).json({ success: true, message: 'Login successful', role: user.role });
      } else {
        // No user found with the provided credentials
        console.log('Invalid email or password');
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }
  });
});

app.post('/restaurant', upload.single('restaurantImage'), (req, res) => {
  const { resturantName, restaurantDescription } = req.body;
  const restaurantImage = req.file.path;

  const sql = 'INSERT INTO restaurant (restaurantName, restaurantImage, restaurantDescription) VALUES (?, ?, ?)';
  db.query(sql, [resturantName,  restaurantImage,restaurantDescription,], (err, result) => {
    if (err) {
      console.error('Error inserting into the restaurant table:', err);
      res.status(500).json({ success: false, message: 'Restaurant registration failed' });
    } else {
      console.log('Restaurant registered successfully');
      res.status(200).json({ success: true, message: 'Restaurant registration successful' });
    }
  });
});

// Endpoint to fetch all restaurants
app.get('/restaurants', (req, res) => {
  const sql = 'SELECT * FROM restaurant';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching restaurant data:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch restaurant data' });
    } else {
      console.log('Fetched restaurant data successfully');
      res.status(200).json({ success: true, restaurants: result });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
