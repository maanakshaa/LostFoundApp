import db from '../config/db';

export const getAllFoundItems = async () => {
  const database = await db;
  return await database.all('SELECT * FROM found_items ORDER BY created_at DESC');
};

export const getFoundItemById = async (id: number) => {
  const database = await db;
  return await database.get('SELECT * FROM found_items WHERE id = ?', [id]);
};

export const createFoundItem = async (data: any) => {
  const database = await db;
  const { item_name, category, description, found_location, date_found, contact_info } = data;
  return await database.run(
    `INSERT INTO found_items (item_name, category, description, found_location, date_found, contact_info, created_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
    [item_name, category, description, found_location, date_found, contact_info]
  );
};

export const updateFoundItem = async (id: number, data: any) => {
  const database = await db;
  const { item_name, category, description, found_location, date_found, contact_info } = data;
  return await database.run(
    `UPDATE found_items SET item_name = ?, category = ?, description = ?, found_location = ?, date_found = ?, contact_info = ?
     WHERE id = ?`,
    [item_name, category, description, found_location, date_found, contact_info, id]
  );
};

export const deleteFoundItem = async (id: number) => {
  const database = await db;
  return await database.run('DELETE FROM found_items WHERE id = ?', [id]);
};

