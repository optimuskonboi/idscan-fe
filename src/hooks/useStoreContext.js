import { useContext } from "react"
import { StoreContext } from "../store"


export const useStoreContext = () => {
    const [state, dispatch] = useContext(StoreContext)
    return [state, dispatch]
}