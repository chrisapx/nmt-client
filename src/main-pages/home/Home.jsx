import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import { PiMapPinDuotone } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import ProductCard from '../../client/components/ProductCard';
import { useListing } from '../../context/ListingContext';

const Home = () => {
    const [deliveryAddress, setDeliveryAddress] = useState();
    const { listing } = useListing();

    useEffect(() => {
        document.title = "Explore nalmart's collection of products";
    })

    return(
        <div className="h-full">
            <div className="sticky top-0 z-10 bg-white">
                <Header showMenuIcon />
                <section className="my-3">
                    <Search />
                </section>
            </div>
            <div className="px-3 overflow-auto">
                <section className="flex items-center gap-2 font-[500] text-sm my-5">
                    <PiMapPinDuotone />
                    <span>Deliver to {deliveryAddress || "Uganda"}</span>
                </section>
                <section>
                    <p className="font-bold">For you</p>
                    <div className="grid grid-cols-2 gap-2">
                        {listing.map((item, index) => (
                            <ProductCard key={index} item={item} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home;