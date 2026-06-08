import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path, Circle, Rect } from '@react-pdf/renderer';

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

// Premium SVG Icons
const PhoneIcon = ({ color = '#1E3A8A', size = 9 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

const EmailIcon = ({ color = '#1E3A8A', size = 9 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="m22 6-10 7L2 6" />
  </Svg>
);

const LocationIcon = ({ color = '#1E3A8A', size = 9 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

const LinkedInIcon = ({ color = '#1E3A8A', size = 9 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <Rect x="2" y="9" width="4" height="12" />
    <Circle cx="4" cy="4" r="2" />
  </Svg>
);

const GitHubIcon = ({ color = '#1E3A8A', size = 9 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);

const GlobeIcon = ({ color = '#1E3A8A', size = 9 }) => (
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
    backgroundColor: '#0B2545', // Premium deep corporate navy blue
    marginTop: -40,
    marginLeft: -40,
    marginRight: -40,
    marginBottom: 20,
  },
  headerContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#0B2545',
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
    color: '#0B2545',
  },
  contactStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#64748B',
    marginTop: 8,
    alignItems: 'center',
  },
  contactItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactText: {
    fontSize: 8.5,
    color: '#64748B',
  },
  contactDivider: {
    color: '#CBD5E1',
    marginHorizontal: 8,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#0B2545',
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
    backgroundColor: '#0B2545',
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
    color: '#0B2545',
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

  const iconColors = {
    phone: '#16A34A',      // Apple-style green
    email: '#EA4335',      // Google/Gmail red
    location: '#E11D48',   // Premium crimson map pin red
    linkedin: '#0A66C2',   // Official LinkedIn blue
    portfolio: '#0EA5E9',  // Beautiful cyan/teal globe
    github: '#181717'      // Official GitHub black
  };

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
            {p.email ? (
              <View style={styles.contactItemRow}>
                <EmailIcon color={iconColors.email} size={8.5} />
                <Text style={styles.contactText}>{p.email}</Text>
              </View>
            ) : null}

            {p.email && p.phone ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.phone ? (
              <View style={styles.contactItemRow}>
                <PhoneIcon color={iconColors.phone} size={8.5} />
                <Text style={styles.contactText}>
                  {p.phone.startsWith('+') ? p.phone : `+92 ${p.phone.replace(/^0/, '')}`}
                </Text>
              </View>
            ) : null}

            {(p.email || p.phone) && p.city ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.city ? (
              <View style={styles.contactItemRow}>
                <LocationIcon color={iconColors.location} size={8.5} />
                <Text style={styles.contactText}>{p.city}</Text>
              </View>
            ) : null}

            {(p.email || p.phone || p.city) && p.portfolio ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.portfolio ? (
              <View style={styles.contactItemRow}>
                <GlobeIcon color={iconColors.portfolio} size={8.5} />
                <Text style={[styles.contactText, { fontFamily: 'Inter-Bold', color: '#0B2545' }]}>
                  {p.portfolio.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </View>
            ) : null}

            {(p.email || p.phone || p.city || p.portfolio) && p.linkedin ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.linkedin && p.linkedin.trim() !== '' ? (
              <View style={styles.contactItemRow}>
                <LinkedInIcon color={iconColors.linkedin} size={8.5} />
                <Text style={[styles.contactText, { fontFamily: 'Inter-Bold', color: '#0B2545' }]}>
                  {p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </View>
            ) : null}

            {(p.email || p.phone || p.city || p.portfolio || p.linkedin) && p.github ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.github && p.github.trim() !== '' ? (
              <View style={styles.contactItemRow}>
                <GitHubIcon color={iconColors.github} size={8.5} />
                <Text style={[styles.contactText, { fontFamily: 'Inter-Bold', color: '#0B2545' }]}>
                  {p.github.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </View>
            ) : null}
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
