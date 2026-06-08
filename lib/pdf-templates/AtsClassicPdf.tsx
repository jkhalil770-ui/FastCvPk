import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// ATS Classic uses standard PDF core typography (Times-Roman & Times-Bold)
// These are built into standard PDF specification, making the file extremely lightweight
// with ZERO dynamic asset fetch timeouts on mobile devices.

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 45,
    paddingRight: 45,
    fontFamily: 'Times-Roman',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    fontSize: 10,
    color: '#000000',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 6,
  },
  contactStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 9,
    color: '#444444',
  },
  contactText: {
    marginHorizontal: 4,
  },
  contactBold: {
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  contactDivider: {
    color: '#CCCCCC',
  },
  sectionHeading: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    color: '#000000',
    borderBottomWidth: 0.8,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginTop: 14,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  bodyText: {
    fontSize: 10,
    color: '#222222',
    lineHeight: 1.3,
  },
  experienceItem: {
    marginBottom: 8,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  experienceCompany: {
    fontFamily: 'Times-Roman',
    color: '#444444',
  },
  experienceDates: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    color: '#333333',
  },
  bulletList: {
    paddingLeft: 12,
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 1.5,
  },
  bulletSymbol: {
    width: 8,
    fontSize: 9,
    color: '#222222',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: '#222222',
    lineHeight: 1.3,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  educationLeft: {
    fontSize: 10,
    color: '#222222',
  },
  degreeName: {
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  institutionName: {
    color: '#444444',
  },
  educationRight: {
    flexDirection: 'row',
    fontSize: 9.5,
    color: '#222222',
  },
  educationGrade: {
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  educationYear: {
    color: '#555555',
    marginLeft: 5,
  },
  skillsLine: {
    flexDirection: 'row',
    marginBottom: 4,
    fontSize: 9.5,
    lineHeight: 1.3,
  },
  skillsLabel: {
    fontFamily: 'Times-Bold',
    width: 90,
    color: '#000000',
  },
  skillsText: {
    flex: 1,
    color: '#222222',
  },
  watermark: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 7.5,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

interface AtsClassicPdfProps {
  data: any;
  hasWatermark?: boolean;
}

export default function AtsClassicPdf({ data, hasWatermark = false }: AtsClassicPdfProps) {
  const p = data.personalInfo || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const skills = data.skills || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Name and Professional Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{p.fullName || 'Your Full Name'}</Text>
          {p.profTitle ? <Text style={styles.title}>{p.profTitle}</Text> : null}
          
          {/* Contact Strip */}
          <View style={styles.contactStrip}>
            {p.email ? <Text style={styles.contactText}>{p.email}</Text> : null}
            {p.email && p.phone ? <Text style={styles.contactDivider}>•</Text> : null}
            
            {p.phone ? (
              <Text style={styles.contactText}>
                {p.phone.startsWith('+') ? p.phone : `+92 ${p.phone.replace(/^0/, '')}`}
              </Text>
            ) : null}
            {p.phone && p.city ? <Text style={styles.contactDivider}>•</Text> : null}
            
            {p.city ? <Text style={styles.contactText}>{p.city}, Pakistan</Text> : null}
            
            {p.linkedin && p.linkedin.trim() !== '' ? (
              <>
                <Text style={styles.contactDivider}>•</Text>
                <Text style={[styles.contactText, styles.contactBold]}>
                  LinkedIn: {p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </>
            ) : null}

            {p.github && p.github.trim() !== '' ? (
              <>
                <Text style={styles.contactDivider}>•</Text>
                <Text style={[styles.contactText, styles.contactBold]}>
                  GitHub: {p.github.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </>
            ) : null}
          </View>
        </View>

        {/* Summary Section */}
        {data.generatedSummary ? (
          <View style={{ marginBottom: 4 }}>
            <Text style={styles.sectionHeading}>Professional Summary</Text>
            <Text style={styles.bodyText}>{data.generatedSummary}</Text>
          </View>
        ) : null}

        {/* Experience Section */}
        {experiences.length > 0 ? (
          <View style={{ marginBottom: 4 }}>
            <Text style={styles.sectionHeading}>Professional Experience</Text>
            {experiences.map((exp: any, index: number) => {
              const hasDetails = exp.expandedResponsibilities?.length > 0 || exp.responsibilities;
              if (!exp.jobTitle && !exp.company && !hasDetails) return null;
              
              return (
                <View key={index} style={styles.experienceItem} wrap={false}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {exp.jobTitle || 'Job Title'}{' '}
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

        {/* Projects Section */}
        {projects.length > 0 ? (
          <View style={{ marginBottom: 4 }}>
            <Text style={styles.sectionHeading}>Key Technical Projects</Text>
            {projects.map((proj: any, idx: number) => {
              const hasBullets = proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0;
              if (!proj.projectName && !proj.projDesc && !hasBullets) return null;
              
              return (
                <View key={idx} style={styles.experienceItem} wrap={false}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {proj.projectName || 'Project Title'}
                    </Text>
                    {proj.projUrl ? (
                      <Text style={styles.experienceDates}>
                        {proj.projUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
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

        {/* Education Section */}
        {education.length > 0 ? (
          <View style={{ marginBottom: 4 }}>
            <Text style={styles.sectionHeading}>Education History</Text>
            {education.map((edu: any, index: number) => {
              if (!edu.degreeName && !edu.institution) return null;
              return (
                <View key={index} style={styles.educationItem} wrap={false}>
                  <Text style={styles.educationLeft}>
                    <Text style={styles.degreeName}>{edu.degreeName || 'Degree'}</Text>
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
          <View style={{ marginBottom: 4 }} wrap={false}>
            <Text style={styles.sectionHeading}>Skills & Expertise</Text>
            <View style={{ flexDirection: 'column', gap: 3 }}>
              {skills.techSkills && skills.techSkills.length > 0 ? (
                <View style={styles.skillsLine}>
                  <Text style={styles.skillsLabel}>Technical Skills:</Text>
                  <Text style={styles.skillsText}>{skills.techSkills.join(', ')}</Text>
                </View>
              ) : null}

              {skills.softSkills && skills.softSkills.length > 0 ? (
                <View style={styles.skillsLine}>
                  <Text style={styles.skillsLabel}>Soft Competencies:</Text>
                  <Text style={styles.skillsText}>{skills.softSkills.join(', ')}</Text>
                </View>
              ) : null}

              {skills.languages && skills.languages.length > 0 ? (
                <View style={styles.skillsLine}>
                  <Text style={styles.skillsLabel}>Languages:</Text>
                  <Text style={styles.skillsText}>{skills.languages.join(', ')}</Text>
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
