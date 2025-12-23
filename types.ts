export interface Dataset {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceType: 'State' | 'Federal' | 'International';
  category: 'Policies' | 'Demographics' | 'Diseases' | 'Medical Capabilities' | 'Population Health';
  region: string;
  dateUpdated: string;
  format: string[];
  size: string;
  tags: string[];
  downloads: number;
  featured?: boolean;
  sampleData?: Array<{ name: string; value: number }>; // For visualization
}

export interface FilterState {
  searchQuery: string;
  categories: string[];
  sourceTypes: string[];
  regions: string[];
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
