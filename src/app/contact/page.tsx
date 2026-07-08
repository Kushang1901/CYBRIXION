'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, Clock, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const contactFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Full Name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Provide a valid email address.' }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: 'Select a subject inquiry category.' }),
  message: z.string().min(10, { message: 'Message details must be at least 10 characters.' })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: 'Program Inquiry',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Contact inquiry submitted successfully:', data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <Badge variant="cyan" className="w-fit mx-auto">CONTACT SUPPORT</Badge>
          <h1 className="text-4xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
            Connect With Admissions
          </h1>
          <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
            Reach out regarding enrollment details, cohort schedule dates, certificate issues, or corporate partnership arrangements.
          </p>
        </Container>
      </section>

      {/* CONTACT BODY */}
      <section className="py-20 bg-white">
        <Container>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: 60% Form */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col gap-4 text-emerald-800">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  <div>
                    <h4 className="font-manrope font-extrabold text-lg text-emerald-900 mb-1">Inquiry Submitted Successfully</h4>
                    <p className="text-xs md:text-sm leading-relaxed">
                      Thank you for contacting CYBRIXON. Our support team has logged your inquiry and will follow up at the registered email address within 24 business hours.
                    </p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-fit mt-2 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <Card variant="light" className="p-8 border border-slate-200 shadow-md">
                  <h3 className="font-manrope font-bold text-xl text-brand-dark mb-6">Send an Inquiry</h3>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name *</label>
                      <input 
                        id="fullName" 
                        type="text" 
                        placeholder="e.g. Aarav Sharma"
                        className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                        {...register('fullName')}
                      />
                      {errors.fullName && <span className="text-[10px] text-error font-medium">{errors.fullName.message}</span>}
                    </div>

                    {/* Email & Phone grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address *</label>
                        <input 
                          id="email" 
                          type="email" 
                          placeholder="e.g. aarav.sharma@gmail.com"
                          className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                          {...register('email')}
                        />
                        {errors.email && <span className="text-[10px] text-error font-medium">{errors.email.message}</span>}
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone Number (Optional)</label>
                        <input 
                          id="phone" 
                          type="tel" 
                          placeholder="e.g. +91 98765 43210"
                          className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                          {...register('phone')}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Inquiry Subject *</label>
                      <select 
                        id="subject"
                        className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                        {...register('subject')}
                      >
                        <option value="Program Inquiry">Program Inquiry / Admissions</option>
                        <option value="Enrollment Support">Enrollment / Payment Support</option>
                        <option value="Technical Support">Technical Dashboard Support</option>
                        <option value="Certificate Query">Certificate Verification Query</option>
                        <option value="Partnership">Corporate Partnership</option>
                        <option value="Other">Other Category</option>
                      </select>
                      {errors.subject && <span className="text-[10px] text-error font-medium">{errors.subject.message}</span>}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Message Details *</label>
                      <textarea 
                        id="message" 
                        rows={5}
                        placeholder="Write your question details here..."
                        className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm focus:border-brand-blue resize-y"
                        {...register('message')}
                      />
                      {errors.message && <span className="text-[10px] text-error font-medium">{errors.message.message}</span>}
                    </div>

                    {/* Rate Limit Note */}
                    <div className="p-3 bg-slate-100 rounded-lg text-[10px] text-text-light-secondary leading-normal flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      Our contact endpoints are configured with rate limit safeguards to prevent automated spamming. Only submit valid technical and admissions inquiries.
                    </div>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full flex justify-center items-center" 
                      disabled={isSubmitting}
                      glow
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4.5 h-4.5" />
                    </Button>

                  </form>
                </Card>
              )}
            </div>

            {/* RIGHT COLUMN: 40% Support Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* General support */}
              <Card variant="light" className="p-6 border border-slate-200 flex flex-col gap-4">
                <h4 className="font-manrope font-bold text-base text-brand-dark border-b border-slate-100 pb-2">Support Channels</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-brand-dark block">Admissions Email</span>
                      <span className="text-xs text-text-light-secondary">support@cybrixon-placeholder.edu</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-brand-dark block">Office Support Hours</span>
                      <span className="text-xs text-text-light-secondary">Mon-Fri, 9:00 AM - 6:00 PM IST</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-brand-dark block">Response Standards</span>
                      <span className="text-xs text-text-light-secondary">Usually replies within 1 business day.</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Ethical Warning */}
              <div className="p-6 bg-brand-navy border border-slate-800 rounded-2xl text-white bg-grid-pattern relative overflow-hidden">
                <h4 className="font-manrope font-bold text-sm text-brand-cyan mb-2">Ethical Use Guidelines</h4>
                <p className="text-[11px] text-text-dark-secondary leading-relaxed">
                  Support staff cannot provide assistance with, nor answer questions about, scanning or hacking targets outside our authorized laboratory scope. We strictly adhere to defensive teaching boundaries.
                </p>
              </div>

            </div>

          </div>

        </Container>
      </section>

      <Footer />
    </>
  );
}
