"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
  useRef,
} from "react";

type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const isMounted = useRef(false);

  // Load dari localStorage saat pertama kali di client
  useEffect(() => {
    isMounted.current = true;
    const saved = localStorage.getItem("sidebar");
    if (saved !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(saved === "true");
    }
  }, []);

  // Simpan ke localStorage setiap kali collapsed berubah
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("sidebar", String(collapsed));
    }
  }, [collapsed]);

  const toggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const handleSetCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  > = (value) => {
    setCollapsed((prev) => {
      const next =
        typeof value === "function" ? value(prev) : value;
      return next;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed: handleSetCollapsed,
        toggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }
  return context;
}