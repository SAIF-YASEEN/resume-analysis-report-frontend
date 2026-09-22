import React from "react";

import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Apple,
  GraduationCap,
  Languages,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  User,
  Wrench,
  XCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Analysis.css";

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /*
    Expected:
    navigate("/analysis", {
      state: {
        result: response.data
      }
    });
  */

  const result = location.state?.result;
  const data = result?.data;

  if (!data) {
    return (
      <div className="analysis-page">
        <div className="analysis-empty-state">
          <div className="empty-icon">
            <FileText size={30} />
          </div>

          <h1>No analysis found</h1>

          <p>
            Upload and analyze a resume first to view the AI-generated report.
          </p>

          <button className="primary-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={18} />
            Back to Analyzer
          </button>
        </div>
      </div>
    );
  }

  const {
    ats_score = 0,
    ats_feedback = [],
    certifications = [],
    education = [],
    experience = [],
    improvements = [],
    languages = [],
    missing_sections = [],
    personal = {},
    projects = [],
    skills = {},
    strengths = [],
    weaknesses = [],
    summary = "",
  } = data;

  const score = Math.max(0, Math.min(100, Number(ats_score) || 0));

  const getScoreLabel = () => {
    if (score >= 80) return "Strong";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Improvement";
    return "Needs Attention";
  };

  const getScoreClass = () => {
    if (score >= 80) return "score-high";
    if (score >= 60) return "score-medium";
    return "score-low";
  };

  const allSkillGroups = [
    {
      title: "Technical Skills",
      icon: <Code2 size={19} />,
      items: skills.technical || [],
      className: "technical",
    },
    {
      title: "Frameworks & Technologies",
      icon: <Terminal size={19} />,
      items: skills.frameworks || [],
      className: "frameworks",
    },
    {
      title: "Databases",
      icon: <Database size={19} />,
      items: skills.databases || [],
      className: "databases",
    },
    {
      title: "Tools",
      icon: <Wrench size={19} />,
      items: skills.tools || [],
      className: "tools",
    },
    {
      title: "Soft Skills",
      icon: <Sparkles size={19} />,
      items: skills.soft || [],
      className: "soft",
    },
  ];

  return (
    <div className="analysis-page">
      <div className="analysis-background-grid" />
      <div className="analysis-glow analysis-glow-one" />
      <div className="analysis-glow analysis-glow-two" />

      {/* HEADER */}
      <header className="analysis-header">
        <div className="analysis-header-inner">
          <button className="back-button" onClick={() => navigate("/")}>
            <ArrowLeft size={18} />
            <span>Back to Analyzer</span>
          </button>

          <div className="analysis-brand">
            <div className="brand-icon">
              <Sparkles size={17} />
            </div>

            <span>ResumeAI</span>
          </div>

          <div className="analysis-status">
            <span className="status-dot" />
            Analysis Complete
          </div>
        </div>
      </header>

      <main className="analysis-container">
        {/* PAGE INTRO */}
        <section className="analysis-intro">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} />
              AI RESUME ANALYSIS
            </div>

            <h1>
              Your resume
              <span> analysis report</span>
            </h1>

            <p>
              Detailed insights generated from your uploaded resume using AI.
            </p>
          </div>

          <div className="file-badge">
            <FileText size={17} />
            <div>
              <span>Analyzed Resume</span>
              <strong>{result.filename || "Resume"}</strong>
            </div>
          </div>
        </section>

        {/* ATS SCORE + SUMMARY */}
        <section className="top-analysis-grid">
          {/* ATS SCORE */}
          <div className="glass-card score-card">
            <div className="card-heading">
              <div>
                <div className="section-kicker">
                  <Target size={16} />
                  ATS COMPATIBILITY
                </div>

                <h2>Resume Score</h2>
              </div>

              <div className={`score-label ${getScoreClass()}`}>
                {getScoreLabel()}
              </div>
            </div>

            <div className="score-content">
              <div
                className={`score-circle ${getScoreClass()}`}
                style={{
                  "--score": `${score * 3.6}deg`,
                }}
              >
                <div className="score-circle-inner">
                  <strong>{score}</strong>
                  <span>/ 100</span>
                </div>
              </div>

              <div className="score-info">
                <div className="score-number">
                  {score}
                  <small>/100</small>
                </div>

                <p>
                  Your resume received an AI-generated ATS compatibility score
                  based on structure, keywords, formatting, and content quality.
                </p>

                <div className="score-progress">
                  <div
                    className="score-progress-fill"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="glass-card summary-card">
            <div className="card-heading">
              <div>
                <div className="section-kicker">
                  <Sparkles size={16} />
                  AI GENERATED
                </div>

                <h2>Professional Summary</h2>
              </div>
            </div>

            <div className="summary-content">
              <div className="summary-icon">
                <Lightbulb size={21} />
              </div>

              <p>{summary || "No professional summary detected."}</p>
            </div>
          </div>
        </section>

        {/* PERSONAL INFORMATION */}
        <section className="glass-card section-card">
          <div className="section-title">
            <div className="title-icon">
              <User size={20} />
            </div>

            <div>
              <span>PROFILE</span>
              <h2>Personal Information</h2>
            </div>
          </div>

          <div className="personal-grid">
            <div className="personal-item">
              <Mail size={18} />
              <div>
                <span>Email</span>
                <strong>{personal.email || "Not detected"}</strong>
              </div>
            </div>

            <div className="personal-item">
              <Phone size={18} />
              <div>
                <span>Phone</span>
                <strong>{personal.phone || "Not detected"}</strong>
              </div>
            </div>

            <div className="personal-item">
              <MapPin size={18} />
              <div>
                <span>Location</span>
                <strong>{personal.location || "Not detected"}</strong>
              </div>
            </div>

            <div className="personal-item">
              <Apple size={18} />
              <div>
                <span>LinkedIn</span>

                {personal.linkedin ? (
                  <a href={personal.linkedin} target="_blank" rel="noreferrer">
                    View Profile
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <strong>Not detected</strong>
                )}
              </div>
            </div>

            <div className="personal-item">
              <Apple size={18} />
              <div>
                <span>GitHub</span>

                {personal.github ? (
                  <a href={personal.github} target="_blank" rel="noreferrer">
                    View Profile
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <strong>Not detected</strong>
                )}
              </div>
            </div>

            <div className="personal-item">
              <GlobeIcon />
              <div>
                <span>Portfolio</span>

                {personal.portfolio ? (
                  <a href={personal.portfolio} target="_blank" rel="noreferrer">
                    Visit Portfolio
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <strong>Not detected</strong>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="glass-card section-card">
          <div className="section-title">
            <div className="title-icon">
              <Code2 size={20} />
            </div>

            <div>
              <span>TECHNICAL PROFILE</span>
              <h2>Skills & Technologies</h2>
            </div>
          </div>

          <div className="skills-grid">
            {allSkillGroups.map((group) => (
              <div
                className={`skill-group ${group.className}`}
                key={group.title}
              >
                <div className="skill-group-heading">
                  {group.icon}
                  <h3>{group.title}</h3>
                  <span>{group.items.length}</span>
                </div>

                <div className="skill-list">
                  {group.items.length > 0 ? (
                    group.items.map((skill, index) => (
                      <span className="skill-pill" key={`${skill}-${index}`}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="not-detected">No skills detected</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="glass-card section-card">
          <div className="section-title">
            <div className="title-icon">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <span>CAREER HISTORY</span>
              <h2>Work Experience</h2>
            </div>
          </div>

          {experience.length > 0 ? (
            <div className="experience-list">
              {experience.map((job, index) => (
                <div className="experience-item" key={index}>
                  <div className="experience-marker">
                    <div />
                  </div>

                  <div className="experience-content">
                    <div className="experience-top">
                      <div>
                        <h3>{job.job_title || "Position"}</h3>

                        <p className="company-name">
                          {job.company || "Company not detected"}
                        </p>
                      </div>

                      <div className="experience-date">
                        {job.start_date || "—"} <ChevronRight size={13} />
                        {job.current ? "Present" : job.end_date || "—"}
                      </div>
                    </div>

                    {job.location && (
                      <div className="experience-location">
                        <MapPin size={14} />
                        {job.location}
                      </div>
                    )}

                    {job.responsibilities?.length > 0 && (
                      <div className="responsibilities">
                        {job.responsibilities.map((item, i) => (
                          <div className="responsibility" key={i}>
                            <CheckCircle2 size={15} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {job.technologies?.length > 0 && (
                      <div className="experience-tech">
                        <span className="tech-label">Technologies</span>

                        <div className="tech-pills">
                          {job.technologies.map((tech, i) => (
                            <span key={`${tech}-${i}`}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptySection
              icon={<BriefcaseBusiness size={22} />}
              title="No experience detected"
              text="The AI could not identify work experience from this resume."
            />
          )}
        </section>

        {/* EDUCATION + CERTIFICATIONS */}
        <div className="two-column-grid">
          <section className="glass-card section-card">
            <div className="section-title">
              <div className="title-icon">
                <GraduationCap size={20} />
              </div>

              <div>
                <span>ACADEMIC BACKGROUND</span>
                <h2>Education</h2>
              </div>
            </div>

            {education.length > 0 ? (
              <div className="education-list">
                {education.map((item, index) => (
                  <div className="education-item" key={index}>
                    <div className="education-icon">
                      <GraduationCap size={18} />
                    </div>

                    <div>
                      <h3>{item.degree || "Degree"}</h3>

                      <p>{item.institution || "Institution not detected"}</p>

                      <span>
                        {item.start_date || "—"} <ChevronRight size={12} />
                        {item.end_date || "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptySection
                icon={<GraduationCap size={22} />}
                title="No education detected"
                text="No education information was identified."
              />
            )}
          </section>

          <section className="glass-card section-card">
            <div className="section-title">
              <div className="title-icon">
                <Award size={20} />
              </div>

              <div>
                <span>CREDENTIALS</span>
                <h2>Certifications</h2>
              </div>
            </div>

            {certifications.length > 0 ? (
              <div className="certification-list">
                {certifications.map((certificate, index) => (
                  <div className="certification-item" key={index}>
                    <div className="certificate-icon">
                      <Award size={18} />
                    </div>

                    <div>
                      <h3>{certificate.name}</h3>
                      <p>{certificate.issuer}</p>
                      <span>{certificate.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptySection
                icon={<Award size={22} />}
                title="No certifications detected"
                text="No certifications were identified."
              />
            )}
          </section>
        </div>

        {/* PROJECTS */}
        <section className="glass-card section-card">
          <div className="section-title">
            <div className="title-icon">
              <Terminal size={20} />
            </div>

            <div>
              <span>PORTFOLIO</span>
              <h2>Projects</h2>
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div className="project-card" key={index}>
                  <div className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3>{project.name || project.title || "Project"}</h3>

                  <p>
                    {project.description || "No project description detected."}
                  </p>

                  {project.technologies?.length > 0 && (
                    <div className="tech-pills">
                      {project.technologies.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="projects-empty">
              <div className="empty-project-icon">
                <Terminal size={25} />
              </div>

              <div>
                <h3>No projects detected</h3>
                <p>
                  Your resume does not contain a dedicated Projects section that
                  the AI could identify.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* STRENGTHS + WEAKNESSES */}
        <div className="two-column-grid">
          <section className="glass-card section-card">
            <div className="section-title">
              <div className="title-icon success-icon">
                <TrendingUp size={20} />
              </div>

              <div>
                <span>AI INSIGHT</span>
                <h2>Strengths</h2>
              </div>
            </div>

            <div className="insight-list">
              {strengths.length > 0 ? (
                strengths.map((item, index) => (
                  <div className="insight-item positive" key={index}>
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="not-detected">No strengths detected.</p>
              )}
            </div>
          </section>

          <section className="glass-card section-card">
            <div className="section-title">
              <div className="title-icon warning-icon">
                <CircleAlert size={20} />
              </div>

              <div>
                <span>AI INSIGHT</span>
                <h2>Areas to Improve</h2>
              </div>
            </div>

            <div className="insight-list">
              {weaknesses.length > 0 ? (
                weaknesses.map((item, index) => (
                  <div className="insight-item negative" key={index}>
                    <XCircle size={18} />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="not-detected">No weaknesses detected.</p>
              )}
            </div>
          </section>
        </div>

        {/* ATS FEEDBACK */}
        <section className="glass-card section-card">
          <div className="section-title">
            <div className="title-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <span>ATS REVIEW</span>
              <h2>ATS Feedback</h2>
            </div>
          </div>

          <div className="feedback-list">
            {ats_feedback.length > 0 ? (
              ats_feedback.map((feedback, index) => (
                <div className="feedback-item" key={index}>
                  <div className="feedback-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p>{feedback}</p>
                </div>
              ))
            ) : (
              <p className="not-detected">No ATS feedback available.</p>
            )}
          </div>
        </section>

        {/* IMPROVEMENTS */}
        <section className="glass-card section-card improvement-card">
          <div className="section-title">
            <div className="title-icon">
              <Lightbulb size={20} />
            </div>

            <div>
              <span>RECOMMENDATIONS</span>
              <h2>How to Improve Your Resume</h2>
            </div>
          </div>

          <div className="improvement-list">
            {improvements.length > 0 ? (
              improvements.map((item, index) => (
                <div className="improvement-item" key={index}>
                  <div className="improvement-number">{index + 1}</div>

                  <div>
                    <h3>Recommendation {index + 1}</h3>
                    <p>{item}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="not-detected">
                No improvement recommendations available.
              </p>
            )}
          </div>
        </section>

        {/* MISSING SECTIONS + LANGUAGES */}
        <div className="two-column-grid">
          <section className="glass-card section-card">
            <div className="section-title">
              <div className="title-icon warning-icon">
                <CircleAlert size={20} />
              </div>

              <div>
                <span>RESUME COMPLETENESS</span>
                <h2>Missing Sections</h2>
              </div>
            </div>

            {missing_sections.length > 0 ? (
              <div className="missing-list">
                {missing_sections.map((section, index) => (
                  <div className="missing-item" key={index}>
                    <XCircle size={17} />
                    <span>{section}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="complete-message">
                <CheckCircle2 size={20} />
                No major missing sections detected.
              </div>
            )}
          </section>

          <section className="glass-card section-card">
            <div className="section-title">
              <div className="title-icon">
                <Languages size={20} />
              </div>

              <div>
                <span>COMMUNICATION</span>
                <h2>Languages</h2>
              </div>
            </div>

            <div className="language-list">
              {languages.length > 0 ? (
                languages.map((language, index) => (
                  <div className="language-item" key={index}>
                    <Languages size={17} />
                    <span>{language}</span>
                  </div>
                ))
              ) : (
                <p className="not-detected">No languages detected.</p>
              )}
            </div>
          </section>
        </div>

        {/* FOOTER ACTION */}
        <section className="analysis-footer-card">
          <div>
            <Sparkles size={20} />
            <div>
              <h3>Ready to improve your resume?</h3>
              <p>Make the recommended changes and analyze your resume again.</p>
            </div>
          </div>

          <button className="primary-btn" onClick={() => navigate("/")}>
            Analyze Another Resume
            <ChevronRight size={18} />
          </button>
        </section>
      </main>
    </div>
  );
};

/* Small reusable components */

const EmptySection = ({ icon, title, text }) => (
  <div className="section-empty">
    <div className="section-empty-icon">{icon}</div>

    <div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

/* Globe icon kept separate so the main imports stay clean */
const GlobeIcon = () => <span className="globe-icon">🌐</span>;

export default Analysis;
