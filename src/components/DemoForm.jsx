import { useState } from 'react'
import { useLeads } from '../context/LeadContext'
import { CheckCircle } from 'lucide-react'

const DemoForm = () => {
  const { submitLead } = useLeads()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    companySize: '',
    message: '',
  })

  const validate = () => {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format'
    if (!form.company.trim()) newErrors.company = 'Company name is required'
    if (!form.companySize) newErrors.companySize = 'Please select company size'
    if (!form.message.trim()) newErrors.message = 'Please describe your needs'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    try {
      setLoading(true)
      await submitLead(form)
      setSubmitted(true)
    } catch (err) {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="demo" className="bg-[#080812] py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Request received! 🎉</h3>
          <p className="text-white/45 text-sm leading-relaxed">
            Thanks <span className="text-white font-medium">{form.fullName}</span>! Our team will reach out to <span className="text-indigo-400">{form.email}</span> within 24 hours.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="demo" className="bg-[#080812] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">✦ Get Started</p>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            Request a free demo
          </h2>
          <p className="text-white/40 text-base">
            See HireFlow AI in action — we'll reach out within 24 hours
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto glass rounded-2xl p-8 border border-white/[0.07]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs text-white/50 mb-2 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="input-dark"
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-white/50 mb-2 font-medium">
                Work Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                className="input-dark"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs text-white/50 mb-2 font-medium">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="input-dark"
              />
              {errors.company && (
                <p className="text-red-400 text-xs mt-1">{errors.company}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs text-white/50 mb-2 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="input-dark"
              />
            </div>
          </div>

          {/* Company Size */}
          <div className="mb-5">
            <label className="block text-xs text-white/50 mb-2 font-medium">
              Company Size *
            </label>
            <select
              name="companySize"
              value={form.companySize}
              onChange={handleChange}
              className="input-dark"
            >
              <option value="" className="bg-[#080812]">Select company size</option>
              <option value="1-10" className="bg-[#080812]">1–10 employees</option>
              <option value="11-50" className="bg-[#080812]">11–50 employees</option>
              <option value="51-200" className="bg-[#080812]">51–200 employees</option>
              <option value="200+" className="bg-[#080812]">200+ employees</option>
            </select>
            {errors.companySize && (
              <p className="text-red-400 text-xs mt-1">{errors.companySize}</p>
            )}
          </div>

          {/* Message */}
          <div className="mb-7">
            <label className="block text-xs text-white/50 mb-2 font-medium">
              Tell us about your hiring needs *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="We're hiring 20 engineers this quarter and need help screening resumes..."
              rows={4}
              className="input-dark resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              '🚀 Request Demo — It\'s Free'
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

export default DemoForm