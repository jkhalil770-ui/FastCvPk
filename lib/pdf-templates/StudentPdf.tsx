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
  name: {
    fontSize: 22,
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#2563EB',
    marginBottom: 10,
  },
  contactStrip: {
    flexWrap: 'wrap',
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
    color: '#2563EB',
    borderBottomWidth: 1,
    borderBottomColor: '#2563EB',
    paddingBottom: 3,
    marginTop: 15,
    marginBottom: 8,
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
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 9.5,
    color: '#0F172A',
  },
  experienceCompany: {
    color: '#64748B',
  },
  experienceDates: {
    fontSize: 8.5,
    color: '#64748B',
  },
  bulletList: {
    marginTop: 3,
  },
  bulletRow: {
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
  skillsCategory: {
    marginBottom: 4,
  },
  skillsLabel: {
    fontSize: 9.5,
    color: '#1E293B',
  },
  skillsValue: {
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
    textTransform: 'uppercase',
  },
});

interface StudentPdfProps {
  data: any;
  hasWatermark?: boolean;
}

export default function StudentPdf({ data, hasWatermark = false }: StudentPdfProps) {
  const p = data.personalInfo || {};
  const internships = data.internships || [];
  const projects = data.projects || [];
  const skills = data.skills || {};

  const isUrdu = p.languageChoice === 'ur';
  const fontFamily = isUrdu ? 'NotoNastaliq' : 'Inter';
  const fontBold = isUrdu ? 'NotoNastaliq' : 'Inter-Bold';
  const textAlign = isUrdu ? 'right' : 'left';
  const flexDir = isUrdu ? 'row-reverse' : 'row';

  return (
    <Document>
      <Page size="A4" style={[styles.page, { fontFamily }]}>
        {/* Top Banner Stripe */}
        <View style={styles.headerLine} />

        {/* Title / Name Header */}
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 6, marginBottom: 15 }}>
          <Text style={[styles.name, { fontFamily: fontBold, textAlign }]}>
            {p.fullName || (isUrdu ? 'آپ کا نام' : 'Your Name')}
          </Text>
          <Text style={[styles.subtitle, { fontFamily: fontBold, textAlign }]}>
            {p.classProgram || (isUrdu ? 'موجودہ ڈگری / کلاس' : 'Current Degree / Class')}{' '}
            {p.schoolName ? (isUrdu ? ' بمقام ' : ' @ ') : ''}{' '}
            {p.schoolName || ''}
          </Text>

          {/* Contact Strip */}
          <View style={[styles.contactStrip, { flexDirection: flexDir, justifyContent: 'center' }]}>
            {p.email ? (
              <View style={[styles.contactItemRow, { flexDirection: flexDir }]}>
                <EmailIcon color="#475569" size={8} />
                <Text style={styles.contactText}>{p.email}</Text>
              </View>
            ) : null}

            {p.email && p.phone ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.phone ? (
              <View style={[styles.contactItemRow, { flexDirection: flexDir }]}>
                <PhoneIcon color="#475569" size={8} />
                <Text style={styles.contactText}>
                  {p.phone.startsWith('+') ? p.phone : `+92 ${p.phone.replace(/^0/, '')}`}
                </Text>
              </View>
            ) : null}

            {(p.email || p.phone) && p.city ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.city ? (
              <View style={[styles.contactItemRow, { flexDirection: flexDir }]}>
                <LocationIcon color="#475569" size={8} />
                <Text style={styles.contactText}>{p.city}</Text>
              </View>
            ) : null}

            {(p.email || p.phone || p.city) && p.linkedin ? <Text style={styles.contactDivider}>|</Text> : null}

            {p.linkedin && p.linkedin.trim() !== '' ? (
              <View style={[styles.contactItemRow, { flexDirection: flexDir }]}>
                <LinkedInIcon color="#475569" size={8} />
                <Text style={styles.contactText}>
                  {p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Summary Objective */}
        {data.generatedObjective ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.sectionHeading, { fontFamily: fontBold, textAlign }]}>
              {isUrdu ? 'کیریئر کا مقصد' : 'Career Objective'}
            </Text>
            <Text style={[styles.bodyText, { textAlign }]}>{data.generatedObjective}</Text>
          </View>
        ) : null}

        {/* Education block */}
        {p.studentEducation ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.sectionHeading, { fontFamily: fontBold, textAlign }]}>
              {isUrdu ? 'تعلیمی ریکارڈ' : 'Education & Academic Profile'}
            </Text>
            <Text style={[styles.bodyText, { textAlign }]}>{p.studentEducation}</Text>
          </View>
        ) : null}

        {/* Internships & Experience */}
        {internships.length > 0 ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.sectionHeading, { fontFamily: fontBold, textAlign }]}>
              {isUrdu ? 'انٹرنشپ کی تفصیلات' : 'Internships & Experience'}
            </Text>
            {internships.map((intern: any, index: number) => {
              const hasDetails = intern.expandedDetails?.length > 0 || intern.details;
              if (!intern.role && !intern.company && !hasDetails) return null;

              return (
                <View key={index} style={styles.experienceItem} wrap={false}>
                  <View style={[styles.experienceHeader, { flexDirection: flexDir }]}>
                    <Text style={[styles.experienceTitle, { fontFamily: fontBold }]}>
                      {intern.role || 'Intern Role'}{' '}
                      <Text style={styles.experienceCompany}>
                        {isUrdu ? ' بمقام ' : ' at '}
                        {intern.company || 'Company'}
                      </Text>
                    </Text>
                    {intern.duration ? (
                      <Text style={styles.experienceDates}>{intern.duration}</Text>
                    ) : null}
                  </View>

                  {intern.expandedDetails?.length > 0 ? (
                    <View style={[styles.bulletList, { paddingRight: isUrdu ? 10 : 0, paddingLeft: isUrdu ? 0 : 10 }]}>
                      {intern.expandedDetails.map((bullet: string, bIdx: number) => (
                        <View key={bIdx} style={[styles.bulletRow, { flexDirection: flexDir }]}>
                          <Text style={styles.bulletSymbol}>•</Text>
                          <Text style={[styles.bulletText, { textAlign }]}>{bullet}</Text>
                        </View>
                      ))}
                    </View>
                  ) : intern.details ? (
                    <Text style={[styles.bodyText, { textAlign, paddingRight: isUrdu ? 5 : 0, paddingLeft: isUrdu ? 0 : 5, marginTop: 3 }]}>
                      {intern.details}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        {/* Academic Projects */}
        {projects.length > 0 ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.sectionHeading, { fontFamily: fontBold, textAlign }]}>
              {isUrdu ? 'اکیڈمک پروجیکٹس' : 'Academic Projects'}
            </Text>
            {projects.map((proj: any, index: number) => {
              if (!proj.projectName && !proj.projDesc) return null;
              return (
                <View key={index} style={styles.experienceItem} wrap={false}>
                  <View style={[styles.experienceHeader, { flexDirection: flexDir }]}>
                    <Text style={[styles.experienceTitle, { fontFamily: fontBold }]}>
                      {proj.projectName || 'Project Title'}
                    </Text>
                    {proj.projUrl ? (
                      <Text style={[styles.experienceDates, { color: '#2563EB' }]}>
                        {proj.projUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
                      </Text>
                    ) : null}
                  </View>
                  <Text style={[styles.bodyText, { textAlign, paddingRight: isUrdu ? 5 : 0, paddingLeft: isUrdu ? 0 : 5, marginTop: 3 }]}>
                    {proj.projDesc}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : null}

        {/* Skills list */}
        {((skills.techSkills && skills.techSkills.length > 0) ||
          (skills.softSkills && skills.softSkills.length > 0) ||
          skills.studentExtra) ? (
          <View style={{ marginBottom: 10 }} wrap={false}>
            <Text style={[styles.sectionHeading, { fontFamily: fontBold, textAlign }]}>
              {isUrdu ? 'مہارتیں اور کارنامے' : 'Skills & Accomplishments'}
            </Text>
            <View style={{ flexDirection: 'column', gap: 4 }}>
              {skills.techSkills && skills.techSkills.length > 0 ? (
                <View style={[styles.skillsCategory, { flexDirection: flexDir }]}>
                  <Text style={[styles.skillsLabel, { fontFamily: fontBold }]}>
                    {isUrdu ? 'ٹیکنیکل مہارتیں: ' : 'Technical Skills: '}
                  </Text>
                  <Text style={styles.skillsValue}>{skills.techSkills.join(', ')}</Text>
                </View>
              ) : null}

              {skills.softSkills && skills.softSkills.length > 0 ? (
                <View style={[styles.skillsCategory, { flexDirection: flexDir }]}>
                  <Text style={[styles.skillsLabel, { fontFamily: fontBold }]}>
                    {isUrdu ? 'سافٹ مہارتیں: ' : 'Soft Skills: '}
                  </Text>
                  <Text style={styles.skillsValue}>{skills.softSkills.join(', ')}</Text>
                </View>
              ) : null}

              {skills.studentExtra ? (
                <View style={[styles.skillsCategory, { flexDirection: flexDir }]}>
                  <Text style={[styles.skillsLabel, { fontFamily: fontBold }]}>
                    {isUrdu ? 'اضافی سرگرمیاں: ' : 'Extracurriculars: '}
                  </Text>
                  <Text style={styles.skillsValue}>{skills.studentExtra}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ) : null}

        {/* Watermark */}
        {hasWatermark ? (
          <Text style={[styles.watermark, { fontFamily: isUrdu ? 'NotoNastaliq' : 'Inter-Bold' }]} fixed>
            Created free at FastCV.PK — Remove watermark: fastcvpk.online
          </Text>
        ) : null}
      </Page>
    </Document>
  );
}
