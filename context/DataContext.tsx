
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { VerificationRequest, GovForm, Procedure, Law, Appointment, UserProfile, LockerDocument, MinistryInfo, MarketPrice, Payment, Report } from '../types';
import { MOCK_VERIFICATIONS, MOCK_FORMS, MOCK_PROCEDURES, MOCK_LAWS, MOCK_APPOINTMENTS, MOCK_USER, MOCK_LOCKER_DOCS, MINISTRY_DATA, MOCK_MARKET_PRICES, MOCK_PAYMENTS, MOCK_REPORTS } from '../data/mockDatabase';

interface DataContextType {
  user: UserProfile;
  verifications: VerificationRequest[];
  addVerification: (req: VerificationRequest) => void;
  forms: GovForm[];
  procedures: Procedure[];
  laws: Law[];
  appointments: Appointment[];
  addAppointment: (apt: Appointment) => void;
  ministries: Record<string, MinistryInfo>;
  lockerDocs: LockerDocument[];
  marketPrices: MarketPrice[];
  payments: Payment[];
  reports: Report[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useState<UserProfile>(MOCK_USER);
  const [verifications, setVerifications] = useState<VerificationRequest[]>(MOCK_VERIFICATIONS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [forms] = useState<GovForm[]>(MOCK_FORMS);
  const [procedures] = useState<Procedure[]>(MOCK_PROCEDURES);
  const [laws] = useState<Law[]>(MOCK_LAWS);
  const [lockerDocs] = useState<LockerDocument[]>(MOCK_LOCKER_DOCS);
  const [marketPrices] = useState<MarketPrice[]>(MOCK_MARKET_PRICES);
  const [payments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [reports] = useState<Report[]>(MOCK_REPORTS);

  const addVerification = (req: VerificationRequest) => {
    setVerifications(prev => [req, ...prev]);
  };

  const addAppointment = (apt: Appointment) => {
    setAppointments(prev => [apt, ...prev]);
  };

  return (
    <DataContext.Provider value={{ 
      user, 
      verifications, 
      addVerification, 
      forms, 
      procedures, 
      laws, 
      appointments, 
      addAppointment, 
      ministries: MINISTRY_DATA,
      lockerDocs,
      marketPrices,
      payments,
      reports
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
