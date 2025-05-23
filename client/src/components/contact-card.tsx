import { Contact } from "@shared/schema";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  const { id, name, phone, email, category } = contact;
  
  return (
    <div className="contact-card bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 capitalize">{category}</p>
          </div>
          <div className="flex space-x-1">
            <button 
              className="icon-btn h-8 w-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onEdit(contact)}
              aria-label="Edit contact"
            >
              <i className="ri-edit-line"></i>
            </button>
            <button 
              className="icon-btn h-8 w-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30"
              onClick={() => onDelete(id)}
              aria-label="Delete contact"
            >
              <i className="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
        
        <div className="mt-3 flex items-center">
          <i className="ri-phone-line text-gray-500 dark:text-gray-400 mr-2"></i>
          <a href={`tel:${phone}`} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            {phone}
          </a>
        </div>
        
        {email && (
          <div className="mt-2 flex items-center">
            <i className="ri-mail-line text-gray-500 dark:text-gray-400 mr-2"></i>
            <a href={`mailto:${email}`} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
              {email}
            </a>
          </div>
        )}
      </div>
      
      <div className="flex border-t border-gray-200 dark:border-gray-700">
        <a 
          href={`tel:${phone}`}
          className="flex-1 py-2 px-3 text-sm flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium"
        >
          <i className="ri-phone-line mr-1"></i>
          Call
        </a>
        <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
        <a 
          href={`sms:${phone}`}
          className="flex-1 py-2 px-3 text-sm flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium"
        >
          <i className="ri-message-2-line mr-1"></i>
          Message
        </a>
      </div>
    </div>
  );
}
