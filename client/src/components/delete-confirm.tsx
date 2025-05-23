import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirm({ isOpen, onClose, onConfirm }: DeleteConfirmProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <AlertDialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 mx-auto mb-4">
            <i className="ri-delete-bin-line text-xl text-rose-600 dark:text-rose-400"></i>
          </div>
          <AlertDialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">Delete Contact</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this contact? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-3">
          <AlertDialogCancel className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-600 dark:bg-rose-700 text-white rounded-lg text-sm font-medium hover:bg-rose-700 dark:hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
