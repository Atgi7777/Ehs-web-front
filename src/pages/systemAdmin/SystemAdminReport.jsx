import React from 'react'
//api тай холбохгүй дараа нь холбуул холбий хха
const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Системийн админы тайлангийн хяналт</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Байгууллагын тойм */}
        <ReportCard
          title="Байгууллагын тойм"
          stats={[
            { label: 'Нийт байгууллага', value: 35 },
            { label: 'Бүртгэлтэй админ', value: 30 },
            { label: 'ХАБ инженертэй', value: 27 },
          ]}
        />

        {/* Ажилтны сургалт */}
        <ReportCard
          title="Ажилтны сургалтын явц"
          stats={[
            { label: 'Сургалтад хамрагдсан', value: '85%' },
            { label: 'Гарын үсэг зурсан', value: '3200' },
            { label: 'Танилцаагүй ажилтан', value: 184 },
          ]}
        />

        {/* ХАБ инженерийн идэвхи */}
        <ReportCard
          title="ХАБ инженерийн идэвхи"
          stats={[
            { label: 'Үүсгэсэн заавар', value: 142 },
            { label: 'Засварласан', value: 45 },
            { label: 'Бүлэг үүсгэсэн', value: 18 },
          ]}
        />

        {/* Заавар, зөвлөмжийн хэрэглээ */}
        <ReportCard
          title="Заавар, зөвлөмж"
          stats={[
            { label: 'Нийт заавар', value: 210 },
            { label: 'Хамгийн түгээмэл', value: 'Галын аюулгүй байдал' },
            { label: 'Сүүлд танилцсан', value: '3 минутын өмнө' },
          ]}
        />

        {/* Өдөр тутмын тайлан */}
        <ReportCard
          title="Өдөр тутмын зааврын хяналт"
          stats={[
            { label: 'Өнөөдөр гарын үсэг зурсан', value: 728 },
            { label: 'GPS баталгаажуулалт', value: '95%' },
            { label: 'Танилцуулаагүй өдөр', value: 2 },
          ]}
        />

        {/* Хэрэглэгчийн үйлдлийн лог */}
        <ReportCard
          title="Үйлдлийн бүртгэл"
          stats={[
            { label: 'Сүүлд өөрчилсөн', value: 'Admin Бат' },
            { label: 'IP хандалт', value: '192.168.1.15' },
            { label: 'Өчигдөр нийт үйлдэл', value: 324 },
          ]}
        />
      </div>
    </div>
  )
}

const ReportCard = ({ title, stats }) => {
  return (
    <div className="bg-white border rounded-xl shadow p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <ul className="space-y-2">
        {stats.map((item, index) => (
          <li key={index} className="flex justify-between text-sm text-gray-700">
            <span>{item.label}</span>
            <span className="font-semibold">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminDashboard
