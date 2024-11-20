import React from 'react'

const TermCondition = () => {
  return (
    <div className="px-4 py-8 md:px-24 md:py-16 bg-gray-50 text-gray-800">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">Terms and Conditions</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-base leading-7">
            Welcome to Maristela&apos;s Restaurant. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
          <p className="text-base leading-7">
            Other than the content you own, under these Terms, Maristela&apos;s Restaurant and/or its licensors own all the intellectual property rights and materials contained in this Website.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Restrictions</h2>
          <p className="text-base leading-7">
            You are specifically restricted from all of the following:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Publishing any Website material in any other media</li>
            <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
            <li>Publicly performing and/or showing any Website material</li>
            <li>Using this Website in any way that is or may be damaging to this Website</li>
            <li>Using this Website in any way that impacts user access to this Website</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Your Privacy</h2>
          <p className="text-base leading-7">
            Please read our Privacy Policy.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="text-base leading-7">
            In no event shall Maristela&apos;s Restaurant, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website.
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermCondition