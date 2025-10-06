import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Award,
  Briefcase,
  Code,
  Languages,
  User,
  FileText
} from 'lucide-react';
import type { CVData } from '../types/cv';

interface PrintableCVContentProps {
  data: CVData;
}

const PrintableCVContent = React.forwardRef<HTMLDivElement, PrintableCVContentProps>(
  ({ data }, ref) => {
    return (
      <div 
        ref={ref}
        className="cv-container max-w-4xl mx-auto bg-white shadow-2xl relative z-10 print:shadow-none print:max-w-none print:m-0"
        style={{ minHeight: '29.7cm', width: '21cm', margin: '2rem auto', padding: '2rem' }}
      >
        {/* Page number for print */}
        <div className="page-number print:block hidden"></div>
        
        {/* Header Section */}
        <header className="header text-center mb-8">
          <div className="mb-6">
            <img
              src={data.personalInfo.avatarUrl}
              alt={`${data.personalInfo.fullName} - Photo de profil`}
              className="avatar w-32 h-32 rounded-full mx-auto border-4 border-gray-800 shadow-lg object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {data.personalInfo.fullName}
          </h1>
          <h2 className="text-xl text-gray-800 font-medium mb-6">
            {data.personalInfo.professionalTitle}
          </h2>
          
          <div className="contact-info flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="contact-item flex items-center gap-2">
              <Mail size={16} className="text-gray-800" />
              <span>{data.contact.email}</span>
            </div>
            <div className="contact-item flex items-center gap-2">
              <Phone size={16} className="text-gray-800" />
              <span>{data.contact.phone}</span>
            </div>
            <div className="contact-item flex items-center gap-2">
              <MapPin size={16} className="text-gray-800" />
              <span>{data.contact.location}</span>
            </div>
            <div className="contact-item flex items-center gap-2">
              <Github size={16} className="text-gray-800" />
              <span>{data.contact.github}</span>
            </div>
            <div className="contact-item flex items-center gap-2">
              <Linkedin size={16} className="text-gray-800" />
              <span>{data.contact.linkedin}</span>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {/* Professional Profile Section */}
          <section>
            <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
              <FileText size={22} />
              {data.sectionTitles.profile}
            </h3>
            <div className="profile-content bg-gray-50 border-l-4 border-gray-800 pl-6 py-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed text-justify">
                {data.profile}
              </p>
            </div>
          </section>

          {/* Technologies Section */}

          <section>
            <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
              <Code size={22} />
              {data.sectionTitles.technologies}
            </h3>
            <div className="tech-categories space-y-6">
              {Object.entries(data.technologies).map(([category, techs]) => (
                <div key={category} className="tech-category">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">
                    {category}
                  </h4>
                  <div className="tech-items">
                    <p className="text-gray-700 leading-relaxed">
                      {techs.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Experience Section */}
          <section className="print:break-before-page">
            <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
              <Briefcase size={22} />
              {data.sectionTitles.experiences}
            </h3>
            <div className="space-y-6">
              {data.experiences.map((experience) => (
                <div key={experience.id} className="experience-item border-l-4 border-gray-800 pl-6 relative">
                  <h4 className="job-title text-lg font-bold text-gray-800 mb-1">
                    {experience.jobTitle}
                  </h4>
                  <p className="company-name text-gray-600 italic mb-3 font-medium">
                    {experience.company}
                  </p>
                  <ul className="mission-list space-y-2">
                    {experience.missions.map((mission, index) => (
                      <li key={index} className="mission-item">
                        {mission.startsWith('Stack :') ? (
                          <div className="stack-info bg-gray-50 border-l-4 border-gray-300 pl-4 py-2 mb-3 rounded-r-md">
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                              {mission.split(':')[0]}:
                            </span>
                            <span className="text-gray-700 ml-2">
                              {mission.split(':')[1]?.trim()}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{mission}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
              <Award size={22} />
              {data.sectionTitles.certifications}
            </h3>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                <div key={index} className="cert-item flex items-start gap-3">
                  <Award size={16} className="text-gray-800 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{cert.name}</p>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

            {/* Languages and Certifications Section */}
            <section>
              <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
                <Languages size={22} />
                {data.sectionTitles.languages}
              </h3>
              <div className="space-y-3">
                {data.languages.map((language, index) => (
                  <div key={index} className="language-item flex items-center gap-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <span className="font-medium text-gray-800">{language.name}</span>
                      <span className="text-gray-600 ml-2">- {language.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
        </div>
      </div>
    );
  }
);

PrintableCVContent.displayName = 'PrintableCVContent';

export default PrintableCVContent;