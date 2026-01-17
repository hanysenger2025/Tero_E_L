
import React, { useState, useEffect } from 'react';
import { INITIAL_CATEGORIES, MINISTRY_NAME, APP_NAME, DEFAULT_THEME, SUPPORT_EMAIL } from './constants';
import { Category, ContentType, AppTheme } from './types';
import { Menu, ChevronLeft, Bell, ShieldCheck, Activity, Mail, Palette, Monitor, X, Send, Home as HomeIcon } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Chatbot } from './components/Chatbot';
import { Home } from './components/Home';
import { FileExplorer } from './components/FileExplorer';
import { AdminPortal } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('home');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [adminPass, setAdminPass] = useState(() => localStorage.getItem('tero_admin_pass') || '01005275052');
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('tero_categories_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((cat: Category) => ({
        ...cat,
        iconElement: INITIAL_CATEGORIES.find(ic => ic.id === cat.id)?.iconElement || <Monitor className="w-5 h-5" />
      }));
    }
    return INITIAL_CATEGORIES;
  });

  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('tero_theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    localStorage.setItem('tero_categories_v2', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('tero_theme', JSON.stringify(theme));
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
  }, [theme]);

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

  const onUpdatePass = (next: string) => {
    setAdminPass(next);
    localStorage.setItem('tero_admin_pass', next);
  };

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentSubCategory = currentCategory?.subCategories?.find(s => s.id === activeSubCategory);
  const currentType = activeSubCategory ? currentSubCategory?.type : currentCategory?.type;
  const currentId = activeSubCategory || activeCategory || '';

  let contentToRender;
  if (isLoggedIn && activeCategory === 'admin-control') {
    contentToRender = <AdminDashboard 
      categories={categories} 
      onUpdateCategories={setCategories} 
      adminPass={adminPass}
      onUpdatePass={onUpdatePass}
    />;
  } else {
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
  }

  const THEMES = [
    { name: 'كلاسيك تيرو', primary: '#0f172a', secondary: '#10b981', accent: '#b8860b' },
    { name: 'أزرق هادئ', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#fbbf24' },
    { name: 'أخضر تقني', primary: '#064e3b', secondary: '#059669', accent: '#d97706' },
    { name: 'ليلي داكن', primary: '#111827', secondary: '#6366f1', accent: '#8b5cf6' }
  ];

  const [emailDraft, setEmailDraft] = useState({ subject: '', body: '' });

  const handleSendEmail = () => {
    const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(emailDraft.subject)}&body=${encodeURIComponent(emailDraft.body)}`;
    window.location.href = mailtoUrl;
    setShowContactModal(false);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-cairo text-slate-900 rtl" style={{ '--primary-color': theme.primary } as any}>
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 right-0 z-50 w-80 transform transition-transform duration-500 ease-in-out border-l-4 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}
        style={{ backgroundColor: theme.primary, borderColor: theme.accent }}
      >
        <div className="h-full flex flex-col text-slate-300">
          {/* Logo Section matching the reference image exactly */}
          <div className="p-8 border-b border-white/5 flex flex-col items-center">
            <div className="relative mb-4">
               <div className="flex flex-col items-center justify-center p-4">
                  {/* Digital Book Icon representation from reference */}
                  <div className="relative w-28 h-20 mb-1">
                    <div className="absolute inset-0 flex justify-center items-end">
                      {/* Left Page (Blue) */}
                      <div className="w-[45%] h-full bg-gradient-to-br from-blue-500 to-blue-800 rounded-tl-[40px] rounded-bl-lg -rotate-[12deg] translate-x-1 origin-bottom-right shadow-lg border-t border-white/20"></div>
                      {/* Right Page (Gold) */}
                      <div className="w-[45%] h-full bg-gradient-to-bl from-yellow-300 to-[#b8860b] rounded-tr-[40px] rounded-br-lg rotate-[12deg] -translate-x-1 origin-bottom-left shadow-lg border-t border-white/20"></div>
                    </div>
                    {/* Digital Elements/Pixels */}
                    <div className="absolute -top-2 right-4 flex flex-col gap-1 items-end">
                       <div className="flex gap-1">
                         <div className="w-2.5 h-2.5 bg-yellow-400/90 shadow-sm"></div>
                         <div className="w-1.5 h-1.5 bg-yellow-600 shadow-sm mt-1"></div>
                       </div>
                       <div className="w-2 h-2 bg-yellow-200/80 mr-3"></div>
                    </div>
                  </div>
                  {/* TERO Text with Serif Font Style */}
                  <h1 className="text-5xl font-serif font-black tracking-tight text-white mt-1 mb-0" style={{ fontFamily: 'serif' }}>
                    <span style={{ 
                      background: 'linear-gradient(to bottom, #fde68a 20%, #b8860b 80%)', 
                      WebkitBackgroundClip: 'text', 
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))'
                    }}>TERO</span>
                  </h1>
                  {/* e-Library subtext with lines */}
                  <div className="flex items-center gap-3 w-full mt-1">
                    <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent to-[#b8860b]"></div>
                    <span className="text-base font-serif italic text-blue-400 font-bold" style={{ fontFamily: 'serif' }}>e-Library</span>
                    <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent to-[#b8860b]"></div>
                  </div>
               </div>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[2px] opacity-70">
               المنصة الرقمية لإدارة المعرفة
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
            {/* Dynamic Categories */}
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const isExpanded = expandedCats[category.id];
              const hasSubs = !!category.subCategories;

              return (
                <React.Fragment key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group ${
                      isActive && !hasSubs 
                        ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                        : 'hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`${isActive ? 'text-[#b8860b]' : 'text-slate-500 group-hover:text-[#b8860b]'} transition-colors`}>
                        {category.iconElement}
                      </span>
                      <span className="font-bold text-sm">{category.title}</span>
                    </div>
                    {hasSubs && (
                      <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : ''}`} />
                    )}
                  </button>

                  {hasSubs && isExpanded && (
                    <div className="mt-1 mr-4 pr-6 border-r-2 border-white/10 space-y-1">
                      {category.subCategories!.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => navigateTo(category.id, sub.id)}
                          className={`w-full text-right p-2.5 text-xs font-bold rounded-xl transition-all ${
                            activeSubCategory === sub.id
                              ? 'text-[#b8860b] bg-white/5'
                              : 'text-slate-500 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Separator before final actions */}
            <div className="h-[1px] bg-white/5 my-4 mx-2"></div>

            {/* Final Actions: Contact Us & Admin at the end of the list */}
            <div className="space-y-1">
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all text-slate-400 hover:text-white hover:bg-white/5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#b8860b]/10 flex items-center justify-center text-[#b8860b] group-hover:bg-[#b8860b] group-hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">تواصل معنا</span>
              </button>

              <button 
                onClick={() => setIsAdminPortalOpen(true)}
                className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all group ${
                  isLoggedIn ? 'text-emerald-400 bg-emerald-500/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isLoggedIn ? 'bg-emerald-500 text-white' : 'bg-white/10 group-hover:bg-[#b8860b] group-hover:text-white'}`}>
                   <ShieldCheck className="w-4 h-4" />
                 </div>
                 <span className="text-sm font-bold">{isLoggedIn ? 'لوحة التحكم' : 'إدارة النظام'}</span>
              </button>
            </div>
          </nav>

          {/* Minimal Sidebar Footer */}
          <div className="p-4 border-t border-white/5 bg-black/5 flex items-center justify-center">
             <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">TERO Ecosystem v2.1</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2.5 bg-slate-50 rounded-xl text-slate-900">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex flex-col">
              <span className="text-[9px] font-black text-[#b8860b] uppercase tracking-[3px]">{MINISTRY_NAME}</span>
              <h2 className="text-xl font-black text-slate-800">
                {activeCategory === 'home' ? 'بوابة الموارد' : (isLoggedIn && activeCategory === 'admin-control' ? 'لوحة التحكم الشاملة' : currentCategory?.title)}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowThemePicker(!showThemePicker)}
              className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition relative"
            >
              <Palette className="w-5 h-5" />
              {showThemePicker && (
                <div className="absolute top-14 left-0 bg-white shadow-2xl rounded-2xl p-4 border w-48 animate-in zoom-in duration-200">
                  <p className="text-xs font-black text-slate-400 mb-3 border-b pb-2">تخصيص ألوان المستخدم</p>
                  <div className="space-y-2">
                    {THEMES.map((t, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                           setTheme({ primary: t.primary, secondary: t.secondary, accent: t.accent, background: '#f8fafc' });
                           setShowThemePicker(false);
                        }}
                        className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition"
                      >
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.primary }} />
                        <span className="text-[10px] font-bold text-slate-700">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
               <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-500">
                 <Activity className="w-4 h-4" />
               </div>
               <div className="text-right px-1">
                 <p className="text-[8px] font-bold text-slate-400">نظام TERO</p>
                 <p className="text-[10px] font-black text-emerald-600">متصل</p>
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-[#f8fafc] custom-scrollbar">
          {contentToRender}
        </div>
      </main>

      {/* Admin Login Modal */}
      <AdminPortal 
        isOpen={isAdminPortalOpen} 
        onClose={() => setIsAdminPortalOpen(false)} 
        onLogin={(pass) => {
          const success = onLogin(pass);
          if (success) {
            setActiveCategory('admin-control');
            setActiveSubCategory(null);
          }
          return success;
        }}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          setIsLoggedIn(false);
          setActiveCategory('home');
        }}
        onChangePassword={(old, next) => {
          if (old === adminPass) {
            onUpdatePass(next);
            return true;
          }
          return false;
        }}
      />

      {/* Contact Us Modal (Email Interface) */}
      {showContactModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col h-[600px]">
            <div className="bg-[#0f172a] p-4 text-white flex justify-between items-center border-b border-[#b8860b]">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#b8860b]" />
                <h2 className="font-bold">رسالة جديدة</h2>
              </div>
              <button onClick={() => setShowContactModal(false)} className="p-1 hover:bg-white/10 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
               <div className="flex items-center border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-bold w-12 text-sm">إلى:</span>
                  <span className="bg-slate-50 px-3 py-1 rounded-full text-emerald-700 font-bold text-sm border border-emerald-100">
                    {SUPPORT_EMAIL}
                  </span>
               </div>
               <div className="flex items-center border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-bold w-12 text-sm">الموضوع:</span>
                  <input 
                    type="text" 
                    placeholder="عنوان الاستفسار..."
                    className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-800"
                    value={emailDraft.subject}
                    onChange={e => setEmailDraft({...emailDraft, subject: e.target.value})}
                  />
               </div>
               <textarea 
                  className="flex-1 w-full bg-slate-50 p-6 rounded-2xl outline-none resize-none text-slate-700 text-sm leading-relaxed border border-slate-100 focus:border-emerald-200 focus:bg-white transition"
                  placeholder="اكتب رسالتك هنا..."
                  value={emailDraft.body}
                  onChange={e => setEmailDraft({...emailDraft, body: e.target.value})}
               ></textarea>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
               <button 
                  onClick={() => setShowContactModal(false)}
                  className="px-6 py-2.5 bg-white text-slate-500 rounded-xl font-bold hover:bg-slate-100 transition"
               >
                 إلغاء
               </button>
               <button 
                  onClick={handleSendEmail}
                  className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
               >
                 إرسال <Send className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
