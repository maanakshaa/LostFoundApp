export interface LostItem {
  id?: number;
  item_name: string;
  category: string;
  description: string;
  last_seen_location?: string;
  date_lost: Date | string;
  contact_info: string;
  created_at?: Date | string;
}

export interface FoundItem {
  id?: number;
  item_name: string;
  category: string;
  description: string;
  found_location: string;
  date_found: Date | string;
  contact_info: string;
  created_at?: Date | string;
}

export const ITEM_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Documents',
  'Keys',
  'Wallet/Purse',
  'Jewelry',
  'Accessories',
  'Books',
  'Other'
]; 