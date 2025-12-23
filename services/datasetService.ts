import { mockDatasets } from '../mockData';
import { Dataset, FilterState } from '../types';

export const getDatasets = async (filters?: FilterState): Promise<Dataset[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  let results = [...mockDatasets];

  if (filters) {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filters.categories.length > 0) {
      results = results.filter((d) => filters.categories.includes(d.category));
    }
    if (filters.sourceTypes.length > 0) {
      results = results.filter((d) => filters.sourceTypes.includes(d.sourceType));
    }
    if (filters.regions.length > 0) {
      results = results.filter((d) => filters.regions.includes(d.region));
    }
  }

  return results;
};

export const getDatasetById = async (id: string): Promise<Dataset | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockDatasets.find((d) => d.id === id);
};

export const getFeaturedDatasets = async (): Promise<Dataset[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockDatasets.filter((d) => d.featured).slice(0, 4);
};

export const getRelatedDatasets = async (currentId: string, category: string): Promise<Dataset[]> => {
    // Simple mock logic: same category, excluding current
    return mockDatasets
        .filter(d => d.category === category && d.id !== currentId)
        .slice(0, 3);
};

// Exporting this function explicitly to fix the Import Error
export const triggerDownload = (dataset: Dataset) => {
  const format = dataset.format[0] || 'CSV';
  const extension = format.toLowerCase();
  const filename = `${dataset.title.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.${extension}`;
  
  let content = '';
  
  if (extension === 'json') {
      content = JSON.stringify(dataset, null, 2);
  } else {
      // Default to CSV-like structure for demo
      content = `Title,Category,Source,Region,DateUpdated\n"${dataset.title}","${dataset.category}","${dataset.source}","${dataset.region}","${dataset.dateUpdated}"`;
      if (dataset.sampleData) {
          content += `\n\nSample Data:\nLabel,Value\n` + dataset.sampleData.map(d => `${d.name},${d.value}`).join('\n');
      }
  }

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};