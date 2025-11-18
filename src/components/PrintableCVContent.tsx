import React, { useEffect, useRef } from 'react';
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
  Layers,
  Star
} from 'lucide-react';
import type { CVData, CustomSection } from '../types';

interface PrintableCVContentProps {
  data: CVData;
  activeSection?: string;
}

const PrintableCVContent = React.forwardRef<HTMLDivElement, PrintableCVContentProps>(
  ({ data, activeSection }, ref) => {

    // ✅ FIX: Track previous section to prevent unnecessary scrolls
    const prevActiveSectionRef = useRef<string | undefined>(activeSection);

    // ✅ FIX: Only scroll when activeSection actually changes
    useEffect(() => {
      if (!activeSection) return;
      
      // ✅ CRITICAL FIX: Don't scroll if we're already at this section
      if (prevActiveSectionRef.current === activeSection) {
        return;
      }
      
      // Update the ref
      prevActiveSectionRef.current = activeSection;
      
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
            <>
              {data.contact.fields.map((field) => (
                <div key={field.id} className="contact-item flex items-center gap-2">
                  {field.type === 'email' && <Mail size={16} className="text-gray-800" />}
                  {field.type === 'phone' && <Phone size={16} className="text-gray-800" />}
                  {field.type === 'location' && <MapPin size={16} className="text-gray-800" />}
                  {field.type === 'github' && <Github size={16} className="text-gray-800" />}
                  {field.type === 'linkedin' && <Linkedin size={16} className="text-gray-800" />}
                  {!['email', 'phone', 'location', 'github', 'linkedin'].includes(field.type) && (
                    <span className="text-gray-800">•</span>
                  )}
                  <span>{field.value}</span>
                </div>
              ))}
            </>
          ) : (
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
            {getSectionTitle('technologies', 'Technologies')}
          </h3>
          <div className="space-y-4">
            {data.technologies.map((category) => (
              <div key={category.id} className="category-item space-y-3 border-l-4 px-4 border-gray-400">
                <div className="font-semibold text-gray-800 mb-2">{category.title}</div>
                <div className="text-gray-700 leading-relaxed">{category.items}</div>
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
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="experience-item space-y-3">
                <div className="flex flex-col mb-3">
                  <h4 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h4>
                  <p className="text-md font-semibold text-gray-700">{exp.company}</p>
                </div>
                {exp.missions && exp.missions.length > 0 && (
                  <ul className="space-y-2 border-l-4 px-4 border-gray-400">
                    {exp.missions.map((mission, idx) => (
                      <li key={idx} className="flex items-start gap-3 ">
                        <span className="text-gray-400 mt-1.5">•</span>
                        <span className="text-gray-700 flex-1">{mission}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    };

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
              <div key={cert.id} className="certification-item flex items-center gap-3 space-y-3">
                {/* <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div> */}
                 <Star size={15} className="text-gray-600" />
                <div>
                  <div className="font-medium text-gray-800">{cert.name}</div>
                  <div className="text-sm text-gray-600">{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    };

    const renderLanguagesSection = () => {
      if (!data.languages || data.languages.length === 0) return null;
      return (
        <section id="preview-languages">
          <h3 className="section-title flex items-center gap-3 text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
            <LanguagesIcon size={22} />
            {getSectionTitle('languages', 'Languages')}
          </h3>
          <div className="space-y-2">
            {data.languages.map((language) => (
              <div key={language.id} className="language-item flex items-center gap-3 space-y-3 border-l-4 px-4 border-gray-400">
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
          <p className="font-medium text-gray-800 italic mb-3">{section.subtitle}</p>
        )}
        <div className="space-y-3">
          {section.blocks.map((block) => (
            <div key={block.id} className="text-gray-700 leading-relaxed space-y-3 border-l-4 px-4 border-gray-400">
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
              {data.customSections?.map(section => renderCustomSection(section))}
            </>
          )}
        </div>
      </div>
    );
  }
);

PrintableCVContent.displayName = 'PrintableCVContent';

export default PrintableCVContent;