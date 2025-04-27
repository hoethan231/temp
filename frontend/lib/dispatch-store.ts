
import { create } from 'zustand'

interface DispatchStore {
  selectedHospitalId: string | null
  emergencyHospitalMap: Record<string, string> // emergencyId -> hospitalId
  setSelectedHospital: (emergencyId: string, hospitalId: string) => void
  updateEmergencyDescription: (emergencyId: string, description: string) => void
}

/**
 * Global client‑side store used to coordinate data across pages:
 *  – when a dispatcher selects a hospital on /hospital-capacity
 *    we remember it so that the incoming‑calls dashboard can
 *    include it in the message to responders.
 *  – it also lets the “Update Status” button overwrite the
 *    description of an emergency in place (quick edit).
 *
 * In a real app this would round‑trip to your backend or Firestore,
 * but for the prototype a Zustand store is plenty.
 */
export const useDispatchStore = create<DispatchStore>((set, get) => ({
  selectedHospitalId: null,
  emergencyHospitalMap: {},

  setSelectedHospital: (emId, hospId) =>
    set((state) => ({
      selectedHospitalId: hospId,
      emergencyHospitalMap: { ...state.emergencyHospitalMap, [emId]: hospId }
    })),

  updateEmergencyDescription: (emId, desc) => {
    // naive in‑memory update – you probably want to persist in DB
    // For demo purposes we just emit to console
    console.log('Updating description for', emId, desc)
  }
}))
