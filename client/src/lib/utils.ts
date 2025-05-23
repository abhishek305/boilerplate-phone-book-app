import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Contact } from "@shared/schema";
import { CONTACTS_STORAGE_KEY, SortOption } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get contacts from localStorage
export function getContactsFromStorage(): Contact[] {
  try {
    const storedContacts = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (storedContacts) {
      return JSON.parse(storedContacts);
    }
  } catch (error) {
    console.error("Failed to parse contacts from localStorage:", error);
  }
  return [];
}

// Save contacts to localStorage
export function saveContactsToStorage(contacts: Contact[]) {
  try {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error("Failed to save contacts to localStorage:", error);
  }
}

// Format phone number to (XXX) XXX-XXXX
export function formatPhoneNumber(phoneNumber: string): string {
  // Clean input from all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");
  
  // Check length
  if (cleaned.length < 10) return phoneNumber;
  
  // Format
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phoneNumber;
}

// Sort contacts by the selected option
export function sortContacts(contacts: Contact[], sortOption: SortOption): Contact[] {
  return [...contacts].sort((a, b) => {
    switch (sortOption) {
      case SortOption.NAME_ASC:
        return a.name.localeCompare(b.name);
      case SortOption.NAME_DESC:
        return b.name.localeCompare(a.name);
      case SortOption.RECENT:
        // For recently added, we're using the ID as a proxy for creation time
        // If contacts had a createdAt field, we would use that instead
        return b.id - a.id;
      default:
        return 0;
    }
  });
}

// Filter contacts by search term
export function filterContacts(contacts: Contact[], searchTerm: string): Contact[] {
  if (!searchTerm) return contacts;
  
  const term = searchTerm.toLowerCase();
  return contacts.filter(
    contact => 
      contact.name.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term) ||
      (contact.email && contact.email.toLowerCase().includes(term))
  );
}
