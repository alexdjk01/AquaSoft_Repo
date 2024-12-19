import React, { useEffect, useState } from 'react';
import apiClient from '../apiTransferData/apiClient';
import UserDashboard from '../interfaces/UserDashboard';
import HotelOffer from '../interfaces/HotelOffer';
import { jwtDecode } from 'jwt-decode';
import '../css/Dashboard.css'; 
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
    const [loggedUser, setLoggedUser] = useState<UserDashboard | null>(null);
    const [availableLinks, setAvailableLinks] = useState<string[]>([]); 
    const [offers, setOffers] = useState<HotelOffer[]>([]);
    const [hotelMap, setHotelMap] = useState<{ [key: number]: string }>({});

    const navigate = useNavigate();

    // decode the token and get the current userId
    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decodedToken: any = jwtDecode(jwtToken);
            const userId = decodedToken?.userId;
            console.log(userId);

            const fetchLoggedUser = async () => {
                try {
                    const response = await apiClient.get(`/users/findById/${userId}`);
                    console.log(response);
                    setLoggedUser(response.data);
                    if (response.data.RoleID === 1) {
                        const linksResponse = await apiClient.get(`/users/getLink/${userId}`);
                        console.log(linksResponse);
                        setAvailableLinks(linksResponse.data.map((link: { LinkURL: string }) => link.LinkURL));
                    }
                } catch (error) {
                    console.error('Error fetching logged-in user:', error);
                }
            };

            fetchLoggedUser();
        }
    }, []);

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

    //mapper to get also the name of the hotel
    useEffect(() => {
        const fetchHotels = async () => {
          try {
            const response = await apiClient.get('/hotels'); // Endpoint to get all hotels
            const hotels = response.data;
            const mapping = hotels.reduce((map: { [key: number]: string }, hotel: any) => {
              map[hotel.HotelID] = hotel.HotelName;
              return map;
            }, {});
            setHotelMap(mapping);
          } catch (error) {
            console.error('Error fetching hotels:', error);
          }
    };
      
        fetchHotels();
      }, []);

    const formatDateToMySQL = (dateString: string): string => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear(); 
        return `${day}-${month}-${year}`; 
    };

    const handleOperator = () =>{
        navigate('/hotelPage');
    }


    return (

        <div className='container-fluid'>

            {loggedUser && loggedUser.RoleID === 1 && (
                <div className="available-links">
                    <p>Available Links for Hotel Manager:</p>
                    <ul>
                        {availableLinks.length > 0 ? (
                            availableLinks.map((link, index) => (
                                <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                            ))
                        ) : (
                            <p>No links available at the moment.</p>
                        )}
                    </ul>
                </div>
            )}

            <div className='headerDashboard'>
                {/* get infos about the current logged user */}
                {loggedUser && (
                    <div className="container text-centered" >
                        <p className='titleDashboard'>Hello back, {loggedUser.Name} ! </p>
                        <p className='subtitleDashboard'>Find exclusive journey offers in every corner of the world!</p>
                    </div>
                )}
            </div>

            {loggedUser && loggedUser.RoleID === 5 &&(
                    <div className="container text-centered" >
                        <button className='save-button' onClick={handleOperator}> Operate </button>
                    </div>
                )}

            {loggedUser && loggedUser.RoleID !== 5 && (
            <div>
                <h1 className='mt-5 mb-5'>Discover our offers</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Offer Name</th>
                            <th>Hotel Name</th>
                            <th>Description</th>
                            <th>Economy</th>
                            <th>Standard</th>
                            <th>Suite</th>
                            <th>Delux</th>
                            <th>StartDate</th>
                            <th>EndDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{offer.OfferName}</td>
                                <td>{hotelMap[offer.HotelID] || 'Unknown Hotel'}</td>
                                <td>{offer.Description}</td>
                                <td>{offer.PriceEconomy}</td>
                                <td>{offer.PriceStandard}</td>
                                <td>{offer.PriceSuite}</td>
                                <td>{offer.PriceLuxury}</td>
                                <td>{formatDateToMySQL(offer.StartDate)}</td>
                                <td>{formatDateToMySQL(offer.EndDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
}
