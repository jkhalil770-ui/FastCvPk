import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  headerLine: {
    height: 4,
    backgroundColor: '#2563EB',
    marginTop: -40,
    marginLeft: -40,
    marginRight: -40,
    marginBottom: 20,
  },
  headerContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    paddingLeft: 12,
    marginBottom: 15,
    paddingVertical: 2,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#0F172A',
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#2563EB',
  },
  contactStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#64748B',
    marginTop: 8,
  },
  contactItem: {
    marginRight: 10,
  },
  contactDivider: {
    color: '#CBD5E1',
    marginRight: 10,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#2563EB',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 3,
    marginTop: 15,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.4,
  },
  // Side-by-Side Grid
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  servicesCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 10,
  },
  techCard: {
    width: '48%',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 6,
    padding: 10,
  },
  cardTitle: {
    fontSize: 8.5,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#475569',
    marginBottom: 6,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  badgeWhite: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#475569',
    marginRight: 3,
    marginBottom: 3,
  },
  badgeBlue: {
    backgroundColor: '#3B82F6',
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginRight: 3,
    marginBottom: 3,
  },
  // Projects
  projectItem: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  projectTitle: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#0F172A',
  },
  projectLink: {
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
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
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.3,
  },
  skillsCategoryRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  skillsLabel: {
    fontSize: 9.5,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    width: 120,
    textTransform: 'uppercase',
  },
  skillsValue: {
    flex: 1,
    fontSize: 9.5,
    color: '#475569',
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

interface FreelancerPdfProps {
  data: any;
  hasWatermark?: boolean;
}

export default function FreelancerPdf({ data, hasWatermark = false }: FreelancerPdfProps) {
  const p = data.personalInfo || {};
  const projects = data.projects || [];
  const skills = data.skills || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Banner Stripe */}
        <View style={styles.headerLine} />

        {/* Top Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{p.fullName || 'Your Full Name'}</Text>
          <Text style={styles.title}>{p.profTitle || 'Freelance Specialist'}</Text>
          
          {/* Contact Strip */}
          <View style={styles.contactStrip}>
            {p.email && <Text style={styles.contactItem}>{p.email}</Text>}
            {p.email && p.phone && <Text style={styles.contactDivider}>|</Text>}
            {p.phone && <Text style={styles.contactItem}>{p.phone}</Text>}
            {p.phone && p.city && <Text style={styles.contactDivider}>|</Text>}
            {p.city && <Text style={styles.contactItem}>{p.city}</Text>}
            {p.city && p.portfolio && <Text style={styles.contactDivider}>|</Text>}
            {p.portfolio && (
              <Text style={[styles.contactItem, { fontFamily: 'Inter-Bold', color: '#2563EB' }]}>
                {p.portfolio.replace(/^(https?:\/\/)?(www\.)?/, '')}
              </Text>
            )}
          </View>
        </View>

        {/* Summary Profile */}
        {data.generatedSummary ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>Professional Profile</Text>
            <Text style={styles.bodyText}>{data.generatedSummary}</Text>
          </View>
        ) : null}

        {/* Services & Tech Stack Grid */}
        {((skills.services && skills.services.length > 0) ||
          (skills.techStack && skills.techStack.length > 0)) ? (
          <View style={styles.gridRow} wrap={false}>
            {skills.services && skills.services.length > 0 ? (
              <View style={styles.servicesCard}>
                <Text style={styles.cardTitle}>Services Offered</Text>
                <View style={styles.badgesContainer}>
                  {skills.services.map((serv: string, idx: number) => (
                    <Text key={idx} style={styles.badgeWhite}>
                      {serv}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}

            {skills.techStack && skills.techStack.length > 0 ? (
              <View style={styles.techCard}>
                <Text style={styles.cardTitle}>Tech Stack & Tools</Text>
                <View style={styles.badgesContainer}>
                  {skills.techStack.map((tool: string, idx: number) => (
                    <Text key={idx} style={styles.badgeBlue}>
                      {tool}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        ) : null}

        {/* Projects list */}
        {projects.length > 0 ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.sectionHeading}>Notable Projects</Text>
            {projects.map((proj: any, idx: number) => {
              const hasBullets = proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0;
              if (!proj.projectName && !proj.projDesc && !hasBullets) return null;

              return (
                <View key={idx} style={styles.projectItem} wrap={false}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectTitle}>{proj.projectName || 'Project Title'}</Text>
                    {proj.projUrl ? (
                      <Text style={styles.projectLink}>
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
                    <Text style={[styles.bodyText, { pl: 5, mt: 3 }]}>{proj.projDesc}</Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        {/* Skills list */}
        {((skills.softSkills && skills.softSkills.length > 0) ||
          (skills.languages && skills.languages.length > 0)) ? (
          <View style={{ marginBottom: 10 }} wrap={false}>
            <Text style={styles.sectionHeading}>Skills & Languages</Text>
            <View style={{ flexDirection: 'column', gap: 6 }}>
              {skills.softSkills && skills.softSkills.length > 0 ? (
                <View style={styles.skillsCategoryRow}>
                  <Text style={styles.skillsLabel}>Core Competencies: </Text>
                  <Text style={styles.skillsValue}>{skills.softSkills.join(', ')}</Text>
                </View>
              ) : null}

              {skills.languages && skills.languages.length > 0 ? (
                <View style={styles.skillsCategoryRow}>
                  <Text style={styles.skillsLabel}>Spoken Languages: </Text>
                  <Text style={styles.skillsValue}>{skills.languages.join(', ')}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ) : null}

        {/* Watermark */}
        {hasWatermark ? (
          <Text style={styles.watermark} fixed>
            Created free at FastCV.PK — Remove watermark: fastcvpk.online
          </Text>
        ) : null}
      </Page>
    </Document>
  );
}
