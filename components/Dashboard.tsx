import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, GraduationCap, FileText, Activity } from 'lucide-react';

const data = [
  { name: 'يناير', students: 4000, docs: 2400 },
  { name: 'فبراير', students: 3000, docs: 1398 },
  { name: 'مارس', students: 2000, docs: 9800 },
  { name: 'أبريل', students: 2780, docs: 3908 },
  { name: 'مايو', students: 1890, docs: 4800 },
  { name: 'يونيو', students: 2390, docs: 3800 },
];

const pieData = [
  { name: 'تعليم تقني', value: 400 },
  { name: 'تعليم مزدوج', value: 300 },
  { name: 'تدريب مهني', value: 300 },
  { name: 'أخرى', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">لوحة البيانات التحليلية</h2>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">مباشر</span>
           <span className="text-slate-400 text-sm">آخر تحديث: منذ دقيقتين</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الطلاب" value="1,204,500" icon={Users} color="bg-blue-500" />
        <StatCard title="المدارس الفنية" value="2,340" icon={GraduationCap} color="bg-emerald-500" />
        <StatCard title="الوثائق المؤرشفة" value="45,210" icon={FileText} color="bg-purple-500" />
        <StatCard title="معدل النمو" value="+12.5%" icon={Activity} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">نشاط المكتبة (شهري)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3b82f6" name="الطلاب" radius={[4, 4, 0, 0]} />
              <Bar dataKey="docs" fill="#10b981" name="الوثائق" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">توزيع التخصصات</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};