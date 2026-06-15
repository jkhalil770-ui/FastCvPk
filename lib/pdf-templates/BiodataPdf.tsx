import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontFamily: 'NotoNastaliq',
  },
  outerBorder: {
    borderWidth: 1.5,
    borderColor: '#059669',
    height: '100%',
    padding: 3,
  },
  innerBorder: {
    borderWidth: 3,
    borderColor: '#059669',
    height: '100%',
    padding: 25,
    flexDirection: 'column',
  },
  bismillah: {
    fontSize: 9,
    color: '#059669',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#059669',
    paddingBottom: 8,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: 'NotoNastaliq',
    color: '#065F46',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 1.6,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    fontFamily: 'NotoNastaliq',
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'NotoNastaliq',
    color: '#047857',
    borderBottomWidth: 1.5,
    borderBottomColor: '#D1FAE5',
    paddingBottom: 4,
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'right',
  },
  gridRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridCol: {
    width: '48%',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 10.5,
    color: '#334155',
  },
  label: {
    fontFamily: 'NotoNastaliq',
    color: '#0F172A',
    marginLeft: 4,
  },
  value: {
    fontFamily: 'NotoNastaliq',
    color: '#334155',
  },
  fullWidthCol: {
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 10.5,
    color: '#334155',
    marginTop: 4,
  },
  // Table Styling
  table: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row-reverse',
    backgroundColor: '#F0FDF4',
    borderBottomWidth: 1.5,
    borderBottomColor: '#059669',
    paddingVertical: 6,
  },
  tableRow: {
    flexDirection: 'row-reverse',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 6,
  },
  th: {
    flex: 1,
    fontSize: 8.5,
    fontFamily: 'NotoNastaliq',
    color: '#065F46',
    textAlign: 'center',
  },
  td: {
    flex: 1,
    fontSize: 8.5,
    fontFamily: 'NotoNastaliq',
    color: '#334155',
    textAlign: 'center',
  },
  tdBold: {
    flex: 1,
    fontSize: 8.5,
    fontFamily: 'NotoNastaliq',
    color: '#0F172A',
    textAlign: 'center',
  },
  skillsList: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 6,
    paddingRight: 5,
  },
  skillBadge: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: 9,
    fontFamily: 'NotoNastaliq',
    color: '#065F46',
  },
  // References Cards
  refContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  refCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
  },
  refName: {
    fontSize: 10.5,
    fontFamily: 'NotoNastaliq',
    color: '#065F46',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 3,
    marginBottom: 5,
    textAlign: 'right',
  },
  refDetailRow: {
    flexDirection: 'row-reverse',
    fontSize: 9,
    color: '#4B5563',
    marginBottom: 2,
  },
  refLabel: {
    fontFamily: 'NotoNastaliq',
    color: '#1F2937',
    marginLeft: 3,
  },
  refValue: {
    fontFamily: 'NotoNastaliq',
  },
});

interface BiodataPdfProps {
  data: any;
  hasWatermark?: boolean;
}

export default function BiodataPdf({ data, hasWatermark = false }: BiodataPdfProps) {
  const p = data.personalInfo || {};
  const edu = data.biodataEducation || {};
  const refs = data.biodataReferences || [];
  const skills = data.skills || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
              <Text style={styles.name}>{p.fullName || 'نام درج کریں'}</Text>
              <Text style={styles.subtitle}>سوانح حیات (بائیو ڈیٹا)</Text>
            </View>

            {/* Personal Details */}
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>ذاتی تفصیلات</Text>
              
              <View style={styles.gridRow}>
                <View style={styles.gridCol}>
                  <Text style={styles.label}>مکمل نام:</Text>
                  <Text style={styles.value}>{p.fullName || '—'}</Text>
                </View>
                <View style={styles.gridCol}>
                  <Text style={styles.label}>والد کا نام:</Text>
                  <Text style={styles.value}>{p.fatherName || '—'}</Text>
                </View>
              </View>

              <View style={styles.gridRow}>
                <View style={styles.gridCol}>
                  <Text style={styles.label}>تاریخ پیدائش:</Text>
                  <Text style={styles.value}>{p.dob || '—'}</Text>
                </View>
                <View style={styles.gridCol}>
                  <Text style={styles.label}>شناختی کارڈ نمبر:</Text>
                  <Text style={styles.value}>{p.cnic || '—'}</Text>
                </View>
              </View>

              <View style={styles.gridRow}>
                <View style={styles.gridCol}>
                  <Text style={styles.label}>مذہب:</Text>
                  <Text style={styles.value}>{p.religion || '—'}</Text>
                </View>
                <View style={styles.gridCol}>
                  <Text style={styles.label}>شہر:</Text>
                  <Text style={styles.value}>{p.city || '—'}</Text>
                </View>
              </View>

              <View style={styles.gridRow}>
                <View style={styles.gridCol}>
                  <Text style={styles.label}>رابطہ نمبر:</Text>
                  <Text style={styles.value}>{p.phone || '—'}</Text>
                </View>
                {p.email ? (
                  <View style={styles.gridCol}>
                    <Text style={styles.label}>ای میل:</Text>
                    <Text style={styles.value}>{p.email}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.fullWidthCol}>
                <Text style={styles.label}>مکمل پتہ:</Text>
                <Text style={styles.value}>{p.address || '—'}</Text>
              </View>
            </View>

            {/* Education Grid (Table) */}
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>تعلیمی کوائف</Text>
              
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.th}>کلاس / ڈگری</Text>
                  <Text style={styles.th}>ادارہ / بورڈ / یونیورسٹی</Text>
                  <Text style={styles.th}>پاس کرنے کا سال</Text>
                  <Text style={styles.th}>نمبر / سی جی پی اے</Text>
                </View>
                
                {edu.matric?.board ? (
                  <View style={styles.tableRow}>
                    <Text style={styles.tdBold}>میٹرک</Text>
                    <Text style={styles.td}>{edu.matric.board}</Text>
                    <Text style={styles.td}>{edu.matric.year}</Text>
                    <Text style={styles.td}>{edu.matric.marks}</Text>
                  </View>
                ) : null}
                
                {edu.inter?.board ? (
                  <View style={styles.tableRow}>
                    <Text style={styles.tdBold}>انٹر (FA / FSc)</Text>
                    <Text style={styles.td}>{edu.inter.board}</Text>
                    <Text style={styles.td}>{edu.inter.year}</Text>
                    <Text style={styles.td}>{edu.inter.marks}</Text>
                  </View>
                ) : null}

                {edu.graduation?.university ? (
                  <View style={styles.tableRow}>
                    <Text style={styles.tdBold}>گریجویشن</Text>
                    <Text style={styles.td}>{edu.graduation.university}</Text>
                    <Text style={styles.td}>{edu.graduation.year}</Text>
                    <Text style={styles.td}>{edu.graduation.cgpa}</Text>
                  </View>
                ) : null}

                {edu.masters?.university ? (
                  <View style={styles.tableRow}>
                    <Text style={styles.tdBold}>ماسٹرز</Text>
                    <Text style={styles.td}>{edu.masters.university}</Text>
                    <Text style={styles.td}>{edu.masters.year}</Text>
                    <Text style={styles.td}>{edu.masters.cgpa}</Text>
                  </View>
                ) : null}
              </View>
            </View>

            {/* Skills */}
            {skills.techSkills && skills.techSkills.length > 0 ? (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>مہارتیں</Text>
                <View style={styles.skillsList}>
                  {skills.techSkills.map((sk: string, index: number) => (
                    <Text key={index} style={styles.skillBadge}>
                      {sk}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}

            {/* References */}
            {refs.length > 0 && (refs[0]?.name || refs[1]?.name) ? (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>حوالہ جات</Text>
                <View style={styles.refContainer}>
                  {refs.map((ref: any, idx: number) => {
                    if (!ref.name) return null;
                    return (
                      <View key={idx} style={styles.refCard} wrap={false}>
                        <Text style={styles.refName}>{ref.name}</Text>
                        <View style={styles.refDetailRow}>
                          <Text style={styles.refLabel}>تعلق / عہدہ:</Text>
                          <Text style={styles.refValue}>{ref.relation}</Text>
                        </View>
                        <View style={styles.refDetailRow}>
                          <Text style={styles.refLabel}>رابطہ نمبر:</Text>
                          <Text style={styles.refValue}>{ref.phone}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}

          </View>
        </View>
      </Page>
    </Document>
  );
}
