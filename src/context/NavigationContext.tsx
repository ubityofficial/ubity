import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type Page = 'main' | 'internships';

interface NavigationContextType {
  navigateTo: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const navigateTo = (page: Page) => {
    const routes: Record<Page, string> = {
      main: '/',
      internships: '/internships',
    };
    navigate(routes[page]);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
