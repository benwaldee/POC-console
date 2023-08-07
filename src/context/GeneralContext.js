
import React, { useContext, useRef, useState, useEffect } from 'react';

const GeneralContext = React.createContext();
export const useGeneralContext = () => useContext(GeneralContext)

export function GeneralProvider({ children }) {
    const generalRef = useRef();
    const [value, setValue] = useState();


    //used in loads to set correct load form
    const [clickedLoad, setClickedLoad] = useState(null);

    //grab all loads early
    const [loadArr, setLoadArr] = useState(null)


    useEffect(() => {
        setValue(generalRef.current);
    }, [])

    return (
        <>
            <GeneralContext.Provider value={{
                clickedLoad, setClickedLoad,
                loadArr, setLoadArr
            }}>
                {children}
            </GeneralContext.Provider>
            <div ref={generalRef} />
        </>
    );
}
