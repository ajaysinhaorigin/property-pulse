'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { PropertyModel } from '@/Shared/Models';
import { apiUrls } from '@/Shared/Tools';
import PropertySearchForm from '../PropertySearchForm/PropertySearchForm';
import Spinner from '../Spinner/Spinner';
import PropertyCard from '../PropertyCard/PropertyCard';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<PropertyModel[]>([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    fetchSearchResults();
  }, [location, propertyType]);

  const fetchSearchResults = async () => {
    try {
      const res = await fetch(`${apiUrls.searchProperties}?location=${location}&propertyType=${propertyType}`);

      if (res.status === 200) {
        const data = await res.json();
        setProperties(PropertyModel.deserializeList(data));
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm storedLocation={location as string} storedPropertyType={propertyType as string}  />
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
              <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
            </Link>
            <h1 className="text-2xl mb-4">Search Results</h1>
            {properties.length === 0 ? (
              <p>No search results found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property, i) => (
                  <PropertyCard key={i} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default SearchResults;
