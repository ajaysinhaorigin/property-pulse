/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from 'react-geocode';
// import Spinner from './Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from '../Spinner/Spinner';

interface Props{
    property: any
}

const PropertyMap = ({ property }:Props) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

//   setDefaults({
//     key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
//     language: 'en',
//     region: 'us',
//   });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        //  Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner />;

  // Handle case where geocoding failed
  if (geocodeError) {
    return <div className='text-xl'>No location data found</div>;
  }

  return (
    !loading && (
<></>
    )
  );
};
export default PropertyMap;
