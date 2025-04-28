import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiImage, FiDollarSign, FiPackage, FiCheck } from 'react-icons/fi';

const CreateCommodity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'agriculture',
    price: '',
    quantity: '',
    description: '',
    image: null,
    certification: '',
    deliveryOptions: []
  });

  const categories = [
    { value: 'agriculture', label: 'Agricultural' },
    { value: 'minerals', label: 'Minerals' },
    { value: 'energy', label: 'Energy' },
    { value: 'metals', label: 'Metals' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleDeliveryOption = (option) => {
    setFormData(prev => {
      const options = prev.deliveryOptions.includes(option)
        ? prev.deliveryOptions.filter(o => o !== option)
        : [...prev.deliveryOptions, option];
      return { ...prev, deliveryOptions: options };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Commodity submitted:', formData);
    navigate('/seller-dashboard/my-commodities');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiPackage className="mr-2 text-emerald-600" />
        Add New Commodity
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commodity Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Commodity Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none">
                  <span>Upload an image</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
          <input
            type="text"
            name="certification"
            value={formData.certification}
            onChange={handleChange}
            placeholder="e.g. Organic, Fair Trade, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Options</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {['Standard Shipping', 'Express Delivery', 'Local Pickup'].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => handleDeliveryOption(option)}
                className={`flex items-center justify-center p-3 border rounded-lg ${formData.deliveryOptions.includes(option) ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                {formData.deliveryOptions.includes(option) && (
                  <FiCheck className="mr-2 text-emerald-500" />
                )}
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/seller-dashboard')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
          >
            <FiUpload className="mr-2" />
            List Commodity
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCommodity;