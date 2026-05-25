import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  src: '/fonts/Inter-Regular.ttf'
});
Font.register({
  family: 'Inter-Bold',
  src: '/fonts/Inter-Bold.ttf'
});
Font.register({
  family: 'NotoNastaliq',
  src: '/fonts/NotoNastaliqUrdu-Regular.ttf'
});

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  leftAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 6,
    height: '100%',
    backgroundColor: '#3B82F6',
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#0F172A',
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#3B82F6',
    letterSpacing: 1,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  badgeGray: {
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    fontSize: 7.5,
    fontFamily: 'Inter-Bold',
    color: '#475569',
  },
  badgeGreen: {
    backgroundColor: '#ECFDF5',
    borderRadius: 3,
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    fontSize: 7.5,
    fontFamily: 'Inter-Bold',
    color: '#065F46',
  },
  headerRight: {
    width: 140,
    textAlign: 'right',
  },
  statusLabel: {
    fontSize: 7.5,
    fontFamily: 'Inter-Bold',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 8.5,
    fontFamily: 'Inter-Bold',
    color: '#475569',
    lineHeight: 1.2,
  },
  // Columns Container
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  leftColumn: {
    width: '30%',
    flexDirection: 'column',
  },
  rightColumn: {
    width: '66%',
    flexDirection: 'column',
  },
  // Sidebar elements
  photoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePhoto: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  photoPlaceholder: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  sidebarSection: {
    marginBottom: 15,
  },
  sidebarSectionHeading: {
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 2,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  sidebarTextRow: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 4,
    lineHeight: 1.2,
  },
  sidebarLabel: {
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  socialItem: {
    fontSize: 8.5,
    color: '#475569',
    marginBottom: 4,
  },
  socialItemBold: {
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  badgeSidebar: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 3,
    paddingVertical: 1.5,
    paddingHorizontal: 4,
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#334155',
  },
  badgeSidebarBlue: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 3,
    paddingVertical: 1.5,
    paddingHorizontal: 4,
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#1E40AF',
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    color: '#475569',
    marginBottom: 3,
  },
  languageValue: {
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  languageValueSecondary: {
    fontFamily: 'Inter-Bold',
    color: '#94A3B8',
  },
  certSidebarList: {
    paddingLeft: 8,
  },
  certSidebarItem: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 3,
    lineHeight: 1.1,
  },
  // Main right column elements
  mainSection: {
    marginBottom: 15,
  },
  mainSectionHeading: {
    fontSize: 10.5,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#0F172A',
    borderBottomWidth: 1.5,
    borderBottomColor: '#0F172A',
    paddingBottom: 2,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  bodyText: {
    fontSize: 9.5,
    color: '#334155',
    lineHeight: 1.4,
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 9.5,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
  },
  experienceCompany: {
    fontFamily: 'Inter',
    color: '#64748B',
  },
  experienceDates: {
    fontSize: 8.5,
    fontFamily: 'Inter-Bold',
    color: '#64748B',
  },
  bulletList: {
    paddingLeft: 10,
    marginTop: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletSymbol: {
    width: 8,
    fontSize: 9,
    color: '#64748B',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: '#475569',
    lineHeight: 1.3,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  educationLeft: {
    fontSize: 9.5,
    color: '#334155',
  },
  degreeName: {
    fontFamily: 'Inter-Bold',
    color: '#0F172A',
  },
  institutionName: {
    color: '#64748B',
  },
  educationRight: {
    flexDirection: 'row',
    fontSize: 9,
    color: '#475569',
  },
  educationGrade: {
    fontFamily: 'Inter-Bold',
    color: '#334155',
  },
  educationYear: {
    color: '#94A3B8',
    marginLeft: 4,
  },
  certItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  certLeft: {
    fontSize: 9,
    color: '#334155',
  },
  certName: {
    fontFamily: 'Inter-Bold',
    color: '#0F172A',
  },
  certPlatform: {
    color: '#64748B',
  },
  certYear: {
    fontSize: 8.5,
    color: '#94A3B8',
    fontFamily: 'Inter-Bold',
  },
  certTextOnly: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 3,
  },
  watermark: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#CBD5E1',
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
  },
});

interface GlobalProPdfProps {
  data: any;
  hasWatermark?: boolean;
}

export default function GlobalProPdf({ data, hasWatermark = false }: GlobalProPdfProps) {
  const p = data.personalInfo || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const skills = data.skills || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Full-Height Accent Bar */}
        <View style={styles.leftAccentBar} />

        {/* Main Header Container */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{p.fullName || 'Your Full Name'}</Text>
            <Text style={styles.title}>{p.profTitle || 'Remote Operations Specialist'}</Text>
            
            {/* Top Quick Badges */}
            <View style={styles.badgeRow}>
              {p.availability ? (
                <Text style={styles.badgeGray}>
                  ⚡ {p.availability.replace(/[\[\]]/g, '')}
                </Text>
              ) : null}
              {p.timeZone ? (
                <Text style={styles.badgeGray}>🌐 {p.timeZone}</Text>
              ) : null}
              {p.expectedSalary ? (
                <Text style={styles.badgeGreen}>💰 {p.expectedSalary}</Text>
              ) : null}
            </View>
          </View>

          {/* Work Status */}
          <View style={styles.headerRight}>
            <Text style={styles.statusLabel}>Work Status</Text>
            <Text style={styles.statusValue}>
              {p.workAuth || 'Eligible to work remotely for international companies'}
            </Text>
          </View>
        </View>

        {/* Two-Column Body Grid */}
        <View style={styles.columnsContainer}>
          
          {/* ================= LEFT SIDEBAR (30%) ================= */}
          <View style={styles.leftColumn}>
            
            {/* Profile Photo */}
            <View style={styles.photoContainer}>
              {p.photo ? (
                <Image src={p.photo} style={styles.profilePhoto} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderText}>Photo</Text>
                </View>
              )}
            </View>

            {/* Contact & Socials */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionHeading}>Contact</Text>
              {p.email && <Text style={styles.socialItem}>{p.email}</Text>}
              {p.phone && (
                <Text style={styles.socialItem}>
                  {p.phone.startsWith('+') ? p.phone : `+92 ${p.phone.replace(/^0/, '')}`}
                </Text>
              )}
              {p.city && <Text style={styles.socialItem}>{p.city}, Pakistan</Text>}
              {p.linkedin && p.linkedin.trim() !== '' && (
                <Text style={styles.socialItem}>
                  ln: <Text style={styles.socialItemBold}>{p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}</Text>
                </Text>
              )}
              {p.portfolio && p.portfolio.trim() !== '' && (
                <Text style={styles.socialItem}>
                  wb: <Text style={styles.socialItemBold}>{p.portfolio.replace(/^(https?:\/\/)?(www\.)?/, '')}</Text>
                </Text>
              )}
              {p.github && p.github.trim() !== '' && (
                <Text style={styles.socialItem}>
                  gh: <Text style={styles.socialItemBold}>{p.github.replace(/^(https?:\/\/)?(www\.)?/, '')}</Text>
                </Text>
              )}
            </View>

            {/* Technical Skills Badges */}
            {skills.techSkills && skills.techSkills.length > 0 ? (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionHeading}>Expertise</Text>
                <View style={styles.badgesWrap}>
                  {skills.techSkills.map((skill: string, idx: number) => (
                    <Text key={idx} style={styles.badgeSidebar}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}

            {/* Tools & Software Badges */}
            {skills.tools && skills.tools.length > 0 ? (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionHeading}>Tools & Software</Text>
                <View style={styles.badgesWrap}>
                  {skills.tools.map((tool: string, idx: number) => (
                    <Text key={idx} style={styles.badgeSidebarBlue}>
                      {tool}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}

            {/* Languages */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionHeading}>Languages</Text>
              <View style={styles.languageRow}>
                <Text>Urdu</Text>
                <Text style={styles.languageValueSecondary}>Native</Text>
              </View>
              <View style={styles.languageRow}>
                <Text>English</Text>
                <Text style={styles.languageValue}>Fluent</Text>
              </View>
              {skills.languages && skills.languages.map((lang: string, idx: number) => {
                if (lang.toLowerCase().includes('urdu') || lang.toLowerCase().includes('english')) return null;
                return (
                  <View key={idx} style={styles.languageRow}>
                    <Text style={{ textTransform: 'capitalize' }}>{lang}</Text>
                    <Text style={styles.languageValueSecondary}>Conversational</Text>
                  </View>
                );
              })}
            </View>

            {/* Sidebar Certifications list if certifications exists and list is short */}
            {skills.certifications && skills.certifications.length > 0 && skills.certifications.length <= 2 ? (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionHeading}>Certs</Text>
                <View style={styles.certSidebarList}>
                  {skills.certifications.map((cert: string, idx: number) => (
                    <Text key={idx} style={styles.certSidebarItem}>• {cert}</Text>
                  ))}
                </View>
              </View>
            ) : null}

          </View>

          {/* ================= RIGHT MAIN CONTENT (66%) ================= */}
          <View style={styles.rightColumn}>
            
            {/* Professional Summary */}
            {data.generatedSummary ? (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionHeading}>Executive Profile</Text>
                <Text style={styles.bodyText}>{data.generatedSummary}</Text>
              </View>
            ) : null}

            {/* Work Experience */}
            {experiences.length > 0 ? (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionHeading}>Professional Experience</Text>
                {experiences.map((exp: any, index: number) => {
                  const hasDetails = exp.expandedResponsibilities?.length > 0 || exp.responsibilities;
                  if (!exp.jobTitle && !exp.company && !hasDetails) return null;

                  return (
                    <View key={index} style={styles.experienceItem} wrap={false}>
                      <View style={styles.experienceHeader}>
                        <Text style={styles.experienceTitle}>
                          {exp.jobTitle || 'Job Role'}{' '}
                          <Text style={styles.experienceCompany}>at {exp.company || 'Company'}</Text>
                        </Text>
                        <Text style={styles.experienceDates}>
                          {exp.fromDate || 'From'} — {exp.currentlyWorking ? 'Present' : exp.toDate || 'To'}
                        </Text>
                      </View>

                      {exp.expandedResponsibilities?.length > 0 ? (
                        <View style={styles.bulletList}>
                          {exp.expandedResponsibilities.map((bullet: string, bIdx: number) => (
                            <View key={bIdx} style={styles.bulletRow}>
                              <Text style={styles.bulletSymbol}>•</Text>
                              <Text style={styles.bulletText}>{bullet}</Text>
                            </View>
                          ))}
                        </View>
                      ) : exp.responsibilities ? (
                        <Text style={[styles.bodyText, { pl: 5, mt: 2 }]}>{exp.responsibilities}</Text>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : null}

            {/* Key Technical Projects */}
            {projects.length > 0 ? (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionHeading}>Key Technical Projects</Text>
                {projects.map((proj: any, idx: number) => {
                  const hasBullets = proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0;
                  if (!proj.projectName && !proj.projDesc && !hasBullets) return null;

                  return (
                    <View key={idx} style={styles.experienceItem} wrap={false}>
                      <View style={styles.experienceHeader}>
                        <Text style={[styles.experienceTitle, { color: '#3B82F6' }]}>
                          {proj.projectName || 'Project Title'}
                        </Text>
                        {proj.projUrl ? (
                          <Text style={[styles.experienceDates, { color: '#3B82F6' }]}>
                            🔗 {proj.projUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
                          </Text>
                        ) : null}
                      </View>

                      {proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0 ? (
                        <View style={styles.bulletList}>
                          {proj.expandedBulletPoints.map((bullet: string, bIdx: number) => (
                            <View key={bIdx} style={styles.bulletRow}>
                              <Text style={styles.bulletSymbol}>•</Text>
                              <Text style={styles.bulletText}>{bullet}</Text>
                            </View>
                          ))}
                        </View>
                      ) : proj.projDesc ? (
                        <Text style={[styles.bodyText, { pl: 5, mt: 2 }]}>{proj.projDesc}</Text>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : null}

            {/* Education */}
            {education.length > 0 ? (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionHeading}>Education & Credentials</Text>
                {education.map((edu: any, index: number) => {
                  if (!edu.degreeName && !edu.institution) return null;
                  return (
                    <View key={index} style={styles.educationItem} wrap={false}>
                      <Text style={styles.educationLeft}>
                        <Text style={styles.degreeName}>{edu.degreeName || 'Degree'}</Text>
                        <Text style={styles.institutionName}> — {edu.institution || 'University'}</Text>
                      </Text>
                      <View style={styles.educationRight}>
                        <Text style={styles.educationGrade}>{edu.grade || 'GPA'}</Text>
                        <Text style={styles.educationYear}>({edu.year || 'Year'})</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : null}

            {/* Certifications & Training (Render in Main Section if Certifications exists and is longer) */}
            {skills.certifications && skills.certifications.length > 0 && skills.certifications.length > 2 ? (
              <View style={styles.mainSection} wrap={false}>
                <Text style={styles.mainSectionHeading}>Certifications & Training</Text>
                {skills.certifications.map((cert: string, idx: number) => {
                  const match = cert.match(/^(.*?)\s*\((.*?)\s*,\s*(.*?)\)$/);
                  if (match) {
                    const [_, name, platform, year] = match;
                    return (
                      <View key={idx} style={styles.certItemRow}>
                        <Text style={styles.certLeft}>
                          <Text style={styles.certName}>{name}</Text>
                          <Text style={styles.certPlatform}> — {platform}</Text>
                        </Text>
                        <Text style={styles.certYear}>({year})</Text>
                      </View>
                    );
                  }
                  return (
                    <Text key={idx} style={styles.certTextOnly}>
                      • <Text style={{ fontFamily: 'Inter-Bold', color: '#1E293B' }}>{cert}</Text>
                    </Text>
                  );
                })}
              </View>
            ) : null}

            {/* Achievements & Awards */}
            {skills.achievements && skills.achievements.length > 0 ? (
              <View style={styles.mainSection} wrap={false}>
                <Text style={styles.mainSectionHeading}>Achievements & Awards</Text>
                {skills.achievements.map((ach: string, idx: number) => (
                  <Text key={idx} style={[styles.bodyText, { marginBottom: 3 }]}>• {ach}</Text>
                ))}
              </View>
            ) : null}

          </View>

        </View>

        {/* Bottom Watermark */}
        {hasWatermark ? (
          <Text style={styles.watermark} fixed>
            Created free at FastCV.PK — Remove watermark: fastcvpk.online
          </Text>
        ) : null}
      </Page>
    </Document>
  );
}
