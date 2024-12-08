import React, { useState } from 'react';
import { Icons } from '../utils/icons';
import { sendEmail } from '../utils/email';
import type { EmailData } from '../utils/email';

interface ContactFormData extends EmailData {
  isSubmitting: boolean;
  error: string | null;
}

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    isSubmitting: false,
    error: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormData(prev => ({ ...prev, isSubmitting: true, error: null }));
    
    try {
      const success = await sendEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      if (success) {
        setIsSubmitted(true);
      } else {
        setFormData(prev => ({
          ...prev,
          error: 'Failed to send message. Please try again.',
        }));
      }
    } catch (error) {
      setFormData(prev => ({
        ...prev,
        error: 'An unexpected error occurred. Please try again.',
      }));
    } finally {
      setFormData(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
      error: null,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Get in touch with our moving experts. We're here to help with your relocation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Icons.Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+1-800-555-0123" className="hover:text-blue-600">
                          1-800-555-0123
                        </a>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Mon-Fri: 8am - 6pm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icons.MessageCircle className="w-6 h-6 text-teal-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@coastalbreeze.com" className="hover:text-teal-600">
                          info@coastalbreeze.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        24/7 email support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icons.HardDrive className="w-6 h-6 text-indigo-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Office</h3>
                      <p className="text-gray-600">
                        123 Moving Street<br />
                        Coastal City, ST 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-6 rounded-xl text-white">
                <h3 className="font-semibold mb-2">Emergency Moving?</h3>
                <p className="text-blue-50 mb-4">
                  Need urgent moving assistance? Our emergency team is available 24/7.
                </p>
                <a 
                  href="tel:+1-800-555-0123" 
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  <Icons.Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <Icons.MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formData.error && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                        {formData.error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                          disabled={formData.isSubmitting}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                          disabled={formData.isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          disabled={formData.isSubmitting}
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                          disabled={formData.isSubmitting}
                        >
                          <option value="">Select a subject...</option>
                          <option value="quote">Request a Quote</option>
                          <option value="schedule">Schedule a Move</option>
                          <option value="support">Customer Support</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        disabled={formData.isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formData.isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formData.isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Icons.Loader className="w-5 h-5 animate-spin mr-2" />
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}