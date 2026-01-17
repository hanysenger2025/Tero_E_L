
import React, { useState, useEffect } from 'react';
import { Search, Download, FileText, Grid, List as ListIcon, Filter, Plus, Link as LinkIcon, Trash2, Clock } from 'lucide-react';
import { FileItem } from '../types';

interface Props {
  categoryId: string;
  title: string;
  isAdmin: boolean;
}

export const FileExplorer: React.FC<Props> = ({ categoryId, title, isAdmin }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', type: 'pdf' as any, url: '' });

  // Load files from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`tero_files_${categoryId}`);
    if (saved) {
      setFiles(JSON.parse(saved));
    } else {
      setFiles([]);
    }
  }, [categoryId]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item: FileItem = {
      id: Date.now().toString(),
      name: newItem.name,
      date: new Date().toLocaleDateString('ar-EG'),
      size: newItem.type === 'link' ? '-' : '2.4 MB',
      type: newItem.type,
      url: newItem.url || '#',
      category: title
    };
    const updated = [...files, item];
    setFiles(updated);
    localStorage.setItem(`tero_files_${categoryId}`, JSON.stringify(updated));
    localStorage.setItem(`tero_last_mod_${categoryId}`, new Date().toLocaleString('ar-EG'));
    setNewItem({ name: '', type: 'pdf', url: '' });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;
    const updated = files.filter(f => f.id !== id);
    setFiles(updated);
    localStorage.setItem(`tero_files_${categoryId}`, JSON.stringify(updated));
  };

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const lastMod = localStorage.getItem(`tero_last_mod_${categoryId}`);

  return (
    <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-[#0f172a]">{title}</h1>
          <div className="flex items-center gap-4 text-sm font-medium">
             <p className="text-slate-500">عرض كافة الموارد والملفات</p>
             {lastMod && (
               <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                 <Clock className="w-3.5 h-3.5" />
                 آخر تعديل: {lastMod}
               </span>
             )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#b8860b] text-white rounded-xl font-bold shadow-lg shadow-gold-500/20 hover:scale-105 transition"
            >
              <Plus className="w-5 h-5" /> إضافة جديد
            </button>
          )}
          <div className="flex bg-white p-1 rounded-xl border border-slate-200">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400'}`}>
              <Grid className="w-5 h-5" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400'}`}>
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث في الأرشيف..."
            className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#10b981] transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 text-center space-y-4">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
             <FileText className="w-10 h-10 text-slate-300" />
           </div>
           <p className="text-slate-400 font-bold">لا توجد ملفات في هذا القسم حالياً</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="p-5 font-bold text-[#0f172a]">العنصر</th>
                <th className="p-5 font-bold text-[#0f172a]">التاريخ</th>
                <th className="p-5 font-bold text-[#0f172a] text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(file => (
                <tr key={file.id} className="group hover:bg-slate-50/50 transition">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${file.type === 'link' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                        {file.type === 'link' ? <LinkIcon className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{file.name}</p>
                        <p className="text-xs text-slate-400 uppercase">{file.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-slate-500 font-medium">{file.date}</td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <a href={file.url} className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-[#10b981] hover:text-white transition">
                        <Download className="w-5 h-5" />
                      </a>
                      {isAdmin && (
                        <button onClick={() => handleDelete(file.id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(file => (
            <div key={file.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col items-center text-center space-y-4 group">
              <div className={`p-5 rounded-2xl ${file.type === 'link' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                {file.type === 'link' ? <LinkIcon className="w-10 h-10" /> : <FileText className="w-10 h-10" />}
              </div>
              <h4 className="font-bold text-slate-800 line-clamp-2 min-h-[3rem]">{file.name}</h4>
              <p className="text-xs font-bold text-slate-400">{file.date}</p>
              <div className="w-full grid grid-cols-2 gap-2 mt-auto">
                <a href={file.url} className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-[#0f172a] rounded-2xl font-bold hover:bg-[#10b981] hover:text-white transition">
                  {file.type === 'link' ? 'زيارة' : 'تحميل'}
                </a>
                {isAdmin && (
                  <button onClick={() => handleDelete(file.id)} className="flex items-center justify-center py-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6">
            <h2 className="text-2xl font-black text-slate-800">إضافة مورد جديد</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">نوع المورد</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setNewItem({...newItem, type: 'pdf'})} className={`p-3 rounded-xl border-2 font-bold transition ${newItem.type === 'pdf' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}>ملف PDF</button>
                  <button type="button" onClick={() => setNewItem({...newItem, type: 'link'})} className={`p-3 rounded-xl border-2 font-bold transition ${newItem.type === 'link' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-400'}`}>رابط خارجي</button>
                </div>
              </div>
              <input 
                placeholder="عنوان المورد..." 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" 
                required
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
              />
              <input 
                placeholder={newItem.type === 'link' ? "https://..." : "اسم الملف مع الامتداد..."}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" 
                required
                value={newItem.url}
                onChange={e => setNewItem({...newItem, url: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button type="submit" className="py-4 bg-[#10b981] text-white rounded-2xl font-bold">إضافة</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
