"use client"

import { useEffect, useState } from "react";
import SectionMain from "../../_components/Section/Main";
import CircularLoader from "../../_components/CircularLoader";
import axiosClient from "../../_lib/axiosClient";
import TableSenderNames from "../_components/Table/SenderNames";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';



export interface SenderName {
    senderName: string,
    sampleContents: string,
    approved: boolean,
    suspended: boolean,
    applicationLetter: string,
    id: string,
    createdDate: string
  }

  type SenderNameForm = {
    senderName: string;
    sampleContent: string;
    useCase: string;
  };


  export default function SenderNames() {
    const [isLoading, setIsLoading] = useState(false)
    const [senderNames, setSenderNames] = useState<SenderName[]>([])
    const [error, setError] = useState<string | null>(null);
    const [addSenderNameDialogOpen, setAddSenderNameDialogOpen] = useState(false)
    const [formError, setFormError] = useState<string>("")
    const [formLoading, setIsFormLoading] = useState(false)
    const [senderNameFormResponse, setSenderNameFormResponse] = useState("")
    const [editingSenderName, setEditingSenderName] = useState<SenderName | null>(null)
    const [isEditMode, setIsEditMode] = useState(false)
    useEffect(()=>{
        const fetchSenderNames = async () => {
           try {
            const response = await axiosClient.get<SenderName[]>('/user/fetch-sender-names')
            setSenderNames(response.data)
           } catch (error) {
            setError(error)
            console.error(error)
           }finally{
            setIsLoading(false)
           } 
        }

        fetchSenderNames()
    },[senderNameFormResponse])
    const handleSubmit = async (formValues: SenderNameForm) => {
        try {
            setIsFormLoading(true)
            let senderNameResponse;
            
            if (isEditMode && editingSenderName) {
                // Edit existing sender name
                senderNameResponse = await axiosClient.post('/user/create-sender-name', {
                    "id": editingSenderName.id,
                    "sender_name": formValues.senderName,
                    "sample_contents": formValues.sampleContent,
                    "use_case": formValues.useCase,
                })
            } else {
                // Create new sender name
                senderNameResponse = await axiosClient.post('/user/create-sender-name', {
                    "sender_name": formValues.senderName,
                    "sample_contents": formValues.sampleContent,
                    "use_case": formValues.useCase,
                })
            }
            
            setSenderNameFormResponse(senderNameResponse.data)
            handleCloseModal()
        }catch (error) {
            setFormError(error?.response?.data?.message)
            console.error(error)
        }finally{
            setIsFormLoading(false)
        }
    }
    const handleCloseModal = () => {
        setAddSenderNameDialogOpen(false)
        setIsEditMode(false)
        setEditingSenderName(null)
        setFormError("")
    };

    const handleEditSenderName = (senderName: SenderName) => {
        setEditingSenderName(senderName)
        setIsEditMode(true)
        setAddSenderNameDialogOpen(true)
        setFormError("")
    };

    const handleAddSenderName = () => {
        setEditingSenderName(null)
        setIsEditMode(false)
        setAddSenderNameDialogOpen(true)
        setFormError("")
    };
    console.log(error)
    const formValidationSchema = Yup.object().shape({
        senderName: Yup.string()
          .max(11, 'Must be at most 11 characters')
          .matches(/^[a-zA-Z0-9-]*$/, 'Only letters, numbers, and hyphen (-) are allowed')
          .required('This field is required'),
        sampleContent: Yup.string()
            .required(
                'This field is required'
            )  
      });

    const initialValues: SenderNameForm = {
        senderName: isEditMode && editingSenderName ? editingSenderName.senderName : "",
        useCase: "transactional",
        sampleContent: isEditMode && editingSenderName ? editingSenderName.sampleContents : "",
    };
    return (
      <SectionMain>
        <div className="min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            {/* Modal with Modern Styling */}
            {addSenderNameDialogOpen && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isEditMode ? "Edit Sender Name" : "Add Sender Name"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Formik
                validationSchema={formValidationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values }) => (
                  <Form className="space-y-6">
                    {/* Sender Name Field */}
                    <div>
                      <label htmlFor="senderName" className="block text-sm font-medium text-gray-300 mb-2">
                        Sender Name <span className="text-red-400">*</span>
                      </label>
                      <Field
                        name="senderName"
                        id="senderName"
                        value={values.senderName}
                        placeholder="Enter sender name (max 11 characters)"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                      {errors.senderName && touched.senderName && (
                        <div className="text-xs text-red-400 mt-2">{errors.senderName}</div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Only letters, numbers, and hyphen (-) allowed. Maximum 11 characters.
                      </p>
                    </div>

                    {/* Sample Content Field */}
                    <div>
                      <label htmlFor="sampleContent" className="block text-sm font-medium text-gray-300 mb-2">
                        Sample Contents <span className="text-red-400">*</span>
                      </label>
                      <Field
                        name="sampleContent"
                        id="sampleContent"
                        value={values.sampleContent}
                        as="textarea"
                        rows="4"
                        placeholder="Enter sample SMS content that will be sent from this sender name..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                      />
                      {errors.sampleContent && touched.sampleContent && (
                        <div className="text-xs text-red-400 mt-2">{errors.sampleContent}</div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Provide examples of messages you&apos;ll send from this sender name.
                      </p>
                    </div>

                    {/* Use Case Field */}
                    <div>
                      <label htmlFor="useCase" className="block text-sm font-medium text-gray-300 mb-2">
                        Use Case <span className="text-red-400">*</span>
                      </label>
                      <Field
                        name="useCase"
                        id="useCase"
                        component="select"
                        value={values.useCase}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      >
                        <option value="transactional">Transactional</option>
                        <option value="promotional">Promotional</option>
                        <option value="transactional/promotional">Transactional & Promotional</option>
                      </Field>
                      <p className="text-xs text-gray-500 mt-1">
                        Select the type of messages you&apos;ll send from this sender name.
                      </p>
                    </div>

                    {/* Error Message */}
                    {formError && (
                      <div className="text-sm text-red-400 text-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        {formError}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end pt-4">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        disabled={formLoading}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {formLoading && (
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {isEditMode ? 'Update Sender Name' : 'Create Sender Name'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
         {
                isLoading && <CircularLoader/>
              }
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              Sender Names
            </h1>
            <p className="text-gray-400">
              Manage your SMS sender identities for Tanzania regulatory compliance
            </p>
          </div>
          <button
            onClick={handleAddSenderName}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Sender Name
          </button>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-blue-200 font-semibold mb-1">Sender Name Registration</h3>
              <p className="text-blue-300 text-sm">
                Submit a sender name for approval to identify your business when sending SMS. 
                In Tanzania, all sender names require regulatory approval before use.
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {senderNames?.length > 0 && (
            <TableSenderNames senderNames={senderNames} onEdit={handleEditSenderName} />
          )}
          
          {(senderNames?.length == 0 || senderNames == null) && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Sender Names Yet</h3>
              <p className="text-gray-400 mb-6">Get started by creating your first sender name for SMS campaigns.</p>
              <button
                onClick={handleAddSenderName}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200"
              >
                Create First Sender Name
              </button>
            </div>
          )}
            </div>
          </div>
        </div>
      </SectionMain>
    );
  }
  