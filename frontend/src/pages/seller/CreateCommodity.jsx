import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiImage, FiDollarSign, FiPackage, FiCheck, FiMapPin } from 'react-icons/fi';
import { useAddCommodity } from '../../hooks/useAddCommodity';
import axios from 'axios';

const CreateCommodity = () => {
  const navigate = useNavigate();
  const { addCommodity, isPending, isSuccess, error, uploadStatus } = useAddCommodity();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'agriculture',
    price: '',
    quantity: '',
    description: '',
    imageURL: '',
    certification: '',
    deliveryOptions: [],
    quantityMeasurement: 'unit',
    location: '',
  });

  const categories = [
    { value: 'agriculture', label: 'Agricultural' },
    { value: 'minerals', label: 'Minerals' },
    { value: 'energy', label: 'Energy' },
    { value: 'metals', label: 'Metals' },
  ];

  useEffect(() => {
    if (isSuccess) {
      navigate('/seller-dashboard/my-commodities');
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create a preview URL for the image
      const objectURL = URL.createObjectURL(file);
      setPreviewURL(objectURL);
      
      // Clear the imageURL field since we're using a file upload
      setFormData(prev => ({ ...prev, imageURL: '' }));
    }
  };

  const handleDeliveryOption = (option) => {
    setFormData(prev => ({
      ...prev,
      deliveryOptions: prev.deliveryOptions.includes(option)
        ? prev.deliveryOptions.filter(o => o !== option)
        : [...prev.deliveryOptions, option]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isNaN(Number(formData.price)) || isNaN(Number(formData.quantity))) {
      alert('Please enter valid numbers for price and quantity');
      return;
    }

    const fullDescription = `${formData.description}\nCategory: ${formData.category}\nCertification: ${formData.certification}\nDelivery Options: ${formData.deliveryOptions.join(', ')}`;

    await addCommodity(
      formData.name,
      fullDescription,
      formData.quantity,
      formData.quantityMeasurement,
      formData.price,
      selectedFile, 
      formData.imageURL || 'https://example.com/placeholder.jpg', 
      formData.location || 'Unknown'
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiPackage className="mr-2 text-emerald-600" />
        Add New Commodity
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commodity Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Unit ($)*
            </label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Quantity*
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          {/* Measurement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity Measurement*
            </label>
            <input
              type="text"
              name="quantityMeasurement"
              value={formData.quantityMeasurement}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g., kg, liters"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location*
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., New York, USA"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commodity Image
          </label>
          <div className="border border-gray-300 rounded-lg p-4">
            {/* File Input */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            
            {/* Preview Image */}
            {previewURL && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
                <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={previewURL} 
                    alt="Preview" 
                    className="object-contain w-full h-full" 
                  />
                </div>
              </div>
            )}
            
            {/* OR Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            
            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="flex items-center px-4 py-2 border border-gray-300 rounded-lg">
                <FiImage className="mr-2 text-gray-400" />
                <input
                  type="url"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full focus:outline-none"
                  disabled={!!selectedFile}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {selectedFile ? "URL input disabled when file is selected" : "Provide a URL to the commodity image"}
              </p>
            </div>
          </div>
        </div>

        {/* Certification */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certification
          </label>
          <input
            type="text"
            name="certification"
            value={formData.certification}
            onChange={handleChange}
            placeholder="e.g., Organic, Fair Trade"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Delivery Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Options
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {['Standard Shipping', 'Express Delivery', 'Local Pickup'].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => handleDeliveryOption(option)}
                className={`flex items-center justify-center p-3 border rounded-lg ${
                  formData.deliveryOptions.includes(option)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {formData.deliveryOptions.includes(option) && (
                  <FiCheck className="mr-2 text-emerald-500" />
                )}
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
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
            disabled={isPending}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FiUpload className="mr-2" />
            {isPending ? 'Listing...' : 'List Commodity'}
          </button>
        </div>

        {/* Status Messages */}
        {uploadStatus && (
          <div className="mt-4 p-3 bg-blue-50 text-blue-600 rounded-lg">
            {uploadStatus}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
            Error: {error.message || 'Failed to list commodity'}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCommodity;