import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PDFExportOptions {
  filename: string;
  hasWatermark?: boolean;
}

/**
 * High-definition PDF generator utilizing html2canvas and jsPDF.
 * Renders the target DOM printed container to an A4 PDF at 300 DPI.
 */
export async function exportCVToPDF(
  elementId: string, 
  options: PDFExportOptions
): Promise<Blob | null> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Target print element #${elementId} not found.`);
    return null;
  }

  let clone: HTMLElement | null = null;
  try {
    // Clone the element to render it outside the scaled parent container context
    clone = element.cloneNode(true) as HTMLElement;
    
    // Style the clone to be visible, fully unscaled, and positioned off-screen
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.width = "210mm";
    clone.style.minHeight = "297mm";
    clone.style.transform = "none";
    clone.style.boxShadow = "none";
    clone.style.display = "block";
    clone.style.zIndex = "-9999";
    
    // Set transparent background and reset potential flex alignments
    clone.style.margin = "0";
    clone.style.padding = "15mm";
    clone.style.boxSizing = "border-box";
    
    // Append to document body for standard browser style calculations
    document.body.appendChild(clone);

    // Wait a brief frame for DOM styling resolution
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Capture the unscaled cloned element
    const canvas = await html2canvas(clone, {
      scale: 3, // Enforces high resolution 300 DPI capture
      useCORS: true, // Prevents cross-origin issues with external Google Fonts
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // Remove the clone immediately to keep the DOM clean
    document.body.removeChild(clone);
    clone = null;

    // Calculate A4 dimension mapping
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Build multi-page array if content overflows A4 height
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    return pdf.output("blob");
  } catch (error) {
    console.error("PDF generation error:", error);
    if (clone && document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
    return null;
  }
}

/**
 * Direct file-download wrapper for immediate user export.
 */
export async function downloadCVAsPDF(
  elementId: string,
  filename = "MyCV.pdf"
): Promise<boolean> {
  const blob = await exportCVToPDF(elementId, { filename });
  if (!blob) return false;

  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error("File download trigger failed:", err);
    return false;
  }
}
