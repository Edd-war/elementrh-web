import { useContext } from "react";
import ElementRHContext from "./../contexts/ElementRHProvider"

const useElementRH = () => useContext(ElementRHContext);

export default useElementRH;