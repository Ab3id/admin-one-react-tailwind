import React from "react";
import { Metadata } from "next";
import { getPageTitle } from "./_lib/config";
import Link from "next/link";

export const metadata: Metadata = {
  title: getPageTitle("Welcome"),
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="text-white text-xl font-semibold">
          MojaSMS
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
            Sign in
          </Link>
          <Link href="/register" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col justify-center items-center px-8 pt-20">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Spotlight Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-6">
           
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Tanzania&apos;s leading
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
              SMS platform
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with millions across Tanzania through reliable SMS messaging. 
            Built for local businesses, scaling globally.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
              Start for free
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors px-8 py-3 border border-white/20 rounded-full hover:border-white/40">
              View docs
            </Link>
          </div>

          {/* Code Example */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-500">curl</span>
            </div>
            <pre className="text-left text-sm text-gray-300 leading-relaxed">
              <code>{`curl https://engage.mojaone.co.tz/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d to="+255754123456" \\
  -d message="Karibu MojaSMS! 🇹🇿"`}</code>
            </pre>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">
              Built for Tanzania, scaling globally
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Local expertise with global ambitions - reliable SMS delivery across all Tanzanian networks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">
                Direct connections with Vodacom, Airtel, Tigo, and Halotel ensure instant delivery across Tanzania.
              </p>
            </div>

            <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">99.9% Uptime</h3>
              <p className="text-gray-400 leading-relaxed">
                Reliable service with local data centers in Dar es Salaam and redundant network connections.
              </p>
            </div>

            <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Support</h3>
              <p className="text-gray-400 leading-relaxed">
                24/7 customer support in English and Swahili, with local expertise for Tanzanian market needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-8 bg-white/2">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                5B+
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Messages sent</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Delivery rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                All
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">TZ Networks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Pay only for what you use. No hidden fees, no setup costs. Scale with confidence across Tanzania.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-gray-400 mb-6">Perfect for small businesses</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">TSh 14</span>
                 
                </div>
                {/* <p className="text-sm text-gray-500">≈ $0.021 per SMS</p> */}
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Up to 5,000 SMS/month</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">All Tanzanian networks</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Web dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Basic API access</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Email support</span>
                </div>
              </div>
              
              <Link href="/register" className="block w-full bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/40">
                Get started
              </Link>
            </div>

            {/* Business Plan - Featured */}
            <div className="relative bg-gradient-to-b from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 hover:from-blue-500/15 hover:to-purple-500/15 transition-all duration-300 transform hover:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <p className="text-gray-400 mb-6">For growing companies</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">TSh 12</span>
                  {/* <span className="text-gray-400 ml-2">/1000 SMS</span> */}
                </div>
                {/* <p className="text-sm text-gray-500">≈ $0.017 per SMS</p> */}
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Up to 20,000 SMS/month</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Premium routing priority</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Advanced analytics</span>
                </div>
               
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">24/7 phone support</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Custom sender IDs</span>
                </div>
              </div>
              
              <Link href="/register" className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-center py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                Start free trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-400 mb-6">For large organizations</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="text-sm text-gray-500">Volume discounts available</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Unlimited SMS volume</span>
                </div>
              
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">White-label solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">SLA guarantees</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Dedicated account manager</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Custom integrations</span>
                </div>
              </div>
              
              <button className="block w-full bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/40">
                Contact sales
              </button>
            </div>
          </div>

          {/* Additional Pricing Info */}
          <div className="text-center mt-16 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">All plans include</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No setup or monthly fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time delivery reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unicode & emoji support</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>API rate limiting protection</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comprehensive documentation</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <strong>Free Trial:</strong> Start with 100 free SMS to test our service. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to reach Tanzania?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join hundreds of Tanzanian businesses already using MojaSMS. Start sending in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 text-lg">
              Start building for free
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors px-8 py-4 text-lg">
              Talk to sales →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="text-xl font-semibold mb-4">MojaSMS</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Tanzania&apos;s premier SMS platform connecting local businesses with their customers. 
                Expanding globally while serving our home market with excellence.
              </p>
              <div className="text-xs text-gray-500">
                © 2025 MojaSMS. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">API</div>
                <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">Documentation</div>
                {/* <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">SDKs</div> */}
                {/* <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">Pricing</div> */}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">About</div>
                
                <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">Careers</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <div className="space-y-2">

                <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">Contact</div>
                <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">Status</div>
 
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;