interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="max-w-md mx-auto mt-12 text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in">
      <div className="mb-4 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
        <i className="ri-contacts-book-line text-3xl text-gray-500"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">No contacts yet</h3>
      <p className="text-gray-600 mb-4">Get started by adding your first contact</p>
      <button 
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center transition-colors"
        onClick={onAddClick}
      >
        <i className="ri-add-line mr-1"></i>
        Add Your First Contact
      </button>
    </div>
  );
}
