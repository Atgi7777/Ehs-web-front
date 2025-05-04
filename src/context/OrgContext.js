import React, { createContext, useContext, useState, useEffect } from 'react'

// Context үүсгэх
const OrgContext = createContext(undefined)

export const OrgProvider = ({ children }) => {
  const [organization, setOrganizationState] = useState(null)

  useEffect(() => {
    const storedOrg = localStorage.getItem('org_data')
    if (storedOrg) {
      setOrganizationState(JSON.parse(storedOrg))
    }
  }, [])

  const setOrganization = (org) => {
    setOrganizationState(org)
    localStorage.setItem('org_data', JSON.stringify(org))
  }

  const clearOrganization = () => {
    setOrganizationState(null)
    localStorage.removeItem('org_data')
  }

  return (
    <OrgContext.Provider value={{ organization, setOrganization, clearOrganization }}>
      {children}
    </OrgContext.Provider>
  )
}

export const useOrg = () => {
  const context = useContext(OrgContext)
  if (!context) {
    throw new Error('useOrg must be used within an OrgProvider')
  }
  return context
}
