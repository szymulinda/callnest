import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';

type RouterContextValue = {
  pathname: string;
  navigate: (to: string) => void;
};

const RouterContext = createContext<RouterContextValue | null>(null);

function useRouterContext() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('Router components must be used within AppRouter');
  }
  return context;
}

export function usePathname() {
  return useRouterContext().pathname;
}

export function useNavigate() {
  return useRouterContext().navigate;
}

type AppRouterProps = {
  children: ReactNode;
};

export function AppRouter({ children }: AppRouterProps) {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const nextPath = url.pathname;
    const hash = url.hash;
    const current = `${window.location.pathname}${window.location.hash}`;

    if (to === current || (nextPath === window.location.pathname && !hash)) return;

    window.history.pushState({}, '', to);
    setPathname(nextPath);

    if (hash) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.querySelector(hash)?.scrollIntoView();
        });
      });
      return;
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const value = useMemo(() => ({ pathname, navigate }), [pathname, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export function AppLink({ to, href, onClick, children, ...rest }: AppLinkProps) {
  const { navigate } = useRouterContext();

  return (
    <a
      {...rest}
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        const isModified =
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

        if (!isModified && !to.startsWith('mailto:') && !to.startsWith('tel:')) {
          const isInternal = to.startsWith('/') && !to.startsWith('//');
          if (isInternal) {
            event.preventDefault();
            navigate(to);
          }
        }
      }}
    >
      {children}
    </a>
  );
}
