type VitalReading = {
  value: number;
  levels: string;
};

type BloodPressure = {
  systolic: VitalReading;
  diastolic: VitalReading;
};

type HealthMetrics = {
  month: string;
  year: number;
  blood_pressure: BloodPressure;
  heart_rate: VitalReading;
  respiratory_rate: VitalReading;
  temperature: VitalReading;
};

type User = {
  userId: string;
  organizationId?: string;
  color?: string;
  name?: string;
  email?: string;
  photoUrl?: string;
  textColor?: string;
};
