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
  const [newOffer, setNewOffer] = useState<HotelOffers | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isAuthorizedOp, setIsAuthorizedOp] = useState<boolean>(false);
  const [permissionsLoaded, setPermissionsLoaded] = useState<boolean>(false);
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
    console.log('ROLE ID:',roleID);
    const fetchPermission = async () => {
      try {
        const response = await apiClient.get(`/users/getPermissionByRoleId/${roleID}`);
        setPermission(response.data) ;
        setPermissionsLoaded(true); // Indicate permissions are fully loaded

      } catch (error) {
        console.error('Error fetching logged-in user:', error);
        setPermissionsLoaded(true); // Indicate permissions are fully loaded
      }
    };
    fetchPermission();
  }, [loggedUser?.RoleID])

  useEffect(() => {
    if (permissionsLoaded) {
      if (loggedUser?.HotelID && (loggedUser?.RoleID===2 || loggedUser?.RoleID===1) ) {
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
    }
  }, [loggedUser, isAuthorized]);

  useEffect(() => {
    if (permissionsLoaded) {
      console.log('From use Permission',permissionsLoaded);
      console.log('From use Effect', isAuthorizedOp)
      if (loggedUser?.RoleID ===5 ) {
        const fetchOffersHotel = async () => {
          try {
            const response = await apiClient.get('/hotels/findAllOffers');
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
    }
  }, [loggedUser, isAuthorized]);

  const handleNewOfferChange = (field: string, value: string) => {
    setNewOffer((prev) => ({
      ...prev,
      [field]: value,
      HotelID: loggedUser?.HotelID || 0, // Ensure the HotelID is attached
    } as HotelOffers));
  };

  // Handle form submission to add a new offer
  const handleAddOffer = async () => {
    try {
      if (newOffer) {
        const response = await apiClient.post('/hotels/addOffer', {
          ...newOffer,
          StartDate: `${newOffer.StartDate} 00:00:00`, // Format for MySQL
          EndDate: `${newOffer.EndDate} 00:00:00`, // Format for MySQL
        });
        setHotelOffers((prev) => [...prev, response.data]); // Add new offer to the table
        setNewOffer(null); // Reset the new offer form
        alert('New offer added successfully!');
      }
    } catch (error) {
      console.error('Error adding new offer:', error);
      alert('Failed to add new offer.');
    }
  };

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
  if (isAuthorized === false && isAuthorizedOp ===false) {
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

      {/* Add New Offer Form */}
      <div className="new-offer-form">
        <h4>Add new offer</h4>
        <div>
          <input
            type="text"
            placeholder="Offer Name"
            value={newOffer?.OfferName || ''}
            onChange={(e) => handleNewOfferChange('OfferName', e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={newOffer?.Description || ''}
            onChange={(e) => handleNewOfferChange('Description', e.target.value)}
          />
          <input
            type="number"
            placeholder="Economy Price"
            value={newOffer?.PriceEconomy || ''}
            onChange={(e) => handleNewOfferChange('PriceEconomy', e.target.value)}
          />
          <input
            type="number"
            placeholder="Standard Price"
            value={newOffer?.PriceStandard || ''}
            onChange={(e) => handleNewOfferChange('PriceStandard', e.target.value)}
          />
          <input
            type="number"
            placeholder="Deluxe Price"
            value={newOffer?.PriceDeluxe || ''}
            onChange={(e) => handleNewOfferChange('PriceDeluxe', e.target.value)}
          />
          <input
            type="number"
            placeholder="Suite Price"
            value={newOffer?.PriceSuite || ''}
            onChange={(e) => handleNewOfferChange('PriceSuite', e.target.value)}
          />
          <input
            type="number"
            placeholder="Luxury Price"
            value={newOffer?.PriceLuxury || ''}
            onChange={(e) => handleNewOfferChange('PriceLuxury', e.target.value)}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newOffer?.StartDate || ''}
            onChange={(e) => handleNewOfferChange('StartDate', e.target.value)}
          />
          <input
            type="date"
            placeholder="End Date"
            value={newOffer?.EndDate || ''}
            onChange={(e) => handleNewOfferChange('EndDate', e.target.value)}
          />
          <button className='save-button' onClick={handleAddOffer}>Add Offer</button>
        </div>
      </div>

      
      <div className="table-container">
      <h4>Edit or Delete existing offers</h4>
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
