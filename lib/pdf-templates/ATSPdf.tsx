import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path, Circle, Rect } from '@react-pdf/renderer';

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

// Monochrome SVG Icons for ATS/Simple Templates
const PhoneIcon = ({ color = '#475569', size = 8 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

const EmailIcon = ({ color = '#475569', size = 8 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="m22 6-10 7L2 6" />
  </Svg>
);

const LocationIcon = ({ color = '#475569', size = 8 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

const LinkedInIcon = ({ color = '#475569', size = 8 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <Rect x="2" y="9" width="4" height="12" />
    <Circle cx="4" cy="4" r="2" />
  </Svg>
);

const GitHubIcon = ({ color = '#475569', size = 8 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);

const GlobeIcon = ({ color = '#475569', size = 8 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  headerLine: {
    height: 4,
    backgroundColor: '#3B82F6',
    marginTop: -40,
    marginLeft: -40,
    marginRight: -40,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 4,
    color: '#0F172A',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#3B82F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 6,
    marginBottom: 8,
    marginLeft: 40,
    marginRight: 40,
  },
  contactStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 9,
    color: '#64748B',
    marginBottom: 15,
    alignItems: 'center',
  },
  contactItem: {
    marginHorizontal: 5,
  },
  contactItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginHorizontal: 5,
  },
  contactText: {
    fontSize: 8.5,
    color: '#475569',
  },
  contactDivider: {
    color: '#CBD5E1',
    marginHorizontal: 4,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#0F172A',
    borderBottomWidth: 1.5,
    borderBottomColor: '#0F172A',
    paddingBottom: 3,
    marginTop: 15,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 10,
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
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#0F172A',
  },
  experienceCompany: {
    fontFamily: 'Inter',
    color: '#64748B',
  },
  experienceDates: {
    fontSize: 9,
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
    fontSize: 9.5,
    color: '#475569',
    lineHeight: 1.3,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  educationLeft: {
    fontSize: 10,
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
    fontSize: 9.5,
    color: '#475569',
  },
  educationGrade: {
    fontFamily: 'Inter-Bold',
    color: '#334155',
  },
  educationYear: {
    color: '#94A3B8',
    marginLeft: 5,
  },
  skillsCategory: {
    marginBottom: 8,
  },
  skillsLabel: {
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    color: '#475569',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginRight: 4,
    marginBottom: 4,
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

interface ATSPdfProps {
  data: any;
  hasWatermark?: boolean;
}

export default function ATSPdf({ data, hasWatermark = false }: ATSPdfProps) {
  const p = data.personalInfo || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Premium Header Accent Line */}
        <View style={styles.headerLine} />

        {/* Name and Professional Title */}
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.name}>{p.fullName || 'Your Full Name'}</Text>
          <Text style={styles.title}>{p.profTitle || 'Your Professional Title'}</Text>
          
          {/* Contact Strip */}
          <View style={styles.contactStrip}>
            {p.phone ? (
              <View style={styles.contactItemRow}>
                <PhoneIcon color="#475569" size={8} />
                <Text style={styles.contactText}>
                  {p.phone.startsWith('+') ? p.phone : `+92 ${p.phone.replace(/^0/, '')}`}
                </Text>
              </View>
            ) : null}

            {p.phone && p.email ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.email ? (
              <View style={styles.contactItemRow}>
                <EmailIcon color="#475569" size={8} />
                <Text style={styles.contactText}>{p.email}</Text>
              </View>
            ) : null}

            {(p.phone || p.email) && p.city ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.city ? (
              <View style={styles.contactItemRow}>
                <LocationIcon color="#475569" size={8} />
                <Text style={styles.contactText}>{p.city}, Pakistan</Text>
              </View>
            ) : null}

            {(p.phone || p.email || p.city) && p.linkedin ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.linkedin && p.linkedin.trim() !== '' ? (
              <View style={styles.contactItemRow}>
                <LinkedInIcon color="#475569" size={8} />
                <Text style={styles.contactText}>
                  {p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </View>
            ) : null}

            {(p.phone || p.email || p.city || p.linkedin) && p.github ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.github && p.github.trim() !== '' ? (
              <View style={styles.contactItemRow}>
                <GitHubIcon color="#475569" size={8} />
                <Text style={styles.contactText}>
                  {p.github.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </View>
            ) : null}

            {(p.phone || p.email || p.city || p.linkedin || p.github) && p.portfolio ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.portfolio && p.portfolio.trim() !== '' ? (
              <View style={styles.contactItemRow}>
                <GlobeIcon color="#475569" size={8} />
                <Text style={styles.contactText}>
                  {p.portfolio.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Summary Section */}
        {data.generatedSummary ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>Professional Summary</Text>
            <Text style={styles.bodyText}>{data.generatedSummary}</Text>
          </View>
        ) : null}

        {/* Experience Section */}
        {experiences.length > 0 ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>Work Experience</Text>
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
                    <Text style={[styles.bodyText, { pl: 5, mt: 3 }]}>{exp.responsibilities}</Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        {/* Education Section */}
        {education.length > 0 ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>Education History</Text>
            {education.map((edu: any, index: number) => {
              if (!edu.degreeName && !edu.institution) return null;
              return (
                <View key={index} style={styles.educationItem} wrap={false}>
                  <Text style={styles.educationLeft}>
                    <Text style={styles.degreeName}>{edu.degreeName || 'Degree / Qualification'}</Text>
                    <Text style={styles.institutionName}> — {edu.institution || 'Institution'}</Text>
                  </Text>
                  <View style={styles.educationRight}>
                    <Text style={styles.educationGrade}>{edu.grade || 'Grade'}</Text>
                    <Text style={styles.educationYear}>({edu.year || 'Year'})</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}

        {/* Skills Section */}
        {((skills.techSkills && skills.techSkills.length > 0) ||
          (skills.softSkills && skills.softSkills.length > 0) ||
          (skills.languages && skills.languages.length > 0)) ? (
          <View style={{ marginBottom: 10 }} wrap={false}>
            <Text style={styles.sectionHeading}>Core Skills & Languages</Text>
            <View style={{ flexDirection: 'column', gap: 6 }}>
              {skills.techSkills && skills.techSkills.length > 0 ? (
                <View style={styles.skillsCategory}>
                  <Text style={styles.skillsLabel}>Technical Skills:</Text>
                  <View style={styles.skillsList}>
                    {skills.techSkills.map((skill: string, index: number) => (
                      <Text key={index} style={styles.skillBadge}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}

              {skills.softSkills && skills.softSkills.length > 0 ? (
                <View style={styles.skillsCategory}>
                  <Text style={styles.skillsLabel}>Soft Competencies:</Text>
                  <View style={styles.skillsList}>
                    {skills.softSkills.map((skill: string, index: number) => (
                      <Text key={index} style={styles.skillBadge}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}

              {skills.languages && skills.languages.length > 0 ? (
                <View style={styles.skillsCategory}>
                  <Text style={styles.skillsLabel}>Languages Spoken:</Text>
                  <View style={styles.skillsList}>
                    {skills.languages.map((lang: string, index: number) => (
                      <Text key={index} style={styles.skillBadge}>
                        {lang}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        ) : null}

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
