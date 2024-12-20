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
    const [filteredOffers, setFilteredOffers] = useState<HotelOffer[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const navigate = useNavigate();

    // Decode the token and get the current userId
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
                setFilteredOffers(response.data); // Initialize filteredOffers
            } catch (error) {
                console.error('Error fetching hotel offers:', error);
            }
        };

        fetchOffers();
    }, []);

    // Mapper to get the name of the hotel
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

    const handleOperator = () => {
        navigate('/hotelPage');
    };

    // Filter offers based on the selected holiday dates
    const handleFilterOffers = () => {
        if (!startDate || !endDate) {
            setFilteredOffers(offers); // Reset filter if dates are empty
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const filtered = offers.filter((offer) => {
            const offerStartDate = new Date(offer.StartDate);
            const offerEndDate = new Date(offer.EndDate);
            return (
                (offerStartDate >= start && offerStartDate <= end) ||
                (offerEndDate >= start && offerEndDate <= end) ||
                (offerStartDate <= start && offerEndDate >= end)
            );
        });

        setFilteredOffers(filtered);
    };

    return (
        <div className='container-fluid'>
            <div className='headerDashboard'>
                {/*  infos about the current logged user */}
                {loggedUser && (
                    <div className="text" >
                        <p className='titleDashboard'>Hello back, {loggedUser.Name} ! </p>
                        <p className='subtitleDashboard'>Find exclusive journey offers in every corner of the world!</p>
                    </div>
                )}
            </div>

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

            {loggedUser && loggedUser.RoleID === 5 && (
                <div className="container text-centered" >
                    <button className='save-button' onClick={handleOperator}> Operate </button>
                </div>
            )}

            {loggedUser && loggedUser.RoleID !== 5 && (
                <div>
                    <h1 className='mt-5 mb-5'>Discover our offers</h1>

                    {/* date filter */}
                    <div className="date-filter mb-4">
                        <label htmlFor="startDate" className="me-2">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="endDate" className="me-2 ms-4">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button className="btn btn-primary ms-4" onClick={handleFilterOffers}>Filter</button>
                    </div>

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
                            {filteredOffers.map((offer, index) => (
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
