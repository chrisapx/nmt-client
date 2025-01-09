// import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// const ListingContext = createContext();

// export function useListing() {
//   return useContext(ListingContext);
// }

// export function ListingProvider({ children }) {
//     const [listing, setListing] = useState([]);

//     const fetchItems = () => {
//         // fetch('http://127.0.0.1:8080/items')
//         fetch(import.meta.env.VITE_API_URL + 'items')
//             .then((response) => response.json())
//             .then((res) => setListing(res))
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     const addToSearchHistory = (keyword) => {
//         let existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
//         existingHistory = [keyword, ...existingHistory.slice(0, 9)];
//         localStorage.setItem('searchHistory', JSON.stringify(existingHistory));
//     };
    

//     const getSearchHistory = () => {
//         const history = localStorage.getItem('searchHistory');
//         return JSON.parse(history) || [];
//     };
    
//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const clearListing = () => {
//         setListing([]);
//     };

//     const contextValue = useMemo(() => ({
//         listing,
//         clearListing,
//         addToSearchHistory,
//         getSearchHistory,
//     }), [listing]);

//     return (
//         <ListingContext.Provider value={contextValue}>
//             {children}
//         </ListingContext.Provider>
//     );
// }
