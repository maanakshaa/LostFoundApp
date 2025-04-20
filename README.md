<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  
</head>
<body>
  <h1>📌Lost & Found Application</h1>

  <h2>🎯 Objective</h2>
  <p>Develop a full-stack web-based Lost & Found Application where users can post lost items, search for found items, and contact the owner using Angular, Node.js (TypeScript), and MySQL.</p>

  <h2>📌 Features & Functional Requirements</h2>

  <h3>🔹 1. User Roles (No Authentication Required)</h3>
  <ul>
    <li>Any user can post a Lost or Found Item.</li>
    <li>Any user can browse and search for items.</li>
  </ul>

  <h3>🔹 2. Lost Item Management (Users)</h3>
  <p>Users can:</p>
  <ul>
    <li>✅ Report a lost item with:
      <ul>
        <li><strong>Item Name:</strong> Text (Required)</li>
        <li><strong>Category:</strong> Dropdown (Electronics, Clothing, Documents, etc.)</li>
        <li><strong>Description:</strong> Text (Required)</li>
        <li><strong>Last Seen Location:</strong> Text (Optional)</li>
        <li><strong>Date Lost:</strong> Date Picker (Required)</li>
        <li><strong>Contact Info:</strong> Email/Phone (Required)</li>
      </ul>
    </li>
    <li>✅ Edit or remove their reported lost items.</li>
    <li>✅ Browse/search lost items by keyword, category, and date.</li>
  </ul>
  <p>📝 UI: Lost Items Page and Form to Report Lost Item</p>

  <h3>🔹 3. Found Item Management (Users)</h3>
  <p>Users can:</p>
  <ul>
    <li>✅ Report a found item with:
      <ul>
        <li><strong>Item Name:</strong> Text (Required)</li>
        <li><strong>Category:</strong> Dropdown (Electronics, Clothing, Documents, etc.)</li>
        <li><strong>Description:</strong> Text (Required)</li>
        <li><strong>Found Location:</strong> Text (Required)</li>
        <li><strong>Date Found:</strong> Date Picker (Required)</li>
        <li><strong>Contact Info:</strong> Email/Phone (Required)</li>
      </ul>
    </li>
    <li>✅ Edit or remove their reported found items.</li>
    <li>✅ Browse/search found items by keyword, category, and date.</li>
  </ul>
  <p>📝 UI: Found Items Page and Form to Report Found Item</p>

  <h3>🔹 4. Contacting the Reporter</h3>
  <ul>
    <li>✅ Users can view contact details of item reporter.</li>
  </ul>
  <p>📝 UI: Button to reveal contact details on each listing</p>

  <h2>📌 Frontend Requirements (Angular 16)</h2>
  <ul>
    <li>✅ Use Angular Material for UI</li>
    <li>✅ Maintain a modular folder structure</li>
  </ul>

  <h3>🔹 Suggested Components</h3>
  <ul>
    <li>1️⃣ <strong>LostItemsComponent</strong> – Displays lost items list</li>
    <li>2️⃣ <strong>FoundItemsComponent</strong> – Displays found items list</li>
    <li>3️⃣ <strong>LostItemFormComponent</strong> – Form to report lost item</li>
    <li>4️⃣ <strong>FoundItemFormComponent</strong> – Form to report found item</li>
    <li>5️⃣ <strong>ItemDetailsComponent</strong> – Shows full details of an item</li>
  </ul>

  <h3>🔹 Suggested Routes</h3>
  <table border="1" cellpadding="5">
    <thead>
      <tr><th>Path</th><th>Component</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>/lost-items</td><td>LostItemsComponent</td><td>View all lost items</td></tr>
      <tr><td>/found-items</td><td>FoundItemsComponent</td><td>View all found items</td></tr>
      <tr><td>/lost-items/new</td><td>LostItemFormComponent</td><td>Report a lost item</td></tr>
      <tr><td>/found-items/new</td><td>FoundItemFormComponent</td><td>Report a found item</td></tr>
      <tr><td>/lost-items/:id</td><td>ItemDetailsComponent</td><td>View lost item details</td></tr>
      <tr><td>/found-items/:id</td><td>ItemDetailsComponent</td><td>View found item details</td></tr>
    </tbody>
  </table>

  <h2>📌 Backend Requirements (Node.js + TypeScript + Express)</h2>
  <ul>
    <li>✅ REST API for Lost & Found item management</li>
    <li>✅ Use MySQL database</li>
    <li>✅ Implement full CRUD</li>
    <li>✅ Include error handling and validations</li>
  </ul>

  <h2>📌 Database Structure (MySQL)</h2>

  <h3>🔹 Lost_Items Table</h3>
  <table border="1" cellpadding="5">
    <thead>
      <tr><th>Column</th><th>Type</th><th>Constraints</th></tr>
    </thead>
    <tbody>
      <tr><td>id</td><td>INT</td><td>PRIMARY KEY, AUTO_INCREMENT</td></tr>
      <tr><td>item_name</td><td>VARCHAR(255)</td><td>NOT NULL</td></tr>
      <tr><td>category</td><td>VARCHAR(100)</td><td>NOT NULL</td></tr>
      <tr><td>description</td><td>TEXT</td><td>NOT NULL</td></tr>
      <tr><td>last_seen_location</td><td>VARCHAR(255)</td><td>NULL</td></tr>
      <tr><td>date_lost</td><td>DATE</td><td>NOT NULL</td></tr>
      <tr><td>contact_info</td><td>VARCHAR(255)</td><td>NOT NULL</td></tr>
      <tr><td>created_at</td><td>TIMESTAMP</td><td>DEFAULT CURRENT_TIMESTAMP</td></tr>
    </tbody>
  </table>

  <h3>🔹 Found_Items Table</h3>
  <table border="1" cellpadding="5">
    <thead>
      <tr><th>Column</th><th>Type</th><th>Constraints</th></tr>
    </thead>
    <tbody>
      <tr><td>id</td><td>INT</td><td>PRIMARY KEY, AUTO_INCREMENT</td></tr>
      <tr><td>item_name</td><td>VARCHAR(255)</td><td>NOT NULL</td></tr>
      <tr><td>category</td><td>VARCHAR(100)</td><td>NOT NULL</td></tr>
      <tr><td>description</td><td>TEXT</td><td>NOT NULL</td></tr>
      <tr><td>found_location</td><td>VARCHAR(255)</td><td>NOT NULL</td></tr>
      <tr><td>date_found</td><td>DATE</td><td>NOT NULL</td></tr>
      <tr><td>contact_info</td><td>VARCHAR(255)</td><td>NOT NULL</td></tr>
      <tr><td>created_at</td><td>TIMESTAMP</td><td>DEFAULT CURRENT_TIMESTAMP</td></tr>
    </tbody>
  </table>

  <h2>📌 API Endpoints</h2>

  <h3>🔹 Lost Items API</h3>
  <ul>
    <li><strong>GET</strong> /api/lost-items – Get all lost items</li>
    <li><strong>POST</strong> /api/lost-items – Report a lost item</li>
    <li><strong>GET</strong> /api/lost-items/:id – Get specific lost item</li>
    <li><strong>PUT</strong> /api/lost-items/:id – Update lost item</li>
    <li><strong>DELETE</strong> /api/lost-items/:id – Delete lost item</li>
  </ul>

  <h3>🔹 Found Items API</h3>
  <ul>
    <li><strong>GET</strong> /api/found-items – Get all found items</li>
    <li><strong>POST</strong> /api/found-items – Report a found item</li>
    <li><strong>GET</strong> /api/found-items/:id – Get specific found item</li>
    <li><strong>PUT</strong> /api/found-items/:id – Update found item</li>
    <li><strong>DELETE</strong> /api/found-items/:id – Delete found item</li>
  </ul>

  <h2>📌 Additional Requirements</h2>
  <ol>
    <li><strong>Validation:</strong> Mandatory fields, valid dates, prevent duplicates.</li>
    <li><strong>Error Handling:</strong> Use HTTP status codes, show error messages.</li>
    <li><strong>UI Feedback:</strong> Show alerts for success or missing fields.</li>
    <li><strong>API Docs:</strong> Document all endpoints with sample usage.</li>
  </ol>

</body>
</html>
