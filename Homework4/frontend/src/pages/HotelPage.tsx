import React, { useEffect, useState } from 'react';
import apiClient from '../apiTransferData/apiClient';
import UserDashboard from '../interfaces/UserDashboard';
import HotelOffers from '../interfaces/HotelOffer';
import Permission from '../interfaces/Permission';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../css/HotelPage.css';

export default function HotelPage() {
  const [loggedUser, setLoggedUser] = useState<UserDashboard | null>(null);
  const [hotelOffers, setHotelOffers] = useState<HotelOffers[]>([]);
  const [editedOffers, setEditedOffers] = useState<HotelOffers[]>([]); // to store the edited offers
  const [permission,setPermission] = useState<Permission | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const navigate = useNavigate();

  // decode the token and see infos about the current user that is logged into the page
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
        } catch (error) {
          console.error('Error fetching logged-in user:', error);
        }
      };

      fetchLoggedUser();
    }
  }, []);

  //check if the user has the rights to access this page
  useEffect( () => {
    const roleID:number|undefined = loggedUser?.RoleID;
    const fetchPermission = async () => {
      try {
        const response = await apiClient.get(`/users/getPermissionByRoleId/${roleID}`);
        setPermission(response.data) ;

        // Check authorization
        const isManager:boolean = roleID === 2 ||roleID === 1; //Group manager  |  Hotel Manager
        const hasReadPermission = response.data?.ReadPermission;

        if (isManager && hasReadPermission) {
          setIsAuthorized(true); // Allow access
        } else {
          setIsAuthorized(false); // Deny access
        }

      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };
    fetchPermission();
  })

  useEffect(() => {
    if (loggedUser?.HotelID && isAuthorized ) {
      const fetchOffersHotel = async () => {
        try {
          const response = await apiClient.get(`/hotels/getOffersHotelById/${loggedUser.HotelID}`);
          const formattedOffers = response.data.map((offer: HotelOffers) => ({
            ...offer,
            StartDate: offer.StartDate.split('T')[0], // convert to YYYY-MM-DD
            EndDate: offer.EndDate.split('T')[0], // convert to YYYY-MM-DD
          }));
          setHotelOffers(formattedOffers);
        } catch (error) {
          console.error('Error fetching hotel offers:', error);
        }
      };

      fetchOffersHotel();
    }
  }, [loggedUser, isAuthorized]);

  // method that keeps track of the edits in the table and the original array of offers
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedOffers = hotelOffers.map((offer) =>
      offer.OfferID === id ? { ...offer, [field]: value } : offer
    );
    setHotelOffers(updatedOffers);

    const updatedEditedOffers = [...editedOffers];
    const existingIndex = updatedEditedOffers.findIndex((offer) => offer.OfferID === id);

    if (existingIndex > -1) {
      updatedEditedOffers[existingIndex] = {
        ...updatedEditedOffers[existingIndex],
        [field]: value,
      };
    } else {
      const updatedOffer = updatedOffers.find((offer) => offer.OfferID === id);
      if (updatedOffer) updatedEditedOffers.push(updatedOffer);
    }

    setEditedOffers(updatedEditedOffers);
  };

  // Convert date back to MySQL format
  const formatDateToMySQL = (date: string): string => {
    return `${date} 00:00:00`;
  };

  // save all the edited offers in the database
  const handleSaveChanges = async () => {
    try {
      const formattedEditedOffers = editedOffers.map((offer) => ({
        ...offer,
        StartDate: formatDateToMySQL(offer.StartDate), // convert to MySQL format
        EndDate: formatDateToMySQL(offer.EndDate), // convert to MySQL format
      }));

      await Promise.all(
        formattedEditedOffers.map((offer) =>
          apiClient.put(`/hotels/updateOffer/${offer.OfferID}`, offer)
        )
      );
      alert('Changes saved successfully!');
      setEditedOffers([]); // clear the edited offers list after saving the edits
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes.');
    }
  };

  // delete one offer
  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/hotels/deleteOfferById/${id}`);
      setHotelOffers((prevOffers) => prevOffers.filter((offer) => offer.OfferID !== id));
      alert('Offer deleted successfully!');
    } catch (error) {
      console.error('Error deleting offer:', error);
      alert('Failed to delete offer.');
    }
  };

  // render this if the authorisation fails
  if (!isAuthorized) {
    return (
      <div className="unauthorized-container">
        <h1>You are not allowed to visit this page.</h1>
        <button onClick={() => navigate('/dashboard')} className="go-back-button">
          Turn Back
        </button>
      </div>
    );
  }

  return (
    <div className="hotel-page-container">
      <h1 className="hotel-page-title">Hotel Offers</h1>


      <div className="table-container">
        <table className="hotel-table">
          <thead>
            <tr>
              <th>Offer Name</th>
              <th>Description</th>
              <th>Economy Price</th>
              <th>Standard Price</th>
              <th>Deluxe Price</th>
              <th>Suite Price</th>
              <th>Luxury Price</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotelOffers.map((offer) => (
              <tr key={offer.OfferID}>
                <td>
                  <input
                    type="text"
                    value={offer.OfferName}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'OfferName', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={offer.Description}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'Description', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={offer.PriceEconomy}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'PriceEconomy', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={offer.PriceStandard}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'PriceStandard', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={offer.PriceDeluxe}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'PriceDeluxe', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={offer.PriceSuite}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'PriceSuite', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={offer.PriceLuxury}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'PriceLuxury', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={offer.StartDate}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'StartDate', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={offer.EndDate}
                    onChange={(e) =>
                      handleInputChange(offer.OfferID, 'EndDate', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(offer.OfferID)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleSaveChanges} className="save-button">
        Save Changes
      </button>
    </div>
  );
}
