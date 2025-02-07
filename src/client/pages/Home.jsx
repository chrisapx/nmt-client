import { PiMapPinDuotone } from 'react-icons/pi';
import { useEffect, useState, useRef } from 'react';
import { useListings } from '../../hooks/useListings';
import Header from '../../components/header/Header';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoaderIcon from '../../global/LoaderIcon';
import { useCart } from '../../hooks/useCart';

const Home = () => {
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [pages, setPages] = useState({ page: 0, size: 10 });
  const { listings, loading, hasMore } = useListings(pages.page, pages.size);
  const { cart } = useCart();
  const _observerRef = useRef();

  useEffect(() => {
    document.title = "Explore nalmart's collection of products";
  }, []);

  useEffect(() => {
    if (loading) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting && hasMore) {
          console.log("Scroll more triggered")
          setPages((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      },
      { threshold: 0.5 }
    );
  
    if (_observerRef.current) observer.observe(_observerRef.current);
  
    return () => {
      if (_observerRef.current) observer.unobserve(_observerRef.current);
      observer.disconnect();
    };
  }, [loading, hasMore]);
  

  return (
    <>
      <div className="md:hidden px-3 h-[100vh] overflow-auto">
        <div className="sticky top-0 bg-white z-50 pb-[1px]">
          <Header showMenuIcon showUser showCart cartCount={cart?.cartItems?.length} />
          <section className="my-3">
            <SearchBar />
          </section>
        </div>
        <section className="flex items-center gap-2 font-[500] text-sm my-5">
          <PiMapPinDuotone />
          <span>Deliver to {deliveryAddress || 'Uganda'}</span>
        </section>
        <section>
          <p className="font-bold">For you</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {listings.map((item, index) => (
              <ProductCard key={item.id || index} item={item} />
            ))}
          </div>
          {loading && hasMore && (
            <div className="flex justify-center my-4">
              <LoaderIcon />
            </div>
          )}
          {!loading && hasMore && <div ref={_observerRef} className="h-10"></div>}
        </section>
      </div>

      {/* Desktop view */}
      <section className=''>
           
      </section>
    </>
  );
};

export default Home;