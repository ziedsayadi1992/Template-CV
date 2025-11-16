import React, { useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Award,
  Briefcase,
  Code,
  Languages as LanguagesIcon,
  FileText,
  Layers
} from 'lucide-react';
import type { CVData, CustomSection } from '../types';

interface PrintableCVContentProps {
  data: CVData;
  activeSection?: string;
}

const PrintableCVContent = React.forwardRef<HTMLDivElement, PrintableCVContentProps>(
  ({ data, activeSection }, ref) => {

    // ✅ FIX: Map "contact" to "personal" since contact info is part of personal header
    useEffect(() => {
      if (!activeSection) return;
      
      // Map "contact" to "personal" since contact info is displayed in the personal header
      const scrollToSection = activeSection === 'contact' ? 'personal' : activeSection;
      
      const el = document.getElementById("preview-" + scrollToSection);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        console.log(`Scrolled to section: ${scrollToSection} (from activeSection: ${activeSection})`);
      }
    }, [activeSection]);

    // ✅ FIX: Helper to safely get section titles with fallbacks
    const getSectionTitle = (titleKey: keyof typeof data.sectionTitles, fallback: string): string => {
      const title = data.sectionTitles?.[titleKey];
      if (!title || title.trim() === '' || title === 'null' || title === 'undefined') {
        console.warn(`⚠️ Missing section title for "${titleKey}", using fallback: "${fallback}"`);
        return fallback;
      }
      return title;
    };

    const renderPersonalSection = () => (
      <header className="header text-center mb-8" id="preview-personal">
        {data.personalInfo.avatarUrl && (
          <div className="mb-6">
            <img
              src={data.personalInfo.avatarUrl}
              alt={`${data.personalInfo.fullName} - Photo`}
              className="avatar w-32 h-32 rounded-full mx-auto border-2 border-gray-400 shadow-lg object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {data.personalInfo.fullName}
        </h1>
        <h2 className="text-xl text-gray-800 font-medium mb-6">
          {data.personalInfo.professionalTitle}
        </h2>

        <div className="contact-info flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {/* ✅ NEW: Use dynamic fields if available, respecting user's custom order */}
          {data.contact.fields && data.contact.fields.length > 0 ? (
            data.contact.fields.map((field) => {
              if (!field.value) return null;
              
              // Map field types to icons
              const iconMap: { [key: string]: any } = {
                email: Mail,
                phone: Phone,
                location: MapPin,
                github: Github,
                linkedin: Linkedin,
                website: Layers,
                custom: FileText,
              };
              
              const Icon = iconMap[field.type] || Mail;
              
              return (
                <div key={field.id} className="contact-item flex items-center gap-2">
                  <Icon size={16} className="text-gray-800" />
                  <span>{field.value}</span>
                </div>
              );
            })
          ) : (
            // Legacy field rendering (fallback)
            <>
              {data.contact.email && (
                <div className="contact-item flex items-center gap-2">
                  <Mail size={16} className="text-gray-800" />
                  <span>{data.contact.email}</span>
                </div>
              )}
              {data.contact.phone && (
                <div className="contact-item flex items-center gap-2">
                  <Phone size={16} className="text-gray-800" />
                  <span>{data.contact.phone}</span>
                </div>
              )}
              {data.contact.location && (
                <div className="contact-item flex items-center gap-2">
                  <MapPin size={16} className="text-gray-800" />
                  <span>{data.contact.location}</span>
                </div>
              )}
              {data.contact.github && (
                <div className="contact-item flex items-center gap-2">
                  <Github size={16} className="text-gray-800" />
                  <span>{data.contact.github}</span>
                </div>
              )}
              {data.contact.linkedin && (
                <div className="contact-item flex items-center gap-2">
                  <Linkedin size={16} className="text-gray-800" />
                  <span>{data.contact.linkedin}</span>
                </div>
              )}
            </>
          )}
        </div>
      </header>
    );

    const renderProfileSection = () => {
      if (!data.profile) return null;
      return (
        <section id="preview-profile">
          <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
            <FileText size={22} />
            {getSectionTitle('profile', 'Professional Profile')}
          </h3>
          <div className="profile-content bg-gray-50 border-l-4 border-gray-800 pl-6 py-4 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed text-justify">
              {data.profile}
            </p>
          </div>
        </section>
      );
    };

    // ✅ UPDATED: Skills rendering with ID support
    const renderSkillsSection = () => {
      if (!data.skills || data.skills.length === 0) return null;
      return (
        <section id="preview-skills">
          <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
            <Layers size={22} />
            {getSectionTitle('skills', 'Skills')}
          </h3>
          <div className="space-y-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{skill.value}</span>
              </div>
            ))}
          </div>
        </section>
      );
    };

    const renderTechnologiesSection = () => {
      if (!data.technologies || data.technologies.length === 0) return null;
      return (
        <section id="preview-technologies">
          <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
            <Code size={22} />
            {getSectionTitle('technologies', 'Technical Environment')}
          </h3>
          <div className="tech-categories space-y-6">
            {data.technologies.map((techCategory) => (
              <div key={techCategory.id} className="tech-category">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">
                  {techCategory.title}
                </h4>
                <div className="tech-items">
                  <p className="text-gray-700 leading-relaxed">
                    {techCategory.items}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    };

    const renderExperiencesSection = () => {
      if (!data.experiences || data.experiences.length === 0) return null;
      return (
        <section id="preview-experiences">
          <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
            <Briefcase size={22} />
            {getSectionTitle('experiences', 'Professional Experience')}
          </h3>
          <div className="space-y-8">
            {data.experiences.map((experience) => (
              <div key={experience.id} className="experience-item border-l-4 border-gray-300 pl-6">
                <div className="mb-3">
                  <h4 className="text-lg font-bold text-gray-800">{experience.jobTitle}</h4>
                  <p className="text-gray-600 font-medium">{experience.company}</p>
                </div>
                <ul className="space-y-2 text-sm">
                  {experience.missions.map((mission, missionIndex) => (
                    <li key={missionIndex}>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{mission}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );
    };

    // ✅ UPDATED: Certifications rendering with ID support
    const renderCertificationsSection = () => {
      if (!data.certifications || data.certifications.length === 0) return null;
      return (
        <section id="preview-certifications">
          <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
            <Award size={22} />
            {getSectionTitle('certifications', 'Certifications')}
          </h3>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="cert-item flex items-start gap-3">
                <Award size={16} className="text-gray-800 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    };

    // ✅ UPDATED: Languages rendering with ID support
    const renderLanguagesSection = () => {
      if (!data.languages || data.languages.length === 0) return null;
      return (
        <section id="preview-languages">
          <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
            <LanguagesIcon size={22} />
            {getSectionTitle('languages', 'Languages')}
          </h3>
          <div className="space-y-3">
            {data.languages.map((language) => (
              <div key={language.id} className="language-item flex items-center gap-3">
                <div>
                  <span className="font-medium text-gray-800">{language.name}</span>
                  <span className="text-gray-600 ml-2">- {language.level}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    };

    // ✅ UPDATED: Custom section rendering with block ID support
    const renderCustomSection = (section: CustomSection) => (
      <section key={section.id} id={`preview-${section.id}`}>
        <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
          <Layers size={22} />
          {section.title}
        </h3>
        {section.subtitle && (
          <p className="text-gray-600 italic mb-3">{section.subtitle}</p>
        )}
        <div className="space-y-3">
          {section.blocks.map((block) => (
            <div key={block.id} className="text-gray-700 leading-relaxed">
              {block.content}
            </div>
          ))}
        </div>
      </section>
    );

    const sectionMap: { [key: string]: () => React.ReactNode } = {
      personal: renderPersonalSection,
      profile: renderProfileSection,
      skills: renderSkillsSection,
      technologies: renderTechnologiesSection,
      experiences: renderExperiencesSection,
      certifications: renderCertificationsSection,
      languages: renderLanguagesSection,
    };

    return (
      <div
        ref={ref}
        className="cv-container max-w-4xl mx-auto bg-white shadow-2xl relative z-10 print:shadow-none print:max-w-none print:m-0"
        style={{ minHeight: '29.7cm', width: '21cm', margin: '2rem auto', padding: '2rem' }}
      >
        <div className="page-number print:block hidden"></div>

        <div className="space-y-8">
          {data.sectionOrder && data.sectionOrder.length > 0 ? (
            data.sectionOrder.map((sectionId, index) => {
              if (sectionId.startsWith('custom-')) {
                const customSection = data.customSections?.find(s => s.id === sectionId);
                return customSection ? (
                  <div key={sectionId}>
                    {renderCustomSection(customSection)}
                  </div>
                ) : null;
              }

              const renderFunc = sectionMap[sectionId];
              return renderFunc ? (
                <div key={sectionId}>
                  {renderFunc()}
                </div>
              ) : null;
            })
          ) : (
            <>
              {renderPersonalSection()}
              {renderProfileSection()}
              {renderSkillsSection()}
              {renderTechnologiesSection()}
              {renderExperiencesSection()}
              {renderCertificationsSection()}
              {renderLanguagesSection()}
            </>
          )}
        </div>
      </div>
    );
  }
);

PrintableCVContent.displayName = 'PrintableCVContent';

export default PrintableCVContent;