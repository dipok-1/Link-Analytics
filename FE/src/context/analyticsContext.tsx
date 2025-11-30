import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type AnalyticsData = {
  ClickCount: number;
  userAgent: string;
};

type AnalyticsContextType = {
  analyticsData: AnalyticsData;
  setAnalyticsData: Dispatch<SetStateAction<AnalyticsData>>;
};

export const AnalyticsContext = createContext<AnalyticsContextType>({
  analyticsData: {
    ClickCount: 0,
    userAgent: "",
  },
  // typed, intentionally-unused parameter (prefixed with `_`) avoids both 'unused' and 'any' errors
  setAnalyticsData: (_e: SetStateAction<AnalyticsData>) => {},
});

export const AnalyticsProvider = ({ children }: { children?: ReactNode }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    ClickCount: 0,
    userAgent: "",
  });

  return (
    <AnalyticsContext.Provider value={{ analyticsData, setAnalyticsData }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
