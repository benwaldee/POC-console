
import React, { useContext, useRef, useState, useEffect } from 'react';

const GeneralContext = React.createContext();
export const useGeneralContext = () => useContext(GeneralContext)

export function GeneralProvider({ children }) {
    const generalRef = useRef();
    const [value, setValue] = useState();

    const [clickedLoad, setClickedLoad] = useState(null);
    const [loadArr, setLoadArr] = useState(null)

    const [userArr, setUserArr] = useState(null)
    const [clickedUser, setClickedUser] = useState(null);

    const [clickedDelivery, setClickedDelivery] = useState(null);
    // const [deliveryArr, setDeliveryArr] = useState(null)


    useEffect(() => {
        setValue(generalRef.current);
    }, [])

    return (
        <>
            <GeneralContext.Provider value={{
                clickedLoad, setClickedLoad,
                loadArr, setLoadArr,
                userArr, setUserArr,
                clickedUser, setClickedUser,
                clickedDelivery, setClickedDelivery
                // deliveryArr, setDeliveryArr
            }}>
                {children}
            </GeneralContext.Provider>
            <div ref={generalRef} />
        </>
    );
}
