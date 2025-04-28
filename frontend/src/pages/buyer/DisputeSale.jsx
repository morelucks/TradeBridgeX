import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiAlertTriangle, FiFileText } from 'react-icons/fi';

const DisputeSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDetails, setDisputeDetails] = useState('');
  const [evidence, setEvidence] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock purchase data - replace with API call
  const purchase = {
    id: id,
    commodity: 'Premium Wheat',
    seller: 'FarmCo',
    orderDate: '2023-06-15',
    disputeEligible: true
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setEvidence([...evidence, ...files]);
  };

  const handleRemoveFile = (index) => {
    setEvidence(evidence.filter((_, i) => i !== index));
  };

  const handleSubmitDispute = () => {
    setIsSubmitting(true);
    // In a real app, this would call your dispute API
    setTimeout(() => {
      alert('Dispute submitted successfully!');
      navigate('/buyer-dashboard/disputes');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-800 mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Order
          </button>
          <div className="flex items-start">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg mr-4">
              <FiAlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Open Dispute</h1>
              <p className="text-gray-600">
                Order #{purchase.id} • {purchase.commodity} • {purchase.orderDate}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h3 className="font-medium text-red-800">Before opening a dispute</h3>
              <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
                <li>Try to resolve the issue directly with the seller first</li>
                <li>Disputes should only be opened for valid reasons</li>
                <li>False disputes may result in account penalties</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for dispute <span className="text-red-500">*</span>
                </label>
                <select
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="not_delivered">Item not delivered</option>
                  <option value="wrong_item">Wrong item received</option>
                  <option value="quality_issue">Quality doesn't match description</option>
                  <option value="quantity_issue">Incorrect quantity</option>
                  <option value="other">Other issue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed explanation <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={disputeDetails}
                  onChange={(e) => setDisputeDetails(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Please describe the issue in detail..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supporting evidence
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none">
                        <span>Upload files</span>
                        <input 
                          type="file" 
                          multiple 
                          className="sr-only" 
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
                {evidence.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {evidence.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <FiFileText className="mr-2 text-gray-400" />
                          <span className="text-sm truncate max-w-xs">{file.name}</span>
                        </div>
                        <button 
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex justify-end space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitDispute}
              disabled={!disputeReason || !disputeDetails || isSubmitting}
              className={`px-4 py-2 rounded-lg text-white ${isSubmitting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Dispute'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeSale;