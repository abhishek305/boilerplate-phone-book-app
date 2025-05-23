import { getContactsFromStorage, saveContactsToStorage } from "@/lib/utils";
import { Contact, InsertContact } from "@shared/schema";

interface UserApiResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
}

/**
 * Fetches users from local storage or returns a default set if empty
 */
export async function fetchUsers(): Promise<Contact[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: UserApiResponse[] = await response.json();
  
  // Incomplete transformation - missing validation and proper category assignment
  return users.map(user => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    category: 'personal' // Hardcoded category instead of intelligently assigning based on data
  }));
}

// This function would be used in a future feature to fetch a single user
// It's intentionally left incomplete for the interview candidate to complete
export async function fetchUser(id: number): Promise<Contact | null> {
  // TODO: Implement this function to fetch a single user by ID
  return null;
}

// Add a new contact
export async function addContact(contact: InsertContact): Promise<Contact | null> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    
    // Missing proper response handling and error checking
    const data = await response.json();
    const newContact: Contact = {
      ...contact,
      id: data.id,
    };
    
    const contacts = getContactsFromStorage();
    const updatedContacts = [...contacts, newContact];
    saveContactsToStorage(updatedContacts);
    
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    return null;
  }
}

// Update a contact
export async function updateContact(id: number, contact: InsertContact): Promise<Contact | null> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const contacts = getContactsFromStorage();
    const existingIndex = contacts.findIndex(c => c.id === id);
    
    if (existingIndex === -1) {
      return null;
    }
    
    const updatedContact: Contact = {
      ...contact,
      id,
      email: contact.email ?? null,
      category: contact.category ?? 'personal'
    };
    
    const updatedContacts = [...contacts];
    updatedContacts[existingIndex] = updatedContact;
    
    saveContactsToStorage(updatedContacts);
    
    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error);
    return null;
  }
}

// Delete a contact
export async function deleteContact(id: number): Promise<boolean> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const contacts = getContactsFromStorage();
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    
    saveContactsToStorage(updatedContacts);
    
    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
}