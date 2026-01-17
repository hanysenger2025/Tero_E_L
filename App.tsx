
import React, { useState, useEffect } from 'react';
import { CATEGORIES, MINISTRY_NAME, APP_NAME, COLORS } from './constants';
import { Category, ContentType } from './types';
// Fix: Added Activity to lucide-react imports
import { Menu, ChevronLeft, LogOut, Bell, Settings, User, ShieldCheck, Activity } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Chatbot } from './components/Chatbot';
import { Home } from './components/Home';
import { FileExplorer } from './components/FileExplorer';
import { AdminPortal } from './components/AdminLogin';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('home');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPass, setAdminPass] = useState(() => localStorage.getItem('tero_admin_pass') || '01005275052');

  const navigateTo = (catId: string, subId?: string) => {
    setActiveCategory(catId);
    setActiveSubCategory(subId || null);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleCategoryClick = (category: Category) => {
    if (category.subCategories) {
      setExpandedCats(prev => ({ ...prev, [category.id]: !prev[category.id] }));
    } else {
      navigateTo(category.id);
    }
  };

  const onLogin = (pass: string) => {
    if (pass === adminPass) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const onChangePassword = (old: string, next: string) => {
    if (old === adminPass) {
      setAdminPass(next);
      localStorage.setItem('tero_admin_pass', next);
      return true;
    }
    return false;
  };

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);
  const currentSubCategory = currentCategory?.subCategories?.find(s => s.id === activeSubCategory);
  const currentType = activeSubCategory ? currentSubCategory?.type : currentCategory?.type;
  const currentId = activeSubCategory || activeCategory || '';

  let contentToRender;
  switch (currentType) {
    case ContentType.HOME:
      contentToRender = <Home onNavigate={navigateTo} />;
      break;
    case ContentType.DASHBOARD:
      contentToRender = <Dashboard />;
      break;
    case ContentType.CHATBOT:
      contentToRender = <Chatbot />;
      break;
    default:
      contentToRender = <FileExplorer categoryId={currentId} title={currentSubCategory?.title || currentCategory?.title || ''} isAdmin={isLoggedIn} />;
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-cairo text-slate-900 rtl">
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 right-0 z-50 w-80 bg-[#0f172a] text-slate-300 transform transition-transform duration-500 ease-in-out border-l-4 border-[#b8860b] ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-24 h-24 bg-white rounded-full p-2 shadow-xl shadow-black/40 border-2 border-[#b8860b]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Coat_of_arms_of_Egypt_%28Official%29.svg/1024px-Coat_of_arms_of_Egypt_%28Official%29.svg.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-black text-white leading-tight mb-1">{APP_NAME}</h1>
                <p className="text-[10px] text-[#b8860b] font-bold tracking-[2px] uppercase">
                  Technical Education Reform
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 custom-scrollbar">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              const isExpanded = expandedCats[category.id];
              const hasSubs = !!category.subCategories;

              return (
                <div key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group ${
                      isActive && !hasSubs 
                        ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-lg shadow-emerald-500/20' 
                        : 'hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#b8860b]'} transition-colors`}>
                        {category.icon}
                      </span>
                      <span className="font-bold text-sm">{category.title}</span>
                    </div>
                    {hasSubs && (
                      <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : ''}`} />
                    )}
                  </button>

                  {hasSubs && isExpanded && (
                    <div className="mt-2 mr-4 pr-6 border-r-2 border-[#b8860b]/30 space-y-1">
                      {category.subCategories!.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => navigateTo(category.id, sub.id)}
                          className={`w-full text-right p-2.5 text-xs font-bold rounded-xl transition-all ${
                            activeSubCategory === sub.id
                              ? 'text-[#b8860b] bg-[#b8860b]/10'
                              : 'text-slate-500 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-white/5">
            <button 
              onClick={() => setIsAdminPortalOpen(true)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
                isLoggedIn ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400 hover:text-[#b8860b]'
              }`}
            >
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLoggedIn ? 'bg-emerald-500 text-white' : 'bg-white/10'}`}>
                 {isLoggedIn ? <ShieldCheck className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
               </div>
               <div className="flex-1 text-right">
                 <p className="text-xs font-bold">{isLoggedIn ? 'بوابة المدير' : 'الإدارة'}</p>
                 <p className="text-[10px] opacity-60">{isLoggedIn ? 'نشط الآن' : 'تسجيل دخول'}</p>
               </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-24 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-8">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-3 bg-slate-50 rounded-2xl text-[#0f172a]">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] font-black text-[#b8860b] uppercase tracking-[3px]">{MINISTRY_NAME}</span>
              <h2 className="text-2xl font-black text-[#0f172a]">
                {activeCategory === 'home' ? 'الرئيسية' : currentCategory?.title}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
               <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#10b981]">
                 {/* Activity icon used here */}
                 <Activity className="w-5 h-5" />
               </div>
               <div className="text-right ml-4">
                 <p className="text-[10px] font-bold text-slate-400 uppercase">الحالة</p>
                 <p className="text-xs font-black text-emerald-600">متصل الآن</p>
               </div>
            </div>
            <div className="relative group">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-[#b8860b] transition cursor-pointer">
                <Bell className="w-6 h-6" />
              </div>
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-4 border-white" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-[#f8fafc] custom-scrollbar">
          {contentToRender}
        </div>
      </main>

      <AdminPortal 
        isOpen={isAdminPortalOpen} 
        onClose={() => setIsAdminPortalOpen(false)} 
        onLogin={onLogin}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        onChangePassword={onChangePassword}
      />
    </div>
  );
};

export default App;
