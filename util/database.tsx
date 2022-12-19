import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Alert} from 'react-native';

enablePromise(true);

const errorCB = (err: any) => {
  console.log('SQL Error: ' + err);
};

const openCB = () => {
  console.log('Database OPENED');
};

export const getDBConnection = async () => {
  return openDatabase(
    {name: 'photos.db', location: 'default'},
    openCB,
    errorCB,
  );
};

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        subscribed INTEGER NOT NULL
    )`;
  const queryTwo = `CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY NOT NULL,
        image TEXT NOT NULL,
        user_id INTEGER FOREIGN_KEY REFERENCES users(id)
    )`;

  await db.executeSql(query);
  await db.executeSql(queryTwo);
};

export function insertPhoto(db: SQLiteDatabase, image: string, id: number) {
  const promise = new Promise((resolve: any, reject: any) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO photos (image,user_id) VALUES (?,?)`,
        [image, id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          return reject(error);
        },
      );
    });
  });
  return promise;
}

export function fetchPhotos(db: SQLiteDatabase, id: number) {
  const promise = new Promise((resolve: any, reject: any) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM photos WHERE user_id LIKE '${id}'`,
        [],
        (_, result) => {
          const photos = [];
          for (const dp of result.rows.raw()) {
            photos.push(dp.image);
          }
          resolve(photos);
        },
        (_, error) => {
          return reject(error);
        },
      );
    });
  });
  return promise;
}

export function subscribe(db: SQLiteDatabase, id: number, subscribed: number) {
  const promise = new Promise((resolve: any, reject: any) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE users SET subscribed = ${subscribed} WHERE id LIKE '${id}'`,
        [],
        (_, result) => {
          resolve();
        },
        (_, error) => {
          return reject(error);
        },
      );
    });
  });
  return promise;
}

export function insertUser(
  db: SQLiteDatabase,
  username: string,
  password: string,
  subscribed: number,
) {
  const promise = new Promise((resolve: any, reject: any) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO users (username,password,subscribed) VALUES (?,?,?)`,
        [username, password, subscribed],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          return reject('username exists');
        },
      );
    });
  });
  return promise;
}

export function fetchUser(db: SQLiteDatabase, username: string) {
  const promise = new Promise((resolve: any, reject: any) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM users WHERE username LIKE '${username}'`,
        [],
        (_, result) => {
          const user = [];
          for (const dp of result.rows.raw()) {
            user.push(dp.id);
            user.push(dp.username);
            user.push(dp.password);
            user.push(dp.subscribed);
          }
          resolve(user);
        },
        (_, error) => {
          Alert.alert('Invalid username');
          return reject(error);
        },
      );
    });
  });
  return promise;
}
