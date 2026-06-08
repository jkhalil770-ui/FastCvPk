import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image, Svg, Path, Circle, Rect, G } from '@react-pdf/renderer';

// Register fonts via high-speed global CDN to prevent WebView silent load failures on mobile devices
Font.register({
  family: 'Inter',
  src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf'
});
Font.register({
  family: 'Inter-Bold',
  src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf'
});
Font.register({
  family: 'NotoNastaliq',
  src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-nastaliq-urdu@latest/arabic-400-normal.ttf'
});

// Premium SVG Icons (iOS/Apple-style squircle backgrounds with crisp white vector glyphs)
const PhoneIcon = ({ bg = '#22C55E', size = 11 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <Rect x={0} y={0} width={32} height={32} rx={7} ry={7} fill={bg} />
    <G transform="translate(4, 4)">
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

const EmailIcon = ({ bg = '#3B82F6', size = 11 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <Rect x={0} y={0} width={32} height={32} rx={7} ry={7} fill={bg} />
    <G transform="translate(4, 4)">
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m22 6-10 7L2 6" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

const LocationIcon = ({ bg = '#EF4444', size = 11 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <Rect x={0} y={0} width={32} height={32} rx={7} ry={7} fill={bg} />
    <G transform="translate(4, 4)">
      <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="10" r="3" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
    </G>
  </Svg>
);

const LinkedInIcon = ({ bg = '#0077B5', size = 11 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <Rect x={0} y={0} width={32} height={32} rx={7} ry={7} fill={bg} />
    <G transform="translate(4, 4)">
      <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Rect x="2" y="9" width="4" height="12" fill="#FFFFFF" />
      <Circle cx="4" cy="4" r="2.2" fill="#FFFFFF" />
    </G>
  </Svg>
);

const GitHubIcon = ({ bg = '#1F2937', size = 11 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <Rect x={0} y={0} width={32} height={32} rx={7} ry={7} fill={bg} />
    <G transform="translate(4, 4)">
      <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

const GlobeIcon = ({ bg = '#6366F1', size = 11 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <Rect x={0} y={0} width={32} height={32} rx={7} ry={7} fill={bg} />
    <G transform="translate(4, 4)">
      <Circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
      <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

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
    backgroundColor: '#B45309', // Premium deep corporate gold
  },
  headerContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 5,
  },
  headerPhoto: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B45309',
  },
  headerPhotoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#B45309',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPhotoPlaceholderText: {
    fontSize: 7,
    fontFamily: 'Inter-Bold',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  headerMain: {
    flex: 1,
    flexDirection: 'column',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    color: '#B45309', // Premium deep corporate gold
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
    backgroundColor: '#FEF3C7',
    borderRadius: 3,
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    fontSize: 7.5,
    fontFamily: 'Inter-Bold',
    color: '#B45309',
  },
  headerRight: {
    width: 130,
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
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  socialItem: {
    fontSize: 8.5,
    color: '#475569',
    flex: 1,
    lineHeight: 1.2,
  },
  socialItemBold: {
    fontFamily: 'Inter-Bold',
    color: '#B45309',
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
    color: '#B45309',
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

  const iconColors = {
    phone: '#22C55E',      // Apple-style green
    email: '#3B82F6',      // Apple-style warm blue
    location: '#EF4444',   // Premium map pin red
    linkedin: '#0077B5',   // Official LinkedIn blue
    portfolio: '#6366F1',  // Premium indigo globe
    github: '#1F2937'      // Premium dark gray/black
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Full-Height Accent Bar */}
        <View style={styles.leftAccentBar} />

        {/* Main Header Container */}
        <View style={styles.headerContainer}>
          {/* Header Left: Profile Photo */}
          <View>
            {p.photo ? (
              <Image src={p.photo} style={styles.headerPhoto} />
            ) : (
              <View style={styles.headerPhotoPlaceholder}>
                <Text style={styles.headerPhotoPlaceholderText}>Photo</Text>
              </View>
            )}
          </View>

          {/* Header Main details */}
          <View style={styles.headerMain}>
            <View style={styles.headerTopRow}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.name}>{p.fullName || 'Your Full Name'}</Text>
                <Text style={styles.title}>{p.profTitle || 'Remote Operations Specialist'}</Text>
              </View>

              {/* Work Status */}
              <View style={styles.headerRight}>
                <Text style={styles.statusLabel}>Work Status</Text>
                <Text style={styles.statusValue}>
                  {p.workAuth || 'Eligible to work remotely for international companies'}
                </Text>
              </View>
            </View>
            
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
        </View>

        {/* Two-Column Body Grid */}
        <View style={styles.columnsContainer}>
          
          {/* ================= LEFT SIDEBAR (30%) ================= */}
          <View style={styles.leftColumn}>

            {/* Contact & Socials */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionHeading}>Contact</Text>
              
              {p.email ? (
                <View style={styles.contactRow}>
                  <EmailIcon bg={iconColors.email} size={11} />
                  <Text style={styles.socialItem}>{p.email}</Text>
                </View>
              ) : null}

              {p.phone ? (
                <View style={styles.contactRow}>
                  <PhoneIcon bg={iconColors.phone} size={11} />
                  <Text style={styles.socialItem}>
                    {p.phone.startsWith('+') ? p.phone : `+92 ${p.phone.replace(/^0/, '')}`}
                  </Text>
                </View>
              ) : null}

              {p.city ? (
                <View style={styles.contactRow}>
                  <LocationIcon bg={iconColors.location} size={11} />
                  <Text style={styles.socialItem}>{p.city}, Pakistan</Text>
                </View>
              ) : null}

              {p.linkedin && p.linkedin.trim() !== '' ? (
                <View style={styles.contactRow}>
                  <LinkedInIcon bg={iconColors.linkedin} size={11} />
                  <Text style={styles.socialItem}>
                    <Text style={styles.socialItemBold}>{p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}</Text>
                  </Text>
                </View>
              ) : null}

              {p.portfolio && p.portfolio.trim() !== '' ? (
                <View style={styles.contactRow}>
                  <GlobeIcon bg={iconColors.portfolio} size={11} />
                  <Text style={styles.socialItem}>
                    <Text style={styles.socialItemBold}>{p.portfolio.replace(/^(https?:\/\/)?(www\.)?/, '')}</Text>
                  </Text>
                </View>
              ) : null}

              {p.github && p.github.trim() !== '' ? (
                <View style={styles.contactRow}>
                  <GitHubIcon bg={iconColors.github} size={11} />
                  <Text style={styles.socialItem}>
                    <Text style={styles.socialItemBold}>{p.github.replace(/^(https?:\/\/)?(www\.)?/, '')}</Text>
                  </Text>
                </View>
              ) : null}
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

            {/* Sidebar Certifications list if certifications exists and is short */}
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
                        <Text style={[styles.experienceTitle, { color: '#B45309' }]}>
                          {proj.projectName || 'Project Title'}
                        </Text>
                        {proj.projUrl ? (
                          <Text style={[styles.experienceDates, { color: '#B45309' }]}>
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
