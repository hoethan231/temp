
export interface Hospital {
  id: string;
  name: string;
  address: string;
  capacity: number;          // total bed capacity
  available: number;         // currently available beds
  coordinates: { lat: number; lng: number };
}

export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "Santa Clara Valley Medical Center",
    address: "751 S Bascom Ave, San Jose, CA 95128",
    capacity: 574,
    available: 120,
    coordinates: { lat: 37.312, lng: -121.936 },
  },
  {
    id: "h2",
    name: "O'Connor Hospital",
    address: "2105 Forest Ave, San Jose, CA 95128",
    capacity: 358,
    available: 75,
    coordinates: { lat: 37.325, lng: -121.935 },
  },
  {
    id: "h3",
    name: "Regional Medical Center of San Jose",
    address: "225 N Jackson Ave, San Jose, CA 95116",
    capacity: 258,
    available: 80,
    coordinates: { lat: 37.367, lng: -121.846 },
  },
  {
    id: "h4",
    name: "Good Samaritan Hospital",
    address: "2425 Samaritan Dr, San Jose, CA 95124",
    capacity: 474,
    available: 140,
    coordinates: { lat: 37.252, lng: -121.941 },
  },
  {
    id: "h5",
    name: "Kaiser Permanente San Jose Medical Center",
    address: "250 Hospital Pkwy, San Jose, CA 95119",
    capacity: 262,
    available: 30,
    coordinates: { lat: 37.247, lng: -121.789 },
  },
];
