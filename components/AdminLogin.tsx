
import React, { useState } from 'react';
import { Lock, X, Key, Mail, RefreshCw } from 'lucide-react';
import { ADMIN_EMAIL } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (pass: string) => boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  onChangePassword: (old: string, next: string) => boolean;
}

export const AdminPortal: React.FC<Props> = ({ isOpen, onClose, onLogin, isLoggedIn, onLogout, onChangePassword }) => {
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'settings' | 'forgot'>('login');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      setMode('settings');
      setPassword('');
      setError('');
    } else {
      setError('كلمة السر غير صحيحة');
    }
  };

  const handleChangePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (onChangePassword(oldPass, newPass)) {
      alert('تم تغيير كلمة السر بنجاح');
      setOldPass('');
      setNewPass('');
      setMode('settings');
    } else {
      setError('كلمة السر القديمة غير صحيحة');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md font-cairo">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-[#0f172a] p-6 text-white flex justify-between items-center border-b border-[#b8860b]">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#b8860b]" />
            بوابة الإدارة
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {error && <p className="text-red-500 bg-red-50 p-3 rounded-xl mb-4 text-sm font-bold text-center border border-red-100">{error}</p>}

          {!isLoggedIn ? (
            mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">كلمة مرور الإدارة</label>
                  <input
                    type="password"
                    autoFocus
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#10b981] outline-none text-center text-lg tracking-widest"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-bold hover:bg-[#1e293b] transition-all flex items-center justify-center gap-2">
                  <Key className="w-5 h-5 text-[#b8860b]" /> دخول
                </button>
                <button 
                  type="button" 
                  onClick={() => setMode('forgot')}
                  className="w-full text-slate-400 text-sm hover:text-[#b8860b]"
                >
                  نسيت كلمة السر؟
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 font-medium">لاستعادة كلمة السر، يرجى التواصل مع:</p>
                  <a href={`mailto:${ADMIN_EMAIL}`} className="text-[#b8860b] font-bold block">{ADMIN_EMAIL}</a>
                </div>
                <button onClick={() => setMode('login')} className="text-emerald-600 font-bold">العودة للدخول</button>
              </div>
            )
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
                <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold">أهلاً، مدير النظام</p>
                  <p className="text-xs opacity-80">يمكنك الآن إضافة وتعديل الملفات</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-800 mb-4">تغيير كلمة السر</h3>
                <form onSubmit={handleChangePass} className="space-y-4">
                  <input
                    type="password"
                    placeholder="كلمة السر الحالية"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="كلمة السر الجديدة"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                  <button type="submit" className="w-full py-3 bg-[#b8860b] text-white rounded-xl font-bold">حفظ التغييرات</button>
                </form>
              </div>

              <button 
                onClick={onLogout}
                className="w-full py-3 border-2 border-red-100 text-red-500 rounded-xl font-bold hover:bg-red-50 transition"
              >
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
