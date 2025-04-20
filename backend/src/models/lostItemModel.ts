import dbPromise from '../config/db';

export const getAllLostItems = async () => {
  const db = await dbPromise;
  return await db.all('SELECT * FROM lost_items ORDER BY created_at DESC');
};

export const getLostItemById = async (id: number) => {
  const db = await dbPromise;
  return await db.get('SELECT * FROM lost_items WHERE id = ?', [id]);
};

export const createLostItem = async (data: any) => {
  const db = await dbPromise;
  const { item_name, category, description, last_seen_location, date_lost, contact_info } = data;
  return await db.run(
    'INSERT INTO lost_items (item_name, category, description, last_seen_location, date_lost, contact_info) VALUES (?, ?, ?, ?, ?, ?)',
    [item_name, category, description, last_seen_location, date_lost, contact_info]
  );
};

export const updateLostItem = async (id: number, data: any) => {
  const db = await dbPromise;
  const { item_name, category, description, last_seen_location, date_lost, contact_info } = data;
  return await db.run(
    'UPDATE lost_items SET item_name = ?, category = ?, description = ?, last_seen_location = ?, date_lost = ?, contact_info = ? WHERE id = ?',
    [item_name, category, description, last_seen_location, date_lost, contact_info, id]
  );
};

export const deleteLostItem = async (id: number) => {
  const db = await dbPromise;
  return await db.run('DELETE FROM lost_items WHERE id = ?', [id]);
};