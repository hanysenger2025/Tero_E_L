
import React from 'react';
import { QUICK_STATS, MOCK_FILES } from '../constants';
import { ArrowLeft, FileText, TrendingUp, Clock, Search } from 'lucide-react';

export const Home: React.FC<{ onNavigate: (catId: string, subId?: string) => void }> = ({ onNavigate }) => {
  const recentFiles = Object.values(MOCK_FILES).flat().slice(0, 5);

  return (
    <div className="p-8 space-y-10 animate-fade-in max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-600 p-10 text-white shadow-xl">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight">مكتبة TERO الرقمية</h1>
          <p className="text-emerald-50 text-lg leading-relaxed">
            المرجع الشامل لوثائق إصلاح التعليم الفني في مصر. ابحث عن المناهج، الدراسات، والسياسات في مكان واحد.
          </p>
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => onNavigate('tech-edu-all')}
              className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition flex items-center gap-2"
            >
              استعراض المناهج <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="absolute left-[-5%] top-[-20%] w-[40%] h-[150%] bg-white/10 rotate-12 blur-3xl rounded-full" />
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {QUICK_STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-emerald-200 transition">
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${
                stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600">
              <stat.icon className="w-8 h-8" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Documents */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              أحدث الوثائق المضافة
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-50">
              {recentFiles.map((file) => (
                <div key={file.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition">{file.name}</h4>
                      <p className="text-xs text-slate-500">{file.category} • {file.date}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-emerald-600">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            روابط سريعة
          </h2>
          <div className="grid gap-3">
             {[
               { title: 'دليل الجدارات 2024', color: 'bg-blue-500', id: 'green-comp' },
               { title: 'خارطة طريق الرقمية', color: 'bg-purple-500', id: 'digitization-plan' },
               { title: 'إحصائيات سوق العمل', color: 'bg-orange-500', id: 'market-data' },
             ].map((item, idx) => (
               <button 
                 key={idx}
                 onClick={() => onNavigate(item.id)}
                 className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition text-right w-full"
               >
                 <div className={`w-2 h-10 rounded-full ${item.color}`} />
                 <span className="font-bold text-slate-700">{item.title}</span>
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
