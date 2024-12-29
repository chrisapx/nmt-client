import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header/Header';
import { useListings } from '../../../hooks/useListings';

const Cart = () => {
    const navigate = useNavigate();
    const { listings } = useListings();

    const handleCheckoutCart = () => {
        // go to the checkout page
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