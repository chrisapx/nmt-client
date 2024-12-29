import { useNavigate } from 'react-router-dom';
import { LuSearch } from 'react-icons/lu';

const SearchBar = () => {
    const navigate = useNavigate();

    const handleFocus = () => {
        navigate('/search')
    }
    return(
        <div className=''>
            <div className='flex text-black rounded-full bg-gray-200 py-2 items-center'>
                <input placeholder='Search...' className='flex w-[90%] mx-4 text-black text-md bg-gray-200' style={{fontSize: 16}} onFocus={handleFocus}/>
                <LuSearch size={18} className='mr-4 text-black'/>
            </div>
        </div>
    )
}

export default SearchBar;