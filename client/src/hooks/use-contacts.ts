import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addContact as apiAddContact, deleteContact as apiDeleteContact, updateContact as apiUpdateContact, fetchUsers } from "@/lib/api";
import { SortOption } from "@/lib/types";
import { filterContacts, sortContacts } from "@/lib/utils";
import { Contact, contactFormSchema, InsertContact } from "@shared/schema";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NAME_ASC);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load contacts from local storage API implementation
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        const apiContacts = await fetchUsers();
        setContacts(apiContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to load contacts");
        
        toast({
          title: "Error",
          description: "Failed to load contacts. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, [toast]);

  // Apply filtering and sorting whenever contacts, searchTerm, or sortOption changes
  useEffect(() => {
    let result = filterContacts(contacts, searchTerm);
    result = sortContacts(result, sortOption);
    setFilteredContacts(result);
  }, [contacts, searchTerm, sortOption]);

  // Add a new contact
  const addContact = async (contactData: InsertContact) => {
    try {
      setIsLoading(true);
      
      // Validate using contactFormSchema
      contactFormSchema.parse(contactData);
      
      // Add contact using the API function
      const newContact = await apiAddContact(contactData);
      
      if (newContact) {
        // Update the contacts state
        setContacts(prevContacts => [...prevContacts, newContact]);
        
        toast({
          title: "Success",
          description: "Contact added successfully",
          variant: "default",
        });
        
        return true;
      } else {
        throw new Error("Failed to add contact");
      }
    } catch (error) {
      console.error("Failed to add contact:", error);
      
      toast({
        title: "Error",
        description: "Failed to add contact. Please check your input.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing contact
  const updateContact = async (id: number, contactData: InsertContact) => {
    try {
      setIsLoading(true);
      
      // Validate using contactFormSchema
      contactFormSchema.parse(contactData);
      
      // Update contact using the API function
      const updatedContact = await apiUpdateContact(id, contactData);
      
      if (updatedContact) {
        // Update the contacts state
        setContacts(prevContacts => 
          prevContacts.map(contact => contact.id === id ? updatedContact : contact)
        );
        
        toast({
          title: "Success",
          description: "Contact updated successfully",
          variant: "default",
        });
        
        return true;
      } else {
        throw new Error("Failed to update contact");
      }
    } catch (error) {
      console.error("Failed to update contact:", error);
      
      toast({
        title: "Error",
        description: "Failed to update contact. Please check your input.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a contact
  const deleteContact = async (id: number) => {
    try {
      setIsLoading(true);
      
      // Delete contact using the API function
      const success = await apiDeleteContact(id);
      
      if (success) {
        // Update the contacts state
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
        
        toast({
          title: "Success",
          description: "Contact deleted successfully",
          variant: "default",
        });
        
        return true;
      } else {
        throw new Error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Failed to delete contact:", error);
      
      toast({
        title: "Error",
        description: "Failed to delete contact. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    contacts: filteredContacts,
    totalCount: contacts.length,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    isLoading,
    error,
    addContact,
    updateContact,
    deleteContact,
  };
}
