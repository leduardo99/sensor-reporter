import React, { useContext, createContext, useState } from 'react'

interface RegionContextData {
  region: string
  changeRegion(region: string): void
}

const RegionContext = createContext({} as RegionContextData)

export const RegionsProvider: React.FC = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('north')

  function changeRegion(region: string) {
    setSelectedRegion(region)
  }

  return (
    <RegionContext.Provider value={{ region: selectedRegion, changeRegion }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion(): RegionContextData {
  return useContext(RegionContext)
}
