import React, { useEffect, useState }  from 'react';
import apiClient from '../apiTransferData/apiClient';
import HotelOffer from '../interfaces/HotelOffer';

function HomePage() {

    const [offers, setOffers] = useState<HotelOffer[]>([]);


    useEffect(() => {
        const fetchOffers = async () => {
          try {
            const response = await apiClient.get('/hotels/findAllOffers');
            setOffers(response.data);
          } catch (error) {
            console.error('Error fetching hotel offers:', error);
          }
        };
    
        fetchOffers();
      }, []);

      return (
        <div>
          <h1>Hotel Offers</h1>
          <ul>
            {offers.map((offer, index) => (
              <li key={index}>{offer.OfferName}</li>
            ))}
          </ul>
        </div>
      );
};

export default HomePage;