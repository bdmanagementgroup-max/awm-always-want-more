import React from 'react';
import { Instagram, Twitter, Mail, Shield, ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-100 border-t border-zinc-200 pt-16 pb-12 text-zinc-600 font-mono-tech text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex flex-col">
              <span className="font-syne font-black text-zinc-950 text-lg tracking-wider">
                ALWAYS WANT MORE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-zinc-500 font-mono-tech">
                LONDON • STREETWEAR
              </span>
            </div>
            <p className="text-zinc-600 leading-relaxed">
              London engineered luxury streetwear. Heavyweight fabrics, structured tapers, and limited capsule archives.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-700">
              <a 
                href="https://www.instagram.com/alwayswantmore_uk/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-white border border-zinc-200 hover:bg-teal-600 hover:text-white transition-colors shadow-xs"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white border border-zinc-200 hover:bg-teal-600 hover:text-white transition-colors shadow-xs"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-zinc-950 text-sm uppercase">COLLECTIONS</div>
            <ul className="space-y-2 text-zinc-600">
              <li><a href="#" className="hover:text-teal-600 transition-colors">Active Tracksuits</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Chenille Outerwear</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Been Trapping Hoodies</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Washed Short Sets</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Archive Vault</a></li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-zinc-950 text-sm uppercase">CLIENT SERVICES</div>
            <ul className="space-y-2 text-zinc-600">
              <li><a href="#" className="hover:text-teal-600 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">UK Next-Day Shipping</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">14-Day Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">AI Sizing Lab Guide</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Brand Ethos */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-zinc-950 text-sm uppercase">AWM LONDON</div>
            <p className="text-zinc-600 leading-relaxed">
              Always Want More is registered in the United Kingdom. All products are designed and vetted to British textile standards.
            </p>
            <div className="p-3 rounded-xl bg-white border border-zinc-200 flex items-center gap-2 text-zinc-700 shadow-xs">
              <Shield size={16} className="text-teal-600 shrink-0" />
              <span>Official alwayswantmore.co.uk Clean Redesign</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div>
            © {new Date().getFullYear()} ALWAYS WANT MORE (AWM). ALL RIGHTS RESERVED.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-teal-600 transition-colors font-bold cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} className="text-pink-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};
