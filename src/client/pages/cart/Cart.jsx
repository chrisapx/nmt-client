import Header from '../../../components/header/Header';
import { useListings } from '../../../hooks/useListings';

const Cart = () => {
    const { listings } = useListings();

    const handleCheckoutCart = () => {
        
    }

    return(
        <>
            <div className='md:hidden px-3'>
                <div className='' >
                    <Header showBack />
                    {listings.toString()}
                </div>

            </div>
            
            {/* Desktop view */}
            <section className=''>
            
            </section>
        </>
    )
}

export default Cart;