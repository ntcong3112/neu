// src/data/useDataMap.ts
import { useMemo } from 'react';
import DATA_MAP, { DataEntry } from 'src/store/data/dataMap';

export const useDataMap = (): Record<string, DataEntry> => useMemo(() => DATA_MAP, []);
