import * as SQLite from 'expo-sqlite';
console.log("SQLite module:", SQLite);
const databaseName = "mydatabase.db";


const getDBConnection = () => {
  try {
    const db = SQLite.openDatabaseSync("mydatabase.db");
    console.log("Database object:", db);
    return db;
  } catch (error) {
    console.error("Error opening database:", error);
    return null;
  }
};

getDBConnection();

// Open the database
// const getDBConnection = () => {
//   return SQLite.openDatabaseSync(databaseName);
// };

// Create table
const createTable = async () => {
  try {
    const db = getDBConnection();
    if (!db) {
      console.error("Database connection failed!");
      return;
    }

    db.execAsync(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS connections (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT NOT NULL,
          host TEXT,
          port TEXT,
          username TEXT,
          password TEXT,
          database TEXT NOT NULL
        );`,
        [],
        (_, result) => console.log("Table created successfully!", result),
        (_, error) => console.error("Error creating table:", error)
      );
    });
  } catch (error) {
    console.error("Database error:", error);
  }
};

// Insert a new connection
const saveConnection = async (connection) => {
  try {
    const db = SQLite.openDatabaseSync(databaseName);;
    db.runAsync(tx => {
      tx.executeSql(
        `INSERT INTO connections (name, type, host, port, username, password, database)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [connection.name, connection.type, connection.host, connection.port, connection.username, connection.password, connection.database],
        () => console.log("Connection saved!"),
        (_, error) => console.error("Error saving connection:", error)
      );
    });
  } catch (error) {
    console.error("Database error:", error);
  }
};

// Get all saved connections
const getConnections = async (callback) => {
  try {
    console.info("Get Connecttion "+databaseName);
    const db = SQLite.openDatabaseSync(databaseName);
    console.info(" "+ db);
    db.runAsync(tx => {
      tx.executeSql(
        "SELECT * FROM connections;",
        [],
        (_, results) => {
          let connections = [];
          for (let i = 0; i < results.rows.length; i++) {
            connections.push(results.rows.item(i));
          }
          callback(connections);
        },
        (_, error) => console.error("Error fetching connections:", error)
      );
    });
  } catch (error) {
    console.error("Database error:", error);
  }
};

// Delete a connection
const deleteConnection = async (id) => {
  try {
    const db = SQLite.openDatabaseSync(databaseName);
    db.transaction(tx => {
      tx.runAsync(
        "DELETE FROM connections WHERE id = ?;",
        [id],
        () => console.log("Connection deleted!"),
        (_, error) => console.error("Error deleting connection:", error)
      );
    });
  } catch (error) {
    console.error("Database error:", error);
  }
};

export { createTable, saveConnection, getConnections, deleteConnection };
