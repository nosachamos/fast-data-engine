export type Country = {
  name: string;
  code: string;
};

export type Region = {
  country_code: string;
  state: string;
  state_code: string;
  zipcode: string;
  place: string;
  province: string;
  province_code: string;
  community: string;
  community_code: string;
  latitude: string;
  longitude: string;
};

export type Row = {
  id: string;
  index: number;
  firstName: string;
  lastName: string;
  eligible: boolean;
  countryName: string;
  countryCode: string;
  marital_status: string;
  tld: string;
  age: number;
  gpa: number;
  heightCm: number;
  weight: number;
  width: number;
  height: number;
  subscribers: number;
  notificationsEnabled: boolean;
  itemsReported: number;
  averageScore: number;

  stateName: string;
  stateAbbreviation: string;
  zipCode: number;
  place: string;
  province: string;
  provinceCode: string;
  community: string;
  communityCode: string;
  latitude: number;
  longitude: number;

  testCode: number;
  processingStatus: string;
  optionalCode: string | null;
};
