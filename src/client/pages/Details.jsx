import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Header from '../../components/header/Header';
import { BsFillTagFill } from 'react-icons/bs';
import LoaderIcon from '../../global/LoaderIcon';
import { useListings } from '../../hooks/useListings';
import ProductCard from '../components/ProductCard';
import { Download, OpenInBrowser } from '@mui/icons-material';

const Details = () => {
  const observerRef = useRef();
  const { itemID } = useParams();
  const [pages, setPages] = useState({ page: 0, size: 10 });
  const { listings, loading, hasMore } = useListings(pages.page, pages.size);
  const [_loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    name: '',
    description: '',
    price: 0,
    stockCount: 0,
    photos: [],
    specifications: [],
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    console.log("Scroll to top triggered for itemID:", itemID);
  }, [item]);

  const handleAddToCart = (item) => {
    console.log('Add to cart');
  };

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}items/${itemID}`);
        const json = await response.json();
        setItem(json);
        console.log(json);
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemID]);

  useEffect(() => {
    if (item.name) {
      document.title = item.name;
    }
  }, [item]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPages((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <>
      <div className="h-[100vh] md:hidden">
        <div className="sticky top-0 py-2 z-50 bg-white px-3">
          <Header showBack showCart showMenuIcon showUser />
        </div>

        {!_loading && item?.photos?.length > 0 && (
          <Slider
            autoplay={item?.photos?.length > 1}
            arrows={item?.photos?.length > 1}
            infinite={item?.photos?.length > 1}
            slidesToShow={1}
            speed={500}
            slidesToScroll={1}
            autoplaySpeed={4000}
            className="mb-6 h-auto px-3"
          >
            {item?.photos?.map((image, index) => (
              <div key={index} className="h-auto w-full">
                <img
                  src={image?.url}
                  loading="lazy"
                  alt={item.name}
                  className="object-cover"
                />
              </div>
            ))}
          </Slider>
        )}

        {_loading && (
          <div className="flex justify-center my-4 px-3">
            <LoaderIcon />
          </div>
        )}

        <p className="text-3xl px-3 font-bold">UGX {item?.price?.toLocaleString()}</p>
        <p className="text-xs my-1 px-3 text-red-500 flex items-center gap-2">
          <span className="flex gap-2 border font-bold border-red-200 items-center justify-center px-2 bg-red-100">
            <BsFillTagFill /> Retail
          </span>
          {item?.stockCount} units available
        </p>
        <p className="text-sm font-bold py-3 px-3">{item?.name}</p>

        <section className="py-2 bg-white px-3">
          <p className="font-bold text-md py-2">Specifications</p>
          {item?.details?.map((spec, index) => (
            <div key={index} className="grid grid-cols-2 text-sm py-1">
              <p className="truncate">{spec.name}</p>
              <p className="truncate">{spec.value}</p>
            </div>
          ))}
        </section>

        <section className="py-2 bg-white px-3">
          <p className="font-bold text-md py-2">User manual / Guide</p>
          {!item?.userGuide?.url ? (
            <div className="flex gap-8">
              <a
                href={item?.coverPhoto?.url}
                download
                className="text-xs text-blue-700 flex items-center gap-2"
              >
                Download manual <Download />
              </a>
              <a
                href={item?.coverPhoto?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-700 flex items-center gap-2"
              >
                View manual <OpenInBrowser />
              </a>
            </div>
          ) : (
            <p className="text-xs text-gray-500">Not provided. Contact support for details</p>
          )}
        </section>

        <section className="py-2 bg-white px-3">
          <p className="font-bold text-md py-2">Description</p>
          {item?.description ? (
            <div dangerouslySetInnerHTML={{ __html: item?.description }} className="text-xs" />
          ) : (
            <div className="text-xs">No Description, Check the User manual</div>
          )}
        </section>

        <section className="mt-8 px-3 overflow-y-auto">
          <p className="font-bold mb-4">More to love</p>
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

          {!loading && hasMore && <div ref={observerRef} className="h-10"></div>}
        </section>

        <div className="sticky bottom-0 bg-white w-full shadow-2xl py-4 px-3 pb-16">
          <div
            className="select-none text-center bg-red-500 py-3 rounded-full text-white font-bold cursor-pointer"
            onClick={() => handleAddToCart(item)}
          >
            Add to cart
          </div>
        </div>
      </div>
      {/* Desktop view */}
      <section className=""></section>
    </>
  );
};

export default Details;