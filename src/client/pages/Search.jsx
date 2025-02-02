import React, { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { api_urls } from "../../components/utils/ResourceUrls";
import ProductCard from "../components/ProductCard";
import LoaderIcon from "../../global/LoaderIcon";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pages, setPages] = useState({ page: 0, count: 20 });
    const [searchHistory, setSearchHistory] = useState([]);
    const observerRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        setSearchHistory(history);
    }, []);

    useEffect(() => {
        const handleSearchItems = async () => {
            if (!searchTerm) return;

            setLoading(true);
            try {
                const response = await fetch(api_urls.items.search(searchTerm, pages.page, pages.count));
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        setSearchResults((prevResults) => [...prevResults, ...data]);
                        setHasMore(data.length === pages.count);
                    } else {
                        setHasMore(false);
                    }
                } else {
                    setHasMore(false);
                    throw new Error(await response.text());
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        handleSearchItems();
    }, [searchTerm, pages.page]);

    useEffect(() => {
        if (loading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPages((prev) => ({ ...prev, page: prev.page + 1 }));
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
            observer.disconnect();
        };
    }, [loading, hasMore]);

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        setSearchResults([]);
        setPages({ page: 0, count: 20 });
        setHasMore(true);
        updateSearchHistory(searchTerm);

        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const updateSearchHistory = (term) => {
        const oldHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        const newHistory = [...new Set([term, ...oldHistory])].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    };
    

    const handleHistoryClick = (term) => {
        setSearchTerm(term);
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem("searchHistory");
    };

    const removeSingleHistoryItem = (term) => {
        const newHistory = searchHistory.filter(item => item !== term);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    };

    return (
        <div className="px-3">
            <section className="my-3">
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <div className="flex text-black rounded-full bg-gray-200 py-2 items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            autoFocus
                            ref={inputRef}
                            onChange={handleInputChange}
                            className="flex w-[90%] mx-4 focus:outline-0 text-black text-md bg-gray-200"
                        />
                        <LuSearch size={18} className="mr-4 text-black" onClick={handleSearch} />
                    </div>
                </form>
            </section>

            { searchHistory.length > 0 && (
                <section className="mb-3">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Recent Searches</p>
                        <button 
                            className="text-gray-500 text-xs underline" 
                            onClick={clearSearchHistory}
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {searchHistory.map((term, index) => (
                            <div key={index} className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1 text-sm">
                                <button
                                    className="text-xs mr-2"
                                    onClick={() => handleHistoryClick(term)}
                                >
                                    {term}
                                </button>
                                <button
                                    className="flex items-center text-xs text-gray-400"
                                    onClick={() => removeSingleHistoryItem(term)}
                                >
                                    <i className="pi pi-times text-xs"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <p className="font-bold">Search results</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {searchResults.map((item, index) => (
                        <ProductCard key={item.id || index} item={item} />
                    ))}
                </div>
                {loading && <div className="flex justify-center my-4"><LoaderIcon /></div>}
                {!loading && hasMore && <div ref={observerRef} className="h-10"></div>}
            </section>
        </div>
    );
};

export default Search;