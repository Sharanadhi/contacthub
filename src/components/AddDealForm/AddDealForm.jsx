import { useState, useEffect } from "react";
import axiosInstance from '../../utils/axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCircleExclamation } from "react-icons/fa6";

function AddDealForm({  setDeals, contact_id }) {
  const [dealForm, setDealForm] = useState({
    title: '',
    status: '',
    product: '',
    amount: '',
    description: '',
    contact_id: contact_id
  });

  const [dealErrors, setDealErrors] = useState({});
  const [dealApiError, setDealApiError] = useState("");

  const dealValidation = () => {
    const newErrors = {};
    if (!dealForm.title) newErrors.title = "Please enter deal title";
    if (!dealForm.product) newErrors.product = "Please enter deal product";
    if (!dealForm.status) newErrors.status = "Please select deal status";
    if (!dealForm.amount) newErrors.amount = "Please enter deal amount";
    if (!dealForm.description) newErrors.description = "Please enter deal description";
    return newErrors;
  };

  const handleDealFormChange = (e) => {
    const name = e.target.name.replace('deal_', '').trim();
    setDealForm({ ...dealForm, [name]: e.target.value });
  };

  const fetchDeals = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axiosInstance.get(`contacts/deals/${contact_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setDeals(response.data);
    } catch (error) {
      console.error("An error occurred while fetching deals", error);
    }
  };

  const addDeal = async (e) => {
    e.preventDefault();
    setDealApiError('');
    const token = localStorage.getItem('token');
    const validationErrors = dealValidation();
    if (Object.keys(validationErrors).length > 0) {
      setDealErrors(validationErrors);
      return;
    }
    try {
      const response = await axiosInstance.post(`deals`, dealForm, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (response.data && response.status === 201) {
        setDealForm({
          title: "",
          product: "",
          amount: "",
          status: "",
          description: "",
          contact_id: contact_id
        });
        setDealErrors({});
        toast.success("Deal added successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          progress: undefined,
        });
        fetchDeals(); // Fetch the updated list of deals
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setDealApiError(error.response.data.error);
      } else {
        setDealApiError("An error occurred during creating the deal. Please try again later");
      }
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return (
    <form className="deals-section__form" onSubmit={addDeal}>
      <div className="">
        <div className="input__group">
          <label htmlFor="deal_title">Title</label>
          <input
            type="text"
            name="deal_title"
            placeholder="Title"
            className=""
            onChange={handleDealFormChange}
            value={dealForm.title}
          />
          {dealErrors.title && <span className="error-message"><FaCircleExclamation /> {dealErrors.title}</span>}
        </div>
        <div className="input__group">
          <label htmlFor="deal_status">Status</label>
          <select name="deal_status" className="select" onChange={handleDealFormChange} value={dealForm.status}>
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Deal Won">Deal Won</option>
            <option value="Deal Lost">Deal Lost</option>
          </select>
          {dealErrors.status && <span className="error-message"><FaCircleExclamation /> {dealErrors.status}</span>}
        </div>
      </div>
      <div className="form__half">
        <div className="input__group">
          <label htmlFor="deal_product">Product</label>
          <input
            type="text"
            name="deal_product"
            placeholder="Product"
            className=""
            onChange={handleDealFormChange}
            value={dealForm.product}
          />
          {dealErrors.product && <span className="error-message"><FaCircleExclamation /> {dealErrors.product}</span>}
        </div>
        <div className="input__group">
          <label htmlFor="deal_amount">Amount $</label>
          <input
            type="number"
            name="deal_amount"
            placeholder="Amount"
            className=""
            onChange={handleDealFormChange}
            value={dealForm.amount}
          />
          {dealErrors.amount && <span className="error-message"><FaCircleExclamation /> {dealErrors.amount}</span>}
        </div>
      </div>
      <div className="input__group">
        <label htmlFor="deal_description">Description</label>
        <textarea
          name="deal_description"
          placeholder="Description"
          className=""
          onChange={handleDealFormChange}
          value={dealForm.description}
        ></textarea>
        {dealErrors.description && <span className="error-message"><FaCircleExclamation /> {dealErrors.description}</span>}
        {dealApiError && <span className="error-message">{dealApiError}</span>}
      </div>
      <div className="btn__group">
        <button type="submit" className="primary__btn">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddDealForm;
