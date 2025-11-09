"use client";
// components/RegisterForm.tsx
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import styles from '../../styles/RegisterForm.module.css';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const courses = [
  "اختر الدورة",
  "دورة تعلم القرآن الكريم",
  "دورة العلوم الشرعية",
  "دورة اللغة العربية",
  "دورة التجويد والتفسير",
];

const RegisterForm: React.FC = () => {
  // State for form fields (example, can be expanded for more validation)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [studyType, setStudyType] = useState("عن بعد (أونلاين)");
  const [isSending, setIsSending] = useState(false);
  const [mounted, setMounted] = useState(false);

  // mark mounted to avoid hydration mismatches caused by browser extensions
  useEffect(() => {
    setMounted(true);
  }, []);

  // "Send Email" Function — use templateParams for clarity and robust mapping
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSending(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID ?? '';

    const templateParams = {
      name: fullName,
      email,
      phone,
      course: selectedCourse,
      studyType,
      subject: `تسجيل جديد - ${selectedCourse}`,
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const result = await emailjs.send(serviceId, templateId, templateParams, userId);
      toast.success('تم إرسال الطلب بنجاح');
      console.log(result.text);

      // clear controlled state so UI updates
      setFullName('');
      setEmail('');
      setPhone('');
      setSelectedCourse(courses[0]);
      setStudyType('عن بعد (أونلاين)');

      // reset native form as a safe fallback
      try { form.reset(); } catch {}
    } catch (error: any) {
      const msg = error?.text || error?.message || 'حدث خطأ أثناء الإرسال';
      toast.error(msg);
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="contacts" className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row rtl" dir="rtl">
        {/* Left side - Green panel */}
        <div className={`md:w-1/2 text-white p-10 flex flex-col justify-center items-center gap-8 text-center ${styles.leftPanel}`}>
          <div className="bg-white rounded-full p-2">
            <img src="/assets/images/logo.png" alt="منارة الهدى" className="logo" />
          </div>

          <h2 className="text-2xl font-semibold">ابدأ رحلة التعلم اليوم</h2>
          <p className="text-sm">
            انضم إلى آلاف الطلاب الذين استفادوا من دوراتنا التعليمية المتميزة في تعلم القرآن الكريم والعلوم الشرعية
          </p>

          {/* Social icons */}
          <div className="flex justify-evenly w-full max-w-xs mt-4 space-x-4">
            <a href="https://www.facebook.com/share/14U5UxgcJpV/" aria-label="Facebook" className="hover:text-gray-300">
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="https://wa.me/201032372337" aria-label="WhatsApp" className="hover:text-gray-300">
              <FaWhatsapp className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com/channel/UCw4QjK5mOvi_D8l4AmRhb5A" aria-label="YouTube" className="hover:text-gray-300">
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 p-10">
          <h3 className="text-green-800 text-2xl font-medium mb-6">سجل الآن</h3>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            املأ النموذج التالي للتسجيل في إحدى دوراتنا، وسيتواصل معك أحد ممثلي خدمة العملاء في أقرب وقت ممكن
          </p>
          {mounted ? (
            <form onSubmit={sendEmail} className="flex flex-col gap-4">
            {/* Full Name */}
            <label htmlFor="fullName" className="text-gray-700 text-sm font-semibold">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="الاسم الكامل"
              value={fullName}
              name="name" 
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-3 text-right focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            {/* Email */}
            <label htmlFor="email" className="text-gray-700 text-sm font-semibold">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              placeholder="البريد الإلكتروني"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-3 text-right focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            {/* Phone */}
            <label htmlFor="phone" className="text-gray-700 text-sm font-semibold">
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="رقم الهاتف"
              value={phone}
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-3 text-right focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            {/* Course Select */}
            <label htmlFor="course" className="text-gray-700 text-sm font-semibold">
              الدورة المطلوبة
            </label>
            <select
              id="course"
              name="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-3 text-right focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              {courses.map((course, idx) => (
                <option key={idx} value={course} disabled={idx === 0}>
                  {course}
                </option>
              ))}
            </select>

            {/* Study Type Radios */}
            <div className="mt-4">
              <span className="text-gray-700 text-sm font-semibold">نوع الدراسة</span>
              <div className="flex gap-6 mt-2 justify-start">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="studyType"
                    value="عن بعد (أونلاين)"
                    checked={studyType === "عن بعد (أونلاين)"}
                    onChange={(e) => setStudyType(e.target.value)}
                    className="cursor-pointer"
                  />
                  <span className="text-gray-700 text-sm">عن بعد (أونلاين)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="studyType"
                    value="حضوري (أوفلاين)"
                    checked={studyType === "حضوري (أوفلاين)"}
                    onChange={(e) => setStudyType(e.target.value)}
                    className="cursor-pointer"
                  />
                  <span className="text-gray-700 text-sm">حضوري (أوفلاين)</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className={`button mt-6 rounded-md py-3 font-semibold transition ${isSending ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isSending ? 'جاري الإرسال...' : 'إرسال طلب التسجيل'}
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">جارٍ تحميل النموذج...</p>
              <div className="h-12 bg-gray-100 rounded-md" />
              <div className="h-12 bg-gray-100 rounded-md" />
              <div className="h-12 bg-gray-100 rounded-md" />
              <div className="h-12 bg-gray-100 rounded-md w-1/2" />
              <button disabled className={`mt-6 rounded-md py-3 font-semibold opacity-60 cursor-not-allowed button`}>
                جاري الإرسال...
              </button>
            </div>
          )}
          {/* Toasts */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
