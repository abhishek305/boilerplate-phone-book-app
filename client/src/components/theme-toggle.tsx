import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 rounded-full bg-transparent border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? (
        <i className="ri-moon-line text-gray-700 dark:text-gray-300 text-lg"></i>
      ) : (
        <i className="ri-sun-line text-gray-300 dark:text-gray-300 text-lg"></i>
      )}
    </Button>
  );
}