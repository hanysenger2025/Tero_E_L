
import React, { useState } from 'react';
// Add Activity to the imports
import { Settings, Edit3, Trash2, Plus, Save, RefreshCcw, Key, Palette, MessageSquare, FilePlus, TextQuote, Activity } from 'lucide-react';
import { Category, SubCategory, ContentType } from '../types';

interface Props {
  categories: Category[];
  onUpdateCategories: (newCats: Category[]) => void;
  adminPass: string;
  onUpdatePass: (newPass: string) => void;
}

export const AdminDashboard: React.FC<Props> = ({ categories, onUpdateCategories, adminPass, onUpdatePass }) => {
  const [editableCats, setEditableCats] = useState<Category[]>(JSON.parse(JSON.stringify(categories)));
  const [newPass, setNewPass] = useState('');
  const [currentPassField, setCurrentPassField] = useState('');
  const [editingDescription, setEditingDescription] = useState<{catId: string, subId?: string} | null>(null);

  const handleUpdateTitle = (catIndex: number, newTitle: string) => {
    const updated = [...editableCats];
    updated[catIndex].title = newTitle;
    setEditableCats(updated);
  };

  const handleUpdateDescription = (catIndex: number, subIndex: number | null, text: string) => {
    const updated = [...editableCats];
    if (subIndex !== null && updated[catIndex].subCategories) {
      updated[catIndex].subCategories![subIndex].description = text;
    } else {
      updated[catIndex].description = text;
    }
    setEditableCats(updated);
  };

  const handleUpdateSubTitle = (catIndex: number, subIndex: number, newTitle: string) => {
    const updated = [...editableCats];
    if (updated[catIndex].subCategories) {
      updated[catIndex].subCategories![subIndex].title = newTitle;
    }
    setEditableCats(updated);
  };

  const handleAddSub = (catIndex: number) => {
    const updated = [...editableCats];
    if (!updated[catIndex].subCategories) updated[catIndex].subCategories = [];
    updated[catIndex].subCategories!.push({
      id: `custom-${Date.now()}`,
      title: 'قسم فرعي جديد',
      type: ContentType.FILES
    });
    setEditableCats(updated);
  };

  const handleDeleteSub = (catIndex: number, subIndex: number) => {
    const updated = [...editableCats];
    updated[catIndex].subCategories?.splice(subIndex, 1);
    setEditableCats(updated);
  };

  const handleSaveAll = () => {
    onUpdateCategories(editableCats);
    alert('تم حفظ كافة التغييرات على النظام والمسميات');
  };

  const handlePassChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassField === adminPass) {
      onUpdatePass(newPass);
      alert('تم تحديث كلمة المرور بنجاح');
      setNewPass('');
      setCurrentPassField('');
    } else {
      alert('كلمة السر الحالية غير صحيحة');
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8 border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-800">لوحة التحكم الشاملة</h1>
          <p className="text-slate-500 font-bold mt-1">تخصيص هيكل المنصة، المحتوى، وإعدادات الأمان</p>
        </div>
        <button 
          onClick={handleSaveAll}
          className="flex items-center justify-center gap-3 px-10 py-4 bg-[#b8860b] text-white rounded-2xl font-black shadow-xl shadow-yellow-500/20 hover:scale-105 transition-all active:scale-95"
        >
          <Save className="w-6 h-6" /> حفظ التغييرات النهائية
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation & Content Structure */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-slate-800 border-r-4 border-blue-500 pr-4">
              <Edit3 className="w-6 h-6 text-blue-500" /> هيكل التبويبات والمحتوى
            </h2>
            
            <div className="space-y-6">
              {editableCats.map((cat, idx) => (
                <div key={cat.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-200/60 shadow-inner group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600">
                       <Settings className="w-5 h-5" />
                    </div>
                    <input 
                      className="flex-1 p-3 bg-white border border-slate-200 rounded-2xl font-black text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                      value={cat.title}
                      placeholder="اسم التبويب الرئيسي..."
                      onChange={(e) => handleUpdateTitle(idx, e.target.value)}
                    />
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                        onClick={() => handleAddSub(idx)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition shadow-sm"
                       >
                         <Plus className="w-4 h-4" /> إضافة فرع
                       </button>
                    </div>
                  </div>

                  {cat.subCategories && cat.subCategories.length > 0 && (
                    <div className="mt-4 mr-10 space-y-3 border-r-2 border-blue-200/30 pr-6">
                      {cat.subCategories.map((sub, sidx) => (
                        <div key={sub.id} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <input 
                              className="flex-1 p-2.5 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
                              value={sub.title}
                              placeholder="اسم القسم الفرعي..."
                              onChange={(e) => handleUpdateSubTitle(idx, sidx, e.target.value)}
                            />
                            <button 
                              onClick={() => handleDeleteSub(idx, sidx)}
                              className="p-2.5 text-red-300 hover:text-red-500 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Section Text/Description Editor */}
                          <div className="relative">
                             <div className="absolute top-3 right-3 text-slate-300">
                               <TextQuote className="w-4 h-4" />
                             </div>
                             <textarea 
                                className="w-full min-h-[80px] p-4 pr-10 bg-white/50 border border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-500 focus:bg-white focus:border-emerald-200 outline-none transition"
                                placeholder="أضف نصاً توضيحياً أو محتوى لهذا القسم..."
                                value={sub.description || ''}
                                onChange={(e) => handleUpdateDescription(idx, sidx, e.target.value)}
                             />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!cat.subCategories && (
                    <div className="mr-10">
                       <textarea 
                          className="w-full min-h-[100px] p-4 bg-white/50 border border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-500 focus:bg-white focus:border-blue-200 outline-none transition"
                          placeholder="محتوى التبويب الرئيسي..."
                          value={cat.description || ''}
                          onChange={(e) => handleUpdateDescription(idx, null, e.target.value)}
                       />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-8">
          {/* Security & Access Section */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-slate-800 border-r-4 border-orange-500 pr-4">
              <Key className="w-6 h-6 text-orange-500" /> إعدادات الوصول
            </h2>
            <form onSubmit={handlePassChange} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-wider block mr-1">كلمة المرور الحالية</label>
                <input 
                  type="password"
                  required
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-mono text-center shadow-inner"
                  value={currentPassField}
                  onChange={e => setCurrentPassField(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-wider block mr-1">كلمة المرور الجديدة</label>
                <input 
                  type="password"
                  required
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-center shadow-inner"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg active:scale-95"
              >
                تحديث بيانات الدخول
              </button>
            </form>
          </section>

          {/* Quick Actions / Tips */}
          <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 rounded-[2.5rem] shadow-xl text-white">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-400" /> نصائح الإدارة
            </h2>
            <ul className="space-y-4 text-sm font-bold text-slate-300">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                <p>تغيير مسميات التبويبات يظهر فوراً لكافة المستخدمين بعد الحفظ.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                <p>يمكنك إضافة نصوص شرح لكل قسم لتقديم إرشادات للطلاب.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 flex-shrink-0"></div>
                <p>احرص على استخدام مسميات واضحة ومختصرة للتبويبات الجانبية.</p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
