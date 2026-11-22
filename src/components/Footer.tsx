import React from 'react';
import { Instagram, Twitter, Mail, Shield, ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-12 text-zinc-400 font-mono-tech text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-black font-syne font-black text-sm flex items-center justify-center">
                AWM
              </div>
              <span className="font-syne font-black text-white text-base tracking-wider">
                ALWAYS WANT MORE
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              London engineered luxury streetwear. Heavyweight fabrics, structured tapers, and limited capsule archives.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-300">
              <a 
                href="https://www.instagram.com/alwayswantmore_uk/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-black transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-black transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-white text-sm uppercase">COLLECTIONS</div>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Active Tracksuits</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Chenille Outerwear</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Been Trapping Hoodies</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Washed Short Sets</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Archive Vault</a></li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-white text-sm uppercase">CLIENT SERVICES</div>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">UK Next-Day Shipping</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">14-Day Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">AI Sizing Lab Guide</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Brand Ethos */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-white text-sm uppercase">AWM LONDON</div>
            <p className="text-zinc-500 leading-relaxed">
              Always Want More is registered in the United Kingdom. All products are designed and vetted to British textile standards.
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-zinc-300">
              <Shield size={16} className="text-emerald-400 shrink-0" />
              <span>Official alwayswantmore.co.uk Redesign Preview</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} ALWAYS WANT MORE (AWM). ALL RIGHTS RESERVED.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-amber-400 transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
