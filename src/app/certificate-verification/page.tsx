'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Search, CheckCircle2, XCircle, Award, Calendar, Clock, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';

export default function CertificateVerificationPage() {
  const [certId, setCertId] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    searched: boolean;
    valid: boolean;
    studentName?: string;
    programTitle?: string;
    durationDays?: number;
    issueDate?: string;
  } | null>(null);

  // Read certificate ID from URL if provided
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get('id');
      if (urlId) {
        setCertId(urlId);
        handleVerify(urlId);
      }
    }
  }, []);

  const handleVerify = (idToVerify: string = certId) => {
    const trimmedId = idToVerify.trim();
    if (!trimmedId) return;

    const result = dbService.verifyCertificate(trimmedId);
    setVerificationResult({
      searched: true,
      valid: result.valid,
      studentName: result.studentName,
      programTitle: result.programTitle,
      durationDays: result.durationDays,
      issueDate: result.issueDate
    });
  };

  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <Badge variant="cyan" className="w-fit mx-auto">CREDENTIAL REGISTRY</Badge>
          <h1 className="text-4xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
            Certificate Verification
          </h1>
          <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
            Verify the validity and integrity of CYBRIXON cybersecurity digital credentials.
          </p>
        </Container>
      </section>

      {/* VERIFICATION FORM */}
      <section className="py-20 bg-white">
        <Container className="max-w-2xl">
          
          <div className="space-y-8">
            
            {/* Input card */}
            <Card variant="light" className="p-6 md:p-8 border border-slate-200 shadow-md">
              <h3 className="font-manrope font-bold text-base md:text-lg text-brand-dark mb-4 text-center">
                Enter Certificate Verification ID
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. CYB-2026-000145"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm focus:border-brand-blue font-mono"
                  />
                </div>
                <Button 
                  onClick={() => handleVerify()} 
                  variant="primary"
                  className="px-6 py-3"
                  glow
                >
                  Verify Certificate
                </Button>
              </div>

              <div className="mt-4 p-3 bg-slate-100 rounded-lg text-[10px] text-text-light-secondary text-center leading-normal">
                *Demo note: Try entering the default valid verification key: <strong className="font-mono text-brand-blue">CYB-2026-000145</strong>
              </div>
            </Card>

            {/* Verification Result Display */}
            {verificationResult && verificationResult.searched && (
              <div className="animate-fade-in">
                {verificationResult.valid ? (
                  // Valid Certificate Card
                  <Card variant="light" className="border-2 border-emerald-500 bg-emerald-50/20 overflow-hidden shadow-lg">
                    
                    {/* Header Banner */}
                    <div className="bg-emerald-500 text-white p-4 flex items-center gap-3">
                      <CheckCircle2 className="w-5.5 h-5.5" />
                      <span className="font-manrope font-bold text-sm">Verified Credentials Authenticated</span>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                      <div className="flex flex-col items-center text-center gap-2">
                        <Award className="w-12 h-12 text-emerald-600 mb-2" />
                        <h4 className="font-manrope font-extrabold text-xl text-brand-dark">
                          {verificationResult.studentName}
                        </h4>
                        <span className="text-xs text-text-light-secondary">Student Name</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 text-xs md:text-sm">
                        <div className="flex flex-col gap-1 text-center md:text-left">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Internship Program</span>
                          <span className="font-semibold text-brand-dark">{verificationResult.programTitle}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Duration</span>
                          <span className="font-semibold text-brand-dark">{verificationResult.durationDays} Days</span>
                        </div>
                        <div className="flex flex-col gap-1 text-center md:text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Issue Date</span>
                          <span className="font-semibold text-brand-dark">{verificationResult.issueDate}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-100 rounded-xl flex items-center justify-between text-xs text-text-light-secondary font-mono">
                        <span>Credential ID:</span>
                        <span className="font-bold text-brand-dark">{certId}</span>
                      </div>
                    </div>

                  </Card>
                ) : (
                  // Invalid Certificate Card
                  <Card variant="light" className="border-2 border-red-500 bg-red-50/20 p-6 md:p-8 flex flex-col items-center text-center gap-4 shadow-md">
                    <XCircle className="w-12 h-12 text-error" />
                    <div>
                      <h4 className="font-manrope font-extrabold text-lg text-red-950 mb-1">
                        Certificate Not Found or Invalid
                      </h4>
                      <p className="text-xs text-text-light-secondary max-w-sm leading-relaxed">
                        The verification token you provided does not match any active digital security registry serials. Check for spelling errors or contact admissions support.
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Privacy notice */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-text-light-secondary leading-normal">
              <span className="font-semibold block mb-0.5">Privacy Safeguard Notice</span>
              To comply with student confidentiality rules, our verification engine only discloses the certificate status, student name, internship program, and issue date. We never expose student performance scores, submission documents, contact details, or profile images.
            </div>

          </div>

        </Container>
      </section>

      <Footer />
    </>
  );
}
