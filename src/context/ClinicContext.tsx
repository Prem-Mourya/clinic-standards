import React, { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';

export type ThemeType = 'warm-editorial' | 'quiet-luxury' | 'modernist-mineral' | 'deep-moss';

export interface OpdLiveStatus {
  isOpen: boolean;
  statusText: string;
  subText: string;
  badgeClass: string;
  currentOrNextSession: string;
}

interface ClinicContextType {
  isAppointmentModalOpen: boolean;
  preselectedService: string | null;
  preselectedReason: string | null;
  openAppointmentModal: (service?: string, reason?: string) => void;
  closeAppointmentModal: () => void;
  activeTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  opdStatus: OpdLiveStatus;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  dismissToast: () => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);
  const [preselectedReason, setPreselectedReason] = useState<string | null>(null);
  const [activeTheme, setActiveThemeState] = useState<ThemeType>('warm-editorial');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize theme from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('siteforge_theme') as ThemeType;
    if (saved && ['warm-editorial', 'quiet-luxury', 'modernist-mineral', 'deep-moss'].includes(saved)) {
      setActiveThemeState(saved);
      document.documentElement.setAttribute('data-theme', saved === 'warm-editorial' ? '' : saved);
    }
  }, []);

  const setTheme = (theme: ThemeType) => {
    setActiveThemeState(theme);
    localStorage.setItem('siteforge_theme', theme);
    if (theme === 'warm-editorial') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  const openAppointmentModal = (service?: string, reason?: string) => {
    setPreselectedService(service || null);
    setPreselectedReason(reason || null);
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setPreselectedService(null);
    setPreselectedReason(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const dismissToast = () => {
    setToastMessage(null);
  };

  // Compute live OPD status based on Indian Standard Time (IST)
  const opdStatus = useMemo<OpdLiveStatus>(() => {
    const now = new Date();
    // Convert to Indian Standard Time (UTC + 5:30)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utc + 3600000 * 5.5);
    const day = istTime.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
    const currentMinutes = istTime.getHours() * 60 + istTime.getMinutes();

    // Morning OPD: Mon-Sat 10:00 AM (600m) to 1:30 PM (810m)
    // Evening OPD: Mon-Sat 5:30 PM (1050m) to 9:00 PM (1260m)
    // Sunday: 10:00 AM (600m) to 1:00 PM (780m)

    if (day >= 1 && day <= 6) {
      // Monday to Saturday
      if (currentMinutes >= 600 && currentMinutes <= 810) {
        return {
          isOpen: true,
          statusText: "Open Now: Morning OPD",
          subText: "Consulting until 1:30 PM today",
          badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
          currentOrNextSession: "Morning OPD (10:00 AM – 1:30 PM)"
        };
      } else if (currentMinutes < 600) {
        return {
          isOpen: false,
          statusText: "Opens at 10:00 AM Today",
          subText: "Tokens available at desk from 9:45 AM",
          badgeClass: "bg-amber-500/10 text-amber-800 border-amber-500/30 dark:text-amber-300",
          currentOrNextSession: "Morning OPD (10:00 AM – 1:30 PM)"
        };
      } else if (currentMinutes > 810 && currentMinutes < 1050) {
        return {
          isOpen: false,
          statusText: "Opens at 5:30 PM Today",
          subText: "Evening OPD: 5:30 PM – 9:00 PM",
          badgeClass: "bg-amber-500/10 text-amber-800 border-amber-500/30 dark:text-amber-300",
          currentOrNextSession: "Evening OPD (5:30 PM – 9:00 PM)"
        };
      } else if (currentMinutes >= 1050 && currentMinutes <= 1260) {
        return {
          isOpen: true,
          statusText: "Open Now: Evening OPD",
          subText: "Consulting until 9:00 PM tonight",
          badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
          currentOrNextSession: "Evening OPD (5:30 PM – 9:00 PM)"
        };
      } else {
        // After 9:00 PM
        const nextDay = day === 6 ? "Sunday at 10:00 AM (By Appointment)" : "Tomorrow at 10:00 AM";
        return {
          isOpen: false,
          statusText: `Closed for Tonight`,
          subText: `Next consultation: ${nextDay}`,
          badgeClass: "bg-stone-500/10 text-stone-700 border-stone-400/30 dark:text-stone-300",
          currentOrNextSession: nextDay
        };
      }
    } else {
      // Sunday
      if (currentMinutes >= 600 && currentMinutes <= 780) {
        return {
          isOpen: true,
          statusText: "Open Now: Sunday OPD",
          subText: "Prior Appointments Only (until 1:00 PM)",
          badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
          currentOrNextSession: "Sunday OPD (10:00 AM – 1:00 PM)"
        };
      } else {
        return {
          isOpen: false,
          statusText: "Closed for Sunday",
          subText: "Regular OPD resumes Monday at 10:00 AM",
          badgeClass: "bg-stone-500/10 text-stone-700 border-stone-400/30 dark:text-stone-300",
          currentOrNextSession: "Monday Morning OPD (10:00 AM)"
        };
      }
    }
  }, []);

  return (
    <ClinicContext.Provider
      value={{
        isAppointmentModalOpen,
        preselectedService,
        preselectedReason,
        openAppointmentModal,
        closeAppointmentModal,
        activeTheme,
        setTheme,
        opdStatus,
        toastMessage,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
