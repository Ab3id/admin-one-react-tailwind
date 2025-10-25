"use client"

import React, { useState, useEffect } from "react";
import SectionMain from "../../_components/Section/Main";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import axiosClient from "../../_lib/axiosClient";

interface SenderName {
  id: string;
  senderName: string;
  approved: boolean;
}

interface SMSFormValues {
  senderName: string;
  message: string;
  recipients: string[];
}

const QuicksmsPage = () => {
  const [senderNames, setSenderNames] = useState<SenderName[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showDialog = (type: 'success' | 'error', title: string, message: string) => {
    setDialog({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const closeDialog = () => {
    setDialog(prev => ({ ...prev, isOpen: false }));
  };

  // Fetch approved sender names
  useEffect(() => {
    const fetchSenderNames = async () => {
      try {
        const response = await axiosClient.get<SenderName[]>('/user/fetch-sender-names');
        const approvedSenders = response.data.filter(sender => sender.approved);
        setSenderNames(approvedSenders);
      } catch (error) {
        console.error('Failed to fetch sender names:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSenderNames();
  }, []);

  // Calculate SMS segments and character count
  const calculateSMSInfo = (text: string) => {
    const length = text.length;
    const singleSMSLimit = 160;
    const multiSMSLimit = 153;
    
    let segments = 1;
    if (length > singleSMSLimit) {
      segments = Math.ceil(length / multiSMSLimit);
    }
    
    return { length, segments };
  };

  const validationSchema = Yup.object({
    senderName: Yup.string().required('Please select a sender name'),
    message: Yup.string()
      .min(1, 'Message is required')
      .max(1530, 'Message is too long (max 10 SMS segments)')
      .required('Message is required'),
    recipients: Yup.array()
      .of(Yup.string().matches(/^\+?[1-9]\d{8,14}$/, 'Invalid phone number format'))
      .min(1, 'At least one recipient is required')
      .required('Recipients are required'),
  });

  const initialValues: SMSFormValues = {
    senderName: '',
    message: '',
    recipients: [''],
  };

  const handleSubmit = async (values: SMSFormValues, { resetForm }: { resetForm: () => void }) => {
    setIsSubmitting(true);
    try {
      const payload = {
        senderId: values.senderName,
        message: values.message,
        recipients: values.recipients.filter(recipient => recipient.trim() !== ''),
      };

      await axiosClient.post('/user/send-message', payload);

      console.log('Payload sent:', payload);
      
      // Show success message
      showDialog('success', 'Success!', 'SMS sent successfully');
      resetForm();
    } catch (error: unknown) {
      console.error('Failed to send SMS:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to send SMS. Please try again.';
      showDialog('error', 'Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionMain>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              Quick SMS
            </h1>
            <p className="text-gray-400">
              Send instant SMS messages to your customers in Tanzania
            </p>
          </div>

          {/* SMS Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="p-8">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched }) => (
                    <Form className="space-y-8">
                      {/* Sender Name Selection */}
                      <div>
                        <label htmlFor="senderName" className="block text-sm font-medium text-gray-300 mb-3">
                          From (Sender Name) <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            name="senderName"
                            id="senderName"
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none"
                          >
                            <option value="" className="bg-slate-800 text-gray-300">
                              Select approved sender name...
                            </option>
                            {senderNames.map((sender) => (
                              <option key={sender.id} value={sender.id} className="bg-slate-800 text-white">
                                {sender.senderName}
                              </option>
                            ))}
                          </Field>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.senderName && touched.senderName && (
                          <div className="text-xs text-red-400 mt-2">{errors.senderName}</div>
                        )}
                        {senderNames.length === 0 && (
                          <p className="text-xs text-yellow-400 mt-2">
                            No approved sender names found. Please register and get approval for a sender name first.
                          </p>
                        )}
                      </div>

                      {/* Message Input */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                          Message <span className="text-red-400">*</span>
                        </label>
                        <Field
                          as="textarea"
                          name="message"
                          id="message"
                          rows={5}
                          placeholder="Type your SMS message here..."
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                        />
                        
                        {/* Character Counter */}
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-xs text-gray-500">
                            {(() => {
                              const { length, segments } = calculateSMSInfo(values.message);
                              return (
                                <>
                                  <span className={length > 1530 ? 'text-red-400' : 'text-gray-400'}>
                                    {length} characters
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span className={segments > 10 ? 'text-red-400' : segments > 5 ? 'text-yellow-400' : 'text-blue-400'}>
                                    {segments} SMS segment{segments !== 1 ? 's' : ''}
                                  </span>
                                </>
                              );
                            })()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Max: 10 segments (1,530 chars)
                          </div>
                        </div>
                        
                        {errors.message && touched.message && (
                          <div className="text-xs text-red-400 mt-2">{errors.message}</div>
                        )}
                      </div>

                      {/* Recipients */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Recipients <span className="text-red-400">*</span>
                        </label>
                        <FieldArray name="recipients">
                          {({ push, remove }) => (
                            <div className="space-y-3">
                              {values.recipients.map((recipient, index) => (
                                <div key={index} className="flex gap-3">
                                  <div className="flex-1">
                                    <Field
                                      name={`recipients.${index}`}
                                      placeholder={`+255123456789 (Recipient ${index + 1})`}
                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    />
                                  </div>
                                  
                                  {values.recipients.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all duration-200"
                                      title="Remove recipient"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              ))}
                              
                              <button
                                type="button"
                                onClick={() => push('')}
                                className="w-full py-3 border-2 border-dashed border-white/20 text-gray-400 rounded-xl hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Another Recipient
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        
                        {errors.recipients && typeof errors.recipients === 'string' && (
                          <div className="text-xs text-red-400 mt-2">{errors.recipients}</div>
                        )}
                        
                        <p className="text-xs text-gray-500 mt-2">
                          Enter phone numbers in international format (e.g., +255123456789)
                        </p>
                      </div>

                      {/* Submit Button */}
                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || senderNames.length === 0}
                          className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending SMS...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                              Send SMS
                            </>
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog Component */}
      {dialog.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              {dialog.type === 'success' ? (
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{dialog.title}</h3>
            </div>
            <p className="text-gray-300 mb-6">{dialog.message}</p>
            <div className="flex justify-end">
              <button
                onClick={closeDialog}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionMain>
  );
};

export default QuicksmsPage;