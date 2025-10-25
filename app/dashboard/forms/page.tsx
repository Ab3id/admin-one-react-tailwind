"use client";

import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { getPageTitle } from "../../_lib/config";

export default function FormsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Head>
        <title>{getPageTitle("Forms")}</title>
      </Head>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">SMS Forms</h1>
        <p className="text-gray-400">Configure your SMS campaigns for Tanzanian audiences</p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Basic Form Example</h2>
        
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            phone: "",
            color: "green",
            textarea: "",
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <Form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <Field
                  name="fullname"
                  id="fullname"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <Field
                  name="phone"
                  placeholder="+255 754 123 456"
                  id="phone"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                <p className="text-sm text-gray-500 mt-1">Use Tanzanian format: +255 followed by 9 digits.</p>
              </div>            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-300 mb-2">
                Favorite Color
              </label>
              <Field
                name="color"
                id="color"
                component="select"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Field>
            </div>

            <div>
              <label htmlFor="textarea" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <Field
                name="textarea"
                id="textarea"
                as="textarea"
                rows="4"
                placeholder="Enter your message"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                Submit
              </button>
              <button
                type="reset"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Reset
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Form Controls</h2>
        
        <Formik
          initialValues={{
            checkboxes: ["lorem"],
            switches: ["lorem"],
            radio: "lorem",
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <Form className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Checkboxes</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <Field type="checkbox" name="checkboxes" value="lorem" className="sr-only peer" />
                  <div className="relative w-5 h-5 bg-white/5 border border-white/20 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all">
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5 hidden peer-checked:block" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300">Lorem</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <Field type="checkbox" name="checkboxes" value="ipsum" className="sr-only peer" />
                  <div className="relative w-5 h-5 bg-white/5 border border-white/20 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all">
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5 hidden peer-checked:block" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300">Ipsum</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Radio Buttons</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <Field type="radio" name="radio" value="lorem" className="sr-only peer" />
                  <div className="w-5 h-5 bg-white/5 border border-white/20 rounded-full peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-1.5 hidden peer-checked:block"></div>
                  </div>
                  <span className="ml-3 text-gray-300">Lorem</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <Field type="radio" name="radio" value="ipsum" className="sr-only peer" />
                  <div className="w-5 h-5 bg-white/5 border border-white/20 rounded-full peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-1.5 hidden peer-checked:block"></div>
                  </div>
                  <span className="ml-3 text-gray-300">Ipsum</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                Submit
              </button>
              <button
                type="reset"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Reset
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">File Upload</h2>
        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/30 transition-colors">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-gray-300 mb-2">Drag and drop files here, or click to browse</p>
          <p className="text-sm text-gray-500">Supports: JPG, PNG, PDF up to 10MB</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            Choose Files
          </button>
        </div>
      </div>
    </div>
  );
}
