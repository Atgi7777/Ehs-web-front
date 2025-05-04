import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { parseJwt } from '../../utils/jwt'

const AddOrgAdmin = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profile: null, // 🆕
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, profile: e.target.files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('systemAdminToken')
      const decoded = parseJwt(token)

      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('systemAdminID', decoded.id)
      formData.append('organizationId', id)
      if (form.profile) {
        formData.append('adminProfile', form.profile)
        
      }

      

      const response = await fetch(`http://localhost:5050/api/auth/add-admin-to-organization/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })


      const data = await response.json()
      if (!response.ok) {
        alert(data.message || 'Админ нэмэхэд алдаа гарлаа')
        return
      }

      alert('Амжилттай нэмэгдлээ!')
      navigate(`/system-admin/organization/${id}`)
    } catch (err) {
      console.error('Алдаа:', err)
      alert('Сервертэй холбогдож чадсангүй')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-8 rounded-xl shadow border">
      <h2 className="text-2xl font-bold text-center mb-4">Add Organization Admin</h2>
      <p className="text-center text-sm text-gray-500 mb-6">Org ID: <strong>{id}</strong></p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#23476A] text-white px-6 py-2 rounded-md hover:bg-[#223a5c]"
          >
            Create Admin
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddOrgAdmin
