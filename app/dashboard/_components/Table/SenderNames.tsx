"use client";

import React, { useState } from "react";
import { SenderName } from "../../senderNames/page";

type Props = {
  senderNames: SenderName[];
  onEdit?: (senderName: SenderName) => void;
};

const TableSenderNames = ({ senderNames, onEdit }: Props) => {
  const perPage = 10;
  const numPages = Math.ceil(senderNames.length / perPage);
  const [currentPage, setCurrentPage] = useState(0);
  
  const senderNamesPaginated = senderNames.slice(
    perPage * currentPage,
    perPage * (currentPage + 1),
  );

  const handleDelete = (senderName: SenderName) => {
    // Handle delete logic here
    console.log('Delete:', senderName);
  };

  return (
    <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
      {/* Modern Table Header */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 px-8 py-5 border-b border-white/10">
        <div className="grid grid-cols-6 gap-6 items-center text-sm font-medium text-gray-300 uppercase tracking-wide">
          <div className="text-center">#</div>
          <div>Sender Name</div>
          <div>Sample Content</div>
          <div className="text-center">Status</div>
          <div className="text-center">Created</div>
          <div className="text-center">Actions</div>
        </div>
      </div>

      {/* Modern Table Body */}
      <div className="divide-y divide-white/5">
        {senderNamesPaginated.map((senderName: SenderName, index) => (
          <div key={senderName.id} className="group relative">
            <div className="grid grid-cols-6 gap-6 items-center px-8 py-6 transition-all duration-200">
              
              {/* Index */}
              <div className="text-center">
                <div className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center text-sm font-medium text-gray-300">
                  {currentPage * perPage + index + 1}
                </div>
              </div>

              {/* Sender Name */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-white text-lg leading-tight">
                    {senderName.senderName}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    SMS Identifier
                  </div>
                </div>
              </div>

              {/* Sample Contents */}
              <div className="pr-4">
                <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50">
                  <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed" title={senderName.sampleContents}>
                    {senderName.sampleContents}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="text-center">
                <div className="inline-flex items-center">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm border ${
                    senderName.approved 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      senderName.approved ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}></div>
                    <span>{senderName.approved ? 'Approved' : 'Pending'}</span>
                  </div>
                </div>
              </div>

              {/* Created Date */}
              <div className="text-center">
                <div className="text-sm text-gray-300 font-medium">
                  {new Date(senderName.createdDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(senderName.createdDate).toLocaleDateString('en-US', {
                    weekday: 'short'
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="text-center">
                <div className="flex justify-center space-x-2">
                  {!senderName.approved && onEdit && (
                    <button
                      onClick={() => onEdit(senderName)}
                      className="group/btn relative p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-all duration-200 border border-emerald-500/20 hover:border-emerald-500/40"
                      title="Edit Sender Name"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {senderName.approved && (
                    <button
                      disabled
                      className="p-3 bg-slate-600/20 text-slate-500 rounded-xl cursor-not-allowed border border-slate-600/20"
                      title="Cannot edit approved sender name"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(senderName)}
                    className="group/btn relative p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                    title="Delete Sender Name"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modern Pagination */}
      {numPages > 1 && (
        <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/20 px-8 py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            
            {/* Pagination Info */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">{currentPage * perPage + 1}</span> to{' '}
                <span className="font-medium text-white">
                  {Math.min((currentPage + 1) * perPage, senderNames.length)}
                </span>{' '}
                of <span className="font-medium text-white">{senderNames.length}</span> results
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, numPages) }, (_, i) => {
                  let pageNumber;
                  if (numPages <= 5) {
                    pageNumber = i;
                  } else if (currentPage < 3) {
                    pageNumber = i;
                  } else if (currentPage >= numPages - 3) {
                    pageNumber = numPages - 5 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pageNumber === currentPage
                          ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                          : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {pageNumber + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(numPages - 1, currentPage + 1))}
                disabled={currentPage === numPages - 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSenderNames;
